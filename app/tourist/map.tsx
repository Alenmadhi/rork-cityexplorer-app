import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';
import { MapPin, Navigation, Info, ExternalLink } from 'lucide-react-native';

export default function MapScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const openMaps = (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    const mapsUrl = Platform.select({
      ios: `maps:?q=${encodedLocation}`,
      android: `geo:0,0?q=${encodedLocation}`,
      web: `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`
    });
    
    if (mapsUrl) {
      Linking.openURL(mapsUrl).catch(err => 
        console.error("Couldn't open maps", err)
      );
    }
  };

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'attractions', name: 'Attractions' },
    { id: 'hotels', name: 'Hotels' },
    { id: 'restaurants', name: 'Restaurants' },
    { id: 'services', name: 'Services' }
  ];

  const locations = [
    {
      id: '1',
      name: 'Elbasan Castle',
      address: 'City Center, Elbasan',
      category: 'attractions',
      image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Historic Ottoman castle with well-preserved walls and gates'
    },
    {
      id: '2',
      name: 'King Mosque',
      address: 'Inside Castle, Elbasan',
      category: 'attractions',
      image: 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Ottoman-era mosque dating back to the 15th century'
    },
    {
      id: '3',
      name: 'Hotel Grand Elbasan',
      address: 'Bulevardi Qemal Stafa, Elbasan',
      category: 'hotels',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Upscale hotel in the city center with modern amenities'
    },
    {
      id: '4',
      name: 'Castle View Guesthouse',
      address: 'Inside Castle Walls, Elbasan',
      category: 'hotels',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Charming guesthouse with traditional Albanian architecture'
    },
    {
      id: '5',
      name: 'Taverna Onufri',
      address: 'Rruga 28 Nëntori, Elbasan',
      category: 'restaurants',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Traditional Albanian cuisine in a rustic setting'
    },
    {
      id: '6',
      name: 'Elbasan Regional Hospital',
      address: 'Rruga Kozma Naska, Elbasan',
      category: 'services',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Main public hospital with emergency services'
    },
    {
      id: '7',
      name: 'Ethnographic Museum',
      address: 'Old Town, Elbasan',
      category: 'attractions',
      image: 'https://images.unsplash.com/photo-1552248524-10d9a7e4b84a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Museum showcasing traditional Albanian culture and lifestyle'
    }
  ];

  const filteredLocations = selectedCategory === 'all' 
    ? locations 
    : locations.filter(location => location.category === selectedCategory);

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Elbasan Map',
        }} 
      />
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
            style={styles.mapImage}
            resizeMode="cover"
          />
          <View style={styles.mapOverlay}>
            <Text style={styles.mapText}>Interactive map available in the mobile app</Text>
            {Platform.OS !== 'web' && (
              <TouchableOpacity 
                style={styles.openMapsButton}
                onPress={() => openMaps('Elbasan, Albania')}
              >
                <Text style={styles.openMapsButtonText}>Open in Maps</Text>
                <ExternalLink size={16} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map(category => (
              <TouchableOpacity 
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text 
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category.id && styles.categoryButtonTextActive
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView 
          style={styles.locationsContainer}
          contentContainerStyle={styles.locationsContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredLocations.map(location => (
            <TouchableOpacity 
              key={location.id}
              style={styles.locationCard}
              onPress={() => Platform.OS !== 'web' ? openMaps(`${location.name}, ${location.address}`) : null}
            >
              <Image 
                source={{ uri: location.image }} 
                style={styles.locationImage}
                resizeMode="cover"
              />
              <View style={styles.locationInfo}>
                <Text style={styles.locationName}>{location.name}</Text>
                <View style={styles.locationAddressContainer}>
                  <MapPin size={14} color={Colors.textSecondary} style={styles.locationIcon} />
                  <Text style={styles.locationAddress}>{location.address}</Text>
                </View>
                <Text style={styles.locationDescription}>{location.description}</Text>
                {Platform.OS !== 'web' && (
                  <TouchableOpacity 
                    style={styles.directionsButton}
                    onPress={() => openMaps(`${location.name}, ${location.address}`)}
                  >
                    <Navigation size={14} color={Colors.primary} style={styles.directionsIcon} />
                    <Text style={styles.directionsText}>Get Directions</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mapContainer: {
    height: 200,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  openMapsButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  openMapsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 6,
  },
  categoriesContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.text}10`,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: `${Colors.text}10`,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: Colors.text,
  },
  categoryButtonTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  locationsContainer: {
    flex: 1,
  },
  locationsContent: {
    padding: 16,
  },
  locationCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
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
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  locationImage: {
    width: '100%',
    height: 150,
  },
  locationInfo: {
    padding: 16,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 6,
  },
  locationAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    marginRight: 6,
  },
  locationAddress: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  locationDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  directionsIcon: {
    marginRight: 6,
  },
  directionsText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
});