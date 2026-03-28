import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Heart, MapPin, Clock, Ticket, Star, ArrowLeft, Share2 } from 'lucide-react-native';
import { attractions } from '@/mocks/attractions';
import Colors from '@/constants/colors';
import { useFavoritesStore } from '@/stores/favorites-store';

export default function AttractionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isFavoriteAttraction, addFavoriteAttraction, removeFavoriteAttraction } = useFavoritesStore();
  
  const attraction = attractions.find(a => a.id === id);
  
  if (!attraction) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Attraction not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isFavorite = isFavoriteAttraction(attraction.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteAttraction(attraction.id);
    } else {
      addFavoriteAttraction(attraction.id);
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.headerButton} 
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity style={styles.headerButton}>
                <Share2 size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerButton} 
                onPress={toggleFavorite}
              >
                <Heart 
                  size={24} 
                  color="#fff" 
                  fill={isFavorite ? "#fff" : "none"} 
                />
              </TouchableOpacity>
            </View>
          ),
        }} 
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: attraction.image }}
            style={styles.image}
            contentFit="cover"
          />
          <View style={styles.overlay} />
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{attraction.category.toUpperCase()}</Text>
            </View>
            
            <View style={styles.ratingContainer}>
              <Star size={16} color={Colors.warning} fill={Colors.warning} />
              <Text style={styles.rating}>{attraction.rating.toFixed(1)}</Text>
            </View>
          </View>
          
          <Text style={styles.title}>{attraction.name}</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <MapPin size={20} color={Colors.primary} />
              <Text style={styles.infoText}>{attraction.location}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Clock size={20} color={Colors.primary} />
              <Text style={styles.infoText}>{attraction.hours}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ticket size={20} color={Colors.primary} />
              <Text style={styles.infoText}>{attraction.price}</Text>
            </View>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>About This Attraction</Text>
            <Text style={styles.description}>{attraction.description}</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Directions</Text>
          </TouchableOpacity>
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
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  headerRightContainer: {
    flexDirection: 'row',
  },
  contentContainer: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryContainer: {
    backgroundColor: `${Colors.primary}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  category: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.warning}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  rating: {
    color: Colors.text,
    fontWeight: '600',
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textSecondary,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});