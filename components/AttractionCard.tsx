import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Heart, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Attraction } from '@/types';
import Colors from '@/constants/colors';
import { useFavoritesStore } from '@/stores/favorites-store';

interface AttractionCardProps {
  attraction: Attraction;
  isFeatured?: boolean;
}

export const AttractionCard: React.FC<AttractionCardProps> = ({ attraction, isFeatured = false }) => {
  const router = useRouter();
  const { isFavoriteAttraction, addFavoriteAttraction, removeFavoriteAttraction } = useFavoritesStore();
  const isFavorite = isFavoriteAttraction(attraction.id);

  const handlePress = () => {
    router.push(`/attractions/${attraction.id}`);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteAttraction(attraction.id);
    } else {
      addFavoriteAttraction(attraction.id);
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, isFeatured && styles.featuredContainer]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: attraction.image }}
        style={[styles.image, isFeatured && styles.featuredImage]}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{attraction.category.toUpperCase()}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={Colors.warning} fill={Colors.warning} />
            <Text style={styles.rating}>{attraction.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.title} numberOfLines={2}>{attraction.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{attraction.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.location}>{attraction.location}</Text>
          <Text style={styles.price}>{attraction.price}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={toggleFavorite}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Heart 
          size={24} 
          color={isFavorite ? Colors.secondary : Colors.textSecondary} 
          fill={isFavorite ? Colors.secondary : 'none'} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
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
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  featuredContainer: {
    marginBottom: 24,
  },
  image: {
    height: 160,
    width: '100%',
  },
  featuredImage: {
    height: 200,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.text,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
});