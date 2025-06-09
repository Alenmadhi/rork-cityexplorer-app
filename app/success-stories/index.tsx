import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { Wrench } from 'lucide-react-native';
import { SuccessStoryCard } from '@/components/SuccessStoryCard';
import { useSuccessStoriesStore } from '@/stores/success-stories-store';
import { SuccessStory } from '@/types';
import Colors from '@/constants/colors';

export default function SuccessStoriesScreen() {
  const { stories, fetchStories, isLoading } = useSuccessStoriesStore();
  
  React.useEffect(() => {
    fetchStories();
  }, []);
  
  const renderStory = ({ item }: { item: SuccessStory }) => (
    <SuccessStoryCard story={item} featured={item.featured} />
  );
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Success Stories',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            See how citizen reports have helped improve Elbasan
          </Text>
        </View>
        
        {stories && stories.length > 0 ? (
          <FlatList
            data={stories}
            renderItem={renderStory}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.storiesList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Wrench size={60} color={Colors.textSecondary} />
            <Text style={styles.emptyTitle}>
              {isLoading ? 'Loading stories...' : 'No success stories yet'}
            </Text>
            <Text style={styles.emptyMessage}>
              {isLoading 
                ? 'Please wait while we fetch the latest success stories'
                : 'Check back later for updates on resolved issues'
              }
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
  headerContainer: {
    padding: 16,
    backgroundColor: `${Colors.primary}15`,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 22,
  },
  storiesList: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});