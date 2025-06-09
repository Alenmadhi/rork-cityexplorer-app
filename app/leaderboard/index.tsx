import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { Award, Trophy, Users, Calendar, ChevronDown, ChevronUp } from 'lucide-react-native';
import Colors from '@/constants/colors';

// Types
interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  badges: number;
  reportsSubmitted: number;
  reportsResolved: number;
  streak: number;
}

type TimeFilter = 'week' | 'month' | 'allTime';

// Mock data
const MOCK_USERS: LeaderboardUser[] = [
  {
    id: '1',
    name: 'Arben Maloku',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    points: 1250,
    rank: 1,
    badges: 12,
    reportsSubmitted: 28,
    reportsResolved: 22,
    streak: 14
  },
  {
    id: '2',
    name: 'Elira Hoxha',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    points: 980,
    rank: 2,
    badges: 9,
    reportsSubmitted: 19,
    reportsResolved: 15,
    streak: 7
  },
  {
    id: '3',
    name: 'Besnik Krasniqi',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    points: 875,
    rank: 3,
    badges: 8,
    reportsSubmitted: 16,
    reportsResolved: 12,
    streak: 5
  },
  {
    id: '4',
    name: 'Drita Berisha',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    points: 720,
    rank: 4,
    badges: 7,
    reportsSubmitted: 14,
    reportsResolved: 9,
    streak: 3
  },
  {
    id: '5',
    name: 'Genti Shala',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    points: 650,
    rank: 5,
    badges: 6,
    reportsSubmitted: 12,
    reportsResolved: 8,
    streak: 4
  },
  {
    id: '6',
    name: 'Vjosa Rexhepi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    points: 590,
    rank: 6,
    badges: 5,
    reportsSubmitted: 10,
    reportsResolved: 7,
    streak: 2
  },
  {
    id: '7',
    name: 'Ilir Gashi',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    points: 520,
    rank: 7,
    badges: 4,
    reportsSubmitted: 9,
    reportsResolved: 6,
    streak: 3
  },
  {
    id: '8',
    name: 'Teuta Ahmeti',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    points: 480,
    rank: 8,
    badges: 4,
    reportsSubmitted: 8,
    reportsResolved: 5,
    streak: 1
  },
  {
    id: '9',
    name: 'Burim Kelmendi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    points: 420,
    rank: 9,
    badges: 3,
    reportsSubmitted: 7,
    reportsResolved: 4,
    streak: 2
  },
  {
    id: '10',
    name: 'Arta Morina',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    points: 380,
    rank: 10,
    badges: 3,
    reportsSubmitted: 6,
    reportsResolved: 3,
    streak: 1
  },
];

// Current user (for highlighting in the leaderboard)
const CURRENT_USER_ID = '4'; // Drita Berisha

