import { useStorage } from '@vueuse/core'
import type { THRConfig, GameType } from '@/types/thr.types'

const defaultConfig: THRConfig = {
  nominals: [],
  activeGame: 'kocok-amplop',
  queue: [],
  history: [],
  createdAt: new Date().toISOString(),
}

export function useTHRStore() {
  const config = useStorage<THRConfig>('thr_config', defaultConfig)

  const updateNominals = (nominals: number[]) => {
    config.value.nominals = nominals
    config.value.queue = [] // reset queue agar shuffle ulang
  }

  const switchGame = (game: GameType) => {
    config.value.activeGame = game
  }

  return { config, updateNominals, switchGame }
}
