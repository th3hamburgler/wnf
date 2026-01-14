import { Match } from '../lib/types';

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
