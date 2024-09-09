import { FootballData, RawPlayerData } from './types';

const API_URL = 'https://sheetdb.io/api/v1/l5soyy61olxh3';

// Import the raw data
import { rawData } from './rawData';

// Import the data processing functions
import { processRawData } from './dataProcessing';

export async function fetchFootballData(): Promise<FootballData> {
  const seedData = false;
  // if (process.env.NODE_ENV === 'development') {
  if (seedData) {
    // Use local data in development mode
    console.log('Using local data');
    return processRawData(rawData);
  } else {
    // Fetch data from API in production mode
    try {
      console.log('Using live data');
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: RawPlayerData[] = await response.json();
      return processRawData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to local data if API fetch fails
      return processRawData(rawData);
    }
  }
}