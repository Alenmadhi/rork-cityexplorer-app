import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { AlertTriangle, Camera, WifiOff, Award, MapPin, Wrench, Map } from 'lucide-react-native';
import * as Location from 'expo-location';
import Colors from '@/constants/colors';
import { EmergencyAlertCarousel } from '@/components/EmergencyAlertCarousel';
import { useAlertsStore } from '@/stores/alerts-store';
import { useSuccessStoriesStore } from '@/stores/success-stories-store';
import { useAuthStore } from '@/stores/auth-store';
import { useGamificationStore } from '@/stores/gamification-store';
import { useChallengesStore } from '@/stores/challenges-store';
import { SuccessStoryCard } from '@/components/SuccessStoryCard';
import { DailyChallengeWidget } from '@/components/DailyChallengeWidget';
import NetInfo from '@react-native-community/netinfo';
import { WeatherCard } from '@/components/WeatherCard';
import { SuccessStory, EmergencyAlert } from '@/types';
import { useWeather } from '@/hooks/useWeather';
import { tours } from '@/mocks/tours';

// Define proper types for location data
type Coordinate = {
  latitude: number;
  longitude: number;
};

export default function HomeScreen() {
  const router = useRouter();
  const { alerts, fetchAlerts } = useAlertsStore();
  const { stories, fetchStories } = useSuccessStoriesStore();
  const { user } = useAuthStore();
  const { userStats, userAchievements, fetchBadges } = useGamificationStore();
  const { fetchChallenges } = useChallengesStore();
  const { weather, refreshWeather } = useWeather();
  
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [nearbyIssues, setNearbyIssues] = useState<any[]>([]);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  
  // Use useCallback to prevent unnecessary re-renders
  const fetchNearbyIssues = useCallback(async () => {
    // Mock data for nearby issues
    const mockIssues = [
      {
        id: '1',
        title: 'Pothole on Main Street',
        description: 'Large pothole causing traffic issues',
        location: 'Main Street',
        coordinates: {
          latitude: 41.1123,
          longitude: 20.0826
        },
        type: 'Road Damage'
      },
      {
        id: '2',
        title: 'Broken Street Light',
        description: 'Street light not working for 3 days',
        location: 'Park Avenue',
        coordinates: {
          latitude: 41.1153,
          longitude: 20.0856
        },
        type: 'Broken Light'
      },
      {
        id: '3',
        title: 'Trash Overflow',
        description: 'Trash containers overflowing near the market',
        location: 'Market Square',
        coordinates: {
          latitude: 41.1103,
          longitude: 20.0796
        },
        type: 'Trash'
      }
    ];
    
    setNearbyIssues(mockIssues);
  }, []);
  
  useEffect(() => {
    let isMounted = true;
    
    // Fetch data only if component is mounted
    const fetchData = async () => {
      if (isMounted) {
        fetchAlerts();
        fetchStories();
        fetchChallenges();
        fetchNearbyIssues();
      }
    };
    
    fetchData();
    
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      if (isMounted) {
        setIsConnected(state.isConnected);
      }
    });
    
    // Request location permission
    (async () => {
      if (Platform.OS !== 'web' && isMounted) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (isMounted) {
          setLocationPermission(status === 'granted');
          
          if (status === 'granted') {
            const locationData = await Location.getCurrentPositionAsync({});
            if (isMounted) {
              setLocation(locationData);
            }
          }
        }
      }
    })();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [fetchAlerts, fetchStories, fetchChallenges, fetchNearbyIssues]);
  
  // Get active alerts - safely handle undefined alerts
  const activeAlerts = alerts ? alerts.filter(alert => alert.active) : [];
  
  // Convert Alert[] to EmergencyAlert[]
  const emergencyAlerts: EmergencyAlert[] = activeAlerts.map(alert => ({
    id: alert.id,
    title: alert.title,
    message: alert.message,
    type: alert.type,
    active: alert.active,
    date: alert.createdAt || new Date().toISOString(),
    link: alert.link
  }));
  
  // Get featured success stories - safely handle undefined stories
  const featuredStories: SuccessStory[] = stories ? stories.filter(story => story.featured).slice(0, 1) : [];
  
  // Get earned badges count - safely handle undefined userAchievements
  const earnedBadgesCount = userAchievements ? userAchievements.length : 0;
  
  // Get featured tours
  const featuredTours = tours.filter(tour => tour.featured).slice(0, 1);

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Elbasan City',
          headerLargeTitle: true,
        }} 
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Emergency Alerts Carousel */}
        {emergencyAlerts && emergencyAlerts.length > 0 && (
          <EmergencyAlertCarousel alerts={emergencyAlerts} />
        )}
        
        {/* Offline Mode Banner */}
        {isConnected === false && (
          <View style={styles.offlineBanner}>
            <WifiOff size={20} color="#fff" />
            <Text style={styles.offlineText}>
              You are offline. Reports will be saved locally.
            </Text>
          </View>
        )}
        
        {/* Weather Card */}
        <WeatherCard weather={weather} onRefresh={refreshWeather} />
        
        {/* Tours Promo */}
        {featuredTours.length > 0 && (
          <View style={styles.toursPromoContainer}>
            <View style={styles.toursPromoHeader}>
              <Text style={styles.toursPromoTitle}>Explore Like a Local</Text>
              <TouchableOpacity onPress={() => router.push('/tourist/tours')}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.tourCard}>
              <Image 
                source={{ uri: featuredTours[0].image }} 
                style={styles.tourImage}
                resizeMode="cover"
              />
              <View style={styles.tourOverlay}>
                <Text style={styles.tourTitle}>{featuredTours[0].title}</Text>
                <Text style={styles.tourDescription} numberOfLines={2}>
                  {featuredTours[0].description}
                </Text>
                <TouchableOpacity 
                  style={styles.tourButton}
                  onPress={() => router.push(`/tourist/tours/${featuredTours[0].id}`)}
                >
                  <Map size={16} color="#fff" />
                  <Text style={styles.tourButtonText}>View Tour</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        
        {/* Daily Challenge Widget */}
        <DailyChallengeWidget />
        
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push('/(tabs)/services')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: `${Colors.primary}20` }]}>
                <AlertTriangle size={24} color={Colors.primary} />
              </View>
              <Text style={styles.quickActionText}>City Services</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push('/qr-scanner')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: `${Colors.secondary}20` }]}>
                <Camera size={24} color={Colors.secondary} />
              </View>
              <Text style={styles.quickActionText}>Scan QR Code</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push('/offline-reports')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: `${Colors.warning}20` }]}>
                <WifiOff size={24} color={Colors.warning} />
              </View>
              <Text style={styles.quickActionText}>Offline Reports</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push('/tourist/tours')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: `${Colors.success}20` }]}>
                <Map size={24} color={Colors.success} />
              </View>
              <Text style={styles.quickActionText}>Explore Tours</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* User Stats */}
        {user && userStats && (
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Your Contribution</Text>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <AlertTriangle size={20} color={Colors.primary} />
                <Text style={styles.statValue}>{userStats?.reportsSubmitted || 0}</Text>
                <Text style={styles.statLabel}>Reports</Text>
              </View>
              
              <View style={styles.statItem}>
                <Award size={20} color={Colors.primary} />
                <Text style={styles.statValue}>{earnedBadgesCount}</Text>
                <Text style={styles.statLabel}>Badges</Text>
              </View>
              
              <View style={styles.statItem}>
                <Wrench size={20} color={Colors.primary} />
                <Text style={styles.statValue}>{userStats?.reportsResolved || 0}</Text>
                <Text style={styles.statLabel}>Resolved</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.leaderboardButton}
              onPress={() => router.push('/leaderboard')}
            >
              <Text style={styles.leaderboardButtonText}>View Leaderboard</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Success Story Spotlight */}
        {featuredStories && featuredStories.length > 0 && (
          <View style={styles.successStoriesContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Fix of the Week</Text>
              <TouchableOpacity onPress={() => router.push('/success-stories')}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {featuredStories.map((story) => (
              <SuccessStoryCard 
                key={story.id} 
                story={story} 
                featured={true}
              />
            ))}
          </View>
        )}
        
        {/* Nearby Issues Map */}
        <View style={styles.nearbyIssuesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Issues</Text>
            <TouchableOpacity onPress={() => router.push('/issues')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.mapContainer}>
            {/* Map is replaced with a static image for all platforms to avoid native module issues */}
            <View style={styles.mapPlaceholderContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?q=80&w=1000&auto=format&fit=crop' }} 
                style={styles.staticMapImage}
                resizeMode="cover"
              />
              <View style={styles.mapOverlay}>
                <MapPin size={40} color={Colors.primary} />
                <Text style={styles.mapOverlayText}>
                  {Platform.OS === 'web' 
                    ? 'Interactive map available in mobile app' 
                    : locationPermission === false 
                      ? 'Location permission required to view map'
                      : 'Tap to view nearby issues'}
                </Text>
                <TouchableOpacity 
                  style={styles.viewMapButton}
                  onPress={() => {
                    if (Platform.OS !== 'web' && locationPermission === false) {
                      // Request permission again
                      (async () => {
                        const { status } = await Location.requestForegroundPermissionsAsync();
                        setLocationPermission(status === 'granted');
                        
                        if (status === 'granted') {
                          const location = await Location.getCurrentPositionAsync({});
                          setLocation(location);
                        }
                      })();
                    } else {
                      router.push('/issues');
                    }
                  }}
                >
                  <Text style={styles.viewMapButtonText}>
                    {Platform.OS === 'web' 
                      ? 'View Issues List' 
                      : locationPermission === false 
                        ? 'Grant Permission'
                        : 'View Issues'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.viewMapButton}
              onPress={() => router.push('/issues')}
            >
              <MapPin size={16} color="#fff" />
              <Text style={styles.viewMapText}>View Full Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warning,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  offlineText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  toursPromoContainer: {
    marginBottom: 24,
    backgroundColor: `${Colors.primary}05`,
    borderRadius: 12,
    padding: 16,
  },
  toursPromoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  toursPromoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
  },
  tourCard: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
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
  tourImage: {
    width: '100%',
    height: '100%',
  },
  tourOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  tourTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  tourDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  tourButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  tourButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  quickActionsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
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
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  statsCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  leaderboardButton: {
    backgroundColor: `${Colors.primary}15`,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  leaderboardButtonText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  successStoriesContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
  },
  nearbyIssuesContainer: {
    marginBottom: 24,
  },
  mapContainer: {
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  mapPlaceholderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  permissionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  viewMapButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 10,
  },
  viewMapText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  viewMapButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  staticMapImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
  },
  mapOverlayText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16,
    fontWeight: '500',
  },
});