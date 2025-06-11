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
        }} 
      />
      <Stack.Screen 
        name="accommodation" 
        options={{ 
          title: 'Accommodation',
        }} 
      />
      <Stack.Screen 
        name="emergency" 
        options={{ 
          title: 'Emergency Services',
        }} 
      />
      <Stack.Screen 
        name="wifi" 
        options={{ 
          title: 'Wi-Fi Access',
        }} 
      />
      <Stack.Screen 
        name="tips" 
        options={{ 
          title: 'Local Tips',
        }} 
      />
    </Stack>
  );
}