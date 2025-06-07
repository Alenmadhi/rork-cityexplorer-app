import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface EmptyStateProps {
  title: string;
  message: string;
  onRefresh?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  message, 
  onRefresh 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      
      {onRefresh && (
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <RefreshCw size={16} color={Colors.primary} />
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: 8,
  },
  refreshText: {
    color: Colors.primary,
    fontWeight: '500',
  },
});