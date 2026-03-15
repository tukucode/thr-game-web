import { shuffle } from '@/utils/shuffle'
import type { Ref } from 'vue'
import type { THRConfig } from '@/types/thr.types'

export function useGameEngine(config: Ref<THRConfig>) {
  const drawNominal = (): number => {
    if (config.value.nominals.length === 0) {
        return 0
    }
    // Jika queue kosong, shuffle ulang dari semua nominal
    if (config.value.queue.length === 0) {
      config.value.queue = shuffle([...config.value.nominals])
    }
    return config.value.queue.shift()!
  }

  return { drawNominal }
}
