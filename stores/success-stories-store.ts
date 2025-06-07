import { create } from 'zustand';
import { SuccessStory } from '@/types';
import { successStories } from '@/mocks/success-stories';

interface SuccessStoriesState {
  stories: SuccessStory[];
  featuredStories: SuccessStory[];
  
  // Actions
  fetchStories: () => void;
  getStoryById: (id: string) => SuccessStory | undefined;
}

export const useSuccessStoriesStore = create<SuccessStoriesState>((set, get) => ({
  stories: [],
  featuredStories: [],
  
  fetchStories: () => {
    // In a real app, this would fetch from an API
    // For now, we'll use our mock data
    const featured = successStories.filter(story => story.featured);
    
    set({
      stories: successStories,
      featuredStories: featured
    });
  },
  
  getStoryById: (id: string) => {
    return get().stories.find(story => story.id === id);
  }
}));