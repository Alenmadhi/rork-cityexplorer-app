import { Weather } from '@/types';
import { mockWeather } from '@/mocks/weather';

// Simulated API call to fetch weather data
export async function fetchWeather(): Promise<Weather> {
  // In a real app, this would be an actual API call
  // For now, we'll simulate a network request with a delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful API response with 80% probability
      if (Math.random() > 0.2) {
        // Return mock data with current timestamp
        const currentWeather = {
          ...mockWeather,
          lastUpdated: new Date().toISOString()
        };
        resolve(currentWeather);
      } else {
        // Simulate API error
        reject(new Error('Failed to fetch weather data'));
      }
    }, 1000);
  });
}