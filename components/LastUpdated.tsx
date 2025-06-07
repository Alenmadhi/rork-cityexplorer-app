import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Clock } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface LastUpdatedProps {
  date: Date | null;
}

export const LastUpdated: React.FC<LastUpdatedProps> = ({ date }) => {
  if (!date) return null;
  
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  };

  return (
    <View style={styles.container}>
      <Clock size={12} color={Colors.textSecondary} />
      <Text style={styles.text}>Updated {formatTimeAgo(date)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});