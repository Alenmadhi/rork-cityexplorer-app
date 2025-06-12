import { useState, useEffect } from 'react';
import { CityChallenge } from '@/types';
import { fetchCityChallenges, fetchDailyChallenge } from '@/services/api';
import { cityChallenges as mockChallenges } from '@/mocks/city-challenges';

export function useCityChallenges() {
  const [challenges, setChallenges] = useState<CityChallenge[]>(mockChallenges);
  const [dailyChallenge, setDailyChallenge] = useState<CityChallenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadChallenges = async (useMockOnFailure = true) => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedChallenges = await fetchCityChallenges();
      
      if (fetchedChallenges && fetchedChallenges.length > 0) {
        setChallenges(fetchedChallenges);
        setLastUpdated(new Date());
      } else if (useMockOnFailure) {
        // Fall back to mock data if API returns empty results
        setChallenges(mockChallenges);
        setError("Couldn't fetch live challenges. Showing sample challenges instead.");
      } else {
        setError("No challenges available at this time.");
      }
    } catch (err) {
      console.error('Error in useCityChallenges hook:', err);
      
      if (useMockOnFailure) {
        // Fall back to mock data on error
        setChallenges(mockChallenges);
        setError("Couldn't connect to challenges service. Showing sample challenges instead.");
      } else {
        setError("Failed to load challenges. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const loadDailyChallenge = async (useMockOnFailure = true) => {
    try {
      const challenge = await fetchDailyChallenge();
      setDailyChallenge(challenge);
    } catch (err) {
      console.error('Error fetching daily challenge:', err);
      
      if (useMockOnFailure && challenges.length > 0) {
        // Fall back to a random challenge from the loaded challenges
        const randomIndex = Math.floor(Math.random() * challenges.length);
        setDailyChallenge({
          ...challenges[randomIndex],
          isActive: true,
          expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
        });
      } else {
        setError("Failed to load daily challenge.");
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadChallenges();
      await loadDailyChallenge();
    };
    
    loadData();
    
    // Set up periodic refresh every 24 hours
    const refreshInterval = setInterval(() => {
      loadData();
    }, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  return {
    challenges,
    dailyChallenge,
    loading,
    error,
    lastUpdated,
    refreshChallenges: () => loadChallenges(true),
    refreshDailyChallenge: () => loadDailyChallenge(true),
  };
}