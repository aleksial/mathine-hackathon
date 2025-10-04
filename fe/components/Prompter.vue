<!-- filepath: fe/components/Prompter.vue -->
<template>
  <div class="h-full flex flex-col bg-background text-foreground">
    <!-- Header -->
    <div class="p-6 border-b border-border flex-shrink-0">
      <h1 class="text-3xl font-bold text-foreground mb-2">Quiz Generator Assistant</h1>
      <p class="text-sm text-muted-foreground">
        {{ selectedCourse ? `${selectedCourse.name} - Generate targeted assessments and quizzes` : 'Select your course to start creating custom quizzes and assessments' }}
      </p>
    </div>

    <!-- Content Area -->
    <div class="flex-1 flex flex-col min-h-0">
        <!-- Course Selection State -->
        <div v-if="!selectedCourse" class="flex-1 flex items-center justify-center p-6">
        <div class="max-w-4xl w-full animate-fade-in">
            <div class="text-center mb-8">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-subtle">
                <Icons name="GraduationCap" :size="32" class="text-primary" />
            </div>
            <h2 class="text-2xl font-bold text-foreground mb-2">Choose Your Course</h2>
            <p class="text-muted-foreground">
                Select the course you'd like to create quizzes for
            </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
                v-for="course in availableCourses"
                :key="course.id"
                @click="selectCourse(course)"
                class="group relative bg-card hover:bg-accent/50 border border-border hover:border-primary/30 rounded-xl p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
                <!-- Background gradient overlay -->
                <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- Content -->
                <div class="relative space-y-4">
                <!-- Course header -->
                <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                    <Icons name="GraduationCap" :size="24" class="text-primary" />
                    </div>
                    <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors duration-300">
                        {{ course.id }}
                    </h3>
                    <p class="text-sm font-medium text-foreground mb-1">
                        {{ course.name }}
                    </p>
                    </div>
                    <!-- Arrow indicator -->
                    <div class="w-8 h-8 bg-muted/50 group-hover:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Icons name="ChevronRight" :size="16" class="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                </div>
                
                <!-- Course description -->
                <div class="space-y-3">
                    <p class="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {{ course.description }}
                    </p>
                    
                    <!-- Course info badges -->
                    <div class="flex items-center gap-2 pt-2">
                    <span class="inline-flex items-center gap-1 px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md">
                        <Icons name="Book" :size="12" />
                        Course
                    </span>
                    <span class="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-xs text-primary rounded-md">
                        <Icons name="Zap" :size="12" />
                        Quiz Ready
                    </span>
                    </div>
                </div>
                </div>
                
                <!-- Hover effect border -->
                <div class="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300"></div>
            </button>
            </div>
        </div>
        </div>

      <!-- Course Selected State -->
      <div v-else class="flex-1 flex flex-col min-h-0">
        <!-- Course Header -->
        <div class="p-4 border-b border-border flex-shrink-0 glass-effect">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-foreground">{{ selectedCourse.id }}</h3>
              <p class="text-sm text-muted-foreground">{{ selectedCourse.name.split(' - ')[1] }}</p>
            </div>
            <button
              @click="resetCourse"
              class="text-xs text-muted-foreground hover:text-foreground transition-colors btn-ghost py-1 px-2"
            >
              Change Course
            </button>
          </div>
        </div>

        <!-- Individual Topic View -->
        <div v-if="selectedTopic" class="flex-1 flex flex-col animate-slide-up">
          <!-- Topic Header -->
          <div class="p-4 border-b border-border flex-shrink-0 bg-muted/20">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-semibold text-foreground text-sm">{{ selectedTopic.title }}</h4>
                <p class="text-xs text-muted-foreground">{{ selectedTopic.description }}</p>
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click="selectedTopic && generateQuizForTopic(selectedTopic)"
                  class="professor-button w-full px-3 py-2 text-sm"
                >
                  <Icons name="Zap" :size="12" />
                  Generate Quiz
                </button>
                <button
                  @click="selectedTopic = null"
                  class="text-xs text-muted-foreground hover:text-foreground transition-colors btn-ghost py-1 px-2"
                >
                  ← Back to Topics
                </button>
              </div>
            </div>
          </div>

          <!-- Topic Chat Area -->
          <div class="flex-1 flex flex-col">
            <!-- Messages -->
            <div class="flex-1 overflow-y-auto p-4">
              <!-- Welcome Message for Topic -->
              <div v-if="topicMessages.length === 0" class="text-center py-8">
                <div class="max-w-md mx-auto animate-fade-in">
                  <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icons name="BookOpen" :size="24" class="text-primary" />
                  </div>
                  <h4 class="text-lg font-semibold text-foreground mb-2">{{ selectedTopic.title }}</h4>
                  <p class="text-sm text-muted-foreground mb-4">
                    {{ selectedTopic.description }}
                  </p>
                  <div class="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3 border border-border/50">
                    <strong>Ask questions about this topic!</strong> I can help you understand concepts, clarify doubts, or prepare study materials before generating your quiz.
                  </div>
                </div>
              </div>

              <!-- Topic Messages -->
              <div class="space-y-4">
                <div
                  v-for="message in topicMessages"
                  :key="message.id"
                  :class="cn(
                    'flex animate-fade-in',
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  )"
                >
                  <div
                    :class="cn(
                      'max-w-[80%] rounded-lg p-3 text-sm',
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground border border-border'
                    )"
                  >
                    {{ message.content }}
                  </div>
                </div>

                <!-- Typing Indicator -->
                <div v-if="isTypingTopic" class="flex justify-start animate-fade-in">
                  <div class="bg-muted text-muted-foreground rounded-lg p-3 text-sm border border-border">
                    <div class="flex items-center gap-1">
                      <div class="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div class="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                      <div class="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Topic Input Area -->
            <div class="p-4 border-t border-border flex-shrink-0 glass-effect">
            <div class="space-y-3">
              <div class="flex gap-3">
                <input
                  v-model="currentMessage"
                  @keydown.enter="sendMessage"
                  :placeholder="`Generate a quiz for ${selectedCourse?.id || 'the selected course'}...`"
                  class="flex-1 px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
                <button
                  @click="sendMessage"
                  :disabled="!currentMessage.trim() || !selectedCourse"
                  class="professor-button px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icons name="Send" :size="16" />
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>

        <!-- Main categories view -->
        <div v-else class="flex-1 flex flex-col">
          <!-- Topics Grid -->
          <div class="p-4 border-b border-border flex-shrink-0">
            <h3 class="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icons name="BookOpen" :size="16" class="text-primary" />
              Available Topics ({{ availableTopics.length }})
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div
                v-for="topic in availableTopics"
                :key="topic.id"
                class="quiz-card group cursor-pointer"
                @click="selectTopic(topic)"
              >
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Icons name="BookOpen" :size="16" class="text-primary" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-foreground text-sm">{{ topic.title }}</div>
                    <div class="text-muted-foreground mt-1 text-xs leading-tight line-clamp-2">{{ topic.description }}</div>
                    <div class="mt-2 flex items-center justify-between">
                      <span class="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                        {{ topic.category }}
                      </span>
                      <div class="flex items-center gap-1 text-xs text-primary">
                        <Icons name="ChevronRight" :size="12" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- General Chat Area -->
          <div class="flex-1 overflow-y-auto p-4">
            <!-- Welcome Message -->
            <div v-if="messages.length === 0" class="text-center py-4">
            <div class="max-w-md mx-auto animate-fade-in">
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icons name="Zap" :size="20" class="text-primary" />
                </div>
                <h4 class="text-base font-semibold text-foreground mb-2">Ready to Help!</h4>
                <p class="text-xs text-muted-foreground mb-3">
                Generate a quiz about {{ selectedCourse.id }}.
                </p>
            </div>
            </div>

            <!-- General Messages -->
            <div class="space-y-4">
              <div
                v-for="message in messages"
                :key="message.id"
                :class="cn(
                  'flex animate-fade-in',
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )"
              >
                <div
                  :class="cn(
                    'max-w-[80%] rounded-lg p-3 text-sm',
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground border border-border'
                  )"
                >
                  {{ message.content }}
                </div>
              </div>

              <!-- Typing Indicator -->
              <div v-if="isTyping" class="flex justify-start animate-fade-in">
                <div class="bg-muted text-muted-foreground rounded-lg p-3 text-sm border border-border">
                  <div class="flex items-center gap-1">
                    <div class="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <QuizConfig
            v-model="quizCfg"
            :busy="quizStore.loading"
            :max-total="30"
            @generate="onQuizGenerate"
          />
          <!-- General Input Area -->
          <div class="p-4 border-t border-border flex-shrink-0 glass-effect">
            <div class="space-y-3">
              <div class="flex gap-3">
                <input
                  v-model="currentMessage"
                  @keydown.enter="sendMessage"
                  :placeholder="`Generate a quiz for ${selectedCourse?.id || 'the selected course'}...`"
                  class="flex-1 px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
                <button
                  @click="sendMessage"
                  :disabled="!currentMessage.trim() || !selectedCourse"
                  class="professor-button px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icons name="Send" :size="16" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/utils/cn'
