import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import NewsCard from '@/components/NewsCard';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LastUpdated } from '@/components/LastUpdated';
import { EmptyState } from '@/components/EmptyState';
import CityVibeWidget from '@/components/CityVibeWidget';
import { useNews } from '@/hooks/useNews';
import Colors from '@/constants/colors';
import { MapPin, List, Grid } from 'lucide-react-native';

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
  const renderNewsItem = ({ item }: { item: any }) => (
    <NewsCard 
      news={item} 
      onPress={() => handleNewsPress(item.id)} 
      viewMode={viewMode}
    />
  );

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

        {/* City Vibe Widget */}
        <CityVibeWidget />

        {loading ? (
          <LoadingIndicator message="Loading news..." />
        ) : error ? (
          <ErrorMessage 
            message="Failed to load news. Please try again." 
            onRetry={refreshNews} 
          />
        ) : filteredNews.length === 0 ? (
          <EmptyState 
            title="No News Found"
            message={
              searchQuery 
                ? "No news found matching your search." 
                : "No news available at the moment."
            }
            icon="newspaper"
          />
        ) : (
          <>
            <LastUpdated date={lastUpdated ? lastUpdated.toISOString() : new Date().toISOString()} />
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
                <SectionHeader 
                  title="Latest News" 
                />
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
});