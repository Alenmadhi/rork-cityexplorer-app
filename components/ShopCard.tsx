import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { MapPin, Clock, Star, Phone, Globe, Tag, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { Shop } from '@/types';

interface ShopCardProps {
  shop: Shop;
  compact?: boolean;
}

export function ShopCard({ shop, compact = false }: ShopCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/tourist/shops/${shop.id}`);
  };
  
  if (compact) {
    return (
      <TouchableOpacity 
        style={styles.compactContainer}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Image 
          source={{ uri: shop.image }} 
          style={styles.compactImage}
          resizeMode="cover"
        />
        <View style={styles.compactContent}>
          <Text style={styles.compactName} numberOfLines={1}>{shop.name}</Text>
          <Text style={styles.compactCategory}>{shop.category.charAt(0).toUpperCase() + shop.category.slice(1)}</Text>
          
          {shop.promotion && (
            <View style={styles.compactPromotionBadge}>
              <Text style={styles.compactPromotionText} numberOfLines={1}>
                {shop.promotion.discountPercent 
                  ? `${shop.promotion.discountPercent}% OFF` 
                  : 'Special Offer'}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: shop.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      {shop.featured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={styles.name}>{shop.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFD700" fill="#FFD700" />
          <Text style={styles.rating}>{shop.rating.toFixed(1)}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {shop.category.charAt(0).toUpperCase() + shop.category.slice(1)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {shop.description}
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MapPin size={14} color={Colors.textSecondary} />
            <Text style={styles.detailText} numberOfLines={1}>{shop.address}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={14} color={Colors.textSecondary} />
            <Text style={styles.detailText} numberOfLines={1}>{shop.hours}</Text>
          </View>
        </View>
        
        {shop.promotion && (
          <View style={styles.promotionContainer}>
            <Tag size={16} color={Colors.primary} />
            <View style={styles.promotionContent}>
              <Text style={styles.promotionTitle}>{shop.promotion.title}</Text>
              <Text style={styles.promotionDescription} numberOfLines={2}>
                {shop.promotion.description}
              </Text>
            </View>
          </View>
        )}
      </View>
      
      <View style={styles.arrowContainer}>
        <ChevronRight size={20} color={Colors.textSecondary} />
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
  image: {
    width: '100%',
    height: 180,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  featuredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 4,
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: `${Colors.primary}20`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  promotionContainer: {
    flexDirection: 'row',
    backgroundColor: `${Colors.primary}10`,
    padding: 12,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  promotionContent: {
    flex: 1,
    marginLeft: 12,
  },
  promotionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  promotionDescription: {
    fontSize: 13,
    color: Colors.text,
    lineHeight: 18,
  },
  arrowContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${Colors.text}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Compact styles
  compactContainer: {
    width: 160,
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
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
  compactImage: {
    width: '100%',
    height: 100,
  },
  compactContent: {
    padding: 10,
  },
  compactName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  compactCategory: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  compactPromotionBadge: {
    position: 'absolute',
    top: -30,
    right: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  compactPromotionText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});