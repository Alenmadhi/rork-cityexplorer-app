import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Stack } from 'expo-router';
import { EventCard } from '@/components/EventCard';
import { SearchBar } from '@/components/SearchBar';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LastUpdated } from '@/components/LastUpdated';
import { RefreshControl } from '@/components/RefreshControl';
import { useEvents } from '@/hooks/useEvents';
import { Event, EventCategory } from '@/types';
import Colors from '@/constants/colors';

export default function EventsScreen() {
  const { events, loading, error, lastUpdated, refreshEvents } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');

  const categories: Array<EventCategory | 'all'> = ['all', 'music', 'art', 'food', 'sports', 'festival', 'other'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const renderCategoryButton = (category: EventCategory | 'all') => {
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

  const renderEvent = useCallback(({ item }: { item: Event }) => (
    <EventCard event={item} />
  ), []);

  const keyExtractor = useCallback((item: Event) => item.id, []);

  if (loading && events.length === 0) {
    return <LoadingIndicator message="Loading events..." />;
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Events',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search events..."
        />
        
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={({ item }) => renderCategoryButton(item)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
        
        {error ? (
          <ErrorMessage message={error} onRetry={refreshEvents} />
        ) : filteredEvents.length > 0 ? (
          <>
            {lastUpdated && <LastUpdated date={lastUpdated} />}
            <FlatList
              data={filteredEvents}
              renderItem={renderEvent}
              keyExtractor={keyExtractor}
              contentContainerStyle={styles.eventsList}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refreshEvents} />
              }
            />
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No events found</Text>
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
  eventsList: {
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