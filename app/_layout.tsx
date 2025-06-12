import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useAuthStore } from '@/stores/auth-store';

import { ThemeProvider } from '@/context/theme-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from '@/lib/trpc';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? 'dark' : 'light'}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <RootLayoutNav />
            </AuthProvider>
          </QueryClientProvider>
        </trpc.Provider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();

  // You can add additional auth logic here if needed
  // For example, refreshing tokens, checking auth status, etc.

  return <>{children}</>;
}

function RootLayoutNav() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="badges/index" options={{ presentation: 'card' }} />
          <Stack.Screen name="notifications/index" options={{ presentation: 'card' }} />
          <Stack.Screen name="profile/edit" options={{ presentation: 'card' }} />
          <Stack.Screen name="success-stories/index" options={{ presentation: 'card' }} />
          <Stack.Screen name="success-stories/[id]" options={{ presentation: 'card' }} />
          <Stack.Screen name="challenges/index" options={{ presentation: 'card' }} />
          <Stack.Screen name="challenges/[id]" options={{ presentation: 'card' }} />
          <Stack.Screen name="issues/index" options={{ presentation: 'card' }} />
          <Stack.Screen name="issues/[id]" options={{ presentation: 'card' }} />
          <Stack.Screen name="settings/index" options={{ presentation: 'card' }} />
          <Stack.Screen name="settings/privacy" options={{ presentation: 'card' }} />
          <Stack.Screen name="offline-reports/index" options={{ presentation: 'card' }} />
          <Stack.Screen name="qr-scanner/index" options={{ presentation: 'card' }} />
          <Stack.Screen name="leaderboard/index" options={{ presentation: 'card' }} />
          <Stack.Screen name="news/[id]" options={{ presentation: 'card' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
          <Stack.Screen name="guest/index" options={{ headerShown: false }} />
        </>
      )}
    </Stack>
  );
}