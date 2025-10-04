<template>
  <div class="fixed inset-0 z-40 flex items-center justify-center bg-background/70 backdrop-blur-sm">
    <div class="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow">
      <!-- spinner -->
      <svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
      </svg>
      <div class="text-sm">
        <p class="font-medium text-foreground">{{ message }}</p>
        <p class="text-xs text-muted-foreground" v-if="sub">
          {{ sub }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  message?: string
  sub?: string
}>(), {
  message: "Generating your quiz…",
  sub: "Fetching course material and composing questions. This can take a bit.",
})
</script>
