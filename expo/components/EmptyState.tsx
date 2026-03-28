import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AlertTriangle, Calendar, Heart, MapPin, Newspaper, Search, Info, RefreshCw } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface EmptyStateProps {
  title: string;
  message: string;
  icon: 'alert' | 'calendar' | 'heart' | 'map' | 'newspaper' | 'search' | 'info' | 'refresh';
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, message, icon, actionLabel, onAction }: EmptyStateProps) {
  // Render icon based on type
  const renderIcon = () => {
    switch (icon) {
      case 'alert':
        return <AlertTriangle size={48} color={Colors.textSecondary} />;
      case 'calendar':
        return <Calendar size={48} color={Colors.textSecondary} />;
      case 'heart':
        return <Heart size={48} color={Colors.textSecondary} />;
      case 'map':
        return <MapPin size={48} color={Colors.textSecondary} />;
      case 'newspaper':
        return <Newspaper size={48} color={Colors.textSecondary} />;
      case 'search':
        return <Search size={48} color={Colors.textSecondary} />;
      case 'info':
        return <Info size={48} color={Colors.textSecondary} />;
      case 'refresh':
        return <RefreshCw size={48} color={Colors.textSecondary} />;
      default:
        return <Info size={48} color={Colors.textSecondary} />;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      
      {actionLabel && onAction && (
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onAction}
        >
          <Text style={styles.actionButtonText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
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
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});