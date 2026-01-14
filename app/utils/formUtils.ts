import { Match, RawPlayerData } from '../lib/types';

export type FormResult = 'W' | 'D' | 'L';

/**
 * Parses a date string in dd/mm/yyyy format to a Date object.
 */
function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Extracts a player's last N match results in chronological order.
 * @param playerName - Name of the player
 * @param rawData - Raw player data from API
 * @param matches - Array of matches
 * @param count - Number of recent results to return
 * @returns Array of results ordered oldest to newest (last element is most recent)
 */
export function getPlayerRecentResults(
  playerName: string,
  rawData: RawPlayerData[],
  matches: Match[],
  count: number
): FormResult[] {
  // Find the player's raw data
  const playerData = rawData.find(p => p.Player === playerName);
  if (!playerData) {
    return [];
  }

  // Filter to non-abandoned matches and sort by date (oldest first)
  const sortedMatches = [...matches]
    .filter(m => !m.abandoned)
    .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());

  // Collect results for matches where player participated
  const results: FormResult[] = [];
  for (const match of sortedMatches) {
    const result = playerData[match.date];
    if (result === 'W') {
      results.push('W');
    } else if (result === 'L') {
      results.push('L');
    } else if (result === 'D1' || result === 'D2') {
      results.push('D');
    }
  }

  // Return last `count` results (most recent), maintaining oldest-to-newest order
  return results.slice(-count);
}
