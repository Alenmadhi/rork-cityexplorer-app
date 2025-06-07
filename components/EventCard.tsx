import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Event } from '@/types';
import Colors from '@/constants/colors';
import { useFavoritesStore } from '@/stores/favorites-store';

interface EventCardProps {
  event: Event;
  isFeatured?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, isFeatured = false }) => {
  const router = useRouter();
  const { isFavoriteEvent, addFavoriteEvent, removeFavoriteEvent } = useFavoritesStore();
  const isFavorite = isFavoriteEvent(event.id);

  const handlePress = () => {
    router.push(`/events/${event.id}`);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteEvent(event.id);
    } else {
      addFavoriteEvent(event.id);
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, isFeatured && styles.featuredContainer]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: event.image }}
        style={[styles.image, isFeatured && styles.featuredImage]}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{event.category.toUpperCase()}</Text>
          <Text style={styles.date}>{new Date(event.date).toLocaleDateString()}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{event.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.location}>{event.location}</Text>
          <Text style={styles.price}>{event.price}</Text>
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
  date: {
    fontSize: 12,
    color: Colors.textSecondary,
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