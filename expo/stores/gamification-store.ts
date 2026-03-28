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
  challengesCompleted: number;
  streakMaximum: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
}

interface GamificationState {
  userAchievements: UserAchievement[];
  userStats: UserStats;
  badges: Badge[];
  isLoading: boolean;
  error: string | null;
  fetchBadges: () => Promise<void>;
  updateStats: (stats: Partial<UserStats>) => void;
  unlockBadge: (badgeId: string) => void;
  checkForNewBadges: () => Promise<string[]>;
  updateDailyStreak: () => void;
}

// Mock badges
const mockBadges: Badge[] = [
  {
    id: "1",
    name: "First Report",
    description: "Submit your first issue report",
    icon: "alert-triangle",
    category: "reporting",
    points: 10,
    unlocked: true,
    unlockedAt: "2025-05-10T14:30:00Z"
  },
  {
    id: "2",
    name: "Community Voice",
    description: "Post 5 comments on reports",
    icon: "message-circle",
    category: "engagement",
    points: 15,
    unlocked: true,
    unlockedAt: "2025-05-15T09:45:00Z"
  },
  {
    id: "3",
    name: "Problem Solver",
    description: "Have 3 of your reported issues resolved",
    icon: "check-circle",
    category: "impact",
    points: 25,
    unlocked: false
  },
  {
    id: "4",
    name: "Civic Leader",
    description: "Complete 5 monthly challenges",
    icon: "award",
    category: "challenges",
    points: 50,
    unlocked: false
  },
  {
    id: "5",
    name: "Dedicated Citizen",
    description: "Use the app for 7 consecutive days",
    icon: "calendar",
    category: "engagement",
    points: 30,
    unlocked: false
  },
  {
    id: "6",
    name: "Explorer",
    description: "Report issues in 5 different neighborhoods",
    icon: "map",
    category: "exploration",
    points: 20,
    unlocked: false
  },
  {
    id: "7",
    name: "Influencer",
    description: "Have your reports upvoted 20 times",
    icon: "trending-up",
    category: "social",
    points: 35,
    unlocked: false
  },
  {
    id: "8",
    name: "Photographer",
    description: "Include photos in 10 reports",
    icon: "camera",
    category: "reporting",
    points: 20,
    unlocked: false
  }
];

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
  challengesCompleted: 2,
  streakMaximum: 3
};

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      userAchievements: mockUserAchievements,
      userStats: mockUserStats,
      badges: mockBadges,
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
        set((state) => {
          const updatedStats = { ...state.userStats, ...stats };
          
          // Calculate level based on points
          // Every 100 points = 1 level
          const newLevel = Math.floor(updatedStats.points / 100) + 1;
          if (newLevel !== updatedStats.level) {
            updatedStats.level = newLevel;
          }
          
          return { userStats: updatedStats };
        });
      },
      
      unlockBadge: (badgeId: string) => {
        set((state) => {
          // Check if badge is already unlocked
          if (state.userAchievements.some(a => a.badgeId === badgeId)) {
            return state;
          }
          
          // Update badges list
          const updatedBadges = state.badges.map(badge => {
            if (badge.id === badgeId) {
              return {
                ...badge,
                unlocked: true,
                unlockedAt: new Date().toISOString()
              };
            }
            return badge;
          });
          
          // Add new achievement
          return {
            userAchievements: [
              ...state.userAchievements,
              {
                badgeId,
                dateEarned: new Date().toISOString()
              }
            ],
            badges: updatedBadges,
            // Add points for unlocking the badge
            userStats: {
              ...state.userStats,
              points: state.userStats.points + (state.badges.find(b => b.id === badgeId)?.points || 0)
            }
          };
        });
      },
      
      checkForNewBadges: async () => {
        const { userStats, userAchievements, badges } = get();
        const newlyUnlockedBadgeIds: string[] = [];
        
        // Check for badges that should be unlocked based on user stats
        // First Report badge
        if (userStats.reportsSubmitted >= 1 && 
            !userAchievements.some(a => a.badgeId === "1")) {
          set((state) => ({
            userAchievements: [
              ...state.userAchievements,
              { badgeId: "1", dateEarned: new Date().toISOString() }
            ],
            badges: state.badges.map(badge => 
              badge.id === "1" 
                ? { ...badge, unlocked: true, unlockedAt: new Date().toISOString() } 
                : badge
            )
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
            ],
            badges: state.badges.map(badge => 
              badge.id === "2" 
                ? { ...badge, unlocked: true, unlockedAt: new Date().toISOString() } 
                : badge
            )
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
            ],
            badges: state.badges.map(badge => 
              badge.id === "3" 
                ? { ...badge, unlocked: true, unlockedAt: new Date().toISOString() } 
                : badge
            )
          }));
          newlyUnlockedBadgeIds.push("3");
        }
        
        // Civic Leader badge
        if (userStats.challengesCompleted >= 5 && 
            !userAchievements.some(a => a.badgeId === "4")) {
          set((state) => ({
            userAchievements: [
              ...state.userAchievements,
              { badgeId: "4", dateEarned: new Date().toISOString() }
            ],
            badges: state.badges.map(badge => 
              badge.id === "4" 
                ? { ...badge, unlocked: true, unlockedAt: new Date().toISOString() } 
                : badge
            )
          }));
          newlyUnlockedBadgeIds.push("4");
        }
        
        // Dedicated Citizen badge
        if (userStats.consecutiveDays >= 7 && 
            !userAchievements.some(a => a.badgeId === "5")) {
          set((state) => ({
            userAchievements: [
              ...state.userAchievements,
              { badgeId: "5", dateEarned: new Date().toISOString() }
            ],
            badges: state.badges.map(badge => 
              badge.id === "5" 
                ? { ...badge, unlocked: true, unlockedAt: new Date().toISOString() } 
                : badge
            )
          }));
          newlyUnlockedBadgeIds.push("5");
        }
        
        // Update user points if any badges were unlocked
        if (newlyUnlockedBadgeIds.length > 0) {
          const pointsToAdd = newlyUnlockedBadgeIds.reduce((total, badgeId) => {
            const badge = badges.find(b => b.id === badgeId);
            return total + (badge?.points || 0);
          }, 0);
          
          set((state) => ({
            userStats: { 
              ...state.userStats, 
              points: state.userStats.points + pointsToAdd
            }
          }));
        }
        
        return newlyUnlockedBadgeIds;
      },
      
      updateDailyStreak: () => {
        set((state) => {
          const now = new Date();
          const lastActive = new Date(state.userStats.lastActive);
          
          // Check if last active was yesterday
          const isYesterday = 
            now.getDate() - lastActive.getDate() === 1 || 
            (now.getDate() === 1 && 
             lastActive.getDate() === new Date(
               lastActive.getFullYear(), 
               lastActive.getMonth() + 1, 
               0
             ).getDate());
          
          // Check if last active was today (already logged in today)
          const isToday = 
            now.getDate() === lastActive.getDate() && 
            now.getMonth() === lastActive.getMonth() && 
            now.getFullYear() === lastActive.getFullYear();
          
          let consecutiveDays = state.userStats.consecutiveDays;
          let streakMaximum = state.userStats.streakMaximum;
          
          if (isYesterday) {
            // Increment streak if last active was yesterday
            consecutiveDays += 1;
            
            // Update max streak if current streak is higher
            if (consecutiveDays > streakMaximum) {
              streakMaximum = consecutiveDays;
            }
          } else if (!isToday) {
            // Reset streak if not yesterday and not today
            consecutiveDays = 1;
          }
          
          return {
            userStats: {
              ...state.userStats,
              consecutiveDays,
              streakMaximum,
              lastActive: now.toISOString()
            }
          };
        });
      }
    }),
    {
      name: 'gamification-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);