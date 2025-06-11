import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingBag, Tag, Search, MapPin, Star } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { shops } from '@/mocks/shops';
import { SearchBar } from '@/components/SearchBar';
import { Shop } from '@/types';

export default function ShopsTabScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get featured shops
  const featuredShops = shops.filter(shop => shop.featured);
  
  // Get shops with promotions
  const promotions = shops.filter(shop => shop.promotion);
  
  // Filter shops based on search
  const filteredShops = shops.filter(shop => 
    searchQuery === '' || 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleShopPress = (shopId: string) => {
    router.push(`/tourist/shops/${shopId}`);
  };
  
  const handleViewAllPress = () => {
    router.push('/tourist/shops');
  };
  
  const handleSearchSubmit = () => {
    router.push({
      pathname: '/tourist/shops',
      params: { query: searchQuery }
    });
  };
  
  const renderShopItem = ({ item }: { item: Shop }) => (
    <TouchableOpacity 
      style={styles.shopCard}
      onPress={() => handleShopPress(item.id)}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.shopImage}
        resizeMode="cover"
      />
      <View style={styles.shopContent}>
        <Text style={styles.shopName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.shopCategory}>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</Text>
        
        <View style={styles.shopMeta}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.shopRating}>{item.rating.toFixed(1)}</Text>
          </View>
          
          {item.promotion && (
            <View style={styles.promotionBadge}>
              <Text style={styles.promotionText}>
                {item.promotion.discountPercent 
                  ? `${item.promotion.discountPercent}% OFF` 
                  : 'Special Offer'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <SearchBar 
        placeholder="Search shops in Elbasan..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={handleSearchSubmit}
      />
      
      <FlatList
        data={filteredShops}
        renderItem={renderShopItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Discover Local Shops</Text>
              <Text style={styles.headerSubtitle}>Support local businesses in Elbasan</Text>
            </View>
            
            {featuredShops.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <ShoppingBag size={20} color={Colors.primary} />
                  <Text style={styles.sectionTitle}>Featured Shops</Text>
                </View>
                
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.featuredList}
                >
                  {featuredShops.map(shop => (
                    <TouchableOpacity 
                      key={`featured-${shop.id}`}
                      style={styles.featuredCard}
                      onPress={() => handleShopPress(shop.id)}
                    >
                      <Image 
                        source={{ uri: shop.image }} 
                        style={styles.featuredImage}
                        resizeMode="cover"
                      />
                      <View style={styles.featuredOverlay}>
                        <Text style={styles.featuredName}>{shop.name}</Text>
                        <Text style={styles.featuredCategory}>{shop.category}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
            
            {promotions.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Tag size={20} color={Colors.primary} />
                  <Text style={styles.sectionTitle}>Special Offers</Text>
                </View>
                
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.promotionsList}
                >
                  {promotions.slice(0, 3).map(shop => (
                    <TouchableOpacity 
                      key={`promotion-${shop.id}`}
                      style={styles.promotionCard}
                      onPress={() => handleShopPress(shop.id)}
                    >
                      <Image 
                        source={{ uri: shop.image }} 
                        style={styles.promotionImage}
                        resizeMode="cover"
                      />
                      <View style={styles.promotionContent}>
                        <Text style={styles.promotionTitle} numberOfLines={1}>
                          {shop.promotion?.title}
                        </Text>
                        <Text style={styles.promotionShopName} numberOfLines={1}>
                          {shop.name}
                        </Text>
                        
                        {shop.promotion?.discountPercent && (
                          <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>
                              {shop.promotion.discountPercent}% OFF
                            </Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                
                <TouchableOpacity 
                  style={styles.viewAllButton}
                  onPress={handleViewAllPress}
                >
                  <Text style={styles.viewAllText}>View All Shops & Offers</Text>
                </TouchableOpacity>
              </View>
            )}
            
            <View style={styles.sectionHeader}>
              <ShoppingBag size={20} color={Colors.primary} />
              <Text style={styles.sectionTitle}>All Shops</Text>
            </View>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingBottom: 24,
  },
  header: {
    padding: 16,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 8,
  },
  featuredList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  featuredCard: {
    width: 200,
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  featuredName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  featuredCategory: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    textTransform: 'capitalize',
  },
  promotionsList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  promotionCard: {
    width: 250,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  promotionImage: {
    width: '100%',
    height: 120,
  },
  promotionContent: {
    padding: 12,
    position: 'relative',
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  promotionShopName: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  viewAllButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}15`,
    marginTop: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  shopCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    height: 100,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  shopImage: {
    width: 100,
    height: '100%',
  },
  shopContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  shopName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  shopCategory: {
    fontSize: 14,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  shopMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopRating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 4,
  },
  promotionBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  promotionText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});