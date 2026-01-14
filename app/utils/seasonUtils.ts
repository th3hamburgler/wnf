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
