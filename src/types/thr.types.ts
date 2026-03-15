export type GameType = 'kocok-amplop' | 'buka-kartu'

export interface PlayRecord {
  nominal: number
  game: GameType
  playedAt: string
}

export interface THRConfig {
  nominals: number[]
  activeGame: GameType
  queue: number[]
  history: PlayRecord[]
  createdAt: string
}

export interface GameState {
  isPlaying: boolean
  isRevealed: boolean
  currentNominal: number | null
}
