import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useGamificationStore } from './gamification-store';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'daily' | 'weekly' | 'monthly' | 'one-time';
  category: 'reporting' | 'engagement' | 'exploration' | 'community';
  requirements: {
    action: string;
    count: number;
  };
  badgeId?: string; // Optional badge to award on completion
  expiresAt?: string; // For time-limited challenges
  createdAt: string;
}

export interface UserChallenge extends Challenge {
  progress: number;
  completed: boolean;
  completedAt?: string;
  claimed: boolean;
}

interface ChallengesState {
  availableChallenges: UserChallenge[];
  completedChallenges: UserChallenge[];
  isLoading: boolean;
  error: string | null;
  lastRefreshed: string | null;
  
  // Actions
  fetchChallenges: () => Promise<void>;
  updateChallengeProgress: (challengeId: string, progress: number) => void;
  completeChallenge: (challengeId: string) => void;
  claimChallengeReward: (challengeId: string) => void;
  refreshDailyChallenges: () => Promise<void>;
}

// Mock challenges
const generateDailyChallenges = (): UserChallenge[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  return [
    {
      id: 'daily-1',
      title: 'Report an Issue',
      description: 'Submit a new issue report in your area',
      points: 20,
      type: 'daily',
      category: 'reporting',
      requirements: {
        action: 'submit_report',
        count: 1
      },
      createdAt: today.toISOString(),
      expiresAt: tomorrow.toISOString(),
      progress: 0,
      completed: false,
      claimed: false
    },
    {
      id: 'daily-2',
      title: 'Community Engagement',
      description: 'Comment on 2 existing reports',
      points: 15,
      type: 'daily',
      category: 'engagement',
      requirements: {
        action: 'post_comment',
        count: 2
      },
      createdAt: today.toISOString(),
      expiresAt: tomorrow.toISOString(),
      progress: 0,
      completed: false,
      claimed: false
    },
    {
      id: 'daily-3',
      title: 'Upvote Reports',
      description: 'Upvote 3 important issues',
      points: 10,
      type: 'daily',
      category: 'engagement',
      requirements: {
        action: 'upvote',
        count: 3
      },
      createdAt: today.toISOString(),
      expiresAt: tomorrow.toISOString(),
      progress: 0,
      completed: false,
      claimed: false
    },
    {
      id: 'weekly-1',
      title: 'Neighborhood Explorer',
      description: 'Check issues in 3 different neighborhoods',
      points: 30,
      type: 'weekly',
      category: 'exploration',
      requirements: {
        action: 'view_neighborhood',
        count: 3
      },
      createdAt: today.toISOString(),
      progress: 0,
      completed: false,
      claimed: false
    },
    {
      id: 'monthly-1',
      title: 'Civic Leader',
      description: 'Have 5 of your reported issues resolved',
      points: 100,
      type: 'monthly',
      category: 'community',
      requirements: {
        action: 'issue_resolved',
        count: 5
      },
      badgeId: '4', // Civic Leader badge
      createdAt: today.toISOString(),
      progress: 0,
      completed: false,
      claimed: false
    }
  ];
};

// Generate some completed challenges for demo
const generateCompletedChallenges = (): UserChallenge[] => {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 2);
  
  return [
    {
      id: 'completed-1',
      title: 'First Steps',
      description: 'Submit your first report',
      points: 20,
      type: 'one-time',
      category: 'reporting',
      requirements: {
        action: 'submit_report',
        count: 1
      },
      createdAt: pastDate.toISOString(),
      progress: 1,
      completed: true,
      completedAt: pastDate.toISOString(),
      claimed: true
    },
    {
      id: 'completed-2',
      title: 'Daily Engagement',
      description: 'Comment on 2 existing reports',
      points: 15,
      type: 'daily',
      category: 'engagement',
      requirements: {
        action: 'post_comment',
        count: 2
      },
      createdAt: pastDate.toISOString(),
      progress: 2,
      completed: true,
      completedAt: pastDate.toISOString(),
      claimed: true
    }
  ];
};