import { availableCourses, getCourseQuestions, type Course, type CourseQuestion, type SubQuestion } from '@/composables/useCourseQuestions'
import { useQuizStore } from '~/src/stores/quizStore'

const quizStore = useQuizStore()
const quizCfg = ref({ total: 10, mc: 6, sa: 4 })


interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Universal topics that work for all courses
const universalTopics: SubQuestion[] = [
  {
    id: 'intro',
    title: 'Unit 0: Introduction',
    description: 'Core concepts and foundational knowledge essential for understanding the subject',
    category: 'Foundation'
  },
  {
    id: 'discrete-math',
    title: 'Unit 1: Discrete Math',
    description: 'Logical notation and combinatorics',
    category: 'Application'
  },
  {
    id: 'pseudocode',
    title: 'Unit 2: Pseudocode',
    description: 'Using pseudocode to support the analysis of algorithms and data structures',
    category: 'Analysis'
  },
  {
    id: 'recursion',
    title: 'Unit 3: Recursion',
    description: 'Intro to using recursive methods as opposed to iterative methods',
    category: 'Recursion'
  },
  {
    id: 'proofs',
    title: 'Unit 4: Proofs',
    description: 'Write proofs by various methods such as induction and contradiction',
    category: 'Proofs'
  },
  {
    id: 'asymptotic-analysis',
    title: 'Unit 5: Asymptotic Analysis',
    description: 'Methods for analyzing the theoretical runtimes of algorithms',
    category: 'Time Complexity'
  },
  {
    id: 'abstract-data-types',
    title: 'Unit 6: Abstract Data Types',
    description: 'A deeper look at data types and their use cases',
    category: 'Standards'
  },
  {
    id: 'course-material',
    title: 'Course Outline',
    description: 'Information about CSC225 itself (grade requirements, late policy, etc)',
    category: 'Tools'
  }
]

