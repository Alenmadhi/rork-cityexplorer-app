import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  role?: 'user' | 'admin' | 'moderator';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | undefined;
  login: (user: User, token?: string | undefined) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: undefined,
      
      login: (user: User, token = undefined) => set({ 
        user, 
        isAuthenticated: true,
        token
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        token: undefined
      }),
      
      updateUser: (userData: Partial<User>) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null
      })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);