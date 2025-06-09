import { createTRPCReact } from '@trpc/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import Constants from 'expo-constants';
import type { AppRouter } from '@/backend/trpc/app-router';
import { useAuthStore } from '@/stores/auth-store';
import superjson from 'superjson';

// Get the API URL from the manifest extra
const getBaseUrl = () => {
  // If in development, use the localhost URL
  if (__DEV__) {
    const localhost = Constants.expoConfig?.hostUri?.split(':')[0] || 'localhost';
    return `http://${localhost}:3000/api`;
  }
  
  // In production, use the deployed API URL
  return 'https://your-production-api.com/api';
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