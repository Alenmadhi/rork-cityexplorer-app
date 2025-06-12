import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useCityChallenges } from '@/hooks/useCityChallenges';
import ChallengeCard from '@/components/ChallengeCard';
import { Map, ListFilter } from 'lucide-react-native';
import { RefreshControl } from '@/components/RefreshControl';
import { EmptyState } from '@/components/EmptyState';

export default function CityChallengesScreen() {
  const router = useRouter();
  const { challenges, loading, error, refreshChallenges } = useCityChallenges();
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  
  const filteredChallenges = filter === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.difficulty === filter);
  
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>City Challenges</Text>
      <Text style={styles.headerSubtitle}>
        Discover hidden gems and stories around Elbasan
      </Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]} 
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'easy' && styles.activeFilter]} 
          onPress={() => setFilter('easy')}
        >
          <Text style={[styles.filterText, filter === 'easy' && styles.activeFilterText]}>Easy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'medium' && styles.activeFilter]} 
          onPress={() => setFilter('medium')}
        >
          <Text style={[styles.filterText, filter === 'medium' && styles.activeFilterText]}>Medium</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'hard' && styles.activeFilter]} 
          onPress={() => setFilter('hard')}
        >
          <Text style={[styles.filterText, filter === 'hard' && styles.activeFilterText]}>Hard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Loading challenges...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <EmptyState
        icon="alert-circle"
        title="Couldn't Load Challenges"
        message={error}
        actionLabel="Try Again"
        onAction={refreshChallenges}
      />
    );
  }
  
  return (
    <>
      <Stack.Screen 
        options={{
          headerRight: () => (
            <TouchableOpacity 
              style={styles.mapButton}
              onPress={() => router.push('/city-challenges/map')}
            >
              <Map size={22} color="#0066cc" />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={filteredChallenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChallengeCard challenge={item} />}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <EmptyState
            icon="search"
            title="No Challenges Found"
            message={`No ${filter !== 'all' ? filter : ''} challenges available right now. Try a different filter or check back later.`}
          />
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshChallenges} />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#0066cc',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '500',
  },
  mapButton: {
    padding: 8,
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});