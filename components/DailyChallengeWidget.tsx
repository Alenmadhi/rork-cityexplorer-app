import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useCityChallenges } from '@/hooks/useCityChallenges';
import { Clock, MapPin } from 'lucide-react-native';

export default function DailyChallengeWidget() {
  const router = useRouter();
  const { dailyChallenge, loading, error } = useCityChallenges();
  
  const handlePress = () => {
    if (dailyChallenge) {
      router.push(`/city-challenges/${dailyChallenge.id}`);
    } else {
      router.push('/city-challenges');
    }
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#0066cc" />
        <Text style={styles.loadingText}>Loading daily challenge...</Text>
      </View>
    );
  }
  
  if (error || !dailyChallenge) {
    return (
      <TouchableOpacity 
        style={[styles.container, styles.errorContainer]} 
        onPress={() => router.push('/city-challenges')}
        activeOpacity={0.7}
      >
        <Text style={styles.errorTitle}>No Daily Challenge Available</Text>
        <Text style={styles.errorText}>Tap to browse all challenges</Text>
      </TouchableOpacity>
    );
  }
  
  // Format expiry time
  const formatExpiryTime = () => {
    const expiryDate = new Date(dailyChallenge.expiresAt);
    const now = new Date();
    const hoursRemaining = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60));
    return `${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''} left`;
  };
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Daily Challenge</Text>
        <View style={styles.timeContainer}>
          <Clock size={14} color="#666" />
          <Text style={styles.timeText}>{formatExpiryTime()}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Image source={{ uri: dailyChallenge.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.challengeTitle}>{dailyChallenge.title}</Text>
          <Text style={styles.description} numberOfLines={2}>{dailyChallenge.description}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={14} color="#666" />
            <Text style={styles.locationText} numberOfLines={1}>{dailyChallenge.location.name}</Text>
          </View>
          
          <View style={styles.rewardContainer}>
            <Text style={styles.rewardText}>
              Reward: {dailyChallenge.reward.points} points + {dailyChallenge.reward.badge.replace('_', ' ')} badge
            </Text>
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
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  content: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  rewardContainer: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  rewardText: {
    fontSize: 12,
    color: '#0066cc',
  },
  loadingContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#0066cc',
  },
});