export const useChallengesStore = create<ChallengesState>()(
  persist(
    (set, get) => ({
      availableChallenges: generateDailyChallenges(),
      completedChallenges: generateCompletedChallenges(),
      isLoading: false,
      error: null,
      lastRefreshed: new Date().toISOString(),
      
      fetchChallenges: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // In a real app, this would be an API call
          // For demo purposes, we'll use our mock data
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Check if daily challenges need to be refreshed
          const lastRefreshed = get().lastRefreshed;
          const now = new Date();
          const lastRefreshDate = lastRefreshed ? new Date(lastRefreshed) : null;
          
          // If last refresh was yesterday or earlier, refresh daily challenges
          if (!lastRefreshDate || 
              lastRefreshDate.getDate() !== now.getDate() || 
              lastRefreshDate.getMonth() !== now.getMonth() || 
              lastRefreshDate.getFullYear() !== now.getFullYear()) {
            await get().refreshDailyChallenges();
          }
          
          set({ isLoading: false });
        } catch (error) {
          set({ 
            error: 'Failed to fetch challenges', 
            isLoading: false 
          });
        }
      },
      
      updateChallengeProgress: (challengeId: string, progress: number) => {
        set(state => {
          const availableChallenges = state.availableChallenges.map(challenge => {
            if (challenge.id === challengeId) {
              const newProgress = challenge.progress + progress;
              const completed = newProgress >= challenge.requirements.count;
              
              return {
                ...challenge,
                progress: newProgress,
                completed,
                completedAt: completed ? new Date().toISOString() : undefined
              };
            }
            return challenge;
          });
          
          return { availableChallenges };
        });
      },
      
      completeChallenge: (challengeId: string) => {
        set(state => {
          const availableChallenges = state.availableChallenges.map(challenge => {
            if (challenge.id === challengeId) {
              return {
                ...challenge,
                progress: challenge.requirements.count,
                completed: true,
                completedAt: new Date().toISOString()
              };
            }
            return challenge;
          });
          
          return { availableChallenges };
        });
      },
      
      claimChallengeReward: (challengeId: string) => {
        const { availableChallenges } = get();
        const challenge = availableChallenges.find(c => c.id === challengeId);
        
        if (!challenge || !challenge.completed || challenge.claimed) {
          return;
        }
        
        // Update gamification store with points
        const gamificationStore = useGamificationStore.getState();
        gamificationStore.updateStats({
          points: gamificationStore.userStats.points + challenge.points
        });
        
        // Award badge if applicable
        if (challenge.badgeId) {
          gamificationStore.unlockBadge(challenge.badgeId);
        }
        
        // Mark challenge as claimed and move to completed challenges
        set(state => {
          const updatedAvailableChallenges = state.availableChallenges.filter(
            c => c.id !== challengeId
          );
          
          const updatedChallenge = {
            ...challenge,
            claimed: true
          };
          
          return {
            availableChallenges: updatedAvailableChallenges,
            completedChallenges: [...state.completedChallenges, updatedChallenge]
          };
        });
      },
      
      refreshDailyChallenges: async () => {
        set(state => {
          // Filter out expired daily challenges
          const now = new Date();
          const filteredChallenges = state.availableChallenges.filter(challenge => {
            if (challenge.type !== 'daily') return true;
            if (!challenge.expiresAt) return true;
            
            const expiryDate = new Date(challenge.expiresAt);
            return expiryDate > now;
          });
          
          // Add new daily challenges
          const newDailyChallenges = generateDailyChallenges().filter(
            challenge => challenge.type === 'daily'
          );
          
          return {
            availableChallenges: [...filteredChallenges, ...newDailyChallenges],
            lastRefreshed: new Date().toISOString()
          };
        });
        
        return Promise.resolve();
      }
    }),
    {
      name: 'challenges-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);