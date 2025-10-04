<template>
  <div class="p-6 bg-card border border-border rounded-lg">
    <div class="space-y-6">
      <div>
        <div class="flex items-start gap-3">
          <span class="text-sm font-semibold text-muted-foreground">Question {{ questionNumber }}</span>
          <span class="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
            {{ question.type === "text-input" ? "Text Answer" : "Multiple Choice" }}
          </span>
        </div>
        <h3 class="text-lg font-medium mt-2 text-card-foreground leading-relaxed">{{ question.question }}</h3>
      </div>

      <!-- Text Input Question -->
      <div v-if="question.type === 'text-input'" class="space-y-3">
        <label :for="`q${question.id}-text`" class="text-sm text-muted-foreground">
          Enter your answer:
        </label>
        <input
          :id="`q${question.id}-text`"
          type="text"
          :value="selectedAnswer || ''"
          @input="$emit('answerChange', ($event.target as HTMLInputElement).value)"
          placeholder="Type your answer here..."
          class="max-w-md px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <!-- Multiple Choice Question -->
      <div v-else class="space-y-3">
        <div
          v-for="option in question.options"
          :key="option.id"
          :class="cn(
            'flex items-start space-x-3 p-4 rounded-lg border transition-all cursor-pointer hover:bg-accent/50',
            selectedAnswer === option.id ? 'border-primary bg-accent' : 'border-border bg-card'
          )"
          @click="$emit('answerChange', option.id)"
        >
          <div class="flex items-center">
            <input
              type="radio"
              :id="`q${question.id}-${option.id}`"
              :checked="selectedAnswer === option.id"
              @change="$emit('answerChange', option.id)"
              class="w-4 h-4 text-primary border-border focus:ring-ring"
            />
          </div>
          <label
            :for="`q${question.id}-${option.id}`"
            class="flex-1 cursor-pointer text-sm leading-relaxed"
          >
            <span class="font-medium text-muted-foreground mr-2">{{ option.id.toUpperCase() }}.</span>
            {{ option.text }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/utils/cn'
import type { QuizQuestion as QuizQuestionType } from '@/composables/useQuizData'

interface Props {
  question: QuizQuestionType
  selectedAnswer: string | null
  questionNumber: number
}

defineProps<Props>()

defineEmits<{
  answerChange: [answer: string]
}>()
</script>