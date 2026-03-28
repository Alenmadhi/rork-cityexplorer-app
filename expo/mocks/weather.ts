import { Weather } from '@/types';

export const mockWeather: Weather = {
  location: 'Elbasan, Albania',
  temperature: 24,
  condition: 'Partly Cloudy',
  icon: 'cloud-sun',
  windSpeed: 12,
  humidity: 65,
  lastUpdated: new Date().toISOString(),
  forecast: [
    {
      day: 'Today',
      icon: 'cloud-sun',
      temperature: {
        min: 18,
        max: 26
      }
    },
    {
      day: 'Thu',
      icon: 'sun',
      temperature: {
        min: 20,
        max: 28
      }
    },
    {
      day: 'Fri',
      icon: 'sun',
      temperature: {
        min: 21,
        max: 30
      }
    },
    {
      day: 'Sat',
      icon: 'cloud',
      temperature: {
        min: 19,
        max: 27
      }
    },
    {
      day: 'Sun',
      icon: 'cloud-rain',
      temperature: {
        min: 17,
        max: 24
      }
    }
  ]
};