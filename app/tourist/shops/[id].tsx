import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, Clock, Star, Phone, Mail, Globe, Tag, Calendar, Navigation, Share2, ArrowLeft } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { shops } from '@/mocks/shops';
import { Shop } from '@/types';

export default function ShopDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [shop, setShop] = useState<Shop | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundShop = shops.find(s => s.id === id);
      if (foundShop) {
        setShop(foundShop);
      }
    }
  }, [id]);
  
  if (!shop) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading shop details...</Text>
      </View>
    );
  }
  
  const handleCall = () => {
    if (shop.phone) {
      Linking.openURL(`tel:${shop.phone}`);
    }
  };
  
  const handleEmail = () => {
    if (shop.email) {
      Linking.openURL(`mailto:${shop.email}`);
    }
  };
  
  const handleWebsite = () => {
    if (shop.website) {
      Linking.openURL(`https://${shop.website}`);
    }
  };
  
  const handleDirections = () => {
    const { coordinates, address } = shop;
    
    if (Platform.OS === 'web') {
      const query = encodeURIComponent(address);
      Linking.openURL(`https://maps.google.com/?q=${query}`);
      return;
    }
    
    if (coordinates) {
      const scheme = Platform.select({
        ios: 'maps:',
        android: 'geo:'
      });
      
      const latLng = `${coordinates.latitude},${coordinates.longitude}`;
      const label = encodeURIComponent(shop.name);
      const url = Platform.select({
        ios: `${scheme}?q=${label}@${latLng}`,
        android: `${scheme}0,0?q=${latLng}(${label})`
      });
      
      if (url) {
        Linking.openURL(url);
      }
    } else {
      const query = encodeURIComponent(address);
      const url = Platform.select({
        ios: `maps:?q=${query}`,
        android: `geo:0,0?q=${query}`
      });
      
      if (url) {
        Linking.openURL(url);
      }
    }
  };
  
  const handleShare = () => {
    const message = `Check out ${shop.name} in Elbasan!\n\n${shop.description}\n\nAddress: ${shop.address}`;
    
    if (shop.promotion) {
      message.concat(`\n\nSpecial Offer: ${shop.promotion.title} - ${shop.promotion.description}`);
    }
    
    Share.share({
      message,
      title: shop.name
    });
  };
  
  // Calculate days remaining for the promotion
  const getDaysRemaining = () => {
    if (!shop.promotion?.validUntil) return null;
    
    const validUntil = new Date(shop.promotion.validUntil);
    const today = new Date();
    const diffTime = validUntil.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };
  
  const daysRemaining = getDaysRemaining();
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: shop.name,
          headerBackTitle: 'Shops',
        }} 
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
        </View>
        
        <View style={styles.content}>
          <Text style={styles.name}>{shop.name}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>{shop.rating.toFixed(1)}</Text>
            </View>
            
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {shop.category.charAt(0).toUpperCase() + shop.category.slice(1)}
              </Text>
            </View>
          </View>
          
          <Text style={styles.description}>{shop.description}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Shop Information</Text>
            
            <View style={styles.infoItem}>
              <MapPin size={18} color={Colors.primary} style={styles.infoIcon} />
              <Text style={styles.infoText}>{shop.address}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Clock size={18} color={Colors.primary} style={styles.infoIcon} />
              <Text style={styles.infoText}>{shop.hours}</Text>
            </View>
            
            {shop.phone && (
              <TouchableOpacity style={styles.infoItem} onPress={handleCall}>
                <Phone size={18} color={Colors.primary} style={styles.infoIcon} />
                <Text style={styles.infoTextLink}>{shop.phone}</Text>
              </TouchableOpacity>
            )}
            
            {shop.email && (
              <TouchableOpacity style={styles.infoItem} onPress={handleEmail}>
                <Mail size={18} color={Colors.primary} style={styles.infoIcon} />
                <Text style={styles.infoTextLink}>{shop.email}</Text>
              </TouchableOpacity>
            )}
            
            {shop.website && (
              <TouchableOpacity style={styles.infoItem} onPress={handleWebsite}>
                <Globe size={18} color={Colors.primary} style={styles.infoIcon} />
                <Text style={styles.infoTextLink}>{shop.website}</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {shop.promotion && (
            <>
              <View style={styles.divider} />
              
              <View style={styles.promotionSection}>
                <View style={styles.promotionHeader}>
                  <Tag size={20} color={Colors.primary} />
                  <Text style={styles.promotionHeaderText}>Special Offer</Text>
                </View>
                
                <View style={styles.promotionCard}>
                  <Text style={styles.promotionTitle}>{shop.promotion.title}</Text>
                  <Text style={styles.promotionDescription}>{shop.promotion.description}</Text>
                  
                  {daysRemaining !== null && (
                    <View style={styles.validityContainer}>
                      <Calendar size={16} color={Colors.textSecondary} />
                      <Text style={styles.validityText}>
                        {daysRemaining === 0 
                          ? 'Expires today!' 
                          : `Valid for ${daysRemaining} more day${daysRemaining !== 1 ? 's' : ''}`}
                      </Text>
                    </View>
                  )}
                  
                  {shop.promotion.discountPercent && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{shop.promotion.discountPercent}% OFF</Text>
                    </View>
                  )}
                </View>
              </View>
            </>
          )}
          
          <View style={styles.divider} />
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleDirections}
            >
              <Navigation size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Directions</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.secondaryActionButton]}
              onPress={handleShare}
            >
              <Share2 size={20} color={Colors.primary} />
              <Text style={styles.secondaryActionButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  featuredText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 6,
  },
  categoryBadge: {
    backgroundColor: `${Colors.primary}20`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: `${Colors.text}10`,
    marginVertical: 24,
  },
  infoSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    color: Colors.text,
    flex: 1,
  },
  infoTextLink: {
    fontSize: 16,
    color: Colors.primary,
    flex: 1,
  },
  promotionSection: {
    marginBottom: 8,
  },
  promotionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  promotionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 8,
  },
  promotionCard: {
    backgroundColor: `${Colors.primary}10`,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: `${Colors.primary}30`,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  promotionDescription: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  validityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  validityText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  secondaryActionButton: {
    backgroundColor: `${Colors.primary}15`,
    marginRight: 0,
    marginLeft: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  secondaryActionButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});