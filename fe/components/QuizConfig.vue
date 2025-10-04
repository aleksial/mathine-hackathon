<template>
  <div class="rounded-lg border border-border bg-card p-4 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-semibold text-foreground">Quiz Settings</h3>
      <button
        class="text-xs px-2 py-1 rounded border border-border hover:bg-accent disabled:opacity-50"
        @click="reset"
        :disabled="busy"
      >
        Reset
      </button>
    </div>

    <!-- Total questions -->
    <div class="space-y-1">
      <label class="text-xs text-muted-foreground">Total Questions</label>
      <div class="flex items-center gap-2">
        <input
          type="range"
          min="2"
          :max="maxTotal"
          v-model.number="local.total"
          :disabled="busy"
          class="w-full"
        />
        <input
          type="number"
          min="2"
          :max="maxTotal"
          v-model.number="local.total"
          :disabled="busy"
          class="w-20 px-2 py-1 border border-input rounded bg-background text-sm"
        />
      </div>
    </div>

    <!-- Distribution -->
    <div class="grid grid-cols-2 gap-3">
      <div class="space-y-1">
        <label class="text-xs text-muted-foreground">Multiple-Choice</label>
        <div class="flex items-center gap-2">
          <input
            type="range"
            min="0"
            :max="local.total"
            v-model.number="local.mc"
            :disabled="busy"
            class="w-full"
          />
          <input
            type="number"
            min="0"
            :max="local.total"
            v-model.number="local.mc"
            :disabled="busy"
            class="w-20 px-2 py-1 border border-input rounded bg-background text-sm"
          />
        </div>
        <p class="text-xs text-muted-foreground">
          {{ mcPercent }}% of total
        </p>
      </div>

      <div class="space-y-1">
        <label class="text-xs text-muted-foreground">Short Answer</label>
        <div class="flex items-center gap-2">
          <input
            type="number"
            min="0"
            :max="local.total"
            v-model.number="saManual"
            :disabled="busy"
            class="w-full px-2 py-1 border border-input rounded bg-background text-sm"
          />
          <span class="text-xs text-muted-foreground"> (= {{ local.sa }} )</span>
        </div>
        <p class="text-xs text-muted-foreground">
          Adjusting MC or SA will keep the sum equal to Total.
        </p>
      </div>
    </div>

    <!-- Validation hint -->
    <p v-if="error" class="text-xs text-red-600">
      {{ error }}
    </p>

    <!-- Actions -->
    <div class="flex items-center justify-between pt-1">
      <p class="text-xs text-muted-foreground">
        Total: <strong>{{ local.total }}</strong> • MC: <strong>{{ local.mc }}</strong> • SA: <strong>{{ local.sa }}</strong>
      </p>
      <button
        class="professor-button px-3 py-1.5 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!!error || busy"
        @click="emitGenerate"
      >
        Generate Quiz
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

/**
 * Props
 * - modelValue: optional v-model config { total, mc, sa }
 * - maxTotal: upper bound for total questions
 * - busy: disable inputs when a request is in-flight
 */
type Config = { total: number; mc: number; sa: number }

const props = withDefaults(defineProps<{
  modelValue?: Config
  maxTotal?: number
  busy?: boolean
}>(), {
  modelValue: () => ({ total: 10, mc: 6, sa: 4 }),
  maxTotal: 30,
  busy: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: Config): void
  (e: 'generate', v: Config): void
}>()

// local reactive copy that keeps mc + sa === total
const local = reactive<Config>({ ...props.modelValue })

// keep SA in sync automatically
watch(() => local.mc, (mc) => {
  if (mc < 0) local.mc = 0
  if (mc > local.total) local.mc = local.total
  local.sa = Math.max(0, local.total - local.mc)
})

watch(() => local.total, (t) => {
  if (t < 2) local.total = 2
  if (t > props.maxTotal) local.total = props.maxTotal
  if (local.mc > local.total) local.mc = local.total
  local.sa = Math.max(0, local.total - local.mc)
})

// expose manual SA entry that adjusts MC to keep sum fixed
const saManual = computed({
  get: () => local.sa,
  set: (val: number) => {
    const v = Math.min(Math.max(0, Math.floor(val || 0)), local.total)
    local.sa = v
    local.mc = local.total - v
  }
})

const mcPercent = computed(() =>
  Math.round((local.mc / Math.max(1, local.total)) * 100)
)

const error = computed(() => {
  if (local.total < 2) return 'Quiz must have at least 2 questions.'
  if (local.mc + local.sa !== local.total) return 'Distribution must equal total.'
  return ''
})

// v-model sync up
watch(local, () => {
  emit('update:modelValue', { ...local })
}, { deep: true })

function reset() {
  Object.assign(local, props.modelValue)
}

function emitGenerate() {
  if (!error.value) emit('generate', { ...local })
}
</script>