export default function LeaderboardScreen() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');
  const [sortBy, setSortBy] = useState<'points' | 'reports' | 'resolved'>('points');
  const [showTimeFilterDropdown, setShowTimeFilterDropdown] = useState(false);
  
  // Get filtered and sorted users
  const getFilteredUsers = () => {
    // In a real app, we would fetch different data based on the time filter
    // For this mock, we'll just use the same data
    
    let sortedUsers = [...MOCK_USERS];
    
    // Sort based on selected criteria
    if (sortBy === 'points') {
      sortedUsers.sort((a, b) => b.points - a.points);
    } else if (sortBy === 'reports') {
      sortedUsers.sort((a, b) => b.reportsSubmitted - a.reportsSubmitted);
    } else if (sortBy === 'resolved') {
      sortedUsers.sort((a, b) => b.reportsResolved - a.reportsResolved);
    }
    
    // Update ranks
    return sortedUsers.map((user, index) => ({
      ...user,
      rank: index + 1
    }));
  };
  
  const users = getFilteredUsers();
  
  // Find current user in the leaderboard
  const currentUserRank = users.findIndex(user => user.id === CURRENT_USER_ID) + 1;
  const currentUser = users.find(user => user.id === CURRENT_USER_ID);
  
  // Get time filter display text
  const getTimeFilterText = () => {
    switch (timeFilter) {
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      case 'allTime':
        return 'All Time';
      default:
        return 'This Week';
    }
  };
  
  // Render leaderboard item
  const renderLeaderboardItem = ({ item, index }: { item: LeaderboardUser, index: number }) => {
    const isCurrentUser = item.id === CURRENT_USER_ID;
    const isTopThree = index < 3;
    
    return (
      <View style={[
        styles.leaderboardItem,
        isCurrentUser && styles.currentUserItem
      ]}>
        <View style={styles.rankContainer}>
          {isTopThree ? (
            <View style={[styles.topRankBadge, { backgroundColor: getTopRankColor(index) }]}>
              <Text style={styles.topRankText}>{item.rank}</Text>
            </View>
          ) : (
            <Text style={styles.rankText}>{item.rank}</Text>
          )}
        </View>
        
        <Image 
          source={{ uri: item.avatar }} 
          style={styles.avatar}
        />
        
        <View style={styles.userInfo}>
          <Text style={[styles.userName, isCurrentUser && styles.currentUserText]}>
            {item.name} {isCurrentUser && '(You)'}
          </Text>
          
          <View style={styles.userStats}>
            <View style={styles.statItem}>
              <Award size={12} color={Colors.primary} />
              <Text style={styles.statText}>{item.badges}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Calendar size={12} color={Colors.success} />
              <Text style={styles.statText}>{item.streak}d</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.pointsContainer}>
          <Text style={[styles.pointsValue, isCurrentUser && styles.currentUserText]}>
            {sortBy === 'points' && item.points}
            {sortBy === 'reports' && item.reportsSubmitted}
            {sortBy === 'resolved' && item.reportsResolved}
          </Text>
          <Text style={styles.pointsLabel}>
            {sortBy === 'points' && 'pts'}
            {sortBy === 'reports' && 'reports'}
            {sortBy === 'resolved' && 'fixed'}
          </Text>
        </View>
      </View>
    );
  };
  
  // Get color for top 3 ranks
  const getTopRankColor = (index: number) => {
    switch (index) {
      case 0: // 1st place
        return '#FFD700'; // Gold
      case 1: // 2nd place
        return '#C0C0C0'; // Silver
      case 2: // 3rd place
        return '#CD7F32'; // Bronze
      default:
        return Colors.primary;
    }
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Leaderboard',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        {/* Top Contributors Banner */}
        <View style={styles.topContributorsBanner}>
          <Trophy size={24} color="#fff" />
          <Text style={styles.topContributorsText}>Top Contributors</Text>
        </View>
        
        {/* Filters */}
        <View style={styles.filtersContainer}>
          <View style={styles.timeFilterContainer}>
            <TouchableOpacity 
              style={styles.timeFilterButton}
              onPress={() => setShowTimeFilterDropdown(!showTimeFilterDropdown)}
            >
              <Text style={styles.timeFilterText}>{getTimeFilterText()}</Text>
              {showTimeFilterDropdown ? (
                <ChevronUp size={16} color={Colors.text} />
              ) : (
                <ChevronDown size={16} color={Colors.text} />
              )}
            </TouchableOpacity>
            
            {showTimeFilterDropdown && (
              <View style={styles.timeFilterDropdown}>
                <TouchableOpacity 
                  style={[styles.timeFilterOption, timeFilter === 'week' && styles.activeTimeFilterOption]}
                  onPress={() => {
                    setTimeFilter('week');
                    setShowTimeFilterDropdown(false);
                  }}
                >
                  <Text style={[styles.timeFilterOptionText, timeFilter === 'week' && styles.activeTimeFilterOptionText]}>
                    This Week
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.timeFilterOption, timeFilter === 'month' && styles.activeTimeFilterOption]}
                  onPress={() => {
                    setTimeFilter('month');
                    setShowTimeFilterDropdown(false);
                  }}
                >
                  <Text style={[styles.timeFilterOptionText, timeFilter === 'month' && styles.activeTimeFilterOptionText]}>
                    This Month
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.timeFilterOption, timeFilter === 'allTime' && styles.activeTimeFilterOption]}
                  onPress={() => {
                    setTimeFilter('allTime');
                    setShowTimeFilterDropdown(false);
                  }}
                >
                  <Text style={[styles.timeFilterOptionText, timeFilter === 'allTime' && styles.activeTimeFilterOptionText]}>
                    All Time
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          <View style={styles.sortByContainer}>
            <TouchableOpacity 
              style={[styles.sortByButton, sortBy === 'points' && styles.activeSortByButton]}
              onPress={() => setSortBy('points')}
            >
              <Text style={[styles.sortByText, sortBy === 'points' && styles.activeSortByText]}>
                Points
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.sortByButton, sortBy === 'reports' && styles.activeSortByButton]}
              onPress={() => setSortBy('reports')}
            >
              <Text style={[styles.sortByText, sortBy === 'reports' && styles.activeSortByText]}>
                Reports
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.sortByButton, sortBy === 'resolved' && styles.activeSortByButton]}
              onPress={() => setSortBy('resolved')}
            >
              <Text style={[styles.sortByText, sortBy === 'resolved' && styles.activeSortByText]}>
                Resolved
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Leaderboard */}
        <FlatList
          data={users}
          renderItem={renderLeaderboardItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.leaderboardList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={styles.leaderboardHeader}>
              <Text style={styles.leaderboardHeaderText}>Rank</Text>
              <Text style={[styles.leaderboardHeaderText, { flex: 1, marginLeft: 60 }]}>User</Text>
              <Text style={styles.leaderboardHeaderText}>
                {sortBy === 'points' && 'Points'}
                {sortBy === 'reports' && 'Reports'}
                {sortBy === 'resolved' && 'Resolved'}
              </Text>
            </View>
          )}
        />
        
        {/* Current User Stats */}
        {currentUser && (
          <View style={styles.currentUserStats}>
            <View style={styles.currentUserRank}>
              <Users size={20} color={Colors.primary} />
              <Text style={styles.currentUserRankText}>
                Your Rank: <Text style={styles.currentUserRankValue}>{currentUserRank}</Text> of {users.length}
              </Text>
            </View>
            
            <View style={styles.currentUserPointsContainer}>
              <View style={styles.currentUserPointItem}>
                <Text style={styles.currentUserPointValue}>{currentUser.points}</Text>
                <Text style={styles.currentUserPointLabel}>Points</Text>
              </View>
              
              <View style={styles.currentUserPointItem}>
                <Text style={styles.currentUserPointValue}>{currentUser.badges}</Text>
                <Text style={styles.currentUserPointLabel}>Badges</Text>
              </View>
              
              <View style={styles.currentUserPointItem}>
                <Text style={styles.currentUserPointValue}>{currentUser.streak}</Text>
                <Text style={styles.currentUserPointLabel}>Day Streak</Text>
              </View>
            </View>
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
  topContributorsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
  },
  topContributorsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  filtersContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  timeFilterContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  timeFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  timeFilterText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  timeFilterDropdown: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  timeFilterOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  activeTimeFilterOption: {
    backgroundColor: `${Colors.primary}15`,
  },
  timeFilterOptionText: {
    fontSize: 14,
    color: Colors.text,
  },
  activeTimeFilterOptionText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  sortByContainer: {
    flexDirection: 'row',
  },
  sortByButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeSortByButton: {
    borderBottomColor: Colors.primary,
  },
  sortByText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeSortByText: {
    color: Colors.primary,
  },
  leaderboardList: {
    paddingBottom: 120, // Extra space for the current user stats
  },
  leaderboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: `${Colors.primary}10`,
  },
  leaderboardHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    width: 40,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  currentUserItem: {
    backgroundColor: `${Colors.primary}10`,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  topRankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  currentUserText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  userStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  pointsLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  currentUserStats: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  currentUserRank: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentUserRankText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 8,
  },
  currentUserRankValue: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  currentUserPointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  currentUserPointItem: {
    alignItems: 'center',
  },
  currentUserPointValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  currentUserPointLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});