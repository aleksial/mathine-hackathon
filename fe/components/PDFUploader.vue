<template>
  <div class="h-full flex flex-col bg-background border-l border-border">
    <!-- Header -->
    <div class="p-4 border-b border-border flex-shrink-0">
      <h2 class="text-lg font-bold text-foreground mb-1">Course Materials</h2>
      <p class="text-xs text-muted-foreground">
        {{ selectedCourse ? `Upload additional course materials for ${selectedCourse}` : 'Select a course first' }}
      </p>
    </div>

    <!-- Content -->
    <div v-if="!showUpload" class="flex-1 flex items-center justify-center p-4">
      <div class="text-center">
        <div class="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
          <Icons name="FileText" :size="24" class="text-muted-foreground" />
        </div>
        <h3 class="text-sm font-semibold text-muted-foreground mb-2">Select Course First</h3>
        <p class="text-xs text-muted-foreground leading-relaxed">
          Choose your course on the left to enable material uploads
        </p>
      </div>
    </div>

    <div v-else class="flex-1 flex flex-col">
      <!-- Upload Area - Scrollable -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <!-- Upload Zone -->
        <div
          @dragover.prevent="handleDragOver"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleDrop"
          :class="cn(
            'border-2 border-dashed rounded-lg transition-all duration-300 ease-in-out',
            isDragging
              ? 'border-primary bg-primary/5 scale-[1.02] shadow-lg'
              : 'border-border hover:border-primary/50 hover:bg-muted/30',
            error && 'border-destructive bg-destructive/5'
          )"
        >
          <div class="p-4 space-y-3">
            <div class="flex flex-col items-center gap-2 text-center">
              <div class="relative">
                <div class="absolute inset-0 bg-primary/10 rounded-full blur-lg" />
                <div class="relative bg-primary/10 p-2 rounded-full">
                  <Icons name="Upload" :size="24" class="text-primary" />
                </div>
              </div>

              <div class="space-y-1">
                <p class="text-sm font-semibold text-foreground">Drop course materials here</p>
                <p class="text-xs text-muted-foreground">Syllabi, lecture notes, textbooks, etc.</p>
              </div>

              <button
                @click="() => fileInputRef?.click()"
                class="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2 text-xs shadow-md hover:shadow-lg transition-all duration-200 rounded-lg"
              >
                <Icons name="Plus" :size="14" class="mr-1 inline" />
                Add Materials
              </button>

              <input
                ref="fileInputRef"
                type="file"
                accept=".pdf,application/pdf"
                multiple
                @change="handleFileInput"
                class="hidden"
              />

              <p class="text-xs text-muted-foreground">PDF format • Max 10MB per file</p>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div
          v-if="error"
          class="flex items-center gap-2 p-3 border border-destructive bg-destructive/10 rounded-lg"
        >
          <Icons name="AlertCircle" :size="14" class="text-destructive flex-shrink-0" />
          <p class="text-destructive font-medium text-xs">{{ error }}</p>
        </div>

        <!-- Files List -->
        <div v-if="files.length > 0" class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-foreground">Materials ({{ files.length }})</h3>
            <button
              @click="clearAllFiles"
              class="text-xs text-destructive hover:text-destructive/80 font-medium"
            >
              Clear All
            </button>
          </div>
          
          <div class="space-y-2">
            <div
              v-for="(file, index) in files"
              :key="file.id"
              class="border border-border rounded-lg bg-card p-3 space-y-2"
            >
              <!-- File Info -->
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-start gap-2 flex-1 min-w-0">
                  <div class="bg-primary/10 p-1.5 rounded flex-shrink-0">
                    <Icons name="FileText" :size="16" class="text-primary" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-xs text-foreground truncate" :title="file.name">{{ file.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ formatFileSize(file.size) }}</p>
                  </div>
                </div>
                <button
                  v-if="!file.isUploading"
                  @click="removeFile(index)"
                  class="flex-shrink-0 p-0.5 hover:bg-destructive/10 hover:text-destructive transition-colors rounded"
                >
                  <Icons name="X" :size="12" />
                </button>
              </div>

              <!-- Upload Progress -->
              <div v-if="file.isUploading || file.uploadComplete" class="space-y-1">
                <div class="flex justify-between items-center text-xs font-medium">
                  <span class="text-foreground">{{ file.uploadComplete ? 'Complete' : 'Uploading...' }}</span>
                  <span class="text-primary font-semibold">{{ file.uploadProgress }}%</span>
                </div>
                <div class="h-1 bg-secondary rounded-full overflow-hidden">
                  <div
                    class="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                    :style="{ width: `${file.uploadProgress}%` }"
                  />
                </div>
              </div>

              <!-- Success Indicator -->
              <div
                v-if="file.uploadComplete"
                class="flex items-center gap-1.5 text-xs text-green-400 bg-green-950/50 border border-green-800 rounded p-1.5"
              >
                <Icons name="CheckCircle2" :size="10" class="text-green-400" />
                <span>Material uploaded successfully</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fixed Bottom Actions -->
      <div class="flex-shrink-0 border-t border-border p-4 space-y-3">
        <!-- Upload All Button -->
        <div v-if="hasUnuploadedFiles">
          <button
            @click="uploadAllFiles"
            :disabled="isUploadingAny"
            class="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-xs py-2.5 px-3 shadow-md hover:shadow-lg transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Icons name="Upload" :size="14" />
            <span v-if="isUploadingAny">Uploading... ({{ uploadingCount }}/{{ files.length }})</span>
            <span v-else>Upload All Materials ({{ unuploadedCount }})</span>
          </button>
        </div>

        <!-- All Uploaded Status -->
        <div v-else-if="files.length > 0 && allUploaded">
          <div class="flex items-center justify-center gap-2 text-green-400 bg-green-950/50 border border-green-800 rounded-lg p-2">
            <Icons name="CheckCircle2" :size="14" class="text-green-400" />
            <span class="font-medium text-xs">All materials uploaded!</span>
          </div>
        </div>

        <!-- Info -->
        <div class="bg-muted/50 rounded-lg p-2">
          <h4 class="font-semibold text-foreground text-xs mb-1">Material Requirements</h4>
          <ul class="space-y-0.5 text-xs text-muted-foreground">
            <li class="flex items-center gap-1.5">
              <div class="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
              <span>PDF format only</span>
            </li>
            <li class="flex items-center gap-1.5">
              <div class="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
              <span>10 MB max per file</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { cn } from '@/utils/cn'

