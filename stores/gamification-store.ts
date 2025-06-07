import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Badge, UserStats } from '@/types';
import { mockBadges } from '@/mocks/badges';

interface GamificationState {
  badges: Badge[];
  userStats: UserStats;
  fetchBadges: () => Promise<void>;
  unlockBadge: (badgeId: string) => void;
  updateStats: (stats: Partial<UserStats>) => void;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      badges: [],
      userStats: {
        reportsSubmitted: 0,
        reportsResolved: 0,
        upvotesReceived: 0,
        commentsPosted: 0,
        badgesEarned: 0,
      },
      
      fetchBadges: async () => {
        try {
          // In a real app, this would be an API call
          // For now, we'll use mock data
          set({ badges: mockBadges });
        } catch (error) {
          console.error('Failed to fetch badges:', error);
        }
      },
      
      unlockBadge: (badgeId: string) => {
        set((state) => {
          const updatedBadges = state.badges.map(badge => 
            badge.id === badgeId ? { ...badge, unlocked: true } : badge
          );
          
          const badgesEarned = updatedBadges.filter(badge => badge.unlocked).length;
          
          return {
            badges: updatedBadges,
            userStats: {
              ...state.userStats,
              badgesEarned
            }
          };
        });
      },
      
      updateStats: (stats: Partial<UserStats>) => {
        set((state) => ({
          userStats: {
            ...state.userStats,
            ...stats
          }
        }));
        
        // Check if any badges should be unlocked based on new stats
        const { badges, userStats } = get();
        
        badges.forEach(badge => {
          if (badge.unlocked) return;
          
          const { criteria } = badge;
          
          if (criteria.type === 'reports' && userStats.reportsSubmitted >= criteria.count) {
            get().unlockBadge(badge.id);
          } else if (criteria.type === 'upvotes' && userStats.upvotesReceived >= criteria.count) {
            get().unlockBadge(badge.id);
          } else if (criteria.type === 'comments' && userStats.commentsPosted >= criteria.count) {
            get().unlockBadge(badge.id);
          } else if (criteria.type === 'fixes' && userStats.reportsResolved >= criteria.count) {
            get().unlockBadge(badge.id);
          }
        });
      },
    }),
    {
      name: 'gamification-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);