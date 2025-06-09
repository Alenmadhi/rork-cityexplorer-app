import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: string;
  level?: number;
  points?: number;
}

export interface UserStats {
  points: number;
  level: number;
  reportsSubmitted: number;
  reportsResolved: number;
  commentsPosted: number;
  votesGiven: number;
  consecutiveDays: number;
  lastActive: string;
}

interface GamificationState {
  badges: Badge[];
  userStats: UserStats;
  isLoading: boolean;
  error: string | null;
  fetchBadges: () => Promise<void>;
  updateStats: (stats: Partial<UserStats>) => void;
  unlockBadge: (id: string) => void;
  checkForNewBadges: () => Promise<Badge[]>;
}

// Mock badges data
const mockBadges: Badge[] = [
  {
    id: "1",
    name: "First Report",
    description: "Submit your first issue report",
    icon: "alert-triangle",
    unlocked: true,
    unlockedAt: "2025-05-10T14:30:00Z",
    category: "Reporting",
    level: 1,
    points: 10,
  },
  {
    id: "2",
    name: "Community Voice",
    description: "Comment on 5 different issues",
    icon: "message-circle",
    unlocked: true,
    unlockedAt: "2025-05-15T09:45:00Z",
    category: "Engagement",
    level: 1,
    points: 15,
  },
  {
    id: "3",
    name: "Problem Solver",
    description: "Have 3 of your reported issues resolved",
    icon: "check-circle",
    unlocked: false,
    category: "Impact",
    level: 2,
    points: 25,
  },
  {
    id: "4",
    name: "City Explorer",
    description: "Report issues in 5 different neighborhoods",
    icon: "map",
    unlocked: false,
    category: "Exploration",
    level: 2,
    points: 20,
  },
  {
    id: "5",
    name: "Dedicated Citizen",
    description: "Use the app for 7 consecutive days",
    icon: "calendar",
    unlocked: false,
    category: "Loyalty",
    level: 1,
    points: 15,
  },
];

// Mock user stats
const mockUserStats: UserStats = {
  points: 25,
  level: 1,
  reportsSubmitted: 3,
  reportsResolved: 1,
  commentsPosted: 5,
  votesGiven: 12,
  consecutiveDays: 3,
  lastActive: new Date().toISOString(),
};

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      badges: [],
      userStats: mockUserStats,
      isLoading: false,
      error: null,
      
      fetchBadges: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call with a delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Use mock data
          set({ badges: mockBadges, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch badges', 
            isLoading: false 
          });
        }
      },
      
      updateStats: (stats: Partial<UserStats>) => {
        set((state) => ({
          userStats: { ...state.userStats, ...stats }
        }));
      },
      
      unlockBadge: (id: string) => {
        set((state) => ({
          badges: state.badges.map(badge => 
            badge.id === id 
              ? { ...badge, unlocked: true, unlockedAt: new Date().toISOString() } 
              : badge
          )
        }));
      },
      
      checkForNewBadges: async () => {
        const { badges, userStats } = get();
        const newlyUnlockedBadges: Badge[] = [];
        
        // Check for badges that should be unlocked based on user stats
        const updatedBadges = badges.map(badge => {
          // Skip already unlocked badges
          if (badge.unlocked) return badge;
          
          let shouldUnlock = false;
          
          // Check conditions for each badge
          switch (badge.id) {
            case "1": // First Report
              shouldUnlock = userStats.reportsSubmitted >= 1;
              break;
            case "2": // Community Voice
              shouldUnlock = userStats.commentsPosted >= 5;
              break;
            case "3": // Problem Solver
              shouldUnlock = userStats.reportsResolved >= 3;
              break;
            case "5": // Dedicated Citizen
              shouldUnlock = userStats.consecutiveDays >= 7;
              break;
            // Add more badge conditions as needed
          }
          
          if (shouldUnlock) {
            const unlockedBadge = { 
              ...badge, 
              unlocked: true, 
              unlockedAt: new Date().toISOString() 
            };
            newlyUnlockedBadges.push(unlockedBadge);
            return unlockedBadge;
          }
          
          return badge;
        });
        
        // Update badges in store if any were unlocked
        if (newlyUnlockedBadges.length > 0) {
          set({ badges: updatedBadges });
          
          // Update user points
          const pointsEarned = newlyUnlockedBadges.reduce((total, badge) => total + (badge.points || 0), 0);
          if (pointsEarned > 0) {
            set((state) => ({
              userStats: { 
                ...state.userStats, 
                points: state.userStats.points + pointsEarned 
              }
            }));
          }
        }
        
        return newlyUnlockedBadges;
      },
    }),
    {
      name: 'gamification-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);