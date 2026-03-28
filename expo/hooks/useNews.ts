import { useState, useEffect } from 'react';
import { NewsItem } from '@/types';
import { fetchNews } from '@/services/api';
import { news as mockNews } from '@/mocks/news';

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadNews = async (useMockOnFailure = true) => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedNews = await fetchNews();
      
      if (fetchedNews && fetchedNews.length > 0) {
        setNews(fetchedNews);
        setLastUpdated(new Date());
      } else if (useMockOnFailure) {
        // Fall back to mock data if API returns empty results
        setNews(mockNews);
        setError("Couldn't fetch live news. Showing sample news instead.");
      } else {
        setError("No news available at this time.");
      }
    } catch (err) {
      console.error('Error in useNews hook:', err);
      
      if (useMockOnFailure) {
        // Fall back to mock data on error
        setNews(mockNews);
        setError("Couldn't connect to news service. Showing sample news instead.");
      } else {
        setError("Failed to load news. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
    
    // Set up periodic refresh every 3 hours
    const refreshInterval = setInterval(() => {
      loadNews();
    }, 3 * 60 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  return {
    news,
    loading,
    error,
    lastUpdated,
    refreshNews: () => loadNews(true),
  };
}