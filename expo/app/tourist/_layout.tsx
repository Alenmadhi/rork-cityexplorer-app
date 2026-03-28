import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function TouristLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Tourist Information',
        }}
      />
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
        name="wifi"
        options={{
          title: 'Wi-Fi Spots',
        }}
      />
      <Stack.Screen
        name="tips"
        options={{
          title: 'Local Tips',
        }}
      />
      <Stack.Screen
        name="emergency"
        options={{
          title: 'Emergency Info',
        }}
      />
      <Stack.Screen
        name="phrasebook"
        options={{
          title: 'Phrasebook',
        }}
      />
      <Stack.Screen
        name="tours"
        options={{
          title: 'Guided Tours',
        }}
      />
      <Stack.Screen
        name="map"
        options={{
          title: 'City Map',
        }}
      />
      <Stack.Screen
        name="shops"
        options={{
          title: 'Local Shops',
        }}
      />
      <Stack.Screen
        name="shops/[id]"
        options={{
          title: 'Shop Details',
        }}
      />
      <Stack.Screen
        name="tours/[id]"
        options={{
          title: 'Tour Details',
        }}
      />
    </Stack>
  );
}