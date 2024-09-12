import { FootballData, RawPlayerData } from './types';
import { processRawData } from './dataProcessing';

const API_URL = 'https://sheetdb.io/api/v1/l5soyy61olxh3';

export async function fetchFootballData(): Promise<FootballData> {
  console.log('Fetching data from:', API_URL);

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }
    const data: RawPlayerData[] = await response.json();
    console.log('Data fetched successfully:', data);
    return processRawData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}