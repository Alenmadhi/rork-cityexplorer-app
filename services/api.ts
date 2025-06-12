import { Weather, Event, NewsItem, Shop } from '@/types';
import { mockWeather } from '@/mocks/weather';
import { events as mockEvents } from '@/mocks/events';
import { news as mockNews } from '@/mocks/news';
import { shops as mockShops } from '@/mocks/shops';
import { trpcClient } from '@/lib/trpc';

// Fetch weather data from tRPC backend
export async function fetchWeather(): Promise<Weather> {
  try {
    // Try to fetch from backend
    const data = await trpcClient.weather.query();
    return data;
  } catch (error) {
    console.error("Error fetching weather from backend:", error);
    // Fallback to mock data if backend fails
    return {
      ...mockWeather,
      lastUpdated: new Date().toISOString()
    };
  }
}

// Fetch events data from tRPC backend
export async function fetchEvents(): Promise<Event[]> {
  try {
    // Try to fetch from backend
    const data = await trpcClient.events.query();
    return data;
  } catch (error) {
    console.error("Error fetching events from backend:", error);
    // Fallback to mock data if backend fails
    return mockEvents;
  }
}

// Fetch news data from tRPC backend
export async function fetchNews(): Promise<NewsItem[]> {
  try {
    // Try to fetch from backend
    const data = await trpcClient.news.query();
    return data;
  } catch (error) {
    console.error("Error fetching news from backend:", error);
    // Fallback to mock data if backend fails
    return mockNews;
  }
}

// Fetch shops data from tRPC backend
export async function fetchShops(): Promise<Shop[]> {
  try {
    // Try to fetch from backend
    const data = await trpcClient.shops.query();
    return data;
  } catch (error) {
    console.error("Error fetching shops from backend:", error);
    // Fallback to mock data if backend fails
    return mockShops;
  }
}