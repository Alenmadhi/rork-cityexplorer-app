import { Weather, Event, NewsItem, Shop, CityChallenge } from '@/types';
import { mockWeather } from '@/mocks/weather';
import { events as mockEvents } from '@/mocks/events';
import { news as mockNews } from '@/mocks/news';
import { shops as mockShops } from '@/mocks/shops';
import { cityChallenges as mockCityChallenges } from '@/mocks/city-challenges';

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

// Simulated API call to fetch city challenges
export async function fetchCityChallenges(): Promise<CityChallenge[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful API response with 80% probability
      if (Math.random() > 0.2) {
        resolve(mockCityChallenges);
      } else {
        // Simulate API error
        reject(new Error('Failed to fetch city challenges'));
      }
    }, 800);
  });
}

// Simulated API call to fetch daily challenge
export async function fetchDailyChallenge(): Promise<CityChallenge> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful API response with 80% probability
      if (Math.random() > 0.2) {
        // Get a random challenge from the mock data
        const randomIndex = Math.floor(Math.random() * mockCityChallenges.length);
        const challenge = {
          ...mockCityChallenges[randomIndex],
          isActive: true,
          expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
        };
        resolve(challenge);
      } else {
        // Simulate API error
        reject(new Error('Failed to fetch daily challenge'));
      }
    }, 800);
  });
}

// Simulated API call to check if user is near a challenge location
export async function checkChallengeProximity(
  challengeId: string, 
  userLocation: { latitude: number; longitude: number }
): Promise<{ isNearby: boolean; distance: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find the challenge
      const challenge = mockCityChallenges.find(c => c.id === challengeId);
      
      if (!challenge) {
        resolve({ isNearby: false, distance: 1000 });
        return;
      }
      
      // Calculate distance (simplified for mock)
      const challengeLocation = challenge.location.coordinates;
      
      // Simple distance calculation (not accurate for real-world use)
      const distance = Math.sqrt(
        Math.pow(challengeLocation.latitude - userLocation.latitude, 2) + 
        Math.pow(challengeLocation.longitude - userLocation.longitude, 2)
      ) * 111000; // Rough conversion to meters
      
      // Check if user is within the challenge radius
      const isNearby = distance <= challenge.location.radius;
      
      resolve({ isNearby, distance });
    }, 500);
  });
}

// Simulated API call to complete a challenge
export async function completeChallenge(
  challengeId: string,
  userId: string
): Promise<{ success: boolean; points: number; badge?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find the challenge
      const challenge = mockCityChallenges.find(c => c.id === challengeId);
      
      if (!challenge) {
        resolve({ success: false, points: 0 });
        return;
      }
      
      // In a real app, this would update the database
      resolve({ 
        success: true, 
        points: challenge.reward.points,
        badge: challenge.reward.badge
      });
    }, 800);
  });
}