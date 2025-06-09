import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Clock } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface LastUpdatedProps {
  date: string;
}

export const LastUpdated: React.FC<LastUpdatedProps> = ({ date }) => {
  const formatDate = (dateString: string) => {
    try {
      const now = new Date();
      const updated = new Date(dateString);
      
      // Calculate time difference in milliseconds
      const diff = now.getTime() - updated.getTime();
      
      // Convert to minutes, hours, days
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      
      if (minutes < 1) {
        return 'Just now';
      } else if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
      } else if (hours < 24) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
      } else if (days < 7) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
      } else {
        return updated.toLocaleDateString();
      }
    } catch (error) {
      return 'Unknown';
    }
  };

  return (
    <View style={styles.container}>
      <Clock size={14} color={Colors.textSecondary} />
      <Text style={styles.text}>Last updated: {formatDate(date)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
});