import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { CityChallenge } from '@/types';
import { MapPin, Clock, Award, Users } from 'lucide-react-native';

interface ChallengeCardProps {
  challenge: CityChallenge;
  compact?: boolean;
}

export default function ChallengeCard({ challenge, compact = false }: ChallengeCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/city-challenges/${challenge.id}`);
  };
  
  // Format expiry time
  const formatExpiryTime = () => {
    const expiryDate = new Date(challenge.expiresAt);
    const now = new Date();
    
    // If expires today, show hours remaining
    if (expiryDate.toDateString() === now.toDateString()) {
      const hoursRemaining = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60));
      return `${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''} left`;
    }
    
    // Otherwise show the date
    return expiryDate.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  if (compact) {
    return (
      <TouchableOpacity 
        style={styles.compactContainer} 
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Image source={{ uri: challenge.image }} style={styles.compactImage} />
        <View style={styles.compactContent}>
          <Text style={styles.compactTitle} numberOfLines={1}>{challenge.title}</Text>
          <View style={styles.compactMeta}>
            <View style={styles.compactMetaItem}>
              <MapPin size={14} color="#666" />
              <Text style={styles.compactMetaText} numberOfLines={1}>{challenge.location.name}</Text>
            </View>
            <View style={styles.compactMetaItem}>
              <Award size={14} color="#666" />
              <Text style={styles.compactMetaText}>{challenge.reward.points} pts</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: challenge.image }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>
            {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{challenge.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{challenge.description}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <MapPin size={16} color="#666" />
            <Text style={styles.metaText} numberOfLines={1}>{challenge.location.name}</Text>
          </View>
          
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock size={16} color="#666" />
              <Text style={styles.metaText}>{formatExpiryTime()}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Award size={16} color="#666" />
              <Text style={styles.metaText}>{challenge.reward.points} pts</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Users size={16} color="#666" />
              <Text style={styles.metaText}>{challenge.completedBy}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  image: {
    width: '100%',
    height: 160,
  },
  overlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  difficultyBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  metaContainer: {
    marginTop: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  
  // Compact styles
  compactContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    height: 80,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  compactImage: {
    width: 80,
    height: 80,
  },
  compactContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  compactTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  compactMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  compactMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactMetaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});