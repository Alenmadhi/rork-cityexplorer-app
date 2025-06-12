import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { MapPin, Phone, Clock, Star } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Shop } from '@/types';

interface ShopCardProps {
  shop: Shop;
  onPress: () => void;
}

export function ShopCard({ shop, onPress }: ShopCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
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
        {shop.promotion && (
          <View style={styles.promotionBadge}>
            <Text style={styles.promotionText}>{shop.promotion.discountPercent}% OFF</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{shop.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color={Colors.warning} fill={Colors.warning} />
            <Text style={styles.rating}>{shop.rating.toFixed(1)}</Text>
          </View>
        </View>
        
        <Text style={styles.category}>{shop.category.charAt(0).toUpperCase() + shop.category.slice(1)}</Text>
        
        <Text style={styles.description} numberOfLines={2}>
          {shop.description}
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MapPin size={14} color={Colors.textSecondary} />
            <Text style={styles.detailText} numberOfLines={1}>{shop.address}</Text>
          </View>
          
          {shop.phone && (
            <View style={styles.detailItem}>
              <Phone size={14} color={Colors.textSecondary} />
              <Text style={styles.detailText}>{shop.phone}</Text>
            </View>
          )}
          
          <View style={styles.detailItem}>
            <Clock size={14} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{shop.hours}</Text>
          </View>
        </View>
        
        {shop.promotion && (
          <View style={styles.promotionContainer}>
            <Text style={styles.promotionTitle}>{shop.promotion.title}</Text>
            <Text style={styles.promotionDescription} numberOfLines={1}>
              {shop.promotion.description}
            </Text>
            {shop.promotion.validUntil && (
              <Text style={styles.promotionValidity}>
                Valid until: {new Date(shop.promotion.validUntil).toLocaleDateString()}
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
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
    left: 12,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  promotionBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  promotionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.warning}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 4,
  },
  category: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.text,
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
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  promotionContainer: {
    backgroundColor: `${Colors.error}10`,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.error,
  },
  promotionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  promotionDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  promotionValidity: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});