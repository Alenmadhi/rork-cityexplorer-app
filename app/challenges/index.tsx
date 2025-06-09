import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Platform, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Award, Calendar, CheckCircle, Clock, Users, ChevronRight, Filter } from 'lucide-react-native';
import Colors from '@/constants/colors';

// Types
interface Challenge {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  participants: number;
  reward: {
    points: number;
    badge?: string;
  };
  status: 'active' | 'upcoming' | 'completed';
  progress?: number; // 0-100
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

type FilterType = 'all' | 'active' | 'upcoming' | 'completed';

// Mock data
const MOCK_CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'Clean City Challenge',
    description: 'Report at least 5 trash-related issues in your neighborhood.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    startDate: '2025-06-01',
    endDate: '2025-06-15',
    participants: 128,
    reward: {
      points: 200,
      badge: 'Environmental Guardian'
    },
    status: 'active',
    progress: 60,
    category: 'Environment',
    difficulty: 'medium'
  },
  {
    id: '2',
    title: 'Street Light Patrol',
    description: 'Find and report 3 broken street lights in the city.',
    image: 'https://images.unsplash.com/photo-1617919759916-0642e3e3e1f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    startDate: '2025-06-05',
    endDate: '2025-06-20',
    participants: 76,
    reward: {
      points: 150,
      badge: 'Night Guardian'
    },
    status: 'active',
    progress: 33,
    category: 'Safety',
    difficulty: 'easy'
  },
  {
    id: '3',
    title: 'Pothole Hunter',
    description: 'Report 3 potholes in need of repair.',
    image: 'https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    startDate: '2025-06-10',
    endDate: '2025-06-25',
    participants: 92,
    reward: {
      points: 180
    },
    status: 'upcoming',
    category: 'Infrastructure',
    difficulty: 'medium'
  },
  {
    id: '4',
    title: 'Graffiti Cleanup',
    description: 'Help identify 5 locations with unwanted graffiti.',
    image: 'https://images.unsplash.com/photo-1572969095242-fa6a7da5b6d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    startDate: '2025-05-15',
    endDate: '2025-05-30',
    participants: 64,
    reward: {
      points: 150,
      badge: 'City Beautifier'
    },
    status: 'completed',
    progress: 100,
    category: 'Beautification',
    difficulty: 'easy'
  },
  {
    id: '5',
    title: 'Water Leak Detector',
    description: 'Find and report 2 water leaks in public areas.',
    image: 'https://images.unsplash.com/photo-1584677626646-7c8f83690304?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    startDate: '2025-05-20',
    endDate: '2025-06-05',
    participants: 43,
    reward: {
      points: 120
    },
    status: 'completed',
    progress: 100,
    category: 'Environment',
    difficulty: 'medium'
  },
  {
    id: '6',
    title: 'Accessibility Advocate',
    description: 'Report 3 locations that need accessibility improvements.',
    image: 'https://images.unsplash.com/photo-1517239320384-c29cd4c75a85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    startDate: '2025-06-15',
    endDate: '2025-07-15',
    participants: 38,
    reward: {
      points: 250,
      badge: 'Inclusion Champion'
    },
    status: 'upcoming',
    category: 'Accessibility',
    difficulty: 'hard'
  },
];

