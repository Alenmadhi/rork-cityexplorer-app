import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Award, Compass, ChevronRight } from 'lucide-react-native';
import * as Location from 'expo-location';
import Colors from '@/constants/colors';
import { useCityChallengesStore } from '@/stores/city-challenges-store';

export function DailyChallengeWidget() {
  const router = useRouter();
  const { 
    dailyChallenge, 
    fetchDailyChallenge,
    checkProximity,
    userChallenges
  } = useCityChallengesStore();
  
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [proximity, setProximity] = useState<{ isNearby: boolean; distance: number } | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch daily challenge if not already loaded
    if (!dailyChallenge) {
      fetchDailyChallenge();
    }
    
    // Get user location if on mobile
    if (Platform.OS !== 'web') {
      (async () => {
        const { status } = await Location.getForegroundPermissionsAsync();
        
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          
          // Check proximity if we have a challenge
          if (dailyChallenge) {
            const result = await checkProximity(dailyChallenge.id, {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            });
            setProximity(result);
          }
        }
      })();
    }
    
    setLoading(false);
  }, [dailyChallenge]);
  
  // Check if challenge is completed
  const isCompleted = dailyChallenge && userChallenges.some(
    uc => uc.challengeId === dailyChallenge.id && uc.status === 'completed'
  );
  
  // Format distance
  const formatDistance = (meters?: number) => {
    if (!meters) return 'Unknown';
    
    if (meters < 1000) {
      return `${Math.round(meters)}m away`;
    }
    return `${(meters / 1000).toFixed(1)}km away`;
  };
  
  if (loading || !dailyChallenge) {
    return null;
  }
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push('/city-challenges')}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Mystery Challenge</Text>
          
          {isCompleted ? (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>Completed</Text>
            </View>
          ) : (
            <Award size={20} color={Colors.primary} />
          )}
        </View>
        
        <Text style={styles.challengeTitle} numberOfLines={1}>
          {dailyChallenge.title}
        </Text>
        
        <Text style={styles.clue} numberOfLines={2}>
          "{dailyChallenge.clue}"
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={Colors.textSecondary} />
            <Text style={styles.locationText} numberOfLines={1}>
              {dailyChallenge.location.name}
            </Text>
          </View>
          
          {proximity && (
            <View style={styles.distanceContainer}>
              <Compass size={16} color={proximity.isNearby ? Colors.success : Colors.textSecondary} />
              <Text style={[
                styles.distanceText, 
                { color: proximity.isNearby ? Colors.success : Colors.textSecondary }
              ]}>
                {proximity.isNearby ? 'Nearby!' : formatDistance(proximity.distance)}
              </Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.arrowContainer}>
        <ChevronRight size={20} color={Colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
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
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  completedBadge: {
    backgroundColor: `${Colors.success}20`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  completedText: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '500',
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  clue: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    marginLeft: 4,
  },
  arrowContainer: {
    justifyContent: 'center',
    marginLeft: 8,
  },
});