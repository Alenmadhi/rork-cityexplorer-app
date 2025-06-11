import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Bus, Wifi, Coffee, Phone, Book, Map, ShoppingBag, Compass } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { WeatherCard } from '@/components/WeatherCard';
import { useWeather } from '@/hooks/useWeather';

export default function TouristInfoScreen() {
  const router = useRouter();
  const { weather, isLoading, error, refetch } = useWeather();
  
  const touristOptions = [
    {
      id: 'tours',
      title: 'Guided Tours',
      icon: <Compass size={24} color={Colors.primary} />,
      description: 'Explore Elbasan with expert local guides',
      route: '/tourist/tours'
    },
    {
      id: 'map',
      title: 'City Map',
      icon: <Map size={24} color={Colors.primary} />,
      description: 'Interactive map of key locations',
      route: '/tourist/map'
    },
    {
      id: 'shops',
      title: 'Local Shops',
      icon: <ShoppingBag size={24} color={Colors.primary} />,
      description: 'Discover shops with special offers',
      route: '/tourist/shops'
    },
    {
      id: 'transportation',
      title: 'Transportation',
      icon: <Bus size={24} color={Colors.primary} />,
      description: 'Public transport and taxi information',
      route: '/tourist/transportation'
    },
    {
      id: 'accommodation',
      title: 'Accommodation',
      icon: <MapPin size={24} color={Colors.primary} />,
      description: 'Hotels, guesthouses, and rentals',
      route: '/tourist/accommodation'
    },
    {
      id: 'wifi',
      title: 'Wi-Fi Spots',
      icon: <Wifi size={24} color={Colors.primary} />,
      description: 'Free and public internet access',
      route: '/tourist/wifi'
    },
    {
      id: 'tips',
      title: 'Local Tips',
      icon: <Coffee size={24} color={Colors.primary} />,
      description: 'Insider advice from residents',
      route: '/tourist/tips'
    },
    {
      id: 'emergency',
      title: 'Emergency Info',
      icon: <Phone size={24} color={Colors.primary} />,
      description: 'Important contacts and services',
      route: '/tourist/emergency'
    },
    {
      id: 'phrasebook',
      title: 'Phrasebook',
      icon: <Book size={24} color={Colors.primary} />,
      description: 'Essential Albanian phrases',
      route: '/tourist/phrasebook'
    }
  ];
  
  const handleOptionPress = (route: string) => {
    router.push(route);
  };
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>Welcome to Elbasan</Text>
          <Text style={styles.headerSubtitle}>Your complete tourist guide</Text>
        </View>
      </View>
      
      {weather && (
        <View style={styles.weatherContainer}>
          <WeatherCard weather={weather} isLoading={isLoading} error={error} onRefresh={refetch} />
        </View>
      )}
      
      <View style={styles.optionsContainer}>
        <Text style={styles.sectionTitle}>Tourist Resources</Text>
        
        <View style={styles.optionsGrid}>
          {touristOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={() => handleOptionPress(option.route)}
            >
              <View style={styles.optionIconContainer}>
                {option.icon}
              </View>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription} numberOfLines={2}>
                {option.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 32,
  },
  header: {
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  weatherContainer: {
    padding: 16,
  },
  optionsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});