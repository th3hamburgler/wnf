export interface Player {
  id: string
  name: string
  played: number
  won: number
  drawn: number
  lost: number
  points: number
  pointsPerGame: number
}

export interface Match {
  id: string
  date: string
  teamA: string[]
  teamB: string[]
  score: string
}

export interface FootballData {
  players: Player[]
  matches: Match[]
}