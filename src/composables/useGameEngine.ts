import { shuffle } from '@/utils/shuffle'
import { ref, type Ref } from 'vue'
import type { THRConfig } from '@/types/thr.types'

const lastDrawnNominal = ref<number | null>(null)

export function useGameEngine(config: Ref<THRConfig>) {
  const drawNominal = (): number => {
    if (config.value.nominals.length === 0) {
      return 0
    }

    // Initialize or reshuffle queue if empty
    if (config.value.queue.length === 0) {
      let newQueue = shuffle([...config.value.nominals])
      
      // Prevent the first element of the new queue from being the same as the last drawn
      // if there are other options available
      if (newQueue.length > 1 && newQueue[0] === lastDrawnNominal.value) {
        // Find a different value to swap with the first element
        const swapIndex = newQueue.findIndex((v: number) => v !== lastDrawnNominal.value)
        if (swapIndex !== -1) {
          [newQueue[0], newQueue[swapIndex]] = [newQueue[swapIndex], newQueue[0]]
        }
      }
      config.value.queue = newQueue
    }

    // Attempt to avoid back-to-back repeats from the current queue
    // (Only if the queue has enough variety)
    if (config.value.queue.length > 1 && config.value.queue[0] === lastDrawnNominal.value) {
        const nextDifferentIndex = config.value.queue.findIndex((v: number) => v !== lastDrawnNominal.value)
        if (nextDifferentIndex !== -1 && nextDifferentIndex < 3) { // Only peek a bit ahead
            // Swap to the front
            const [val] = config.value.queue.splice(nextDifferentIndex, 1)
            config.value.queue.unshift(val)
        }
    }

    const drawn = config.value.queue.shift()!
    lastDrawnNominal.value = drawn
    return drawn
  }

  return { drawNominal }
}
