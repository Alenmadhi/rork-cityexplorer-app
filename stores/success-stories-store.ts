import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SuccessStory, Comment } from '@/types';
import { successStories } from '@/mocks/success-stories';

interface SuccessStoriesState {
  stories: SuccessStory[];
  isLoading: boolean;
  error: string | null;
  fetchStories: () => Promise<void>;
  voteForStory: (id: string) => void;
  getStoryById: (id: string) => SuccessStory | undefined;
}

export const useSuccessStoriesStore = create<SuccessStoriesState>()(
  persist(
    (set, get) => ({
      stories: [],
      isLoading: false,
      error: null,
      
      fetchStories: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call with a delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Use mock data
          set({ stories: successStories, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch success stories', 
            isLoading: false 
          });
        }
      },
      
      voteForStory: (id: string) => {
        set((state) => ({
          stories: state.stories.map(story => 
            story.id === id ? { ...story, votes: story.votes + 1 } : story
          )
        }));
      },

      getStoryById: (id: string) => {
        return get().stories.find(story => story.id === id);
      },
    }),
    {
      name: 'success-stories-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);