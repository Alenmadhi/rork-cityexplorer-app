import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { tours } from '@/mocks/tours';
import { TourCard } from '@/components/TourCard';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';
import Colors from '@/constants/colors';
import { Tour, TourCategory } from '@/types';

export default function ToursScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TourCategory | 'all'>('all');
  
  const categories: Array<TourCategory | 'all'> = [
    'all', 'historical', 'cultural', 'culinary', 'nature', 'hidden-gems', 'nightlife'
  ];
  
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tour.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const featuredTours = filteredTours.filter(tour => tour.featured);
  const regularTours = filteredTours.filter(tour => !tour.featured);
  
  // Combine featured tours at the top, followed by regular tours
  const sortedTours = [...featuredTours, ...regularTours];
  
  const renderCategoryButton = (category: TourCategory | 'all') => {
    const isSelected = category === selectedCategory;
    const displayName = category === 'all' 
      ? 'All' 
      : category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
    
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
  
  const renderTour = ({ item }: { item: Tour }) => (
    <TourCard tour={item} featured={item.featured} />
  );
  
  const handleClearSearch = () => {
    setSearchQuery('');
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Explore Tours',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search tours..."
            onClear={handleClearSearch}
          />
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
        
        {sortedTours.length > 0 ? (
          <FlatList
            data={sortedTours}
            renderItem={renderTour}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.toursList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyState
            title="No tours found"
            message="Try adjusting your search or filters to find the perfect tour for you."
            icon="search"
            actionLabel="Clear Filters"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          />
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  categoriesContainer: {
    marginBottom: 8,
  },
  categoriesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedCategoryButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  toursList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});