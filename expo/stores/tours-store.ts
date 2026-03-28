import { create } from 'zustand';
import { Tour } from '@/types';
import { tours as mockTours } from '@/mocks/tours';

interface ToursState {
  tours: Tour[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  
  // Actions
  fetchTours: () => Promise<void>;
  getTourById: (id: string) => Tour | undefined;
  toggleFavorite: (id: string) => void;
  favoriteTours: string[];
}

export const useToursStore = create<ToursState>((set, get) => ({
  tours: [],
  loading: false,
  error: null,
  lastUpdated: null,
  favoriteTours: [],
  
  fetchTours: async () => {
    set({ loading: true, error: null });
    
    try {
      // In a real app, this would be an API call
      // For now, we'll use the mock data
      set({ 
        tours: mockTours,
        loading: false,
        lastUpdated: new Date()
      });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch tours' 
      });
    }
  },
  
  getTourById: (id: string) => {
    return get().tours.find(tour => tour.id === id);
  },
  
  toggleFavorite: (id: string) => {
    const { favoriteTours } = get();
    
    if (favoriteTours.includes(id)) {
      set({ favoriteTours: favoriteTours.filter(tourId => tourId !== id) });
    } else {
      set({ favoriteTours: [...favoriteTours, id] });
    }
  }
}));