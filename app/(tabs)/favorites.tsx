import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { EventCard } from '@/components/EventCard';
import { AttractionCard } from '@/components/AttractionCard';
import { NewsCard } from '@/components/NewsCard';
import { EmptyState } from '@/components/EmptyState';
import { useFavoritesStore } from '@/stores/favorites-store';
import { useEvents } from '@/hooks/useEvents';
import { useNews } from '@/hooks/useNews';
import { attractions } from '@/mocks/attractions';
import Colors from '@/constants/colors';

type TabType = 'events' | 'attractions' | 'news';

export default function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('events');
  const { eventIds, attractionIds, newsIds } = useFavoritesStore();
  const { events } = useEvents();
  const { news } = useNews();

  const favoriteEvents = events.filter(event => eventIds.includes(event.id));
  const favoriteAttractions = attractions.filter(attraction => attractionIds.includes(attraction.id));
  const favoriteNews = news.filter(newsItem => newsIds.includes(newsItem.id));

  const renderTabButton = (tabName: TabType, label: string) => {
    const isActive = activeTab === tabName;
    return (
      <TouchableOpacity
        style={[styles.tabButton, isActive && styles.activeTabButton]}
        onPress={() => setActiveTab(tabName)}
      >
        <Text 
          style={[
            styles.tabButtonText, 
            isActive && styles.activeTabButtonText
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return favoriteEvents.length > 0 ? (
          favoriteEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <EmptyState 
            title="No favorite events yet" 
            message="Save events you're interested in to find them here"
          />
        );
      case 'attractions':
        return favoriteAttractions.length > 0 ? (
          favoriteAttractions.map(attraction => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))
        ) : (
          <EmptyState 
            title="No favorite attractions yet" 
            message="Save attractions you're interested in to find them here"
          />
        );
      case 'news':
        return favoriteNews.length > 0 ? (
          favoriteNews.map(newsItem => (
            <NewsCard key={newsItem.id} news={newsItem} />
          ))
        ) : (
          <EmptyState 
            title="No favorite news yet" 
            message="Save news articles you're interested in to find them here"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Favorites',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          {renderTabButton('events', 'Events')}
          {renderTabButton('attractions', 'Attractions')}
          {renderTabButton('news', 'News')}
        </View>
        
        <ScrollView 
          style={styles.contentContainer}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTabButton: {
    backgroundColor: Colors.primary,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  activeTabButtonText: {
    color: Colors.background,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
    flexGrow: 1,
  },
});