import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, TouchableOpacity, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { Filter } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useNews } from '@/hooks/useNews';
import { NewsItem, NewsCategory } from '@/types';
import NewsCard from '@/components/NewsCard';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ErrorMessage } from '@/components/ErrorMessage';
import { EmptyState } from '@/components/EmptyState';
import { LastUpdated } from '@/components/LastUpdated';

export default function NewsScreen() {
  const { news, loading, error, lastUpdated, refreshNews } = useNews();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all');
  const [refreshing, setRefreshing] = useState(false);
  
  // Filter news based on search query and category
  const filteredNews = news.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get featured news
  const featuredNews = filteredNews.filter(item => item.featured);
  
  // Get regular news (non-featured)
  const regularNews = filteredNews.filter(item => !item.featured);
  
  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshNews();
    setRefreshing(false);
  };
  
  // Render news item
  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <NewsCard news={item} />
  );
  
  // Render featured news item
  const renderFeaturedNewsItem = ({ item }: { item: NewsItem }) => (
    <NewsCard news={item} featured />
  );
  
  // Render list header
  const renderListHeader = () => (
    <>
      <View style={styles.searchContainer}>
        <SearchBar 
          placeholder="Search news..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => {
            // In a real app, this would open a filter modal
            // For demo purposes, we'll just cycle through categories
            const categories: (NewsCategory | 'all')[] = ['all', 'local', 'business', 'culture', 'sports', 'politics', 'other'];
            const currentIndex = categories.indexOf(selectedCategory);
            const nextIndex = (currentIndex + 1) % categories.length;
            setSelectedCategory(categories[nextIndex]);
          }}
        >
          <Filter size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>
      
      {selectedCategory !== 'all' && (
        <View style={styles.filterIndicator}>
          <Text style={styles.filterText}>
            Filtering by: <Text style={styles.filterCategory}>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</Text>
          </Text>
          <TouchableOpacity onPress={() => setSelectedCategory('all')}>
            <Text style={styles.clearFilterText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {lastUpdated && (
        <LastUpdated date={lastUpdated} />
      )}
      
      {featuredNews.length > 0 && (
        <>
          <SectionHeader title="Featured News" />
          <FlatList
            data={featuredNews}
            renderItem={renderFeaturedNewsItem}
            keyExtractor={(item) => `featured-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
            snapToAlignment="start"
            snapToInterval={300}
            decelerationRate="fast"
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          />
          
          <SectionHeader title="Latest News" />
        </>
      )}
    </>
  );
  
  if (loading && !refreshing) {
    return <LoadingIndicator />;
  }
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'News',
          headerLargeTitle: true,
        }} 
      />
      
      {error && <ErrorMessage message={error} />}
      
      {filteredNews.length === 0 ? (
        <EmptyState 
          title="No news found"
          message={searchQuery ? "Try a different search term or clear filters" : "Check back later for updates"}
          icon="newspaper"
        />
      ) : (
        <FlatList
          data={regularNews}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={renderListHeader}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[Colors.primary]}
              tintColor={Colors.primary}
            />
          }
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.card,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: `${Colors.primary}10`,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  filterText: {
    fontSize: 14,
    color: Colors.text,
  },
  filterCategory: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  clearFilterText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  featuredList: {
    paddingBottom: 16,
  },
});