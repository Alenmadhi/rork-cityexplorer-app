import { useState, useEffect } from 'react';
import { Event } from '@/types';
import { fetchEvents } from '@/services/api';
import { events as mockEvents } from '@/mocks/events';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadEvents = async (useMockOnFailure = true) => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedEvents = await fetchEvents();
      
      if (fetchedEvents && fetchedEvents.length > 0) {
        setEvents(fetchedEvents);
        setLastUpdated(new Date());
      } else if (useMockOnFailure) {
        // Fall back to mock data if API returns empty results
        setEvents(mockEvents);
        setError("Couldn't fetch live events. Showing sample events instead.");
      } else {
        setError("No events available at this time.");
      }
    } catch (err) {
      console.error('Error in useEvents hook:', err);
      
      if (useMockOnFailure) {
        // Fall back to mock data on error
        setEvents(mockEvents);
        setError("Couldn't connect to events service. Showing sample events instead.");
      } else {
        setError("Failed to load events. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
    
    // Set up periodic refresh every 6 hours
    const refreshInterval = setInterval(() => {
      loadEvents();
    }, 6 * 60 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  return {
    events,
    loading,
    error,
    lastUpdated,
    refreshEvents: () => loadEvents(true),
  };
}