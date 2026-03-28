import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, RefreshControl, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { EventCard } from '@/components/EventCard';
import { SearchBar } from '@/components/SearchBar';
import { useEvents } from '@/hooks/useEvents';
import { Event, EventCategory } from '@/types';
import Colors from '@/constants/colors';

export default function EventsScreen() {
  const { events, loading, error, lastUpdated, refreshEvents } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');

  const categories: (EventCategory | 'all')[] = ['all', 'music', 'art', 'food', 'sports', 'festival', 'other'];

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
            { color: isSelected ? Colors.background : Colors.text }
          ]}
        >
          {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEvent = useCallback(({ item }: { item: Event }) => (
    <EventCard event={item} />
  ), []);

  const keyExtractor = useCallback((item: Event) => item.id, []);

  if (loading && events.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
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
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={refreshEvents}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredEvents.length > 0 ? (
          <>
            {lastUpdated && (
              <Text style={styles.lastUpdated}>
                Last updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            )}
            <FlatList
              data={filteredEvents}
              renderItem={renderEvent}
              keyExtractor={keyExtractor}
              contentContainerStyle={styles.eventsList}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refreshEvents} colors={[Colors.primary]} />
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
  categoryButtonText: {
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
  lastUpdated: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
});