import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CityChallenge } from '@/types';

interface CompletedChallenge {
  id: string;
  completedAt: string;
  points: number;
  badge: string;
}

interface CityChallengesState {
  completedChallenges: CompletedChallenge[];
  totalPoints: number;
  badges: string[];
  puzzlePieces: string[];
  
  // Actions
  completeChallenge: (challenge: CityChallenge) => void;
  resetProgress: () => void;
  hasPuzzlePiece: (pieceId: string) => boolean;
  hasCompletedChallenge: (challengeId: string) => boolean;
}

export const useCityChallengesStore = create<CityChallengesState>()(
  persist(
    (set, get) => ({
      completedChallenges: [],
      totalPoints: 0,
      badges: [],
      puzzlePieces: [],
      
      completeChallenge: (challenge: CityChallenge) => {
        // Check if already completed
        if (get().hasCompletedChallenge(challenge.id)) {
          return;
        }
        
        const newCompletedChallenge: CompletedChallenge = {
          id: challenge.id,
          completedAt: new Date().toISOString(),
          points: challenge.reward.points,
          badge: challenge.reward.badge,
        };
        
        set(state => ({
          completedChallenges: [...state.completedChallenges, newCompletedChallenge],
          totalPoints: state.totalPoints + challenge.reward.points,
          badges: state.badges.includes(challenge.reward.badge) 
            ? state.badges 
            : [...state.badges, challenge.reward.badge],
          puzzlePieces: state.puzzlePieces.includes(challenge.reward.puzzlePiece)
            ? state.puzzlePieces
            : [...state.puzzlePieces, challenge.reward.puzzlePiece],
        }));
      },
      
      resetProgress: () => {
        set({
          completedChallenges: [],
          totalPoints: 0,
          badges: [],
          puzzlePieces: [],
        });
      },
      
      hasPuzzlePiece: (pieceId: string) => {
        return get().puzzlePieces.includes(pieceId);
      },
      
      hasCompletedChallenge: (challengeId: string) => {
        return get().completedChallenges.some(c => c.id === challengeId);
      },
    }),
    {
      name: 'city-challenges-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);