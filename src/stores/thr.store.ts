import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTHRGameStore = defineStore('thr-game', () => {
  const isPlaying = ref(false)
  const currentNominal = ref<number | null>(null)
  const isRevealed = ref(false)

  const startRound = (nominal: number) => {
    currentNominal.value = nominal
    isPlaying.value = true
    isRevealed.value = false
  }

  const reveal = () => {
    isRevealed.value = true
  }

  const reset = () => {
    isPlaying.value = false
    currentNominal.value = null
    isRevealed.value = false
  }

  return { isPlaying, currentNominal, isRevealed, startRound, reveal, reset }
})
