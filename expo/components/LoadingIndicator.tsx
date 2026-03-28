import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import Colors from '@/constants/colors';

interface LoadingIndicatorProps {
  message?: string;
}

export function LoadingIndicator({ message }: LoadingIndicatorProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});