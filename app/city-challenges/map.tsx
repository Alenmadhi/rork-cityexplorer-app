import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MapPin, Compass, ChevronLeft } from 'lucide-react-native';
import * as Location from 'expo-location';
import Colors from '@/constants/colors';
import { useCityChallengesStore } from '@/stores/city-challenges-store';

export default function ChallengesMapScreen() {
  const router = useRouter();
  const { availableChallenges, dailyChallenge } = useCityChallengesStore();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Request location permission
    if (Platform.OS !== 'web') {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationPermission(status === 'granted');
        
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        }
      })();
    }
  }, []);
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Challenges Map',
        }} 
      />
      <View style={styles.container}>
        {/* Map placeholder - in a real app, this would be a map component */}
        <View style={styles.mapPlaceholder}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?q=80&w=1000&auto=format&fit=crop' }} 
            style={styles.mapImage}
            resizeMode="cover"
          />
          <View style={styles.mapOverlay}>
            <MapPin size={60} color={Colors.primary} />
            <Text style={styles.mapPlaceholderText}>
              {Platform.OS === 'web' 
                ? 'Interactive map available in mobile app' 
                : locationPermission === false 
                  ? 'Location permission required to view map'
                  : 'Map view coming soon'}
            </Text>
            
            {locationPermission === false && Platform.OS !== 'web' && (
              <TouchableOpacity 
                style={styles.permissionButton}
                onPress={async () => {
                  const { status } = await Location.requestForegroundPermissionsAsync();
                  setLocationPermission(status === 'granted');
                  
                  if (status === 'granted') {
                    const location = await Location.getCurrentPositionAsync({});
                    setLocation(location);
                  }
                }}
              >
                <Text style={styles.permissionButtonText}>Grant Permission</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <View style={styles.challengesListContainer}>
          <Text style={styles.challengesListTitle}>
            {availableChallenges.length} Challenges Available
          </Text>
          
          <TouchableOpacity 
            style={styles.listButton}
            onPress={() => router.push('/city-challenges')}
          >
            <Text style={styles.listButtonText}>View List</Text>
          </TouchableOpacity>
        </View>
        
        {location && (
          <View style={styles.locationButton}>
            <Compass size={24} color={Colors.primary} />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mapPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.card,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mapPlaceholderText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  challengesListContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  challengesListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  listButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  listButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  locationButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
});