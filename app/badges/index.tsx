import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Award } from 'lucide-react-native';
import { BadgeCard } from '@/components/BadgeCard';
import { NewBadgeModal } from '@/components/NewBadgeModal';
import { useGamificationStore } from '@/stores/gamification-store';
import { badges } from '@/mocks/badges';
import { Badge } from '@/types';
import Colors from '@/constants/colors';

type FilterType = 'all' | 'earned' | 'unearned';

export default function BadgesScreen() {
  const { userAchievements } = useGamificationStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  
  const earnedBadgeIds = userAchievements.map(a => a.badgeId);
  
  const filteredBadges = badges.filter(badge => {
    if (filter === 'all') return true;
    if (filter === 'earned') return earnedBadgeIds.includes(badge.id);
    if (filter === 'unearned') return !earnedBadgeIds.includes(badge.id);
    return true;
  });
  
  const getEarnedDate = (badgeId: string) => {
    const achievement = userAchievements.find(a => a.badgeId === badgeId);
    return achievement?.dateEarned;
  };
  
  const handleBadgePress = (badge: Badge) => {
    setSelectedBadge(badge);
    setShowBadgeModal(true);
  };
  
  const renderBadge = ({ item }: { item: Badge }) => (
    <BadgeCard
      badge={item}
      earned={earnedBadgeIds.includes(item.id)}
      earnedDate={getEarnedDate(item.id)}
      onPress={() => handleBadgePress(item)}
    />
  );
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Badges',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{earnedBadgeIds.length}</Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{badges.length - earnedBadgeIds.length}</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{badges.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
        
        <View style={styles.filtersContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'all' && styles.activeFilterButton]}
            onPress={() => setFilter('all')}
          >
            <Text 
              style={[
                styles.filterButtonText, 
                filter === 'all' && styles.activeFilterButtonText
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterButton, filter === 'earned' && styles.activeFilterButton]}
            onPress={() => setFilter('earned')}
          >
            <Text 
              style={[
                styles.filterButtonText, 
                filter === 'earned' && styles.activeFilterButtonText
              ]}
            >
              Earned
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterButton, filter === 'unearned' && styles.activeFilterButton]}
            onPress={() => setFilter('unearned')}
          >
            <Text 
              style={[
                styles.filterButtonText, 
                filter === 'unearned' && styles.activeFilterButtonText
              ]}
            >
              Unearned
            </Text>
          </TouchableOpacity>
        </View>
        
        {filteredBadges.length > 0 ? (
          <FlatList
            data={filteredBadges}
            renderItem={renderBadge}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.badgesList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Award size={60} color={Colors.textSecondary} />
            <Text style={styles.emptyTitle}>No badges found</Text>
            <Text style={styles.emptyMessage}>
              {filter === 'earned' 
                ? "You haven't earned any badges yet. Report issues to earn badges!" 
                : "No badges match the current filter."}
            </Text>
          </View>
        )}
      </View>
      
      {selectedBadge && (
        <NewBadgeModal
          badge={selectedBadge}
          visible={showBadgeModal}
          onClose={() => setShowBadgeModal(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  filtersContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeFilterButton: {
    borderBottomColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  activeFilterButtonText: {
    color: Colors.primary,
  },
  badgesList: {
    padding: 16,
    paddingTop: 0,
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