export default function ChallengesScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>('all');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  
  // Filter challenges
  const filteredChallenges = MOCK_CHALLENGES.filter(challenge => {
    if (filter === 'all') return true;
    return challenge.status === filter;
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Get status color
  const getStatusColor = (status: Challenge['status']) => {
    switch (status) {
      case 'active':
        return Colors.primary;
      case 'upcoming':
        return Colors.warning;
      case 'completed':
        return Colors.success;
      default:
        return Colors.textSecondary;
    }
  };
  
  // Get status text
  const getStatusText = (status: Challenge['status']) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'upcoming':
        return 'Upcoming';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };
  
  // Get difficulty color
  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return Colors.success;
      case 'medium':
        return Colors.warning;
      case 'hard':
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };
  
  // Render challenge item
  const renderChallengeItem = ({ item }: { item: Challenge }) => (
    <TouchableOpacity 
      style={styles.challengeCard}
      onPress={() => router.push(`/challenges/${item.id}`)}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.challengeImage}
      />
      
      <View style={styles.challengeContent}>
        <View style={styles.challengeHeader}>
          <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {getStatusText(item.status)}
            </Text>
          </View>
          
          <View style={[styles.difficultyBadge, { backgroundColor: `${getDifficultyColor(item.difficulty)}20` }]}>
            <Text style={[styles.difficultyText, { color: getDifficultyColor(item.difficulty) }]}>
              {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.challengeTitle}>{item.title}</Text>
        <Text style={styles.challengeDescription} numberOfLines={2}>{item.description}</Text>
        
        <View style={styles.challengeDetails}>
          <View style={styles.detailItem}>
            <Calendar size={14} color={Colors.textSecondary} style={styles.detailIcon} />
            <Text style={styles.detailText}>
              {formatDate(item.startDate)} - {formatDate(item.endDate)}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Users size={14} color={Colors.textSecondary} style={styles.detailIcon} />
            <Text style={styles.detailText}>{item.participants} participants</Text>
          </View>
        </View>
        
        {item.status === 'active' && item.progress !== undefined && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${item.progress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{item.progress}% complete</Text>
          </View>
        )}
        
        <View style={styles.rewardContainer}>
          <View style={styles.rewardItem}>
            <Award size={16} color={Colors.primary} />
            <Text style={styles.rewardText}>{item.reward.points} points</Text>
          </View>
          
          {item.reward.badge && (
            <View style={styles.rewardItem}>
              <CheckCircle size={16} color={Colors.success} />
              <Text style={styles.rewardText}>{item.reward.badge} badge</Text>
            </View>
          )}
        </View>
        
        <View style={styles.cardFooter}>
          <Text style={styles.viewDetailsText}>View Challenge</Text>
          <ChevronRight size={16} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Community Challenges',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        {/* Filter */}
        <View style={styles.filterContainer}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Challenges</Text>
            
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => setShowFilterOptions(!showFilterOptions)}
            >
              <Filter size={16} color={Colors.text} />
              <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>
          </View>
          
          {showFilterOptions && (
            <View style={styles.filterOptions}>
              <TouchableOpacity 
                style={[styles.filterOption, filter === 'all' && styles.activeFilterOption]}
                onPress={() => setFilter('all')}
              >
                <Text style={[styles.filterOptionText, filter === 'all' && styles.activeFilterOptionText]}>
                  All Challenges
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterOption, filter === 'active' && styles.activeFilterOption]}
                onPress={() => setFilter('active')}
              >
                <Text style={[styles.filterOptionText, filter === 'active' && styles.activeFilterOptionText]}>
                  Active
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterOption, filter === 'upcoming' && styles.activeFilterOption]}
                onPress={() => setFilter('upcoming')}
              >
                <Text style={[styles.filterOptionText, filter === 'upcoming' && styles.activeFilterOptionText]}>
                  Upcoming
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterOption, filter === 'completed' && styles.activeFilterOption]}
                onPress={() => setFilter('completed')}
              >
                <Text style={[styles.filterOptionText, filter === 'completed' && styles.activeFilterOptionText]}>
                  Completed
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        {/* Challenge List */}
        {filteredChallenges.length > 0 ? (
          <FlatList
            data={filteredChallenges}
            renderItem={renderChallengeItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.challengesList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Award size={48} color={Colors.textSecondary} />
            <Text style={styles.emptyTitle}>No challenges found</Text>
            <Text style={styles.emptyMessage}>
              There are no challenges matching your current filter. Try changing the filter or check back later.
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
  filterContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterButtonText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 4,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  filterOption: {
    backgroundColor: Colors.card,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeFilterOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterOptionText: {
    fontSize: 14,
    color: Colors.text,
  },
  activeFilterOptionText: {
    color: '#fff',
  },
  challengesList: {
    padding: 16,
  },
  challengeCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
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
  challengeImage: {
    width: '100%',
    height: 160,
  },
  challengeContent: {
    padding: 16,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  challengeDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailIcon: {
    marginRight: 6,
  },
  detailText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: `${Colors.primary}20`,
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  rewardContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  rewardText: {
    fontSize: 13,
    color: Colors.text,
    marginLeft: 6,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  viewDetailsText: {
    fontSize: 14,
    color: Colors.primary,
    marginRight: 4,
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