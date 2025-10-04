import { defineStore } from "pinia"
import type { Quiz } from "~/typsea/quiz"
import { createQuiz } from "../quizApi"

export const useQuizStore = defineStore("quiz", {
    state: () => ({
        // expose what your page uses
        title: "" as string,
        questions: [] as Quiz["questions"],
        loading: false,
        error: null as string | null,
        // optional: remember the last prompt/n for “regenerate”
        lastPrompt: "" as string,
        lastN: undefined as number | undefined,
    }),
    actions: {
        async generate(prompt: string, n?: number) {
            this.loading = true
            this.error = null
            this.lastPrompt = prompt
            this.lastN = n
            try {
                const quiz = await createQuiz(prompt, n)
                this.title = quiz.title
                this.questions = quiz.questions
            } catch (e: any) {
                this.error = e?.response?.data?.detail || e?.message || "Failed to generate quiz"
                this.title = ""
                this.questions = []
            } finally {
                this.loading = false
            }
        },
        clear() {
            this.title = ""
            this.questions = []
            this.error = null
            this.loading = false
            this.lastPrompt = ""
            this.lastN = undefined
        },
        async regenerate() {
            if (!this.lastPrompt) return
            return this.generate(this.lastPrompt, this.lastN)
        }
    }
})
