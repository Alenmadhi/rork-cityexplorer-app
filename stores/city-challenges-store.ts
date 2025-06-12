import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CityChallenge, UserChallenge, PuzzlePiece, Puzzle } from '@/types';
import { fetchCityChallenges, fetchDailyChallenge, checkChallengeProximity, completeChallenge } from '@/services/api';
import { cityChallenges as mockChallenges, puzzles as mockPuzzles } from '@/mocks/city-challenges';
import { useGamificationStore } from './gamification-store';

interface CityChallengesState {
  availableChallenges: CityChallenge[];
  dailyChallenge: CityChallenge | null;
  userChallenges: UserChallenge[];
  puzzlePieces: PuzzlePiece[];
  puzzles: Puzzle[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  
  // Actions
  fetchChallenges: () => Promise<void>;
  fetchDailyChallenge: () => Promise<void>;
  checkProximity: (challengeId: string, userLocation: { latitude: number; longitude: number }) => Promise<{ isNearby: boolean; distance: number }>;
  completeChallenge: (challengeId: string, userId: string, photo?: string) => Promise<void>;
  useHint: (challengeId: string) => void;
  addNote: (challengeId: string, note: string) => void;
  shareChallenge: (challengeId: string) => void;
  resetDailyChallenge: () => Promise<void>;
}

export const useCityChallengesStore = create<CityChallengesState>()(
  persist(
    (set, get) => ({
      availableChallenges: mockChallenges,
      dailyChallenge: null,
      userChallenges: [],
      puzzlePieces: [],
      puzzles: mockPuzzles,
      isLoading: false,
      error: null,
      lastUpdated: null,
      
      fetchChallenges: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const challenges = await fetchCityChallenges();
          set({ 
            availableChallenges: challenges,
            isLoading: false,
            lastUpdated: new Date()
          });
        } catch (error) {
          console.error('Error fetching city challenges:', error);
          set({ 
            error: 'Failed to load city challenges. Please try again later.',
            isLoading: false
          });
        }
      },
      
      fetchDailyChallenge: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Check if we already have a valid daily challenge
          const currentDaily = get().dailyChallenge;
          if (currentDaily) {
            const expiryDate = new Date(currentDaily.expiresAt);
            if (expiryDate > new Date()) {
              // Current challenge is still valid
              set({ isLoading: false });
              return;
            }
          }
          
          // Fetch a new daily challenge
          const challenge = await fetchDailyChallenge();
          set({ 
            dailyChallenge: challenge,
            isLoading: false,
            lastUpdated: new Date()
          });
        } catch (error) {
          console.error('Error fetching daily challenge:', error);
          set({ 
            error: 'Failed to load daily challenge. Please try again later.',
            isLoading: false
          });
        }
      },
      
      checkProximity: async (challengeId, userLocation) => {
        try {
          return await checkChallengeProximity(challengeId, userLocation);
        } catch (error) {
          console.error('Error checking proximity:', error);
          return { isNearby: false, distance: 1000 };
        }
      },
      
