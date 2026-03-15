<script setup lang="ts">
import { useTHRStore } from '@/composables/useTHRStore'
import { useGameEngine } from '@/composables/useGameEngine'
import { useTHRGameStore } from '@/stores/thr.store'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

import KocokAmplop from '@/components/games/KocokAmplop.vue'
import BukaKartu from '@/components/games/BukaKartu.vue'
import ResultModal from '@/components/shared/ResultModal.vue'

const router = useRouter()
const { config } = useTHRStore()
const { drawNominal } = useGameEngine(config)
const store = useTHRGameStore()

onMounted(() => {
  if (config.value.nominals.length === 0) {
    router.replace('/')
    return
  }
  startNewRound()
})

onUnmounted(() => {
  store.reset()
})

const startNewRound = () => {
  const nominal = drawNominal()
  store.startRound(nominal)
}

const handleNextRound = () => {
  store.reset()
  setTimeout(() => {
    startNewRound()
  }, 100)
}
</script>

<template>
  <main class="container py-8 min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
    
    <div v-if="config.nominals.length > 0" class="w-full flex-1 flex flex-col items-center justify-center animate-in fade-in duration-700">
      
      <!-- Tombol Kembali -->
      <button 
        @click="router.push('/')" 
        class="mb-6 flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border hover:bg-accent hover:text-accent-foreground transition-all active:scale-95 group shadow-sm hover:shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span class="text-sm font-bold">Kembali ke Halaman Utama</span>
      </button>

      <!-- Layout Game Area -->
      <div v-if="config.activeGame === 'kocok-amplop'" class="w-full relative z-10">
        <KocokAmplop :nominal="store.currentNominal || 0" />
      </div>
      
      <div v-else-if="config.activeGame === 'buka-kartu'" class="w-full relative z-10">
        <BukaKartu :nominal="store.currentNominal || 0" />
      </div>

    </div>

    <!-- Modal Hasil -->
    <ResultModal :nominal="store.currentNominal" @next="handleNextRound" />

  </main>
</template>
