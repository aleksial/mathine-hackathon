<template>
  <div class="h-screen flex bg-background overflow-hidden">
    <!-- Left Side - AI Assistant (wider) -->
    <div class="flex-1 border-r border-border">
      <Prompter @course-selected="handleCourseSelected" />
    </div>

    <!-- Right Side - Document Upload (narrower) -->
    <div class="w-96 flex-shrink-0">
      <PDFUploader 
        :show-upload="showUpload" 
        :selected-course="selectedCourse"
        @upload-status-change="handleUploadStatusChange" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: false
})

const selectedCourse = ref<string | null>(null)
const showUpload = ref(false)
const allDocumentsUploaded = ref(false)

const handleCourseSelected = (course: string) => {
  selectedCourse.value = course
  showUpload.value = true
}

const handleUploadStatusChange = (allUploaded: boolean) => {
  allDocumentsUploaded.value = allUploaded
}
</script>