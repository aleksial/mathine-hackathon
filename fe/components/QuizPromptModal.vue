<!-- filepath: fe/components/QuizPromptModal.vue -->
<template>
  <div v-if="isOpen" class="modal-backdrop flex items-center justify-center p-4" @click="handleBackdropClick">
    <div class="modal-content w-full max-w-md animate-slide-up" @click.stop>
      <div class="p-6">
        <!-- Header -->
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icons name="FileText" :size="20" class="text-primary" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-foreground">Generate Quiz</h3>
            <p class="text-sm text-muted-foreground">Create assessment questions</p>
          </div>
        </div>

        <!-- Content -->
        <div class="space-y-4 mb-6">
          <div class="bg-muted/30 rounded-lg p-4">
            <h4 class="font-medium text-foreground text-sm mb-2">Selected Topic:</h4>
            <p class="text-sm text-muted-foreground">{{ selectedTopic?.title }}</p>
            <p class="text-xs text-muted-foreground mt-1">{{ selectedTopic?.description }}</p>
          </div>

          <div class="space-y-3">
            <label class="block">
              <span class="text-sm font-medium text-foreground mb-2 block">Number of Questions</span>
              <select 
                v-model="quizOptions.questionCount" 
                class="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              >
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
                <option value="15">15 Questions</option>
                <option value="20">20 Questions</option>
              </select>
            </label>

            <label class="block">
              <span class="text-sm font-medium text-foreground mb-2 block">Difficulty Level</span>
              <select 
                v-model="quizOptions.difficulty" 
                class="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="mixed">Mixed Difficulty</option>
              </select>
            </label>

            <label class="block">
              <span class="text-sm font-medium text-foreground mb-2 block">Question Types</span>
              <div class="space-y-2">
                <label class="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    v-model="quizOptions.includeMultipleChoice"
                    class="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span class="text-sm text-foreground">Multiple Choice</span>
                </label>
                <label class="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    v-model="quizOptions.includeShortAnswer"
                    class="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span class="text-sm text-foreground">Short Answer</span>
                </label>
                <label class="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    v-model="quizOptions.includeTrueFalse"
                    class="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span class="text-sm text-foreground">True/False</span>
                </label>
              </div>
            </label>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <button
            @click="handleCancel"
            class="flex-1 px-4 py-2 text-sm font-medium text-muted-foreground bg-secondary hover:bg-secondary/80 border border-border rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleGenerate"
            :disabled="!canGenerate"
            class="flex-1 professor-button px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Icons name="Zap" :size="16" />
            Generate Quiz
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SubQuestion } from '@/composables/useCourseQuestions'

interface QuizOptions {
  questionCount: number
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'mixed'
  includeMultipleChoice: boolean
  includeShortAnswer: boolean
  includeTrueFalse: boolean
}

interface Props {
  isOpen: boolean
  selectedTopic: SubQuestion | null
  courseId: string | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  generate: [options: QuizOptions & { topic: SubQuestion, courseId: string }]
}>()

const quizOptions = ref<QuizOptions>({
  questionCount: 10,
  difficulty: 'intermediate',
  includeMultipleChoice: true,
  includeShortAnswer: true,
  includeTrueFalse: false
})

const canGenerate = computed(() => {
  return (
    props.selectedTopic && 
    props.courseId &&
    (quizOptions.value.includeMultipleChoice || 
     quizOptions.value.includeShortAnswer || 
     quizOptions.value.includeTrueFalse)
  )
})

const handleBackdropClick = () => {
  handleCancel()
}

const handleCancel = () => {
  emit('close')
}

const handleGenerate = () => {
  if (!canGenerate.value || !props.selectedTopic || !props.courseId) return
  
  emit('generate', {
    ...quizOptions.value,
    topic: props.selectedTopic,
    courseId: props.courseId
  })
}

// Reset options when modal opens
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    quizOptions.value = {
      questionCount: 10,
      difficulty: 'intermediate',
      includeMultipleChoice: true,
      includeShortAnswer: true,
      includeTrueFalse: false
    }
  }
})
</script>