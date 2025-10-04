<!-- filepath: fe/pages/Quiz Generator.vue -->
<template>
  <div>
    <div class="h-screen flex bg-background overflow-hidden">
      <!-- Question Navigator Sidebar -->
      <QuestionNavigator
        :total-questions="totalQuestions"
        :current-question="currentQuestionIndex + 1"
        :answered-questions="answeredQuestions"
        @question-click="handleQuestionClick"
      />

      <!-- Main Content -->
      <div class="flex-1 flex flex-col h-screen">
        <!-- Header -->
        <header class="border-b border-border bg-card flex-shrink-0">
          <div class="max-w-4xl mx-auto px-6 py-4">
            <h1 class="text-2xl font-semibold text-card-foreground">{{ sampleQuizData.title }}</h1>
            <p class="text-sm text-muted-foreground mt-1">
              Page {{ currentPage + 1 }} of {{ totalPages }} • Question {{ currentQuestionIndex + 1 }} of {{ totalQuestions }}
            </p>
          </div>
        </header>

        <!-- Question Content - Scrollable middle section -->
        <main class="flex-1 overflow-y-auto bg-background">
          <div class="max-w-4xl mx-auto px-6 py-8">
            <QuizQuestion
              :question="currentQuestion"
              :selected-answer="answers[currentQuestion.id] || null"
              @answer-change="handleAnswerChange"
              :question-number="currentQuestionIndex + 1"
            />
          </div>
        </main>

        <!-- Footer Navigation - Always at bottom -->
        <footer class="border-t border-border bg-card flex-shrink-0">
          <div class="max-w-4xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="flex gap-2">
                <button
                  @click="handlePreviousPage"
                  :disabled="currentPage === 0"
                  class="inline-flex items-center px-3 py-2 text-sm border border-border rounded-md bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icons name="ChevronLeft" :size="16" class="mr-1" />
                  Previous Page
                </button>
                <button
                  @click="handleNextPage"
                  :disabled="currentPage === totalPages - 1"
                  class="inline-flex items-center px-3 py-2 text-sm border border-border rounded-md bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Page
                  <Icons name="ChevronRight" :size="16" class="ml-1" />
                </button>
              </div>

              <div class="flex gap-2">
                <button
                  @click="handlePrevious"
                  :disabled="currentQuestionIndex === 0"
                  class="inline-flex items-center px-3 py-2 border border-border rounded-md bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icons name="ChevronLeft" :size="16" class="mr-1" />
                  Previous
                </button>
                <button
                  @click="handleNext"
                  :disabled="currentQuestionIndex === totalQuestions - 1"
                  class="inline-flex items-center px-3 py-2 border border-border rounded-md bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <Icons name="ChevronRight" :size="16" class="ml-1" />
                </button>
                <button
                  @click="handleSubmit"
                  class="ml-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { sampleQuizData } from '@/composables/useQuizData'

// Disable the default layout for this page
definePageMeta({
  layout: false
})

const QUESTIONS_PER_PAGE = 10
const currentQuestionIndex = ref(0)
const answers = ref<Record<number, string>>({})
const totalQuestions = sampleQuizData.questions.length
const currentPage = computed(() => Math.floor(currentQuestionIndex.value / QUESTIONS_PER_PAGE))
const totalPages = computed(() => Math.ceil(totalQuestions / QUESTIONS_PER_PAGE))
const currentQuestion = computed(() => sampleQuizData.questions[currentQuestionIndex.value])
const answeredQuestions = computed(() => new Set(Object.keys(answers.value).map(Number)))

const handleAnswerChange = (answer: string) => {
  answers.value = {
    ...answers.value,
    [currentQuestion.value.id]: answer,
  }
}

const handleQuestionClick = (questionNumber: number) => {
  currentQuestionIndex.value = questionNumber - 1
}

const handlePrevious = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value = currentQuestionIndex.value - 1
  }
}

const handleNext = () => {
  if (currentQuestionIndex.value < totalQuestions - 1) {
    currentQuestionIndex.value = currentQuestionIndex.value + 1
  }
}

const handlePreviousPage = () => {
  if (currentPage.value > 0) {
    currentQuestionIndex.value = (currentPage.value - 1) * QUESTIONS_PER_PAGE
  }
}

const handleNextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentQuestionIndex.value = (currentPage.value + 1) * QUESTIONS_PER_PAGE
  }
}

const handleSubmit = () => {
  let correct = 0
  sampleQuizData.questions.forEach((q) => {
    const userAnswer = answers.value[q.id]
    if (!userAnswer) return

    if (q.type === "text-input") {
      const normalizedAnswer = userAnswer.toLowerCase().trim()
      const isCorrect =
        q.acceptableAnswers?.some((acceptable) => acceptable.toLowerCase() === normalizedAnswer) ||
        q.correctAnswer.toLowerCase() === normalizedAnswer
      if (isCorrect) correct++
    } else {
      if (userAnswer === q.correctAnswer) correct++
    }
  })
  alert(`Quiz submitted! You answered ${correct} out of ${totalQuestions} questions correctly.`)
}
</script>