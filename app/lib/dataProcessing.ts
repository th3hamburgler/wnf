interface RawPlayerData {
    Player: string;
    DOB: string;
    [key: string]: string;
  }
  
  interface ProcessedPlayer {
    Player: string;
    DOB: string | null;
    GamesPlayed: number;
    Wins: number;
    Draws: number;
    Losses: number;
    TotalPoints: number;
    PointsPerGame: number;
  }
  
  interface Match {
    Date: string;
    TotalPlayers: number;
    GoalDifference: number;
    WhoPickedTeams: string;
    teamA: string[];
    teamB: string[];
  }
  
  export function processData(rawData: RawPlayerData[]): { Players: ProcessedPlayer[], Matches: Match[] } {
    const Players: ProcessedPlayer[] = [];
    const Matches: Match[] = [];
    const datesToProcess: string[] = [];
  
    // First pass: collect all valid dates
    rawData[0] && Object.keys(rawData[0]).forEach(key => {
      if (key.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        datesToProcess.push(key);
      }
    });
  
    // Process players
    rawData.forEach(row => {
      if (["Total Players", "Goal Difference", "Who Picked Teams"].includes(row.Player)) {
        return; // Skip these rows for player processing
      }
  
      Players.push({
        Player: row.Player,
        DOB: row.DOB || null,
        GamesPlayed: parseInt(row["Games Played"]) || 0,
        Wins: parseInt(row["Wins"]) || 0,
        Draws: parseInt(row["Draws"]) || 0,
        Losses: parseInt(row["Losses"]) || 0,
        TotalPoints: parseInt(row["Total points"]) || 0,
        PointsPerGame: parseFloat(row["Points per game"]) || 0
      });
    });
  
    // Process matches
    datesToProcess.forEach(date => {
      const totalPlayersRow = rawData.find(row => row.Player === "Total Players");
      const goalDifferenceRow = rawData.find(row => row.Player === "Goal Difference");
      const whoPickedTeamsRow = rawData.find(row => row.Player === "Who Picked Teams");
  
      if (!totalPlayersRow || !goalDifferenceRow || !whoPickedTeamsRow) return;
  
      const teamA: string[] = [];
      const teamB: string[] = [];
  
      rawData.forEach(row => {
        if (["Total Players", "Goal Difference", "Who Picked Teams"].includes(row.Player)) return;
        if (row[date] === "W" || row[date] === "D") {
          teamA.push(row.Player);
        } else if (row[date] === "L") {
          teamB.push(row.Player);
        }
      });
  
      // Randomly distribute players for draws
      if (teamA.length === teamB.length) {
        const allPlayers = [...teamA, ...teamB];
        teamA.length = 0;
        teamB.length = 0;
        allPlayers.sort(() => Math.random() - 0.5);
        teamA.push(...allPlayers.slice(0, allPlayers.length / 2));
        teamB.push(...allPlayers.slice(allPlayers.length / 2));
      }
  
      Matches.push({
        Date: date,
        TotalPlayers: parseInt(totalPlayersRow[date]) || 0,
        GoalDifference: parseInt(goalDifferenceRow[date]) || 0,
        WhoPickedTeams: whoPickedTeamsRow[date],
        teamA,
        teamB
      });
    });
  
    return { Players, Matches };
  }