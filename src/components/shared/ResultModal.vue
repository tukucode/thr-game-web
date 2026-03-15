<script setup lang="ts">
import { useTHRGameStore } from '@/stores/thr.store'
import { formatRupiah } from '@/utils/currency'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const store = useTHRGameStore()

const props = defineProps<{
  nominal: number | null
}>()

const emit = defineEmits<{
  (e: 'next'): void
}>()

const show = computed(() => store.isRevealed)
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
    <div class="relative w-full max-w-sm mx-4 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 delay-500 fill-mode-both">
      
      <!-- Dekorasi cahaya di belakang -->
      <div class="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/20 blur-3xl rounded-full pointer-events-none"></div>
      <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full pointer-events-none"></div>

      <div class="flex flex-col items-center gap-3 relative z-10 text-center">
        <div class="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/40 border-4 border-amber-200 dark:border-amber-800 flex items-center justify-center mb-2 animate-bounce shadow-lg">
          <Icon icon="lucide:party-popper" class="w-10 h-10 text-amber-600 dark:text-amber-400" />
        </div>
        
        <h2 class="text-3xl font-extrabold tracking-tight text-foreground">Alhamdulillah!</h2>
        <p class="text-muted-foreground text-sm font-medium">Anda berhak mendapatkan THR senilai:</p>
        
        <div class="my-4 relative w-full group">
          <div class="absolute inset-0 bg-green-400/20 blur-xl group-hover:bg-green-400/30 transition-colors rounded-2xl"></div>
          <div class="relative py-5 px-6 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20 border-2 border-green-300/50 dark:border-green-800/50 rounded-2xl w-full shadow-inner flex justify-center items-center">
            <span class="text-3xl sm:text-4xl font-black text-green-700 dark:text-green-400 block tracking-tighter drop-shadow-sm">
              {{ props.nominal ? formatRupiah(props.nominal) : 'Rp 0' }}
            </span>
          </div>
        </div>
        
        <button 
          @click="emit('next')"
          class="w-full mt-4 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-lg font-bold text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] shadow-lg shadow-primary/25 border-b-4 border-primary-foreground/20 hover:border-b-[3px] hover:translate-y-[1px] active:border-b-0 active:translate-y-[4px]"
        >
          Lanjutkan Permainan <Icon icon="lucide:arrow-right" class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>
