import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'danger';
  active: boolean;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
  affectedAreas?: string[];
  severity?: 'low' | 'medium' | 'high';
  expectedDuration?: string;
  contactInfo?: string;
}

interface AlertsState {
  alerts: Alert[];
  isLoading: boolean;
  error: string | null;
  fetchAlerts: () => Promise<void>;
  markAsRead: (id: string) => void;
}

// Mock alerts data
const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "Flash Flood Warning",
    message: "Potential flooding in downtown area. Stay alert.",
    type: "warning",
    active: true,
    link: "/alerts/1",
  },
  {
    id: "2",
    title: "Road Closure",
    message: "Main Street closed for maintenance until Friday.",
    type: "info",
    active: true,
    link: "/alerts/2",
  },
  {
    id: "3",
    title: "Power Outage",
    message: "Scheduled power outage in North District on Tuesday.",
    type: "info",
    active: true,
    link: "/alerts/3",
  },
];

export const useAlertsStore = create<AlertsState>()(
  persist(
    (set) => ({
      alerts: [],
      isLoading: false,
      error: null,
      
      fetchAlerts: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call with a delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Use mock data
          set({ alerts: mockAlerts, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch alerts', 
            isLoading: false 
          });
        }
      },
      
      markAsRead: (id: string) => {
        set((state) => ({
          alerts: state.alerts.map(alert => 
            alert.id === id ? { ...alert, active: false } : alert
          )
        }));
      },
    }),
    {
      name: 'alerts-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);