import { Weather, Event, NewsItem, Shop } from '@/types';
import { mockWeather } from '@/mocks/weather';
import { events as mockEvents } from '@/mocks/events';
import { news as mockNews } from '@/mocks/news';
import { shops as mockShops } from '@/mocks/shops';

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

// Simulated API call to fetch events data
export async function fetchEvents(): Promise<Event[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful API response with 80% probability
      if (Math.random() > 0.2) {
        resolve(mockEvents);
      } else {
        // Simulate API error
        reject(new Error('Failed to fetch events data'));
      }
    }, 800);
  });
}

// Simulated API call to fetch news data
export async function fetchNews(): Promise<NewsItem[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful API response with 80% probability
      if (Math.random() > 0.2) {
        resolve(mockNews);
      } else {
        // Simulate API error
        reject(new Error('Failed to fetch news data'));
      }
    }, 800);
  });
}

// Simulated API call to fetch shops data
export async function fetchShops(): Promise<Shop[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful API response with 80% probability
      if (Math.random() > 0.2) {
        resolve(mockShops);
      } else {
        // Simulate API error
        reject(new Error('Failed to fetch shops data'));
      }
    }, 800);
  });
}