import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Award, Lock } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Badge } from '@/types';

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
  earnedDate?: string;
  onPress?: () => void;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ 
  badge, 
  earned, 
  earnedDate,
  onPress
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, earned && styles.earnedContainer]} 
      onPress={onPress}
      activeOpacity={0.8}
      disabled={!onPress}
    >
      <View style={styles.imageContainer}>
        {earned ? (
          <Image
            source={{ uri: badge.image }}
            style={styles.image}
            contentFit="cover"
          />
        ) : (
          <View style={styles.lockedOverlay}>
            <Lock size={24} color="#fff" />
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{badge.name}</Text>
          {earned && (
            <Award size={16} color={Colors.primary} />
          )}
        </View>
        
        <Text style={styles.description}>{badge.description}</Text>
        
        {earned && earnedDate && (
          <Text style={styles.earnedDate}>Earned on {formatDate(earnedDate)}</Text>
        )}
        
        {!earned && (
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Not yet earned</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  earnedContainer: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    backgroundColor: Colors.border,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  earnedDate: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});