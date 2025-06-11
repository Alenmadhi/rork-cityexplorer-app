import { Weather } from '@/types';

// Mock weather data for Elbasan, Albania
export const mockWeather: Weather = {
  temperature: 28,
  condition: 'Sunny',
  icon: 'sun',
  humidity: 45,
  windSpeed: 6,
  location: 'Elbasan, Albania',
  forecast: [
    {
      day: 'Today',
      temperature: { min: 22, max: 32 },
      condition: 'Sunny',
      icon: 'sun'
    },
    {
      day: 'Tomorrow',
      temperature: { min: 21, max: 30 },
      condition: 'Partly Cloudy',
      icon: 'cloud-sun'
    },
    {
      day: 'Wednesday',
      temperature: { min: 20, max: 29 },
      condition: 'Sunny',
      icon: 'sun'
    }
  ],
  lastUpdated: new Date().toISOString()
};

// Export for backward compatibility
export const weatherData = mockWeather;