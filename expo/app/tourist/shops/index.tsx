import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ShoppingBag, Tag, Filter, MapPin } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { shops } from '@/mocks/shops';
import { SearchBar } from '@/components/SearchBar';
import { Shop } from '@/types';

export default function ShopsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPromotionsOnly, setShowPromotionsOnly] = useState(false);
  
  // Extract unique categories
  const categories = Array.from(new Set(shops.map(shop => shop.category)));
  
  // Filter shops based on search, category, and promotions
  const filteredShops = shops.filter(shop => {
    const matchesSearch = 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? shop.category === selectedCategory : true;
    const matchesPromotions = showPromotionsOnly ? !!shop.promotion : true;
    
    return matchesSearch && matchesCategory && matchesPromotions;
  });
  
  const handleShopPress = (shopId: string) => {
    router.push(`/tourist/shops/${shopId}`);
  };
  
  const toggleCategory = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };
  
  const togglePromotionsFilter = () => {
    setShowPromotionsOnly(prev => !prev);
  };
  
  const renderShopItem = ({ item }: { item: Shop }) => (
    <TouchableOpacity 
      style={styles.shopCard}
      onPress={() => handleShopPress(item.id)}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.shopImage}
        resizeMode="cover"
      />
      
      <View style={styles.shopContent}>
        <View>
          <Text style={styles.shopName}>{item.name}</Text>
          <View style={styles.shopMeta}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </Text>
            </View>
            <Text style={styles.shopRating}>★ {item.rating.toFixed(1)}</Text>
          </View>
          
          <View style={styles.locationContainer}>
            <MapPin size={14} color={Colors.textSecondary} />
            <Text style={styles.locationText} numberOfLines={1}>{item.address}</Text>
          </View>
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
    </TouchableOpacity>
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
          placeholder="Search shops..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton
                ]}
                onPress={() => toggleCategory(category)}
              >
                <Text 
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.selectedCategoryButtonText
                  ]}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              showPromotionsOnly && styles.activeFilterButton
            ]}
            onPress={togglePromotionsFilter}
          >
            <Tag size={16} color={showPromotionsOnly ? '#fff' : Colors.primary} />
            <Text 
              style={[
                styles.filterButtonText,
                showPromotionsOnly && styles.activeFilterButtonText
              ]}
            >
              Promotions
            </Text>
          </TouchableOpacity>
        </View>
        
        {filteredShops.length > 0 ? (
          <FlatList
            data={filteredShops}
            renderItem={renderShopItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.shopsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <ShoppingBag size={48} color={Colors.textSecondary} />
            <Text style={styles.emptyText}>No shops found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
            
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setShowPromotionsOnly(false);
              }}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filtersContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
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
    color: '#fff',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}15`,
    marginTop: 12,
    alignSelf: 'center',
  },
  activeFilterButton: {
    backgroundColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginLeft: 6,
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  shopsList: {
    padding: 16,
  },
  shopCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  shopImage: {
    width: '100%',
    height: 180,
  },
  shopContent: {
    padding: 16,
    position: 'relative',
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  shopMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: `${Colors.primary}15`,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  shopRating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  promotionBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  promotionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  resetButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});