import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import NewsCard from '@/components/NewsCard';
import { SearchBar } from '@/components/SearchBar';
import { useNews } from '@/hooks/useNews';
import Colors from '@/constants/colors';
import { MapPin, List, Grid } from 'lucide-react-native';
import { NewsItem } from '@/types';

export default function NewsScreen() {
  const router = useRouter();
  const { news, loading, error, refreshNews, lastUpdated } = useNews();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [refreshing, setRefreshing] = useState(false);

  // Filter news based on search query
  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshNews();
    setRefreshing(false);
  }, [refreshNews]);

  // Navigate to news details
  const handleNewsPress = (id: string) => {
    router.push(`/news/${id}`);
  };

  // Navigate to news map
  const handleMapPress = () => {
    router.push('/news/map');
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'list' ? 'grid' : 'list');
  };

  // Render news item
  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <NewsCard 
      news={item} 
      onPress={() => handleNewsPress(item.id)} 
      viewMode={viewMode}
    />
  );

  if (loading && news.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Elbasan News',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar 
            placeholder="Search news..." 
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={styles.viewControls}>
            <TouchableOpacity 
              style={styles.mapButton} 
              onPress={handleMapPress}
            >
              <MapPin size={20} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.viewModeButton} 
              onPress={toggleViewMode}
            >
              {viewMode === 'list' ? (
                <Grid size={20} color={Colors.primary} />
              ) : (
                <List size={20} color={Colors.primary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={refreshNews}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredNews.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No News Found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery 
                ? "No news found matching your search." 
                : "No news available at the moment."}
            </Text>
          </View>
        ) : (
          <>
            {lastUpdated && (
              <Text style={styles.lastUpdated}>
                Last updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            )}
            <FlatList
              data={filteredNews}
              renderItem={renderNewsItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.newsList}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl 
                  refreshing={refreshing} 
                  onRefresh={onRefresh}
                  colors={[Colors.primary]}
                  tintColor={Colors.primary}
                />
              }
              numColumns={viewMode === 'grid' ? 2 : 1}
              key={viewMode} // Force re-render when view mode changes
              ListHeaderComponent={
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Latest News</Text>
                </View>
              }
            />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  viewControls: {
    flexDirection: 'row',
    marginLeft: 8,
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
  viewModeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  newsList: {
    padding: 16,
    paddingTop: 8,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
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
  lastUpdated: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
});