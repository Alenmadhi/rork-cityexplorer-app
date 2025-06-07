import { create } from 'zustand';
import { EmergencyAlert } from '@/types';
import { emergencyAlerts } from '@/mocks/emergency-alerts';

interface AlertsState {
  alerts: EmergencyAlert[];
  activeAlerts: EmergencyAlert[];
  dismissedAlerts: string[];
  
  // Actions
  fetchAlerts: () => void;
  dismissAlert: (alertId: string) => void;
  isDismissed: (alertId: string) => boolean;
}

export const useAlertsStore = create<AlertsState>((set, get) => ({
  alerts: [],
  activeAlerts: [],
  dismissedAlerts: [],
  
  fetchAlerts: () => {
    // In a real app, this would fetch from an API
    // For now, we'll use our mock data
    const now = new Date();
    
    // Filter for active alerts based on date range
    const active = emergencyAlerts.filter(alert => {
      const startDate = new Date(alert.startDate);
      const endDate = new Date(alert.endDate);
      return alert.active && now >= startDate && now <= endDate;
    });
    
    set({
      alerts: emergencyAlerts,
      activeAlerts: active.filter(alert => !get().dismissedAlerts.includes(alert.id))
    });
  },
  
  dismissAlert: (alertId: string) => {
    set(state => ({
      dismissedAlerts: [...state.dismissedAlerts, alertId],
      activeAlerts: state.activeAlerts.filter(alert => alert.id !== alertId)
    }));
  },
  
  isDismissed: (alertId: string) => {
    return get().dismissedAlerts.includes(alertId);
  }
}));