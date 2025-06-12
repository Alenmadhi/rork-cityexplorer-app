import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack, Redirect } from 'expo-router';

export default function CityChallengesTab() {
  // Redirect to the city challenges screen
  return <Redirect href="/city-challenges" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});