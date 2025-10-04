import axios from "axios"
import type { Quiz } from "~/typsea/quiz"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8000",
    timeout: 60000,
})

export async function createQuiz(prompt: string, n?: number): Promise<Quiz> {
    const body: any = { prompt }
    if (n) body.n = n
    const { data } = await api.post<{ quiz: Quiz }>("/quiz", body)
    return data.quiz
}
