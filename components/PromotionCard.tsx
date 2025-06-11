import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Tag, Calendar, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { Shop } from '@/types';

interface PromotionCardProps {
  shop: Shop;
}

export function PromotionCard({ shop }: PromotionCardProps) {
  const router = useRouter();
  
  if (!shop.promotion) {
    return null;
  }
  
  const handlePress = () => {
    router.push(`/tourist/shops/${shop.id}`);
  };
  
  // Calculate days remaining for the promotion
  const daysRemaining = () => {
    if (!shop.promotion?.validUntil) return null;
    
    const validUntil = new Date(shop.promotion.validUntil);
    const today = new Date();
    const diffTime = validUntil.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };
  
  const remainingDays = daysRemaining();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.shopInfo}>
          <Text style={styles.shopName}>{shop.name}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {shop.category.charAt(0).toUpperCase() + shop.category.slice(1)}
            </Text>
          </View>
        </View>
        
        {shop.promotion.discountPercent && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{shop.promotion.discountPercent}% OFF</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Tag size={20} color={Colors.primary} style={styles.icon} />
        <View style={styles.promotionInfo}>
          <Text style={styles.promotionTitle}>{shop.promotion.title}</Text>
          <Text style={styles.promotionDescription}>{shop.promotion.description}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        {remainingDays !== null && (
          <View style={styles.validityInfo}>
            <Calendar size={14} color={Colors.textSecondary} />
            <Text style={styles.validityText}>
              {remainingDays === 0 
                ? 'Expires today!' 
                : `Valid for ${remainingDays} more day${remainingDays !== 1 ? 's' : ''}`}
            </Text>
          </View>
        )}
        
        <View style={styles.actionButton}>
          <Text style={styles.actionText}>View Details</Text>
          <ChevronRight size={16} color={Colors.primary} />
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
    borderColor: `${Colors.primary}30`,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.text}10`,
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: `${Colors.text}10`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  discountBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: `${Colors.primary}05`,
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  promotionInfo: {
    flex: 1,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 6,
  },
  promotionDescription: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: `${Colors.text}10`,
  },
  validityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  validityText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginRight: 4,
  },
});