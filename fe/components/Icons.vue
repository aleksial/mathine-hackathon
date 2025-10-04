<!-- filepath: fe/components/Icons.vue -->
<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="viewBox"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="className"
  >
    <template v-if="name === 'FileText'">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14,2 14,8 20,8"/>
      <path d="M10,9 16,9"/>
      <path d="M10,13 16,13"/>
      <path d="M10,17 12,17"/>
    </template>
    <template v-else-if="name === 'Upload'">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17,8 12,3 7,8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </template>
    <template v-else-if="name === 'X'">
      <path d="m18 6-12 12"/>
      <path d="m6 6 12 12"/>
    </template>
    <template v-else-if="name === 'CheckCircle2'">
      <circle cx="12" cy="12" r="10"/>
      <path d="m9 12 2 2 4-4"/>
    </template>
    <template v-else-if="name === 'AlertCircle'">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <path d="m12 16 .01 0"/>
    </template>
    <template v-else-if="name === 'ChevronLeft'">
      <path d="m15 18-6-6 6-6"/>
    </template>
    <template v-else-if="name === 'ChevronRight'">
      <path d="m9 18 6-6-6-6"/>
    </template>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: 'FileText' | 'Upload' | 'X' | 'CheckCircle2' | 'AlertCircle' | 'ChevronLeft' | 'ChevronRight'
  size?: number
  className?: string
}>()

const size = props.size || 24
const viewBox = '0 0 24 24'
</script>