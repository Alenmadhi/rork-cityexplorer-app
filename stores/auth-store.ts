import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isGuest: boolean;
  login: (credentials: { email: string; password?: string; isGuest: boolean }) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  signup: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  bio: 'Passionate about making our city better!',
  phone: '+355 69 123 4567',
  address: 'Rruga Qemal Stafa, Tirana',
  website: 'johndoe.com',
  createdAt: '2024-12-15T10:30:00Z',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isGuest: false,
      
      login: async (credentials: { email: string; password?: string; isGuest: boolean }) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // For demo purposes, always succeed with mock user
          set({ 
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
            isGuest: credentials.isGuest
          });
        } catch (error) {
          set({ 
            error: 'Invalid email or password',
            isLoading: false
          });
        }
      },
      
      loginAsGuest: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Create a guest user
          const guestUser: User = {
            id: `guest-${Date.now()}`,
            name: 'Guest User',
            email: 'guest@example.com',
            createdAt: new Date().toISOString(),
          };
          
          set({ 
            user: guestUser,
            isAuthenticated: true,
            isLoading: false,
            isGuest: true
          });
        } catch (error) {
          set({ 
            error: 'Failed to continue as guest',
            isLoading: false
          });
        }
      },
      
      signup: async (userData: Partial<User>) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Create a new user with the provided data and some defaults
          const newUser: User = {
            id: Math.random().toString(36).substring(2, 9),
            name: userData.name || 'New User',
            email: userData.email || 'user@example.com',
            createdAt: new Date().toISOString(),
            ...userData,
          };
          
          set({ 
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
            isGuest: false
          });
        } catch (error) {
          set({ 
            error: 'Failed to create account',
            isLoading: false
          });
        }
      },
      
      logout: () => {
        set({ 
          user: null,
          isAuthenticated: false,
          isGuest: false
        });
      },
      
      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);