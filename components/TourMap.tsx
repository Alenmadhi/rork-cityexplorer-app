import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { MapPin, Navigation } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { TourStop } from '@/types';
import WebMap from './WebMap';

interface TourMapProps {
  stops: TourStop[];
  activeStopIndex: number;
  onStopPress?: (index: number) => void;
}

export function TourMap({ stops, activeStopIndex, onStopPress }: TourMapProps) {
  const [mapReady, setMapReady] = useState(false);
  
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapReady(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const activeStop = stops[activeStopIndex];
  
  if (Platform.OS === 'web') {
    return <WebMap stops={stops} activeStopIndex={activeStopIndex} onStopPress={onStopPress} />;
  }
  
  return (
    <View style={styles.container}>
      {mapReady ? (
        <View style={styles.mapContent}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Interactive Map</Text>
            {stops.map((stop, index) => (
              <TouchableOpacity
                key={stop.id}
                style={[
                  styles.mapMarker,
                  index === activeStopIndex && styles.activeMapMarker,
                  {
                    // Position markers based on relative coordinates
                    left: `${((stop.coordinates.longitude - 20.07) / 0.03) * 100}%`,
                    top: `${((41.12 - stop.coordinates.latitude) / 0.02) * 100}%`,
                  }
                ]}
                onPress={() => onStopPress && onStopPress(index)}
              >
                <MapPin 
                  size={index === activeStopIndex ? 24 : 18} 
                  color={index === activeStopIndex ? Colors.primary : Colors.textSecondary}
                  fill={index === activeStopIndex ? Colors.primary : 'transparent'}
                />
                {index === activeStopIndex && (
                  <View style={styles.activeMarkerLabel}>
                    <Text style={styles.activeMarkerText}>{index + 1}. {stop.title}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.mapControls}>
            <View style={styles.mapInfo}>
              <Text style={styles.mapInfoTitle}>Current Location:</Text>
              <Text style={styles.mapInfoText}>{activeStop.title}</Text>
              <Text style={styles.mapInfoCoords}>
                {activeStop.coordinates.latitude.toFixed(4)}, {activeStop.coordinates.longitude.toFixed(4)}
              </Text>
            </View>
            
            <TouchableOpacity style={styles.navigationButton}>
              <Navigation size={16} color="#fff" />
              <Text style={styles.navigationButtonText}>Navigate</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  mapContent: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#e8f0fe',
    position: 'relative',
  },
  mapText: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  mapMarker: {
    position: 'absolute',
    transform: [{ translateX: -9 }, { translateY: -18 }],
  },
  activeMapMarker: {
    transform: [{ translateX: -12 }, { translateY: -24 }],
    zIndex: 10,
  },
  activeMarkerLabel: {
    position: 'absolute',
    top: 24,
    left: 0,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    width: 150,
    transform: [{ translateX: -63 }],
  },
  activeMarkerText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  mapControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  mapInfo: {
    flex: 1,
  },
  mapInfoTitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  mapInfoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  mapInfoCoords: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  navigationButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  navigationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});