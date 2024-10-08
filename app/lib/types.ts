export interface RawPlayerData {
  Player: string;
  DOB: string;
  [key: string]: string;
}

export interface ProcessedPlayer {
  Player: string;
  DOB: string | null;
  Age: number | null;
  GamesPlayed: number;
  Wins: number;
  Draws: number;
  Losses: number;
  TotalPoints: number;
  PointsPerGame: number;
  StarSign: string | null;
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
  starSign: string | null;
}

export interface Match {
  id: string;
  date: string;
  teamA: string[];
  teamB: string[];
  TotalPlayers: number;
  GoalDifference: number;
  WhoPickedTeams: string;
  abandoned: boolean;
}

export interface FootballData {
  players: Player[];
  matches: Match[];
  processedPlayers: ProcessedPlayer[];
  processedMatches: Match[];
  rawData: RawPlayerData[];
}