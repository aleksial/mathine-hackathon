export interface PromptQuestion {
  id: string
  category: string
  question: string
  placeholder: string
  followUp?: string[]
}

export const promptQuestions: PromptQuestion[] = [
  {
    id: "analyze_content",
    category: "Content Analysis",
    question: "Analyze the content of my documents",
    placeholder: "What would you like me to analyze about your documents?",
    followUp: [
      "Summarize the main points",
      "Extract key concepts",
      "Identify important dates and deadlines"
    ]
  },
  {
    id: "generate_quiz",
    category: "Quiz Generation",
    question: "Generate a quiz from my documents",
    placeholder: "What type of quiz would you like? (multiple choice, short answer, etc.)",
    followUp: [
      "Create 10 multiple choice questions",
      "Generate short answer questions",
      "Make a comprehensive exam"
    ]
  },
  {
    id: "create_flashcards",
    category: "Study Materials",
    question: "Create flashcards from my documents",
    placeholder: "What topics should the flashcards focus on?",
    followUp: [
      "Key terms and definitions",
      "Important formulas",
      "Historical dates and events"
    ]
  },
  {
    id: "study_guide",
    category: "Study Materials",
    question: "Create a study guide",
    placeholder: "What should be included in the study guide?",
    followUp: [
      "Chapter summaries",
      "Key concepts outline",
      "Practice questions"
    ]
  },
  {
    id: "extract_notes",
    category: "Note Taking",
    question: "Extract and organize notes",
    placeholder: "How would you like the notes organized?",
    followUp: [
      "By chapter or section",
      "By topic or theme",
      "Chronologically"
    ]
  },
  {
    id: "explain_concepts",
    category: "Understanding",
    question: "Explain difficult concepts",
    placeholder: "Which concepts would you like me to explain?",
    followUp: [
      "Break down complex theories",
      "Provide examples",
      "Compare and contrast ideas"
    ]
  },
  {
    id: "research_help",
    category: "Research",
    question: "Help with research questions",
    placeholder: "What research questions do you have?",
    followUp: [
      "Find supporting evidence",
      "Identify gaps in knowledge",
      "Suggest related topics"
    ]
  },
  {
    id: "assignment_help",
    category: "Assignments",
    question: "Help with assignments and essays",
    placeholder: "What assignment do you need help with?",
    followUp: [
      "Create an outline",
      "Find relevant quotes",
      "Check for completeness"
    ]
  }
]