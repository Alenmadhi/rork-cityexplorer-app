import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useCityChallenges } from '@/hooks/useCityChallenges';
import ChallengeCard from '@/components/ChallengeCard';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { EmptyState } from '@/components/EmptyState';

export default function ChallengesMapScreen() {
  const router = useRouter();
  const { challenges, loading } = useCityChallenges();
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  
  // For web compatibility
  const [showMap, setShowMap] = useState(Platform.OS !== 'web');
  
  useEffect(() => {
    // On web, we'll show a message instead of the map
    if (Platform.OS === 'web') {
      setShowMap(false);
    } else {
      // Small delay to ensure map renders properly
      const timer = setTimeout(() => {
        setShowMap(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const selectedChallengeData = challenges.find(c => c.id === selectedChallenge);
  
  const handleMarkerPress = (challengeId: string) => {
    setSelectedChallenge(challengeId);
  };
  
  const navigateToChallenge = () => {
    if (selectedChallenge) {
      router.push(`/city-challenges/${selectedChallenge}`);
    }
  };
  
  const navigateToPrevious = () => {
    if (!selectedChallenge) return;
    
    const currentIndex = challenges.findIndex(c => c.id === selectedChallenge);
    if (currentIndex > 0) {
      setSelectedChallenge(challenges[currentIndex - 1].id);
    }
  };
  
  const navigateToNext = () => {
    if (!selectedChallenge) return;
    
    const currentIndex = challenges.findIndex(c => c.id === selectedChallenge);
    if (currentIndex < challenges.length - 1) {
      setSelectedChallenge(challenges[currentIndex + 1].id);
    }
  };
  
  if (Platform.OS === 'web') {
    return (
      <>
        <Stack.Screen options={{ title: 'Challenge Map' }} />
        <EmptyState
          icon="map"
          title="Map View Not Available"
          message="The map view is not available on web. Please use the mobile app to access this feature."
          actionLabel="Back to Challenges"
          onAction={() => router.push('/city-challenges')}
        />
      </>
    );
  }
  
  return (
    <>
      <Stack.Screen options={{ title: 'Challenge Map' }} />
      
      <View style={styles.container}>
        {showMap ? (
          // We'll dynamically import MapView to avoid web errors
          Platform.OS !== 'web' ? (
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapText}>
                Map view is loading...
              </Text>
            </View>
          ) : null
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading map...</Text>
          </View>
        )}
        
        {selectedChallenge && selectedChallengeData && (
          <View style={styles.cardContainer}>
            <View style={styles.navigationButtons}>
              <TouchableOpacity 
                style={styles.navButton} 
                onPress={navigateToPrevious}
              >
                <ChevronLeft size={24} color="#333" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.navButton} 
                onPress={navigateToNext}
              >
                <ChevronRight size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={navigateToChallenge} activeOpacity={0.9}>
              <ChallengeCard challenge={selectedChallengeData} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

// We'll dynamically import MapView in a useEffect to avoid web errors
if (Platform.OS !== 'web') {
  import('react-native-maps').then(({ default: MapView, Marker, PROVIDER_GOOGLE }) => {
    const MapComponent = ({ 
      challenges, 
      onMarkerPress, 
      onMapReady 
    }) => (
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 41.1123,
          longitude: 20.0826,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        onMapReady={onMapReady}
        showsUserLocation
        showsMyLocationButton
      >
        {challenges.map(challenge => (
          <Marker
            key={challenge.id}
            coordinate={challenge.location.coordinates}
            title={challenge.title}
            description={challenge.location.name}
            onPress={() => onMarkerPress(challenge.id)}
          />
        ))}
      </MapView>
    );
  }).catch(err => console.error('Error loading maps:', err));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f0fe',
  },
  mapText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
  cardContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  navButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
    }),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});