      completeChallenge: async (challengeId, userId, photo) => {
        set({ isLoading: true, error: null });
        
        try {
          // Call API to complete challenge
          const result = await completeChallenge(challengeId, userId);
          
          if (result.success) {
            // Find the challenge
            const challenge = get().availableChallenges.find(c => c.id === challengeId) || 
                             get().dailyChallenge;
            
            if (!challenge) {
              throw new Error('Challenge not found');
            }
            
            // Update user challenges
            const existingUserChallenge = get().userChallenges.find(
              uc => uc.challengeId === challengeId && uc.userId === userId
            );
            
            if (existingUserChallenge) {
              // Update existing challenge
              set(state => ({
                userChallenges: state.userChallenges.map(uc => 
                  uc.challengeId === challengeId && uc.userId === userId
                    ? { 
                        ...uc, 
                        status: 'completed', 
                        completedAt: new Date().toISOString(),
                        photos: photo ? [...(uc.photos || []), photo] : uc.photos
                      }
                    : uc
                )
              }));
            } else {
              // Create new user challenge record
              set(state => ({
                userChallenges: [
                  ...state.userChallenges,
                  {
                    id: `${userId}_${challengeId}_${Date.now()}`,
                    challengeId,
                    userId,
                    status: 'completed',
                    progress: 1,
                    completedAt: new Date().toISOString(),
                    hints: [],
                    photos: photo ? [photo] : []
                  }
                ]
              }));
            }
            
            // Add puzzle piece if applicable
            if (challenge.reward.puzzlePiece) {
              set(state => ({
                puzzlePieces: [
                  ...state.puzzlePieces,
                  {
                    id: challenge.reward.puzzlePiece || '',
                    image: challenge.image || '',
                    position: parseInt(challenge.reward.puzzlePiece?.split('_')[1] || '0'),
                    collectedAt: new Date().toISOString(),
                    belongsTo: 'puzzle_1' // Assuming all pieces belong to the first puzzle for now
                  }
                ]
              }));
              
              // Check if puzzle is complete
              const updatedPieces = [...get().puzzlePieces, {
                id: challenge.reward.puzzlePiece || '',
                image: challenge.image || '',
                position: parseInt(challenge.reward.puzzlePiece?.split('_')[1] || '0'),
                collectedAt: new Date().toISOString(),
                belongsTo: 'puzzle_1'
              }];
              
              const puzzle = get().puzzles.find(p => p.id === 'puzzle_1');
              if (puzzle) {
                const piecesForPuzzle = updatedPieces.filter(p => p.belongsTo === puzzle.id);
                if (piecesForPuzzle.length === puzzle.totalPieces) {
                  // Puzzle is complete, award extra points and badge
                  const gamificationStore = useGamificationStore.getState();
                  gamificationStore.updateStats({ 
                    points: gamificationStore.userStats.points + puzzle.reward.points 
                  });
                  gamificationStore.unlockBadge(puzzle.reward.badge);
                }
              }
            }
            
            // Update gamification stats
            const gamificationStore = useGamificationStore.getState();
            gamificationStore.updateStats({ 
              points: gamificationStore.userStats.points + result.points 
            });
            
            // Unlock badge if applicable
            if (result.badge) {
              gamificationStore.unlockBadge(result.badge);
            }
            
            set({ isLoading: false });
          } else {
            throw new Error('Failed to complete challenge');
          }
        } catch (error) {
          console.error('Error completing challenge:', error);
          set({ 
            error: 'Failed to complete challenge. Please try again.',
            isLoading: false
          });
        }
      },
      
      useHint: (challengeId) => {
        set(state => {
          // Find the user challenge
          const userChallenge = state.userChallenges.find(uc => uc.challengeId === challengeId);
          
          if (!userChallenge) {
            // Create a new user challenge with a hint used
            return {
              userChallenges: [
                ...state.userChallenges,
                {
                  id: `user_${challengeId}_${Date.now()}`,
                  challengeId,
                  userId: 'current_user', // This would be the actual user ID in a real app
                  status: 'active',
                  progress: 0,
                  hints: [{ used: true, usedAt: new Date().toISOString() }]
                }
              ]
            };
          }
          
          // Update existing user challenge
          return {
            userChallenges: state.userChallenges.map(uc => 
              uc.challengeId === challengeId
                ? { 
                    ...uc, 
                    hints: [...uc.hints, { used: true, usedAt: new Date().toISOString() }]
                  }
                : uc
            )
          };
        });
      },
      
      addNote: (challengeId, note) => {
        set(state => {
          // Find the user challenge
          const userChallenge = state.userChallenges.find(uc => uc.challengeId === challengeId);
          
          if (!userChallenge) {
            // Create a new user challenge with a note
            return {
              userChallenges: [
                ...state.userChallenges,
                {
                  id: `user_${challengeId}_${Date.now()}`,
                  challengeId,
                  userId: 'current_user', // This would be the actual user ID in a real app
                  status: 'active',
                  progress: 0,
                  hints: [],
                  notes: note
                }
              ]
            };
          }
          
          // Update existing user challenge
          return {
            userChallenges: state.userChallenges.map(uc => 
              uc.challengeId === challengeId
                ? { ...uc, notes: note }
                : uc
            )
          };
        });
      },
      
      shareChallenge: (challengeId) => {
        set(state => {
          // Find the user challenge
          const userChallenge = state.userChallenges.find(uc => uc.challengeId === challengeId);
          
          if (!userChallenge) {
            return state;
          }
          
          // Update existing user challenge
          return {
            userChallenges: state.userChallenges.map(uc => 
              uc.challengeId === challengeId
                ? { ...uc, sharedAt: new Date().toISOString() }
                : uc
            )
          };
        });
      },
      
      resetDailyChallenge: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Fetch a new daily challenge
          const challenge = await fetchDailyChallenge();
          set({ 
            dailyChallenge: challenge,
            isLoading: false,
            lastUpdated: new Date()
          });
        } catch (error) {
          console.error('Error resetting daily challenge:', error);
          set({ 
            error: 'Failed to reset daily challenge. Please try again later.',
            isLoading: false
          });
        }
      }
    }),
    {
      name: 'city-challenges-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);