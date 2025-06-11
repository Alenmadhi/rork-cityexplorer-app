import { Weather } from '@/types';

export const mockWeather: Weather = {
  location: 'Elbasan, Albania',
  temperature: 28,
  condition: 'Sunny',
  icon: 'sun',
  windSpeed: 12,
  humidity: 45,
  lastUpdated: new Date().toISOString(),
  forecast: [
    {
      day: 'Today',
      icon: 'sun',
      temperature: {
        min: 22,
        max: 30
      }
    },
    {
      day: 'Tomorrow',
      icon: 'cloud-sun',
      temperature: {
        min: 20,
        max: 28
      }
    },
    {
      day: 'Wed',
      icon: 'cloud',
      temperature: {
        min: 19,
        max: 26
      }
    },
    {
      day: 'Thu',
      icon: 'cloud-rain',
      temperature: {
        min: 18,
        max: 24
      }
    }
  ]
};