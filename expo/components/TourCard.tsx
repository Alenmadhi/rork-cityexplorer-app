import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, MapPin, Star, Users } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Tour } from '@/types';

interface TourCardProps {
  tour: Tour;
  featured?: boolean;
}

export function TourCard({ tour, featured = false }: TourCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/tourist/tours/${tour.id}`);
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'historical':
        return '#4361ee';
      case 'cultural':
        return '#3a86ff';
      case 'culinary':
        return '#f39c12';
      case 'nature':
        return '#2ecc71';
      case 'hidden-gems':
        return '#7209b7';
      case 'nightlife':
        return '#e74c3c';
      default:
        return Colors.primary;
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#2ecc71';
      case 'moderate':
        return '#f39c12';
      case 'challenging':
        return '#e74c3c';
      default:
        return Colors.textSecondary;
    }
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        featured ? styles.featuredContainer : null
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: tour.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        {featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        
        <View 
          style={[
            styles.categoryBadge, 
            { backgroundColor: getCategoryColor(tour.category) }
          ]}
        >
          <Text style={styles.categoryText}>
            {tour.category.charAt(0).toUpperCase() + tour.category.slice(1).replace('-', ' ')}
          </Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{tour.title}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={14} color={Colors.textSecondary} />
            <Text style={styles.metaText}>{tour.duration}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <MapPin size={14} color={Colors.textSecondary} />
            <Text style={styles.metaText}>{tour.distance}</Text>
          </View>
          
          <View 
            style={[
              styles.difficultyBadge, 
              { backgroundColor: `${getDifficultyColor(tour.difficulty)}20` }
            ]}
          >
            <Text 
              style={[
                styles.difficultyText, 
                { color: getDifficultyColor(tour.difficulty) }
              ]}
            >
              {tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {tour.description}
        </Text>
        
        <View style={styles.footer}>
          {tour.rating && (
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>{tour.rating.toFixed(1)}</Text>
              {tour.reviewCount && (
                <Text style={styles.reviewCount}>({tour.reviewCount})</Text>
              )}
            </View>
          )}
          
          <View style={styles.stopsContainer}>
            <Users size={14} color={Colors.textSecondary} />
            <Text style={styles.stopsText}>{tour.stops.length} stops</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
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
  featuredContainer: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 2,
  },
  stopsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stopsText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
});