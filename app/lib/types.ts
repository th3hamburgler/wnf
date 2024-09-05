export interface RawPlayerData {
  Player: string;
  DOB: string;
  [key: string]: string;
}

export interface ProcessedPlayer {
  Player: string;
  DOB: string | null;
  GamesPlayed: number;
  Wins: number;
  Draws: number;
  Losses: number;
  TotalPoints: number;
  PointsPerGame: number;
}

export interface Player {
  id: string;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  pointsPerGame: number;
}

export interface Match {
  id: string;
  date: string;
  teamA: string[];
  teamB: string[];
  score: string;
  TotalPlayers?: number;
  GoalDifference?: number;
  WhoPickedTeams?: string;
}

export interface FootballData {
  players: Player[];
  matches: Match[];
  processedPlayers: ProcessedPlayer[];
  processedMatches: Match[];
  rawData: RawPlayerData[]; // Add this line
}