export interface Player {
  id: string
  name: string
  age: number
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
  [playerName: string]: {
    'Points per game': string
    // ... other player stats
  } | string | string[] // to account for other properties
}

export interface FootballData {
  players: Player[]
  matches: Match[]
}