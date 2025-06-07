import { Event, NewsItem, Weather } from '@/types';

// Base URLs for API requests
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Fetch news related to Elbasan or Albania
 * Using a more reliable approach with mock data since public news APIs often have limitations
 */
export async function fetchNews(): Promise<NewsItem[]> {
  try {
    // Simulate network request with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would be a real API call
    // For demo purposes, we'll use our mock data but simulate a network request
    const mockNews = require('@/mocks/news').news;
    
    // Randomize which news items are "featured" to simulate changing content
    return mockNews.map((item: NewsItem) => ({
      ...item,
      isFeatured: Math.random() > 0.7, // 30% chance of being featured
      date: randomizeDate(item.date) // Make dates appear more recent
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Failed to fetch news');
  }
}

/**
 * Make dates appear more recent for demo purposes
 */
function randomizeDate(dateString: string): string {
  const originalDate = new Date(dateString);
  const now = new Date();
  
  // Set the date to be between the original date and now
  const timeDiff = now.getTime() - originalDate.getTime();
  const randomTime = originalDate.getTime() + Math.random() * timeDiff;
  
  return new Date(randomTime).toISOString();
}

/**
 * Fetch current weather for Elbasan
 */
export async function fetchWeather(): Promise<Weather> {
  try {
    // Elbasan coordinates: latitude 41.1, longitude 20.1
    const response = await fetch(
      `${WEATHER_API_URL}?latitude=41.1&longitude=20.1&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather');
    }
    
    const data = await response.json();
    
    // Map the weather condition based on temperature
    const temp = data.current?.temperature_2m || 20;
    let condition = 'Sunny';
    let icon = 'sun';
    
    if (temp < 10) {
      condition = 'Cold';
      icon = 'cloud';
    } else if (temp < 20) {
      condition = 'Mild';
      icon = 'cloud-sun';
    } else if (temp < 30) {
      condition = 'Warm';
      icon = 'sun';
    } else {
      condition = 'Hot';
      icon = 'sun';
    }
    
    return {
      temperature: Math.round(temp),
      condition,
      icon,
      high: Math.round(data.daily?.temperature_2m_max?.[0] || temp + 5),
      low: Math.round(data.daily?.temperature_2m_min?.[0] || temp - 5),
      humidity: data.current?.relative_humidity_2m || 50,
      windSpeed: Math.round(data.current?.wind_speed_10m || 5),
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    // Return default weather data if API fails
    return {
      temperature: 28,
      condition: 'Sunny',
      icon: 'sun',
      high: 32,
      low: 22,
      humidity: 45,
      windSpeed: 6,
    };
  }
}

/**
 * Fetch upcoming events in Elbasan
 * Note: This is a mock implementation as there's no free public API for Elbasan events
 * In a real app, this would connect to a real events API or scrape event data
 */
export async function fetchEvents(): Promise<Event[]> {
  // In a real implementation, this would fetch from an API
  // For now, we'll simulate an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return our mock data for now
      // In a real app, this would parse API response data
      const events = require('@/mocks/events').events;
      
      // Randomize which events are "featured" to simulate changing content
      const updatedEvents = events.map((event: Event) => ({
        ...event,
        isFeatured: Math.random() > 0.7 // 30% chance of being featured
      }));
      
      resolve(updatedEvents);
    }, 800);
  });
}