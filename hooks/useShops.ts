import { useState, useEffect, useCallback } from 'react';
import { fetchShops } from '@/services/api';
import { Shop } from '@/types';
import { shops as mockShops } from '@/mocks/shops';

export function useShops() {
  const [shops, setShops] = useState<Shop[]>(mockShops);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadShops = useCallback(async (useMockOnFailure = true) => {
    setLoading(true);
    setError(null);
    
    try {
      const shopsData = await fetchShops();
      setShops(shopsData || []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error in useShops hook:', err);
      
      if (useMockOnFailure) {
        // Fall back to mock data on error
        setShops(mockShops || []);
        setError("Couldn't connect to shops service. Showing sample shops instead.");
      } else {
        setError('Failed to load shops. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshShops = useCallback(async () => {
    setError(null);
    
    try {
      const shopsData = await fetchShops();
      setShops(shopsData || []);
      setLastUpdated(new Date());
      return true;
    } catch (err) {
      console.error('Error refreshing shops:', err);
      // Fall back to mock data on error
      setShops(mockShops || []);
      setError("Couldn't connect to shops service. Showing sample shops instead.");
      return false;
    }
  }, []);

  // Load shops on mount with proper cleanup to prevent state updates after unmount
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const shopsData = await fetchShops();
        // Only update state if component is still mounted
        if (isMounted) {
          setShops(shopsData || []);
          setLastUpdated(new Date());
          setLoading(false);
        }
      } catch (err) {
        console.error('Error in useShops hook:', err);
        if (isMounted) {
          // Fall back to mock data on error
          setShops(mockShops || []);
          setError("Couldn't connect to shops service. Showing sample shops instead.");
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    shops,
    loading,
    error,
    lastUpdated,
    refreshShops,
    isLoading: loading,
  };
}