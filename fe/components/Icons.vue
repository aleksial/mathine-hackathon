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
    <template v-else-if="name === 'Plus'">
      <path d="M5 12h14"/>
      <path d="M12 5v14"/>
    </template>
    <template v-else-if="name === 'Check'">
      <path d="M20 6 9 17l-5-5"/>
    </template>
    <template v-else-if="name === 'Send'">
      <path d="m22 2-7 20-4-9-9-4Z"/>
      <path d="M22 2 11 13"/>
    </template>
    <template v-else-if="name === 'Zap'">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
    </template>
    <template v-else-if="name === 'BookOpen'">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </template>
    <template v-else-if="name === 'GraduationCap'">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
      <path d="M22 10v6"/>
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
    </template>
    <template v-else-if="name === 'Book'">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
    </template>
    <template v-else-if="name === 'User'">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </template>
    <template v-else-if="name === 'Settings'">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
    </template>
    <template v-else-if="name === 'Home'">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </template>
    <template v-else-if="name === 'Search'">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </template>
    <template v-else-if="name === 'Menu'">
      <line x1="4" y1="6" x2="20" y2="6"/>
      <line x1="4" y1="12" x2="20" y2="12"/>
      <line x1="4" y1="18" x2="20" y2="18"/>
    </template>
    <template v-else-if="name === 'Calendar'">
      <path d="M8 2v4"/>
      <path d="M16 2v4"/>
      <rect width="18" height="18" x="3" y="4" rx="2"/>
      <path d="M3 10h18"/>
    </template>
    <template v-else-if="name === 'Clock'">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </template>
    <template v-else-if="name === 'Eye'">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </template>
    <template v-else-if="name === 'EyeOff'">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
      <line x1="2" y1="2" x2="22" y2="22"/>
    </template>
    <template v-else-if="name === 'Edit'">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </template>
    <template v-else-if="name === 'Trash2'">
      <path d="M3 6h18"/>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
    </template>
    <template v-else-if="name === 'Download'">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </template>
    <template v-else-if="name === 'Copy'">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </template>
    <template v-else-if="name === 'Star'">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
    </template>
    <template v-else-if="name === 'Loader2'">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </template>
    <template v-else-if="name === 'RefreshCw'">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
      <path d="M8 16H3v5"/>
    </template>
    <template v-else-if="name === 'Save'">
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/>
      <path d="M7 3v4a1 1 0 0 0 1 1h8"/>
    </template>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: 'FileText' | 'Upload' | 'X' | 'CheckCircle2' | 'AlertCircle' | 'ChevronLeft' | 'ChevronRight' | 
        'Plus' | 'Check' | 'Send' | 'Zap' | 'BookOpen' | 'GraduationCap' | 'Book' | 'User' | 'Settings' | 
        'Home' | 'Search' | 'Menu' | 'Calendar' | 'Clock' | 'Eye' | 'EyeOff' | 'Edit' | 'Trash2' | 
        'Download' | 'Copy' | 'Star' | 'Loader2' | 'RefreshCw' | 'Save'
  size?: number
  className?: string
}>()

const size = props.size || 24
const viewBox = '0 0 24 24'
</script>