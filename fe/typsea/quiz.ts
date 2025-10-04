export type MCOption = { id: string; text: string }

export type Question =
    | { id: number; question: string; type: "multiple-choice"; options: MCOption[]; correctAnswer: string }
    | { id: number; question: string; type: "text-input"; correctAnswer: string; acceptableAnswers?: string[] }

export type Quiz = { title: string; questions: Question[] }
