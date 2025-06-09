import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface SuccessStory {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  location: string;
  date: string;
  featured: boolean;
  votes: number;
  reportedBy?: string;
  resolvedBy?: string;
  resolvedDate?: string;
  category?: string;
  comments?: {
    id: string;
    userId: string;
    userName: string;
    text: string;
    createdAt: string;
  }[];
}

interface SuccessStoriesState {
  stories: SuccessStory[];
  isLoading: boolean;
  error: string | null;
  fetchStories: () => Promise<void>;
  voteForStory: (id: string) => void;
}

// Mock success stories data
const mockStories: SuccessStory[] = [
  {
    id: "1",
    title: "Park Cleanup",
    description: "Community volunteers cleaned up Central Park, removing trash and planting new flowers.",
    beforeImage: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=1000&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?q=80&w=1000&auto=format&fit=crop",
    location: "Central Park",
    date: "2025-05-15",
    featured: true,
    votes: 42,
    reportedBy: "John Doe",
    resolvedBy: "Parks Department",
    resolvedDate: "2025-05-20",
    category: "Environment",
    comments: [
      {
        id: "comment-1",
        userId: "user-2",
        userName: "Jane Smith",
        text: "Great job everyone! The park looks amazing now.",
        createdAt: "2025-05-21T10:30:00Z",
      },
      {
        id: "comment-2",
        userId: "user-3",
        userName: "Bob Johnson",
        text: "I'm so proud of our community for coming together.",
        createdAt: "2025-05-21T14:15:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "Pothole Repair",
    description: "Large pothole on Main Street was repaired within 48 hours of being reported.",
    beforeImage: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1000&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop",
    location: "Main Street",
    date: "2025-06-02",
    featured: false,
    votes: 28,
    reportedBy: "Sarah Wilson",
    resolvedBy: "Road Maintenance Crew",
    resolvedDate: "2025-06-04",
    category: "Infrastructure",
  },
  {
    id: "3",
    title: "Street Light Fixed",
    description: "Broken street light near the playground was replaced, improving safety for children.",
    beforeImage: "https://images.unsplash.com/photo-1542574621-e088a4464f7e?q=80&w=1000&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1551255868-ac5bd6f5ff2e?q=80&w=1000&auto=format&fit=crop",
    location: "Park Avenue",
    date: "2025-06-10",
    featured: false,
    votes: 15,
    reportedBy: "Michael Brown",
    resolvedBy: "City Utilities",
    resolvedDate: "2025-06-12",
    category: "Safety",
  },
];

export const useSuccessStoriesStore = create<SuccessStoriesState>()(
  persist(
    (set) => ({
      stories: [],
      isLoading: false,
      error: null,
      
      fetchStories: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call with a delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Use mock data
          set({ stories: mockStories, isLoading: false });
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
    }),
    {
      name: 'success-stories-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);