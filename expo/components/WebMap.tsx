import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { TourStop } from '@/types';

interface WebMapProps {
  stops: TourStop[];
  activeStopIndex: number;
  onStopPress?: (index: number) => void;
}

export default function WebMap({ stops, activeStopIndex, onStopPress }: WebMapProps) {
  return (
    <View style={styles.container}>
      <View style={styles.mapContent}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Interactive Map (Web Version)</Text>
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
        
        <View style={styles.stopsListContainer}>
          <Text style={styles.stopsListTitle}>Tour Stops</Text>
          <View style={styles.stopsList}>
            {stops.map((stop, index) => (
              <TouchableOpacity
                key={stop.id}
                style={[
                  styles.stopItem,
                  index === activeStopIndex && styles.activeStopItem
                ]}
                onPress={() => onStopPress && onStopPress(index)}
              >
                <View style={[
                  styles.stopNumber,
                  index === activeStopIndex && styles.activeStopNumber
                ]}>
                  <Text style={[
                    styles.stopNumberText,
                    index === activeStopIndex && styles.activeStopNumberText
                  ]}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={[
                  styles.stopTitle,
                  index === activeStopIndex && styles.activeStopTitle
                ]}>
                  {stop.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
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
  mapContent: {
    flex: 1,
    flexDirection: 'row',
  },
  mapPlaceholder: {
    flex: 2,
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
  stopsListContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
    padding: 12,
  },
  stopsListTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  stopsList: {
    flex: 1,
  },
  stopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.border}50`,
  },
  activeStopItem: {
    backgroundColor: `${Colors.primary}10`,
  },
  stopNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.cardDarker,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  activeStopNumber: {
    backgroundColor: Colors.primary,
  },
  stopNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
  activeStopNumberText: {
    color: '#fff',
  },
  stopTitle: {
    fontSize: 13,
    color: Colors.text,
  },
  activeStopTitle: {
    fontWeight: 'bold',
  },
});