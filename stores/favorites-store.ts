import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesState {
  eventIds: string[];
  attractionIds: string[];
  newsIds: string[];
  addFavoriteEvent: (id: string) => void;
  removeFavoriteEvent: (id: string) => void;
  addFavoriteAttraction: (id: string) => void;
  removeFavoriteAttraction: (id: string) => void;
  addFavoriteNews: (id: string) => void;
  removeFavoriteNews: (id: string) => void;
  isFavoriteEvent: (id: string) => boolean;
  isFavoriteAttraction: (id: string) => boolean;
  isFavoriteNews: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      eventIds: [],
      attractionIds: [],
      newsIds: [],
      
      addFavoriteEvent: (id: string) => 
        set((state) => ({
          eventIds: state.eventIds.includes(id) ? state.eventIds : [...state.eventIds, id]
        })),
      
      removeFavoriteEvent: (id: string) => 
        set((state) => ({
          eventIds: state.eventIds.filter((eventId) => eventId !== id)
        })),
      
      addFavoriteAttraction: (id: string) => 
        set((state) => ({
          attractionIds: state.attractionIds.includes(id) ? state.attractionIds : [...state.attractionIds, id]
        })),
      
      removeFavoriteAttraction: (id: string) => 
        set((state) => ({
          attractionIds: state.attractionIds.filter((attractionId) => attractionId !== id)
        })),
      
      addFavoriteNews: (id: string) => 
        set((state) => ({
          newsIds: state.newsIds.includes(id) ? state.newsIds : [...state.newsIds, id]
        })),
      
      removeFavoriteNews: (id: string) => 
        set((state) => ({
          newsIds: state.newsIds.filter((newsId) => newsId !== id)
        })),
      
      isFavoriteEvent: (id: string) => get().eventIds.includes(id),
      isFavoriteAttraction: (id: string) => get().attractionIds.includes(id),
      isFavoriteNews: (id: string) => get().newsIds.includes(id),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);