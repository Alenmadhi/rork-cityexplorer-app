import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Stack } from 'expo-router';
import { AttractionCard } from '@/components/AttractionCard';
import { SearchBar } from '@/components/SearchBar';
import { attractions } from '@/mocks/attractions';
import { Attraction, AttractionCategory } from '@/types';
import Colors from '@/constants/colors';

export default function AttractionsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AttractionCategory | 'all'>('all');

  const categories: Array<AttractionCategory | 'all'> = [
    'all', 'landmark', 'museum', 'park', 'entertainment', 'shopping', 'restaurant'
  ];

  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          attraction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          attraction.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || attraction.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const renderCategoryButton = (category: AttractionCategory | 'all') => {
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

  const renderAttraction = ({ item }: { item: Attraction }) => (
    <AttractionCard attraction={item} />
  );

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Attractions',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search attractions..."
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
        
        {filteredAttractions.length > 0 ? (
          <FlatList
            data={filteredAttractions}
            renderItem={renderAttraction}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.attractionsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No attractions found</Text>
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
  attractionsList: {
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