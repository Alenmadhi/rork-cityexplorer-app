import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SearchBar } from '@/components/SearchBar';
import { ShopCard } from '@/components/ShopCard';
import { shops as mockShops } from '@/mocks/shops';
import { Shop, ShopCategory } from '@/types';
import Colors from '@/constants/colors';
import { MapPin } from 'lucide-react-native';
import { fetchShops } from '@/services/api';

export default function ShopsScreen() {
  const router = useRouter();
  const [shops, setShops] = useState<Shop[]>(mockShops);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory | 'all'>('all');
  const [refreshing, setRefreshing] = useState(false);
  
  const categories: Array<ShopCategory | 'all'> = ['all', 'souvenirs', 'food', 'clothing', 'books', 'sports'];
  
  // Filter shops based on search query and selected category
  const filteredShops = shops.filter(shop => {
    const matchesSearch = 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || shop.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort shops to show featured ones first
  const sortedShops = [...filteredShops].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
  
  const handleShopPress = (id: string) => {
    router.push(`/tourist/shops/${id}`);
  };
  
  const handleMapPress = () => {
    router.push('/tourist/shops/map');
  };
  
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    
    try {
      const fetchedShops = await fetchShops();
      setShops(fetchedShops);
    } catch (err) {
      console.error('Error fetching shops:', err);
      setError("Couldn't connect to shops service. Showing sample shops instead.");
    } finally {
      setRefreshing(false);
    }
  }, []);
  
  const renderCategoryButton = (category: ShopCategory | 'all') => {
    const isSelected = category === selectedCategory;
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
          {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const renderShopItem = ({ item }: { item: Shop }) => (
    <ShopCard shop={item} onPress={() => handleShopPress(item.id)} />
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
        <View style={styles.searchContainer}>
          <SearchBar 
            placeholder="Search shops..." 
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          
          <TouchableOpacity 
            style={styles.mapButton}
            onPress={handleMapPress}
          >
            <MapPin size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={({ item }) => renderCategoryButton(item)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {sortedShops.length > 0 ? (
          <FlatList
            data={sortedShops}
            renderItem={renderShopItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.shopsList}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={handleRefresh}
                colors={[Colors.primary]}
                tintColor={Colors.primary}
              />
            }
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No shops found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery || selectedCategory !== 'all'
                ? "Try adjusting your search or filters"
                : "No shops available at the moment"}
            </Text>
          </View>
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
  },
  selectedCategoryButton: {
    backgroundColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  shopsList: {
    padding: 16,
    paddingTop: 8,
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
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: `${Colors.error}15`,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 14,
    color: Colors.error,
    marginBottom: 8,
  },
  retryButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});