import { Event, NewsItem, Weather, WeatherForecast } from '@/types';
import { news as mockNews } from '@/mocks/news';

// Base URLs for API requests
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
const GNEWS_API_URL = 'https://gnews.io/api/v4/search';
// Using a free API key - this may have limited requests
const GNEWS_API_KEY = '5f916c6339a945be8b6abc1b6264385a';

/**
 * Fetch news related to Elbasan or Albania
 * Using GNews API to get real news about Elbasan/Albania
 * Falls back to mock data if API fails
 */
export async function fetchNews(): Promise<NewsItem[]> {
  try {
    console.log('Fetching news from GNews API...');
    
    // Try to fetch news about Elbasan from GNews API with Albanian language
    const response = await fetch(
      `${GNEWS_API_URL}?q=Elbasan&lang=sq&country=al&max=10&token=${GNEWS_API_KEY}`
    );
    
    if (!response.ok) {
      console.log(`GNews API error: ${response.status}`);
      throw new Error(`Failed to fetch news: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.articles || !Array.isArray(data.articles) || data.articles.length === 0) {
      console.log('No Elbasan-specific news found, trying Albania news');
      
      // If no Elbasan-specific news, try Albania news
      const albaniaResponse = await fetch(
        `${GNEWS_API_URL}?q=Albania&lang=sq&country=al&max=10&token=${GNEWS_API_KEY}`
      );
      
      if (!albaniaResponse.ok) {
        throw new Error(`Failed to fetch Albania news: ${albaniaResponse.status}`);
      }
      
      const albaniaData = await albaniaResponse.json();
      
      if (!albaniaData.articles || !Array.isArray(albaniaData.articles) || albaniaData.articles.length === 0) {
        throw new Error('No articles found in any source');
      }
      
      return mapArticlesToNewsItems(albaniaData.articles);
    }
    
    return mapArticlesToNewsItems(data.articles);
  } catch (error) {
    console.error('Error fetching news:', error);
    
    // Fall back to mock data
    console.log('Falling back to mock news data');
    
    // Randomize which news items are "featured" to simulate changing content
    return mockNews.map((item: NewsItem) => ({
      ...item,
      featured: Math.random() > 0.7, // 30% chance of being featured
      date: randomizeDate(item.date) // Make dates appear more recent
    }));
  }
}

/**
 * Map GNews API articles to our NewsItem format
 */
function mapArticlesToNewsItems(articles: any[]): NewsItem[] {
  if (!articles || !Array.isArray(articles)) {
    console.error('Invalid articles data:', articles);
    return [];
  }
  
  return articles.map((article: any, index: number): NewsItem => {
    // Determine category based on content or title keywords
    let category: 'local' | 'business' | 'culture' | 'sports' | 'politics' | 'other' = 'other';
    
    const content = ((article.title || '') + ' ' + (article.description || '')).toLowerCase();
    
    if (content.includes('business') || content.includes('economy') || content.includes('market')) {
      category = 'business';
    } else if (content.includes('culture') || content.includes('art') || content.includes('festival') || content.includes('heritage')) {
      category = 'culture';
    } else if (content.includes('sport') || content.includes('football') || content.includes('match')) {
      category = 'sports';
    } else if (content.includes('politic') || content.includes('government') || content.includes('minister') || content.includes('parliament')) {
      category = 'politics';
    } else if (content.includes('elbasan') || content.includes('local')) {
      category = 'local';
    }
    
    return {
      id: `${index + 1}`,
      title: article.title || 'No title available',
      summary: article.description || article.content || 'No description available',
      content: article.content || article.description || 'No content available',
      image: article.image || 'https://images.unsplash.com/photo-1578297886235-f2be6e8f3c3e?q=80&w=1000&auto=format&fit=crop',
      date: article.publishedAt || new Date().toISOString(),
      author: article.source?.name || 'News Source',
      category,
      featured: index < 2, // First two articles are featured
      url: article.url // Add the original URL to link back to the source
    };
  });
}

/**
 * Make dates appear more recent for demo purposes
 */
function randomizeDate(dateString: string): string {
  try {
    const originalDate = new Date(dateString);
    const now = new Date();
    
    // Set the date to be between the original date and now
    const timeDiff = now.getTime() - originalDate.getTime();
    const randomTime = originalDate.getTime() + Math.random() * timeDiff;
    
    return new Date(randomTime).toISOString();
  } catch (error) {
    // If date parsing fails, return current date
    return new Date().toISOString();
  }
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
      throw new Error(`Failed to fetch weather: ${response.status}`);
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
    
    // Create forecast data
    const forecast: WeatherForecast[] = [];
    
    if (data.daily && data.daily.temperature_2m_max && data.daily.temperature_2m_min) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const today = new Date().getDay();
      
      for (let i = 0; i < Math.min(data.daily.temperature_2m_max.length, 5); i++) {
        const dayIndex = (today + i) % 7;
        const dayName = i === 0 ? 'Today' : days[dayIndex];
        
        forecast.push({
          day: dayName,
          temperature: {
            min: Math.round(data.daily.temperature_2m_min[i]),
            max: Math.round(data.daily.temperature_2m_max[i])
          },
          condition: getConditionFromTemp(
            (data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) / 2
          ),
          icon: getIconFromTemp(
            (data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) / 2
          )
        });
      }
    }
    
    return {
      temperature: Math.round(temp),
      condition,
      icon,
      humidity: data.current?.relative_humidity_2m || 50,
      windSpeed: Math.round(data.current?.wind_speed_10m || 5),
      location: 'Elbasan, Albania',
      forecast,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    // Return default weather data if API fails
    return {
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
  }
}

// Helper function to determine weather condition from temperature
function getConditionFromTemp(temp: number): string {
  if (temp < 10) return 'Cold';
  if (temp < 20) return 'Mild';
  if (temp < 30) return 'Warm';
  return 'Hot';
}

// Helper function to determine weather icon from temperature
function getIconFromTemp(temp: number): string {
  if (temp < 10) return 'cloud';
  if (temp < 20) return 'cloud-sun';
  return 'sun';
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
        featured: Math.random() > 0.7 // 30% chance of being featured
      }));
      
      resolve(updatedEvents);
    }, 800);
  });
}