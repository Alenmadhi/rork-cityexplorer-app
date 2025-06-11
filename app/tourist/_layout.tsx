import { Stack } from 'expo-router';
import React from 'react';

export default function TouristLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="transportation" 
        options={{ 
          title: 'Transportation',
          headerBackTitleVisible: false,
        }} 
      />
      <Stack.Screen 
        name="accommodation" 
        options={{ 
          title: 'Accommodation',
          headerBackTitleVisible: false,
        }} 
      />
      <Stack.Screen 
        name="emergency" 
        options={{ 
          title: 'Emergency Services',
          headerBackTitleVisible: false,
        }} 
      />
      <Stack.Screen 
        name="wifi" 
        options={{ 
          title: 'Wi-Fi Access',
          headerBackTitleVisible: false,
        }} 
      />
      <Stack.Screen 
        name="tips" 
        options={{ 
          title: 'Local Tips',
          headerBackTitleVisible: false,
        }} 
      />
    </Stack>
  );
}