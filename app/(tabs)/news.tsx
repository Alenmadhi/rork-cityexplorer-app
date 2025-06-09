import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Stack } from 'expo-router';
import { NewsCard } from '@/components/NewsCard';
import { SearchBar } from '@/components/SearchBar';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LastUpdated } from '@/components/LastUpdated';
import { RefreshControl } from '@/components/RefreshControl';
import { useNews } from '@/hooks/useNews';
import { NewsItem, NewsCategory } from '@/types';
import Colors from '@/constants/colors';

export default function NewsScreen() {
  const { news, loading, error, lastUpdated, refreshNews } = useNews();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all');

  const categories: Array<NewsCategory | 'all'> = [
    'all', 'local', 'business', 'culture', 'sports', 'politics', 'other'
  ];

  const filteredNews = news.filter(newsItem => {
    const matchesSearch = newsItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          newsItem.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          newsItem.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || newsItem.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const renderCategoryButton = (category: NewsCategory | 'all') => {
    const isSelected = category === selectedCategory;
    return (
      <Text
        key={category}
        style={[
          styles.categoryButton,
          isSelected && styles.selectedCategoryButton,
          { color: isSelected ? Colors.background : Colors.text }
        ]}
        onPress={() => setSelectedCategory(category)}
      >
        {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
      </Text>
    );
  };

  const renderNewsItem = useCallback(({ item }: { item: NewsItem }) => (
    <NewsCard news={item} />
  ), []);

  const keyExtractor = useCallback((item: NewsItem) => item.id, []);

  if (loading && news.length === 0) {
    return <LoadingIndicator message="Loading news..." />;
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'News',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search news..."
        />
        
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={({ item }) => renderCategoryButton(item)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            keyExtractor={(item) => item}
          />
        </View>
        
        {error ? (
          <ErrorMessage message={error} onRetry={refreshNews} />
        ) : filteredNews.length > 0 ? (
          <>
            {lastUpdated && <LastUpdated date={lastUpdated} />}
            <FlatList
              data={filteredNews}
              renderItem={renderNewsItem}
              keyExtractor={keyExtractor}
              contentContainerStyle={styles.newsList}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refreshNews} />
              }
            />
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No news found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
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
    paddingTop: 16,
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
    overflow: 'hidden',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryButton: {
    backgroundColor: Colors.primary,
  },
  newsList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
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
});