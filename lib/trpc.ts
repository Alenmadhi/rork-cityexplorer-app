import { createTRPCReact } from '@trpc/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import Constants from 'expo-constants';
import { useAuthStore } from '@/stores/auth-store';
import superjson from 'superjson';

// Mock AppRouter type since we're removing the backend
export type AppRouter = {
  example: {
    hi: any;
    hello: any;
  };
  auth: {
    signup: any;
    login: any;
    me: any;
  };
  alerts: {
    getAll: any;
    getById: any;
    create: any;
    update: any;
    delete: any;
  };
  events: {
    getAll: any;
    getById: any;
    create: any;
    update: any;
    delete: any;
  };
  issues: {
    getAll: any;
    getById: any;
    create: any;
    vote: any;
    comment: any;
    updateStatus: any;
  };
  services: {
    getAll: any;
    getById: any;
    getSchedule: any;
    applyForPermit: any;
    getPermitStatus: any;
  };
  admin: {
    getDashboardStats: any;
    getUsersList: any;
    updateUserRole: any;
  };
};

// Get the API URL from the manifest extra
const getBaseUrl = () => {
  // Since we're removing the backend, we'll just return a mock URL
  return 'https://mock-api.example.com/api';
};

// Create a tRPC client
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/trpc`,
      headers() {
        const { token } = useAuthStore.getState();
        
        return {
          Authorization: token ? `Bearer ${token}` : '',
        };
      },
      transformer: superjson,
    }),
  ],
});

// Create a tRPC React client
export const trpc = createTRPCReact<AppRouter>();