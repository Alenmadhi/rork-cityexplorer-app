import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Clock } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface LastUpdatedProps {
  date: string;
}

export function LastUpdated({ date }: LastUpdatedProps) {
  const formatDate = (dateString: string) => {
    const updateDate = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - updateDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      return updateDate.toLocaleString();
    }
  };
  
  return (
    <View style={styles.container}>
      <Clock size={14} color={Colors.textSecondary} />
      <Text style={styles.text}>Last updated: {formatDate(date)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  text: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
});