interface UploadFile {
  id: string
  file: File
  name: string
  size: number
  uploadProgress: number
  isUploading: boolean
  uploadComplete: boolean
}

interface Props {
  showUpload: boolean
  selectedCourse: string | null
}

defineProps<Props>()

const emit = defineEmits<{
  uploadStatusChange: [allUploaded: boolean]
}>()

// State
const files = ref<UploadFile[]>([])
const isDragging = ref(false)
const error = ref<string | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

// Computed (same as before)
const hasUnuploadedFiles = computed(() => 
  files.value.some(f => !f.isUploading && !f.uploadComplete)
)

const isUploadingAny = computed(() => 
  files.value.some(f => f.isUploading)
)

const allUploaded = computed(() => 
  files.value.length > 0 && files.value.every(f => f.uploadComplete)
)

const unuploadedCount = computed(() => 
  files.value.filter(f => !f.isUploading && !f.uploadComplete).length
)

const uploadingCount = computed(() => 
  files.value.filter(f => f.isUploading || f.uploadComplete).length
)

// Watch for upload status changes
watch(allUploaded, (newValue) => {
  emit('uploadStatusChange', newValue)
})

// Methods (same as before - keeping the implementation)
const validateFile = (file: File): boolean => {
  if (file.type !== 'application/pdf') {
    error.value = 'Only PDF files are allowed'
    return false
  }
  if (file.size > 10 * 1024 * 1024) {
    error.value = 'File size must be less than 10MB'
    return false
  }
  error.value = null
  return true
}

const createUploadFile = (file: File): UploadFile => {
  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    file,
    name: file.name,
    size: file.size,
    uploadProgress: 0,
    isUploading: false,
    uploadComplete: false
  }
}

const handleFiles = (selectedFiles: File[]) => {
  const validFiles: UploadFile[] = []
  
  for (const file of selectedFiles) {
    const existsIndex = files.value.findIndex(f => f.name === file.name && f.size === file.size)
    if (existsIndex !== -1) {
      continue
    }
    
    if (validateFile(file)) {
      validFiles.push(createUploadFile(file))
    }
  }
  
  if (validFiles.length > 0) {
    files.value.push(...validFiles)
  }
}

const handleDragOver = () => {
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  const droppedFiles = Array.from(e.dataTransfer?.files || [])
  if (droppedFiles.length > 0) {
    handleFiles(droppedFiles)
  }
}

const handleFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const selectedFiles = Array.from(target.files || [])
  if (selectedFiles.length > 0) {
    handleFiles(selectedFiles)
  }
  target.value = ''
}

const simulateUpload = (uploadFile: UploadFile) => {
  uploadFile.isUploading = true
  uploadFile.uploadProgress = 0

  const interval = setInterval(() => {
    uploadFile.uploadProgress += Math.random() * 15 + 5
    if (uploadFile.uploadProgress >= 100) {
      uploadFile.uploadProgress = 100
      clearInterval(interval)
      uploadFile.isUploading = false
      uploadFile.uploadComplete = true
    }
  }, 300)
}

const uploadAllFiles = () => {
  files.value.forEach((file, index) => {
    if (!file.isUploading && !file.uploadComplete) {
      setTimeout(() => {
        simulateUpload(file)
      }, index * 100)
    }
  })
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}

const clearAllFiles = () => {
  files.value = []
  error.value = null
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
</script>