// This is a mock implementation since backend is removed
// It provides the necessary types and functions to prevent errors
// but doesn't actually connect to any backend

import { createTRPCReact } from '@trpc/react-query';

// Define a minimal router type that satisfies the constraints
export type AppRouter = {
  _def: any;
  createCaller: any;
  // Add other router definitions as needed
};

// Create a mock tRPC React client
export const trpc = createTRPCReact<AppRouter>();

// Mock function for initialization
export const initTRPC = () => {
  console.log('tRPC initialized in mock mode - no backend connection');
  return {
    initialized: true
  };
};

// Export a dummy client for imports that need it
export const trpcClient = {
  query: async () => ({ data: null }),
  mutation: async () => ({ data: null })
};