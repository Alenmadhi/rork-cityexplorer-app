import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function CityChallengesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.text,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Hidden Elbasan',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Challenge Details',
        }}
      />
      <Stack.Screen
        name="map"
        options={{
          title: 'Challenges Map',
        }}
      />
    </Stack>
  );
}