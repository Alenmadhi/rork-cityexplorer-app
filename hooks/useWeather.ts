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

  // Use a separate effect for initial loading to prevent state updates before mount
  useEffect(() => {
    let isMounted = true;
    
    const initWeather = async () => {
      try {
        const fetchedWeather = await fetchWeather();
        if (isMounted) {
          setWeather(fetchedWeather);
          setLastUpdated(new Date());
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading initial weather:', err);
        if (isMounted) {
          // Fall back to mock data on error
          setWeather(mockWeather);
          setError("Couldn't connect to weather service. Showing sample weather instead.");
          setLoading(false);
        }
      }
    };
    
    initWeather();
    
    // Set up periodic refresh every hour
    const refreshInterval = setInterval(() => {
      if (isMounted) {
        loadWeather();
      }
    }, 60 * 60 * 1000);
    
    return () => {
      isMounted = false;
      clearInterval(refreshInterval);
    };
  }, []);

  const refreshWeather = () => {
    loadWeather(true);
  };

  return {
    weather,
    loading,
    error,
    lastUpdated,
    refreshWeather,
  };
}