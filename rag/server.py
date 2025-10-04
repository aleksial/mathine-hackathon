#!/usr/bin/env python3
# server.py
import os, json, re
from typing import Optional, Set, Any
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from dotenv import load_dotenv
load_dotenv(dotenv_path=Path(__file__).with_suffix(".env")) or load_dotenv()

from langchain_community.vectorstores import FAISS
from langchain_community.retrievers import BM25Retriever
from langchain.retrievers.ensemble import EnsembleRetriever
from langchain_core.retrievers import BaseRetriever
from langchain_openai import ChatOpenAI

from quiz import make_quiz  # your file from earlier

# ---------- Config ----------
INDEX_DIR = Path("./faiss_course")         # your combined textbooks+slides index
OPENAI_CHAT_MODEL = "gpt-4o-mini"
TOP_K = 6

# ---------- Utilities ----------
def _emb_from_family(family: str):
    fam = (family or "").strip().lower()
    if fam == "openai:text-embedding-3-small":
        from langchain_openai import OpenAIEmbeddings
        return OpenAIEmbeddings(model="text-embedding-3-small"), 1536
    if fam in ("hf:all-minilm-l6-v2", "hf:sentence-transformers/all-minilm-l6-v2"):
        from langchain_huggingface import HuggingFaceEmbeddings
        return HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2"), 384
    raise ValueError(f"Unknown embed_family: {family!r}")

def _load_manifest(index_dir: Path):
    p = index_dir / "manifest.json"
    if p.exists():
        try: return json.loads(p.read_text())
        except Exception: pass
    return None

def load_index() -> FAISS:
    man = _load_manifest(INDEX_DIR)
    if man and "embed_family" in man:
        emb, exp_dim = _emb_from_family(man["embed_family"])
    else:
        from langchain_openai import OpenAIEmbeddings
        emb, exp_dim = OpenAIEmbeddings(model="text-embedding-3-small"), 1536
    vs = FAISS.load_local(INDEX_DIR.as_posix(), emb, allow_dangerous_deserialization=True)
    if getattr(vs.index, "d", None) != exp_dim:
        raise RuntimeError("FAISS dim mismatch; rebuild with matching embeddings.")
    return vs

def get_llm():
    key = os.getenv("OPENAI_API_KEY")
    if not key:
        raise RuntimeError("OPENAI_API_KEY not set")
    return ChatOpenAI(model=OPENAI_CHAT_MODEL, temperature=0)

# --- quiz filter parsing (same logic you tested) ---
CH_RANGE = re.compile(r"chapters?\s+(\d+)\s*[-–]\s*(\d+)", re.I)
CH_SINGLE = re.compile(r"chapter\s+(\d+)\b", re.I)

def parse_quiz_filters(text: str):
    text_l = text.lower()
    book = None
    if any(k in text_l for k in ("algorithm", "goodrich", "tamassia")):
        book = "algorithms"
    elif any(k in text_l for k in ("discrete", "combinator")):
        book = "discrete"
    chapters: Set[int] = set()
    m = CH_RANGE.search(text_l)
    if m:
        a, b = int(m.group(1)), int(m.group(2))
        for c in range(min(a, b), max(a, b) + 1):
            chapters.add(c)
    else:
        m2 = CH_SINGLE.search(text_l)
        if m2:
            chapters.add(int(m2.group(1)))
    return {"book": book, "chapters": chapters}

def subset_docs(all_docs, *, book: Optional[str], chapters: Set[int]):
    def ok(d):
        m = d.metadata
        if book:
            bt = (m.get("book_title","").lower())
            if book == "algorithms" and not any(x in bt for x in ("algorithm", "goodrich", "tamassia")):
                return False
            if book == "discrete" and not any(x in bt for x in ("discrete", "combinatorial")):
                return False
        if chapters:
            if m.get("source_type") != "textbook":
                return False
            if int(m.get("chapter", -1)) not in chapters:
                return False
        return True
    return [d for d in all_docs if ok(d)]

def build_hybrid_retriever_for_subset(vs: FAISS, subset, *, k=TOP_K) -> EnsembleRetriever:
    bm25 = BM25Retriever.from_documents(subset); bm25.k = max(8, k)

    def meta_key(d):
        m = d.metadata
        return (m.get("source"), m.get("chunk"), m.get("slide"), m.get("chapter"))
    subset_keys = {meta_key(d) for d in subset}

    class DenseSubsetRetriever(BaseRetriever):
        vs: Any
        subset_keys: set
        k: int = 8
        def _get_relevant_documents(self, query: str, *, run_manager=None):
            hits = self.vs.similarity_search(query, k=max(12, 3*self.k))
            kept = [h for h in hits if meta_key(h) in self.subset_keys]
            return kept[: self.k]

    dense = DenseSubsetRetriever(vs=vs, subset_keys=subset_keys, k=max(8, k))
    return EnsembleRetriever(retrievers=[bm25, dense], weights=[0.5, 0.5])

# ---------- FastAPI ----------

class QuizRequest(BaseModel):
    prompt: str                    # natural language, e.g. "create a quiz from chapters 1-3 for the algorithms textbook n=8"
    n: Optional[int] = None        # optional override; else parsed from prompt
class QuizResponse(BaseModel):
    quiz: dict                     # your exact quiz JSON (title, questions[])

app = FastAPI(title="RAG Quiz Service")
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ALLOW_ORIGINS","*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VS = load_index()
ALL_DOCS = list(VS.docstore._dict.values())
LLM = get_llm()

@app.get("/health")
def health():
    return {"status": "ok", "docs": len(ALL_DOCS)}

@app.post("/quiz", response_model=QuizResponse)
def create_quiz(body: QuizRequest):
    text = body.prompt.strip()
    # extract n= if present
    m_n = re.search(r"\bn=(\d+)\b", text)
    n = body.n or (int(m_n.group(1)) if m_n else 10)
    # strip n= from topic text
    text = re.sub(r"\bn=\d+\b", "", text).strip()

    f = parse_quiz_filters(text)
    subset = subset_docs(ALL_DOCS, book=f["book"], chapters=f["chapters"])
    # fallback: whole corpus if no explicit subset found
    if not subset:
        subset = ALL_DOCS

    retr = build_hybrid_retriever_for_subset(VS, subset, k=TOP_K)
    title_bits = []
    if f["book"] == "algorithms": title_bits.append("Algorithms")
    if f["book"] == "discrete":   title_bits.append("Discrete Math")
    if f["chapters"]:             title_bits.append("Ch " + "-".join(map(str, sorted(f["chapters"]))))
    title = " ".join(title_bits) + " Quiz" if title_bits else "Course Quiz"

    try:
        quiz_obj = make_quiz(retr, LLM, topic=text or "course material", n=n, title=title)
        # Return plain dict your Vue UI already knows how to render
        return {"quiz": quiz_obj.model_dump()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
