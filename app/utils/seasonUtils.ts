import { Match, RawPlayerData, ProcessedPlayer } from '../lib/types';

/**
 * Extracts unique calendar years from match dates.
 * @param matches - Array of matches with dates in dd/mm/yyyy format
 * @returns Array of years sorted descending (most recent first)
 */
export function getAvailableSeasons(matches: Match[]): number[] {
  const years = new Set<number>();

  for (const match of matches) {
    if (match.date && !match.abandoned) {
      const parts = match.date.split('/');
      if (parts.length === 3) {
        const year = parseInt(parts[2], 10);
        if (!isNaN(year)) {
          years.add(year);
        }
      }
    }
  }

  return Array.from(years).sort((a, b) => b - a);
}

/**
 * Filters matches by calendar year.
 * @param matches - Array of matches with dates in dd/mm/yyyy format
 * @param year - Calendar year to filter by, or null for all matches (All Time)
 * @returns Filtered array of matches
 */
export function filterMatchesBySeason(matches: Match[], year: number | null): Match[] {
  if (year === null) {
    return matches;
  }

  return matches.filter((match) => {
    if (!match.date || match.abandoned) {
      return false;
    }
    const parts = match.date.split('/');
    if (parts.length !== 3) {
      return false;
    }
    const matchYear = parseInt(parts[2], 10);
    return matchYear === year;
  });
}

/**
 * Calculates age from date of birth string.
 */
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

/**
 * Gets zodiac star sign from date of birth.
 */
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

/**
 * Calculates player statistics from a subset of matches.
 * @param rawData - Raw player data from API
 * @param matches - Filtered matches to calculate stats from
 * @returns Array of ProcessedPlayer with stats based on provided matches
 */
export function calculatePlayerStatsFromMatches(
  rawData: RawPlayerData[],
  matches: Match[]
): ProcessedPlayer[] {
  const matchDates = new Set(matches.map(m => m.date));
  const processedPlayers: ProcessedPlayer[] = [];

  rawData.forEach((item) => {
    if (item.Player === "Total Players" || item.Player === "Goal Difference" || item.Player === "Who Picked Teams") {
      return;
    }

    let wins = 0;
    let draws = 0;
    let losses = 0;
    let gamesPlayed = 0;

    // Iterate through filtered match dates and count results
    for (const date of Array.from(matchDates)) {
      const result = item[date];
      if (result === 'W') {
        wins++;
        gamesPlayed++;
      } else if (result === 'L') {
        losses++;
        gamesPlayed++;
      } else if (result === 'D1' || result === 'D2') {
        draws++;
        gamesPlayed++;
      }
    }

    const totalPoints = wins * 3 + draws;
    const pointsPerGame = gamesPlayed > 0 ? totalPoints / gamesPlayed : 0;

    processedPlayers.push({
      Player: item.Player,
      DOB: item.DOB || null,
      Age: calculateAge(item.DOB),
      GamesPlayed: gamesPlayed,
      Wins: wins,
      Draws: draws,
      Losses: losses,
      TotalPoints: totalPoints,
      PointsPerGame: Math.round(pointsPerGame * 100) / 100,
      StarSign: getStarSign(item.DOB)
    });
  });

  return processedPlayers;
}
