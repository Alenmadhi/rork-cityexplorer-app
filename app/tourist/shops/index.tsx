import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { ShoppingBag, Tag, Search } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { shops } from '@/mocks/shops';
import { ShopCard } from '@/components/ShopCard';
import { PromotionCard } from '@/components/PromotionCard';
import { SearchBar } from '@/components/SearchBar';
import { Shop, ShopCategory } from '@/types';

export default function ShopsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory | 'all'>('all');
  const [featuredShops, setFeaturedShops] = useState<Shop[]>([]);
  const [promotions, setPromotions] = useState<Shop[]>([]);
  
  useEffect(() => {
    // Get featured shops
    const featured = shops.filter(shop => shop.featured);
    setFeaturedShops(featured);
    
    // Get shops with promotions
    const withPromotions = shops.filter(shop => shop.promotion);
    setPromotions(withPromotions);
  }, []);
  
  const categories: Array<ShopCategory | 'all'> = [
    'all', 'souvenirs', 'food', 'clothing', 'books', 'sports'
  ];
  
  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          shop.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || shop.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const renderCategoryButton = (category: ShopCategory | 'all') => {
    const isSelected = category === selectedCategory;
    const displayName = category === 'all' ? 'All Shops' : category.charAt(0).toUpperCase() + category.slice(1);
    
    return (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryButton,
          isSelected && styles.selectedCategoryButton
        ]}
        onPress={() => setSelectedCategory(category)}
      >
        <Text 
          style={[
            styles.categoryButtonText,
            isSelected && styles.selectedCategoryButtonText
          ]}
        >
          {displayName}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const renderShopItem = ({ item }: { item: Shop }) => (
    <ShopCard shop={item} />
  );
  
  const renderFeaturedShop = (shop: Shop) => (
    <ShopCard key={shop.id} shop={shop} compact />
  );
  
  const renderPromotionItem = ({ item }: { item: Shop }) => (
    <PromotionCard shop={item} />
  );
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Local Shops',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search shops..."
        />
        
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(renderCategoryButton)}
        </ScrollView>
        
        {searchQuery === '' && selectedCategory === 'all' ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {featuredShops.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <ShoppingBag size={20} color={Colors.primary} />
                  <Text style={styles.sectionTitle}>Featured Shops</Text>
                </View>
                
                <ScrollView 
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.featuredContainer}
                >
                  {featuredShops.map(renderFeaturedShop)}
                </ScrollView>
              </View>
            )}
            
            {promotions.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Tag size={20} color={Colors.primary} />
                  <Text style={styles.sectionTitle}>Special Offers</Text>
                </View>
                
                <FlatList
                  data={promotions.slice(0, 3)}
                  renderItem={renderPromotionItem}
                  keyExtractor={(item) => `promo-${item.id}`}
                  scrollEnabled={false}
                  contentContainerStyle={styles.promotionsContainer}
                />
                
                {promotions.length > 3 && (
                  <TouchableOpacity 
                    style={styles.viewAllButton}
                    onPress={() => setSelectedCategory('all')}
                  >
                    <Text style={styles.viewAllText}>View All Offers</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <ShoppingBag size={20} color={Colors.primary} />
                <Text style={styles.sectionTitle}>All Shops</Text>
              </View>
              
              <FlatList
                data={shops}
                renderItem={renderShopItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.shopsContainer}
              />
            </View>
          </ScrollView>
        ) : (
          <>
            {filteredShops.length > 0 ? (
              <FlatList
                data={filteredShops}
                renderItem={renderShopItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.shopsContainer}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Search size={48} color={`${Colors.text}30`} />
                <Text style={styles.emptyTitle}>No shops found</Text>
                <Text style={styles.emptyMessage}>Try adjusting your search or filters</Text>
              </View>
            )}
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  selectedCategoryButtonText: {
    color: Colors.background,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 8,
  },
  featuredContainer: {
    paddingHorizontal: 16,
  },
  promotionsContainer: {
    paddingHorizontal: 16,
  },
  shopsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  viewAllButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}15`,
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});