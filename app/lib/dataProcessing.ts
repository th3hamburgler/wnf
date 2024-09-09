import { FootballData, RawPlayerData, Player, Match, ProcessedPlayer } from './types';

function calculateAge(dob: string | null): number | null {
  if (!dob) return null;
  const birthDate = new Date(dob.split('/').reverse().join('-'));
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function getStarSign(dob: string | null): string | null {
  if (!dob) return null;
  const [day, month] = dob.split('/').map(Number);
  const zodiacSigns = [
    { name: 'Capricorn', startDate: [12, 22], endDate: [1, 19] },
    { name: 'Aquarius', startDate: [1, 20], endDate: [2, 18] },
    { name: 'Pisces', startDate: [2, 19], endDate: [3, 20] },
    { name: 'Aries', startDate: [3, 21], endDate: [4, 19] },
    { name: 'Taurus', startDate: [4, 20], endDate: [5, 20] },
    { name: 'Gemini', startDate: [5, 21], endDate: [6, 20] },
    { name: 'Cancer', startDate: [6, 21], endDate: [7, 22] },
    { name: 'Leo', startDate: [7, 23], endDate: [8, 22] },
    { name: 'Virgo', startDate: [8, 23], endDate: [9, 22] },
    { name: 'Libra', startDate: [9, 23], endDate: [10, 22] },
    { name: 'Scorpio', startDate: [10, 23], endDate: [11, 21] },
    { name: 'Sagittarius', startDate: [11, 22], endDate: [12, 21] }
  ];

  for (const sign of zodiacSigns) {
    const [startMonth, startDay] = sign.startDate;
    const [endMonth, endDay] = sign.endDate;
    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay) ||
      (month > startMonth && month < endMonth)
    ) {
      return sign.name;
    }
  }
  return null;
}

export function processRawData(rawData: RawPlayerData[]): FootballData {
  const players: Player[] = [];
  const matches: Match[] = [];
  const processedPlayers: ProcessedPlayer[] = [];

  const datesToProcess = Object.keys(rawData[0]).filter(key => 
    key.match(/^\d{2}\/\d{2}\/\d{4}$/) && key !== 'DOB'
  );

  // Process players
  rawData.forEach((item, index) => {
    if (item.Player !== "Total Players" && item.Player !== "Goal Difference" && item.Player !== "Who Picked Teams") {
      const player: ProcessedPlayer = {
        Player: item.Player,
        DOB: item.DOB || null,
        Age: calculateAge(item.DOB),
        GamesPlayed: parseInt(item['Games Played']) || 0,
        Wins: parseInt(item['Wins']) || 0,
        Draws: parseInt(item['Draws']) || 0,
        Losses: parseInt(item['Losses']) || 0,
        TotalPoints: parseInt(item['Total points']) || 0,
        PointsPerGame: parseFloat(item['Points per game']) || 0,
        StarSign: getStarSign(item.DOB)
      };
      processedPlayers.push(player);

      players.push({
        id: index.toString(),
        name: item.Player,
        played: player.GamesPlayed,
        won: player.Wins,
        drawn: player.Draws,
        lost: player.Losses,
        points: player.TotalPoints,
        pointsPerGame: player.PointsPerGame,
        starSign: player.StarSign
      });
    }
  });

  // Process matches
  datesToProcess.forEach(date => {
    const teamA: string[] = [];
    const teamB: string[] = [];
    let actualPlayerCount = 0;
    let abandoned = true;

    rawData.forEach(item => {
      if (item.Player !== "Total Players" && item.Player !== "Goal Difference" && item.Player !== "Who Picked Teams") {
        if (item[date] === 'W' || item[date] === 'D1') {
          teamA.push(item.Player);
          actualPlayerCount++;
          abandoned = false;
        } else if (item[date] === 'L' || item[date] === 'D2') {
          teamB.push(item.Player);
          actualPlayerCount++;
          abandoned = false;
        }
      }
    });

    const goalDifferenceRow = rawData.find(row => row.Player === "Goal Difference");
    const whoPickedTeamsRow = rawData.find(row => row.Player === "Who Picked Teams");

    const match: Match = {
      id: date,
      date: date,
      teamA: teamA,
      teamB: teamB,
      TotalPlayers: actualPlayerCount,
      GoalDifference: goalDifferenceRow ? parseInt(goalDifferenceRow[date]) || 0 : 0,
      WhoPickedTeams: whoPickedTeamsRow ? whoPickedTeamsRow[date] : '',
      abandoned: abandoned
    };

    matches.push(match);
  });

  return {
    players: players,
    matches: matches,
    processedPlayers: processedPlayers,
    processedMatches: matches,
    rawData: rawData
  };
}