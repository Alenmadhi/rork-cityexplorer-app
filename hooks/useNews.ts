import { useState, useEffect, useCallback } from 'react';
import { fetchNews } from '@/services/api';
import { NewsItem } from '@/types';
import { news as mockNews } from '@/mocks/news';

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadNews = useCallback(async (useMockOnFailure = true) => {
    setLoading(true);
    setError(null);
    
    try {
      const newsData = await fetchNews();
      setNews(newsData || []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error in useNews hook:', err);
      
      if (useMockOnFailure) {
        // Fall back to mock data on error
        setNews(mockNews || []);
        setError("Couldn't connect to news service. Showing sample news instead.");
      } else {
        setError('Failed to load news. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshNews = useCallback(async () => {
    setError(null);
    
    try {
      const newsData = await fetchNews();
      setNews(newsData || []);
      setLastUpdated(new Date());
      return true;
    } catch (err) {
      console.error('Error refreshing news:', err);
      // Fall back to mock data on error
      setNews(mockNews || []);
      setError("Couldn't connect to news service. Showing sample news instead.");
      return false;
    }
  }, []);

  // Load news on mount with proper cleanup to prevent state updates after unmount
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const newsData = await fetchNews();
        // Only update state if component is still mounted
        if (isMounted) {
          setNews(newsData || []);
          setLastUpdated(new Date());
          setLoading(false);
        }
      } catch (err) {
        console.error('Error in useNews hook:', err);
        if (isMounted) {
          // Fall back to mock data on error
          setNews(mockNews || []);
          setError("Couldn't connect to news service. Showing sample news instead.");
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
    news,
    loading,
    error,
    lastUpdated,
    refreshNews,
  };
}