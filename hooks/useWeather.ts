import { useState, useEffect } from 'react';
import { Weather } from '@/types';
import { fetchWeather } from '@/services/api';
import { weatherData as mockWeather } from '@/mocks/weather';

export function useWeather() {
  const [weather, setWeather] = useState<Weather>(mockWeather);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadWeather = async (useMockOnFailure = true) => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedWeather = await fetchWeather();
      setWeather(fetchedWeather);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error in useWeather hook:', err);
      
      if (useMockOnFailure) {
        // Fall back to mock data on error
        setWeather(mockWeather);
        setError("Couldn't connect to weather service. Showing sample weather instead.");
      } else {
        setError("Failed to load weather. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
    
    // Set up periodic refresh every hour
    const refreshInterval = setInterval(() => {
      loadWeather();
    }, 60 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  return {
    weather,
    loading,
    error,
    lastUpdated,
    refreshWeather: () => loadWeather(true),
  };
}