const emit = defineEmits<{
  courseSelected: [courseId: string]
}>()

const selectedCourse = ref<Course | null>(null)
const selectedTopic = ref<SubQuestion | null>(null)
const messages = ref<Message[]>([])
const topicMessages = ref<Message[]>([])
const currentMessage = ref('')
const currentTopicMessage = ref('')
const isTyping = ref(false)
const isTypingTopic = ref(false)

const availableTopics = computed(() => {
  // Always return the same 9 universal topics for all courses
  return universalTopics
})


function buildPromptWithConfig(base: string) {
  const coursePart = selectedCourse.value
    ? ` (course: ${selectedCourse.value.id})`
    : ''
  const hasExplicitN = /\bn=\d+\b/i.test(base)
  const nPart = hasExplicitN ? '' : ` n=${quizCfg.value.total}`
  const distro = ` Use exactly ${quizCfg.value.total} questions: ${quizCfg.value.mc} multiple-choice and ${quizCfg.value.sa} text-input.`

  return `${base}${coursePart}.${distro}${nPart}`.trim()
}

const selectCourse = (course: Course) => {
  selectedCourse.value = course
  emit('courseSelected', course.id)
}

const resetCourse = () => {
  selectedCourse.value = null
  selectedTopic.value = null
  messages.value = []
  topicMessages.value = []
  currentMessage.value = ''
  currentTopicMessage.value = ''
}

const selectTopic = (topic: SubQuestion) => {
  selectedTopic.value = topic
  topicMessages.value = []
  currentTopicMessage.value = ''
}

async function onQuizGenerate(cfg: { total: number; mc: number; sa: number }) {
  const base = currentMessage.value.trim() || `Create a quiz`
  const prompt = buildPromptWithConfig(base)
  quizStore.clear()
  quizStore.loading = true
  await navigateTo({ path: '/quizzler', query: { prompt } })
}


const generateQuizForTopic = async (topic: SubQuestion) => {
  if (!selectedCourse.value) return

  // natural prompt + config
  const base = `Create a quiz about ${topic.id}`
  const prompt = buildPromptWithConfig(base)

  // prepare store & redirect immediately so the quiz page shows loading
  quizStore.clear()
  quizStore.loading = true

  await navigateTo({
    path: '/quizzler',       // keep your route
    query: { prompt }        // quiz page will read ?prompt=... and call backend
  })
}

const sendMessage = async () => {
  const raw = currentMessage.value.trim()
  if (!raw || !selectedCourse.value) return

  // build prompt with config
  const prompt = buildPromptWithConfig(raw)

  // set loading and go to quiz page; it will call the API and show spinner
  quizStore.clear()
  quizStore.loading = true
  await navigateTo({ path: '/quizzler', query: { prompt } })
}


const sendTopicMessage = async () => {
  if (!currentTopicMessage.value.trim() || !selectedTopic.value) return

  const userMessage: Message = {
    id: Date.now().toString(),
    type: 'user',
    content: currentTopicMessage.value,
    timestamp: new Date()
  }
  topicMessages.value.push(userMessage)

  const messageContent = currentTopicMessage.value
  currentTopicMessage.value = ''

  isTypingTopic.value = true

  setTimeout(() => {
    isTypingTopic.value = false
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: `Great question about ${selectedTopic.value?.title}! "${messageContent}" is exactly the kind of topic we can explore in the context of ${selectedCourse.value?.id}. ${selectedTopic.value?.description} When you're ready, you can use the "Generate Quiz" button to create questions based on our discussion.`,
      timestamp: new Date()
    }
    topicMessages.value.push(aiMessage)
  }, 1500)
}
</script>