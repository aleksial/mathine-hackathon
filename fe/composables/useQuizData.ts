export interface QuizOption {
  id: string
  text: string
}

export type QuestionType = "multiple-choice" | "text-input"

export interface QuizQuestion {
  id: number
  question: string
  type: QuestionType
  options?: QuizOption[]
  correctAnswer: string
  acceptableAnswers?: string[]
}

export interface QuizData {
  title: string
  questions: QuizQuestion[]
}

export const sampleQuizData: QuizData = {
  title: "Computer Science Fundamentals Quiz",
  questions: [
    {
      id: 1,
      question: "What does HTML stand for?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "Hyper Text Markup Language" },
        { id: "b", text: "High Tech Modern Language" },
        { id: "c", text: "Home Tool Markup Language" },
        { id: "d", text: "Hyperlinks and Text Markup Language" },
      ],
      correctAnswer: "a",
    },
    {
      id: 2,
      question: "Which programming language is known as the 'language of the web'?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "Python" },
        { id: "b", text: "JavaScript" },
        { id: "c", text: "Java" },
        { id: "d", text: "C++" },
      ],
      correctAnswer: "b",
    },
    {
      id: 3,
      question: "What is the name of the sorting algorithm that repeatedly finds the minimum element?",
      type: "text-input",
      correctAnswer: "selection sort",
      acceptableAnswers: ["selection sort", "selectionsort", "selection-sort"],
    },
    {
      id: 4,
      question: "What is the time complexity of binary search?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "O(n)" },
        { id: "b", text: "O(n²)" },
        { id: "c", text: "O(log n)" },
        { id: "d", text: "O(1)" },
      ],
      correctAnswer: "c",
    },
    {
      id: 5,
      question: "Which data structure uses LIFO (Last In First Out)?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "Queue" },
        { id: "b", text: "Stack" },
        { id: "c", text: "Array" },
        { id: "d", text: "Linked List" },
      ],
      correctAnswer: "b",
    },
    {
      id: 6,
      question: "What does CSS stand for?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "Computer Style Sheets" },
        { id: "b", text: "Creative Style Sheets" },
        { id: "c", text: "Cascading Style Sheets" },
        { id: "d", text: "Colorful Style Sheets" },
      ],
      correctAnswer: "c",
    },
    {
      id: 7,
      question: "Which of the following is NOT a programming paradigm?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "Object-Oriented" },
        { id: "b", text: "Functional" },
        { id: "c", text: "Procedural" },
        { id: "d", text: "Sequential" },
      ],
      correctAnswer: "d",
    },
    {
      id: 8,
      question: "What is the purpose of a compiler?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "To execute code line by line" },
        { id: "b", text: "To translate source code to machine code" },
        { id: "c", text: "To debug programs" },
        { id: "d", text: "To format code" },
      ],
      correctAnswer: "b",
    },
    {
      id: 9,
      question: "Which protocol is used for secure web browsing?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "HTTP" },
        { id: "b", text: "FTP" },
        { id: "c", text: "HTTPS" },
        { id: "d", text: "SMTP" },
      ],
      correctAnswer: "c",
    },
    {
      id: 10,
      question: "What does API stand for?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "Application Programming Interface" },
        { id: "b", text: "Advanced Programming Integration" },
        { id: "c", text: "Automated Program Interaction" },
        { id: "d", text: "Application Process Integration" },
      ],
      correctAnswer: "a",
    },
    {
      id: 11,
      question: "Which database type is MongoDB?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "Relational" },
        { id: "b", text: "NoSQL" },
        { id: "c", text: "Graph" },
        { id: "d", text: "Hierarchical" },
      ],
      correctAnswer: "b",
    },
    {
      id: 12,
      question: "What is the main purpose of Git?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "Code compilation" },
        { id: "b", text: "Version control" },
        { id: "c", text: "Code execution" },
        { id: "d", text: "Database management" },
      ],
      correctAnswer: "b",
    },
    {
      id: 13,
      question: "Which of these is a JavaScript framework?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "Django" },
        { id: "b", text: "Flask" },
        { id: "c", text: "React" },
        { id: "d", text: "Laravel" },
      ],
      correctAnswer: "c",
    },
    {
      id: 14,
      question: "What keyword is used to declare a constant in JavaScript?",
      type: "text-input",
      correctAnswer: "const",
      acceptableAnswers: ["const"],
    },
    {
      id: 15,
      question: "What does SQL stand for?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "Structured Query Language" },
        { id: "b", text: "Simple Question Language" },
        { id: "c", text: "Standard Query Logic" },
        { id: "d", text: "System Query Language" },
      ],
      correctAnswer: "a",
    },
    {
      id: 16,
      question: "Which sorting algorithm has the best average-case time complexity?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "Bubble Sort" },
        { id: "b", text: "Selection Sort" },
        { id: "c", text: "Quick Sort" },
        { id: "d", text: "Insertion Sort" },
      ],
      correctAnswer: "c",
    },
    {
      id: 17,
      question: "What is the purpose of a constructor in OOP?",
      type: "multiple-choice",
      options: [
        { id: "a", text: "To destroy objects" },
        { id: "b", text: "To initialize objects" },
        { id: "c", text: "To copy objects" },
        { id: "d", text: "To compare objects" },
      ],
      correctAnswer: "b",
    },
  ],
}