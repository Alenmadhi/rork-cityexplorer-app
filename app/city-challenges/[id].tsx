import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { MapPin, Award, Clock, Users, Navigation, Check } from 'lucide-react-native';
import { cityChallenges } from '@/mocks/city-challenges';
import { checkChallengeProximity, completeChallenge } from '@/services/api';
import * as Location from 'expo-location';

export default function ChallengeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const challenge = cityChallenges.find(c => c.id === id);
  
  const [loading, setLoading] = useState(false);
  const [isNearby, setIsNearby] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    // Check if the challenge exists
    if (!challenge) {
      Alert.alert('Error', 'Challenge not found');
      router.back();
    }
  }, [challenge, router]);
  
  const checkLocation = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not Available', 'Location checking is not available on web.');
      return;
    }
    
    setLoading(true);
    setLocationError(null);
    
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setLocationError('Permission to access location was denied');
        setLoading(false);
        return;
      }
      
      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      
      // Check if user is near the challenge location
      const result = await checkChallengeProximity(id, {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      setIsNearby(result.isNearby);
      setDistance(result.distance);
      
      if (result.isNearby) {
        Alert.alert('Success!', 'You are at the right location! Complete the challenge to claim your reward.');
      } else {
        Alert.alert('Not quite there', `You are approximately ${Math.round(result.distance)} meters away from the challenge location.`);
      }
    } catch (error) {
      console.error('Error checking location:', error);
      setLocationError('Failed to get your location. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCompleteChallenge = async () => {
    if (!isNearby) {
      Alert.alert('Not at Location', 'You need to be at the challenge location to complete it.');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, you would use the actual user ID
      const result = await completeChallenge(id, 'user123');
      
      if (result.success) {
        setCompleted(true);
        Alert.alert(
          'Challenge Completed!', 
          `Congratulations! You've earned ${result.points} points and the "${result.badge}" badge.`,
          [
            { text: 'OK', onPress: () => router.push('/city-challenges') }
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to complete the challenge. Please try again.');
      }
    } catch (error) {
      console.error('Error completing challenge:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!challenge) {
    return null; // This will prevent rendering if challenge is not found
  }
  
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
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: challenge.title,
          headerTitleStyle: { fontSize: 18 }
        }} 
      />
      
      <ScrollView style={styles.container}>
        <Image source={{ uri: challenge.image }} style={styles.image} />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>
                {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
              </Text>
            </View>
            
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>
                {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
              </Text>
            </View>
          </View>
          
          <Text style={styles.title}>{challenge.title}</Text>
          <Text style={styles.description}>{challenge.description}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <MapPin size={18} color="#666" />
              <Text style={styles.metaText}>{challenge.location.name}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Clock size={18} color="#666" />
              <Text style={styles.metaText}>{formatExpiryTime()}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Award size={18} color="#666" />
              <Text style={styles.metaText}>{challenge.reward.points} points</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Users size={18} color="#666" />
              <Text style={styles.metaText}>{challenge.completedBy} completed</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Clue</Text>
            <View style={styles.clueContainer}>
              <Text style={styles.clueText}>{challenge.clue}</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location Hint</Text>
            <Text style={styles.hintText}>{challenge.location.hint}</Text>
          </View>
          
          {distance !== null && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Status</Text>
              <View style={styles.statusContainer}>
                {isNearby ? (
                  <View style={styles.statusSuccess}>
                    <Check size={18} color="#4CAF50" />
                    <Text style={styles.statusSuccessText}>You are at the right location!</Text>
                  </View>
                ) : (
                  <View style={styles.statusPending}>
                    <Text style={styles.statusPendingText}>
                      You are approximately {Math.round(distance)} meters away
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
          
          {locationError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{locationError}</Text>
            </View>
          )}
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.checkLocationButton} 
              onPress={checkLocation}
              disabled={loading || completed}
            >
              <Navigation size={20} color="#fff" />
              <Text style={styles.buttonText}>Check Location</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.completeButton, 
                (!isNearby || completed) && styles.disabledButton
              ]} 
              onPress={handleCompleteChallenge}
              disabled={!isNearby || loading || completed}
            >
              <Check size={20} color="#fff" />
              <Text style={styles.buttonText}>
                {completed ? 'Completed' : 'Complete Challenge'}
              </Text>
            </TouchableOpacity>
          </View>
          
          {completed && (
            <View style={styles.rewardSection}>
              <Text style={styles.rewardTitle}>Reward Unlocked!</Text>
              <Text style={styles.rewardStory}>{challenge.reward.story}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  difficultyBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  typeBadge: {
    backgroundColor: '#e6f2ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0066cc',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
  },
  metaContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
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
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaText: {
    fontSize: 15,
    color: '#555',
    marginLeft: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  clueContainer: {
    backgroundColor: '#fff9e6',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  clueText: {
    fontSize: 16,
    color: '#664d00',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  hintText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  statusContainer: {
    marginTop: 8,
  },
  statusSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 12,
    borderRadius: 8,
  },
  statusSuccessText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#2e7d32',
    fontWeight: '500',
  },
  statusPending: {
    backgroundColor: '#fff3e0',
    padding: 12,
    borderRadius: 8,
  },
  statusPendingText: {
    fontSize: 15,
    color: '#e65100',
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 15,
    color: '#c62828',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  checkLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066cc',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  rewardSection: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 8,
  },
  rewardStory: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
});