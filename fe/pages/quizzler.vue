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
        <h1 class="text-2xl font-semibold text-card-foreground">
          {{ title || "Generating quiz..." }}
        </h1>
        <p class="text-sm text-muted-foreground mt-1">
          <span v-if="loading">Preparing questions…</span>
          <span v-else>Page {{ currentPage + 1 }} of {{ totalPages }} • Question {{ currentQuestionIndex + 1 }} of {{ totalQuestions }}</span>
        </p>
        <p v-if="error" class="text-xs text-red-600 mt-1">{{ error }}</p>

        <!-- Full-screen overlay spinner -->
        <LoadingOverlay
          v-if="loading"
          message="Generating your quiz…"
          sub="Retrieving context and writing high-quality questions"
        />

        <!-- (Optionally keep your skeleton block below; it’ll be behind the overlay) -->
        <div v-if="loading" class="max-w-4xl mx-auto px-6 py-12">
          <div class="animate-pulse space-y-4">
            <div class="h-6 w-1/2 bg-muted rounded"></div>
            <div class="h-4 w-2/3 bg-muted rounded"></div>
            <div class="h-4 w-5/6 bg-muted rounded"></div>
            <div class="h-4 w-4/6 bg-muted rounded"></div>
          </div>
        </div>

        <!-- Empty state (no questions) -->
        <div v-else-if="!loading && totalQuestions === 0" class="max-w-4xl mx-auto px-6 py-12 text-sm text-muted-foreground">
          No questions yet. Try generating a quiz from the Prompter.
        </div>

        <!-- Question -->
        <div v-else>
          <QuizQuestion
            :question="currentQuestion"
            :selected-answer="answers[currentQuestion?.id || 0] || null"
            @answer-change="handleAnswerChange"
            :question-number="currentQuestionIndex + 1"
          />
        </div>
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
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from '#imports' // Nuxt. If plain Vue + Vue Router: use `useRoute` from 'vue-router'
import { useQuizStore } from '~/src/stores/quizStore'
import LoadingOverlay from '~/components/LoadingOverlay.vue'


const quizStore = useQuizStore()
const { title, questions, loading, error } = storeToRefs(quizStore)

definePageMeta({ layout: false })

const route = useRoute()
onMounted(async () => {
  const prompt = (route.query.prompt as string) || ""
  if (prompt) {
    // If you navigated here from Prompter, loading is already true—this just fires the API
    await quizStore.generate(prompt)
  }
})

const QUESTIONS_PER_PAGE = 10
const currentQuestionIndex = ref(0)
const answers = ref<Record<number, string>>({})

const totalQuestions = computed(() => questions.value.length)
const currentPage = computed(() => Math.floor(currentQuestionIndex.value / QUESTIONS_PER_PAGE))
const totalPages = computed(() => Math.max(1, Math.ceil(totalQuestions.value / QUESTIONS_PER_PAGE)))
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const answeredQuestions = computed(() => new Set(Object.keys(answers.value).map(Number)))

const handleAnswerChange = (answer: string) => {
  const q = currentQuestion.value
  if (!q) return
  answers.value = { ...answers.value, [q.id]: answer }
}

const handleQuestionClick = (questionNumber: number) => {
  currentQuestionIndex.value = Math.min(Math.max(0, questionNumber - 1), totalQuestions.value - 1)
}

const handlePrevious = () => { if (currentQuestionIndex.value > 0) currentQuestionIndex.value-- }
const handleNext = () => { if (currentQuestionIndex.value < totalQuestions.value - 1) currentQuestionIndex.value++ }
const handlePreviousPage = () => { if (currentPage.value > 0) currentQuestionIndex.value = (currentPage.value - 1) * QUESTIONS_PER_PAGE }
const handleNextPage = () => { if (currentPage.value < totalPages.value - 1) currentQuestionIndex.value = (currentPage.value + 1) * QUESTIONS_PER_PAGE }

const handleSubmit = () => {
  let correct = 0
  for (const q of questions.value) {
    const userAnswer = answers.value[q.id]
    if (!userAnswer) continue
    if (q.type === "text-input") {
      const norm = userAnswer.toLowerCase().trim()
      const ok = (q.acceptableAnswers || []).map(a => a.toLowerCase()).includes(norm) || q.correctAnswer.toLowerCase() === norm
      if (ok) correct++
    } else {
      if (userAnswer === q.correctAnswer) correct++
    }
  }
  alert(`Quiz submitted! You answered ${correct} out of ${totalQuestions.value} questions correctly.`)
}
</script>
