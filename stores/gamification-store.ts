import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserAchievement {
  badgeId: string;
  dateEarned: string;
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
  userAchievements: UserAchievement[];
  userStats: UserStats;
  isLoading: boolean;
  error: string | null;
  updateStats: (stats: Partial<UserStats>) => void;
  unlockBadge: (badgeId: string) => void;
  checkForNewBadges: () => Promise<string[]>;
}

// Mock user achievements
const mockUserAchievements: UserAchievement[] = [
  {
    badgeId: "1",
    dateEarned: "2025-05-10T14:30:00Z",
  },
  {
    badgeId: "2",
    dateEarned: "2025-05-15T09:45:00Z",
  }
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
      userAchievements: mockUserAchievements,
      userStats: mockUserStats,
      isLoading: false,
      error: null,
      
      updateStats: (stats: Partial<UserStats>) => {
        set((state) => ({
          userStats: { ...state.userStats, ...stats }
        }));
      },
      
      unlockBadge: (badgeId: string) => {
        set((state) => {
          // Check if badge is already unlocked
          if (state.userAchievements.some(a => a.badgeId === badgeId)) {
            return state;
          }
          
          // Add new achievement
          return {
            userAchievements: [
              ...state.userAchievements,
              {
                badgeId,
                dateEarned: new Date().toISOString()
              }
            ]
          };
        });
      },
      
      checkForNewBadges: async () => {
        const { userStats, userAchievements } = get();
        const newlyUnlockedBadgeIds: string[] = [];
        
        // Check for badges that should be unlocked based on user stats
        // First Report badge
        if (userStats.reportsSubmitted >= 1 && 
            !userAchievements.some(a => a.badgeId === "1")) {
          set((state) => ({
            userAchievements: [
              ...state.userAchievements,
              { badgeId: "1", dateEarned: new Date().toISOString() }
            ]
          }));
          newlyUnlockedBadgeIds.push("1");
        }
        
        // Community Voice badge
        if (userStats.commentsPosted >= 5 && 
            !userAchievements.some(a => a.badgeId === "2")) {
          set((state) => ({
            userAchievements: [
              ...state.userAchievements,
              { badgeId: "2", dateEarned: new Date().toISOString() }
            ]
          }));
          newlyUnlockedBadgeIds.push("2");
        }
        
        // Problem Solver badge
        if (userStats.reportsResolved >= 3 && 
            !userAchievements.some(a => a.badgeId === "3")) {
          set((state) => ({
            userAchievements: [
              ...state.userAchievements,
              { badgeId: "3", dateEarned: new Date().toISOString() }
            ]
          }));
          newlyUnlockedBadgeIds.push("3");
        }
        
        // Dedicated Citizen badge
        if (userStats.consecutiveDays >= 7 && 
            !userAchievements.some(a => a.badgeId === "5")) {
          set((state) => ({
            userAchievements: [
              ...state.userAchievements,
              { badgeId: "5", dateEarned: new Date().toISOString() }
            ]
          }));
          newlyUnlockedBadgeIds.push("5");
        }
        
        // Update user points if any badges were unlocked
        if (newlyUnlockedBadgeIds.length > 0) {
          // In a real app, we would calculate points based on badge values
          set((state) => ({
            userStats: { 
              ...state.userStats, 
              points: state.userStats.points + (newlyUnlockedBadgeIds.length * 10)
            }
          }));
        }
        
        return newlyUnlockedBadgeIds;
      },
    }),
    {
      name: 'gamification-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);