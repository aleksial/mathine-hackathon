<template>
  <div class="w-24 bg-sidebar border-r border-sidebar-border h-screen sticky top-0 flex flex-col">
    <div class="p-3 border-b border-sidebar-border">
      <h3 class="text-xs font-semibold text-sidebar-foreground">Questions</h3>
    </div>
    <div class="flex-1 overflow-y-auto p-2">
      <div class="grid grid-cols-2 gap-1.5">
        <button
          v-for="num in totalQuestions"
          :key="num"
          @click="$emit('questionClick', num)"
          :class="cn(
            'w-10 h-10 rounded text-xs font-medium transition-all hover:scale-105',
            currentQuestion === num
              ? 'bg-primary text-primary-foreground shadow-sm'
              : answeredQuestions.has(num)
                ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border'
                : 'bg-card text-card-foreground border border-border hover:bg-accent'
          )"
        >
          {{ num }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/utils/cn'

interface Props {
  totalQuestions: number
  currentQuestion: number
  answeredQuestions: Set<number>
}

defineProps<Props>()

defineEmits<{
  questionClick: [questionNumber: number]
}>()
</script>