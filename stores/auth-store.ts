import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name?: string;
  isGuest: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials, isGuest: boolean) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (credentials: LoginCredentials, isGuest: boolean) => {
        set({ isLoading: true, error: null });
        
        try {
          // In a real app, this would be an API call
          // For demo purposes, we'll simulate a successful login
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Create a user object
          const user: User = {
            id: isGuest ? 'guest-user' : 'user-1',
            email: credentials.email,
            name: isGuest ? 'Guest User' : undefined,
            isGuest
          };
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: 'Authentication failed', 
            isLoading: false 
          });
          throw new Error('Authentication failed');
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        
        try {
          // In a real app, this would be an API call
          // For demo purposes, we'll simulate a successful logout
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: 'Logout failed', 
            isLoading: false 
          });
          throw new Error('Logout failed');
        }
      },
      
      updateUser: async (userData: Partial<User>) => {
        set({ isLoading: true });
        
        try {
          // In a real app, this would be an API call
          // For demo purposes, we'll simulate a successful update
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => ({ 
            user: state.user ? { ...state.user, ...userData } : null,
            isLoading: false 
          }));
        } catch (error) {
          set({ 
            error: 'Update failed', 
            isLoading: false 
          });
          throw new Error('Update failed');
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);