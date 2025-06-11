import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'daily' | 'weekly' | 'monthly' | 'special';
  completed: boolean;
  claimed: boolean;
  expiresAt?: string;
  createdAt: string;
}

interface ChallengesState {
  availableChallenges: Challenge[];
  completedChallenges: Challenge[];
  isLoading: boolean;
  error: string | null;
  fetchChallenges: () => Promise<void>;
  completeChallenge: (id: string) => void;
  claimChallenge: (id: string) => void;
  resetDailyChallenges: () => void;
}

// Mock challenges
const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Report an Issue',
    description: 'Submit a new issue report in your neighborhood',
    points: 10,
    category: 'daily',
    completed: false,
    claimed: false,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
  },
  {
    id: '2',
    title: 'Upvote 3 Reports',
    description: 'Help prioritize issues by upvoting 3 reports',
    points: 5,
    category: 'daily',
    completed: false,
    claimed: false,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
  },
  {
    id: '3',
    title: 'Comment on a Report',
    description: 'Add a helpful comment to an existing issue report',
    points: 5,
    category: 'daily',
    completed: false,
    claimed: false,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
  },
  {
    id: '4',
    title: 'Visit 3 Attractions',
    description: 'Check in at 3 different attractions in Elbasan',
    points: 15,
    category: 'weekly',
    completed: false,
    claimed: false,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString()
  },
  {
    id: '5',
    title: 'Attend an Event',
    description: 'Check in at a local event in Elbasan',
    points: 20,
    category: 'weekly',
    completed: false,
    claimed: false,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString()
  },
  {
    id: '6',
    title: 'Complete 10 Daily Challenges',
    description: 'Finish 10 daily challenges this month',
    points: 50,
    category: 'monthly',
    completed: false,
    claimed: false,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
  },
  {
    id: '7',
    title: 'City Explorer',
    description: 'Visit all major attractions in Elbasan',
    points: 100,
    category: 'special',
    completed: false,
    claimed: false,
    createdAt: new Date().toISOString()
  }
];

// Mock completed challenges
const mockCompletedChallenges: Challenge[] = [
  {
    id: '101',
    title: 'First Report',
    description: 'Submit your first issue report',
    points: 10,
    category: 'special',
    completed: true,
    claimed: true,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString()
  },
  {
    id: '102',
    title: 'Daily Login',
    description: 'Log in to the app',
    points: 5,
    category: 'daily',
    completed: true,
    claimed: true,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString()
  }
];

export const useChallengesStore = create<ChallengesState>()(
  persist(
    (set, get) => ({
      availableChallenges: mockChallenges,
      completedChallenges: mockCompletedChallenges,
      isLoading: false,
      error: null,
      
      fetchChallenges: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // In a real app, this would fetch from an API
          // For now, we'll just simulate a delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Check for expired challenges
          const now = new Date();
          const availableChallenges = get().availableChallenges;
          
          const updatedChallenges = availableChallenges.filter(challenge => {
            if (challenge.expiresAt) {
              const expiryDate = new Date(challenge.expiresAt);
              return expiryDate > now;
            }
            return true;
          });
          
          // If any challenges were filtered out (expired), generate new ones
          if (updatedChallenges.length < availableChallenges.length) {
            // In a real app, this would generate new challenges based on user activity
            // For now, we'll just reset the daily challenges
            get().resetDailyChallenges();
          } else {
            set({ availableChallenges: updatedChallenges, isLoading: false });
          }
        } catch (error) {
          console.error('Error fetching challenges:', error);
          set({ error: 'Failed to load challenges', isLoading: false });
        }
      },
      
      completeChallenge: (id: string) => {
        set(state => ({
          availableChallenges: state.availableChallenges.map(challenge => 
            challenge.id === id 
              ? { ...challenge, completed: true } 
              : challenge
          )
        }));
      },
      
      claimChallenge: (id: string) => {
        set(state => {
          // Find the challenge
          const challenge = state.availableChallenges.find(c => c.id === id);
          
          if (!challenge || !challenge.completed || challenge.claimed) {
            return state;
          }
          
          // Mark as claimed
          const updatedAvailableChallenges = state.availableChallenges.map(c => 
            c.id === id ? { ...c, claimed: true } : c
          );
          
          // Move to completed challenges if it's a one-time challenge
          let updatedCompletedChallenges = [...state.completedChallenges];
          
          if (challenge.category === 'special' || challenge.category === 'monthly') {
            updatedCompletedChallenges = [
              ...updatedCompletedChallenges,
              { ...challenge, claimed: true }
            ];
            
            // Remove from available challenges
            return {
              availableChallenges: updatedAvailableChallenges.filter(c => c.id !== id),
              completedChallenges: updatedCompletedChallenges
            };
          }
          
          return {
            availableChallenges: updatedAvailableChallenges,
            completedChallenges: updatedCompletedChallenges
          };
        });
      },
      
      resetDailyChallenges: () => {
        set(state => {
          // Move completed daily challenges to completedChallenges
          const completedDailies = state.availableChallenges.filter(
            c => c.category === 'daily' && c.completed
          );
          
          // Keep non-daily challenges and uncompleted daily challenges
          const remainingChallenges = state.availableChallenges.filter(
            c => c.category !== 'daily' || !c.completed
          );
          
          // Reset daily challenges
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(0, 0, 0, 0);
          
          const newDailyChallenges: Challenge[] = [
            {
              id: `daily-${Date.now()}-1`,
              title: 'Report an Issue',
              description: 'Submit a new issue report in your neighborhood',
              points: 10,
              category: 'daily',
              completed: false,
              claimed: false,
              createdAt: today.toISOString(),
              expiresAt: tomorrow.toISOString()
            },
            {
              id: `daily-${Date.now()}-2`,
              title: 'Upvote 3 Reports',
              description: 'Help prioritize issues by upvoting 3 reports',
              points: 5,
              category: 'daily',
              completed: false,
              claimed: false,
              createdAt: today.toISOString(),
              expiresAt: tomorrow.toISOString()
            },
            {
              id: `daily-${Date.now()}-3`,
              title: 'Comment on a Report',
              description: 'Add a helpful comment to an existing issue report',
              points: 5,
              category: 'daily',
              completed: false,
              claimed: false,
              createdAt: today.toISOString(),
              expiresAt: tomorrow.toISOString()
            }
          ];
          
          return {
            availableChallenges: [...remainingChallenges, ...newDailyChallenges],
            completedChallenges: [...state.completedChallenges, ...completedDailies],
            isLoading: false
          };
        });
      }
    }),
    {
      name: 'challenges-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);