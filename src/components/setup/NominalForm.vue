<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits<{
  (e: 'add', nominal: number): void
}>()

const rawInput = ref('')
const error = ref('')

const formattedInput = computed({
  get: () => {
    if (!rawInput.value) return ''
    const num = parseInt(rawInput.value.replace(/\D/g, ''), 10)
    if (isNaN(num)) return ''
    return new Intl.NumberFormat('id-ID').format(num)
  },
  set: (val) => {
    rawInput.value = val.replace(/\D/g, '')
    if (error.value) error.value = ''
  }
})

const submit = () => {
  const nominal = parseInt(rawInput.value, 10)
  if (isNaN(nominal) || nominal <= 0) {
    error.value = 'Mohon masukkan nominal yang sah (contoh: 50.000)'
    return
  }
  emit('add', nominal)
  rawInput.value = ''
}
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col gap-2">
    <div class="flex gap-2">
      <div class="relative flex-1 group">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">Rp</span>
        <input
          v-model="formattedInput"
          type="text"
          placeholder="50.000"
          maxlength="15"
          class="flex h-10 w-full rounded-md border border-input bg-background/50 backdrop-blur px-3 py-2 pl-[34px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-medium"
        />
      </div>
      <button 
        type="submit" 
        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 hover:scale-105 active:scale-95"
        :disabled="!rawInput">
        Tambah
      </button>
    </div>
    <p v-if="error" class="text-xs text-destructive font-medium">{{ error }}</p>
  </form>
</template>
