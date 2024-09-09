import { ProcessedPlayer } from "../lib/types";

export const getPlayerStats = (players: ProcessedPlayer[], playerName: string) => {
  return players.find((player) => player.Player === playerName);
};

export const sortPlayersByPPG = (players: ProcessedPlayer[], playerNames: string[]) => {
  return playerNames
    .map((name) => {
      const stats = getPlayerStats(players, name);
      return { name, ppg: stats ? stats.PointsPerGame : 0 };
    })
    .sort((a, b) => b.ppg - a.ppg)
    .map((player) => player.name);
};

export const getPPGVariant = (ppg: number): "destructive" | "default" | "secondary" | "outline" => {
  if (ppg >= 0 && ppg < 1) return "destructive";
  if (ppg >= 1 && ppg < 2) return "secondary";
  if (ppg >= 2 && ppg <= 3) return "default";
  return "outline";
};

export const getPPGColor = (ppg: number) => {
  if (ppg >= 0 && ppg < 1) return "bg-red-500 text-white";
  if (ppg >= 1 && ppg < 2) return "bg-wheat-500 text-white";
  if (ppg >= 2 && ppg <= 3) return "bg-green-500 text-white";
  return "bg-gray-500 text-white";
};

export const calculateTeamStats = (players: ProcessedPlayer[], teamPlayers: string[]) => {
  const teamStats = teamPlayers.reduce(
    (acc, playerName) => {
      const playerStats = getPlayerStats(players, playerName);
      if (playerStats) {
        acc.totalPPG += playerStats.PointsPerGame;
        acc.totalWNF += playerStats.TotalPoints;
        acc.totalAge += playerStats.Age || 0;
        acc.playerCount++;
      }
      return acc;
    },
    { totalPPG: 0, totalWNF: 0, totalAge: 0, playerCount: 0 }
  );

  return {
    averagePPG: teamStats.totalPPG / teamStats.playerCount || 0,
    totalWNF: teamStats.totalWNF,
    averageAge: teamStats.totalAge / teamStats.playerCount || 0,
  };
};

export const getTeamNames = (goalDifference: number) => {
  if (goalDifference > 0) {
    return { teamA: "Winners", teamB: "Losers" };
  } else if (goalDifference < 0) {
    return { teamA: "Losers", teamB: "Winners" };
  } else {
    return { teamA: "Draw", teamB: "Draw" };
  }
};