import { useState, useEffect } from 'react';
import { Weather } from '@/types';
import { fetchWeather } from '@/services/api';
import { mockWeather } from '@/mocks/weather';

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
      
      if (fetchedWeather) {
        setWeather(fetchedWeather);
        setLastUpdated(new Date());
      } else if (useMockOnFailure) {
        // Fall back to mock data if API returns empty results
        setWeather(mockWeather);
        setError("Couldn't fetch live weather. Showing sample weather instead.");
      } else {
        setError("No weather data available at this time.");
      }
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
    
    // Set up periodic refresh every 30 minutes
    const refreshInterval = setInterval(() => {
      loadWeather();
    }, 30 * 60 * 1000);
    
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