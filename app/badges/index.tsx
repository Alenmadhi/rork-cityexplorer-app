import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { Award, Lock, Filter, CheckCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useGamificationStore, Badge } from '@/stores/gamification-store';

type BadgeCategory = 'all' | 'reporting' | 'engagement' | 'impact' | 'challenges' | 'exploration' | 'social';

export default function BadgesScreen() {
  const { badges, userStats } = useGamificationStore();
  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory>('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  
  // Filter badges based on selected category and unlock status
  const filteredBadges = badges.filter(badge => {
    const categoryMatch = selectedCategory === 'all' || badge.category === selectedCategory;
    const unlockStatusMatch = !showUnlockedOnly || badge.unlocked;
    return categoryMatch && unlockStatusMatch;
  });
  
  // Calculate badge stats
  const unlockedCount = badges.filter(badge => badge.unlocked).length;
  const totalCount = badges.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);
  
  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Render badge item
  const renderBadgeItem = ({ item }: { item: Badge }) => (
    <View style={styles.badgeCard}>
      <View style={[styles.badgeIconContainer, !item.unlocked && styles.lockedBadgeIconContainer]}>
        {item.unlocked ? (
          <Award size={40} color={Colors.primary} />
        ) : (
          <Lock size={40} color={Colors.textSecondary} />
        )}
      </View>
      
      <View style={styles.badgeInfo}>
        <View style={styles.badgeHeader}>
          <Text style={[styles.badgeName, !item.unlocked && styles.lockedBadgeName]}>
            {item.name}
          </Text>
          
          <View style={[
            styles.badgeCategoryTag, 
            getCategoryStyle(item.category)
          ]}>
            <Text style={styles.badgeCategoryText}>
              {formatCategory(item.category)}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.badgeDescription, !item.unlocked && styles.lockedBadgeDescription]}>
          {item.description}
        </Text>
        
        <View style={styles.badgeFooter}>
          <View style={styles.badgePoints}>
            <Award size={14} color={item.unlocked ? Colors.primary : Colors.textSecondary} />
            <Text style={[styles.badgePointsText, !item.unlocked && styles.lockedBadgePointsText]}>
              {item.points} points
            </Text>
          </View>
          
          {item.unlocked && item.unlockedAt && (
            <Text style={styles.badgeUnlockedDate}>
              Earned {formatDate(item.unlockedAt)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
  
  // Helper function to get category style
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'reporting':
        return { backgroundColor: `${Colors.primary}20` };
      case 'engagement':
        return { backgroundColor: `${Colors.secondary}20` };
      case 'impact':
        return { backgroundColor: `${Colors.success}20` };
      case 'challenges':
        return { backgroundColor: `${Colors.warning}20` };
      case 'exploration':
        return { backgroundColor: `${Colors.info}20` };
      case 'social':
        return { backgroundColor: `${Colors.error}20` };
      default:
        return { backgroundColor: `${Colors.primary}20` };
    }
  };
  
  // Helper function to format category name
  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Badges',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        {/* Badge Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Badge Progress</Text>
            <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
          </View>
          
          <Text style={styles.progressText}>
            {unlockedCount} of {totalCount} badges earned
          </Text>
        </View>
        
        {/* Category Filter */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryFilters}>
            <TouchableOpacity 
              style={[styles.categoryButton, selectedCategory === 'all' && styles.selectedCategoryButton]}
              onPress={() => setSelectedCategory('all')}
            >
              <Text style={[styles.categoryButtonText, selectedCategory === 'all' && styles.selectedCategoryButtonText]}>
                All
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.categoryButton, selectedCategory === 'reporting' && styles.selectedCategoryButton]}
              onPress={() => setSelectedCategory('reporting')}
            >
              <Text style={[styles.categoryButtonText, selectedCategory === 'reporting' && styles.selectedCategoryButtonText]}>
                Reporting
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.categoryButton, selectedCategory === 'engagement' && styles.selectedCategoryButton]}
              onPress={() => setSelectedCategory('engagement')}
            >
              <Text style={[styles.categoryButtonText, selectedCategory === 'engagement' && styles.selectedCategoryButtonText]}>
                Engagement
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.categoryButton, selectedCategory === 'impact' && styles.selectedCategoryButton]}
              onPress={() => setSelectedCategory('impact')}
            >
              <Text style={[styles.categoryButtonText, selectedCategory === 'impact' && styles.selectedCategoryButtonText]}>
                Impact
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.categoryButton, selectedCategory === 'challenges' && styles.selectedCategoryButton]}
              onPress={() => setSelectedCategory('challenges')}
            >
              <Text style={[styles.categoryButtonText, selectedCategory === 'challenges' && styles.selectedCategoryButtonText]}>
                Challenges
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.categoryButton, selectedCategory === 'exploration' && styles.selectedCategoryButton]}
              onPress={() => setSelectedCategory('exploration')}
            >
              <Text style={[styles.categoryButtonText, selectedCategory === 'exploration' && styles.selectedCategoryButtonText]}>
                Exploration
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.categoryButton, selectedCategory === 'social' && styles.selectedCategoryButton]}
              onPress={() => setSelectedCategory('social')}
            >
              <Text style={[styles.categoryButtonText, selectedCategory === 'social' && styles.selectedCategoryButtonText]}>
                Social
              </Text>
            </TouchableOpacity>
          </ScrollView>
          
          <TouchableOpacity 
            style={styles.unlockedFilterButton}
            onPress={() => setShowUnlockedOnly(!showUnlockedOnly)}
          >
            <View style={[styles.checkboxContainer, showUnlockedOnly && styles.checkedCheckboxContainer]}>
              {showUnlockedOnly && <CheckCircle size={16} color="#fff" />}
            </View>
            <Text style={styles.unlockedFilterText}>Show unlocked only</Text>
          </TouchableOpacity>
        </View>
        
        {/* Badges List */}
        <FlatList
          data={filteredBadges}
          renderItem={renderBadgeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.badgesList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Award size={60} color={Colors.textSecondary} />
              <Text style={styles.emptyTitle}>No badges found</Text>
              <Text style={styles.emptyMessage}>
                {showUnlockedOnly 
                  ? "You haven't unlocked any badges in this category yet" 
                  : "There are no badges in this category"}
              </Text>
            </View>
          )}
        />
      </View>
    </>
  );
}

// ScrollView component for horizontal scrolling
const ScrollView = Platform.OS === 'web' 
  ? require('react-native').ScrollView 
  : require('react-native-gesture-handler').ScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  progressContainer: {
    backgroundColor: Colors.card,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: `${Colors.primary}20`,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  filterContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  categoryFilters: {
    paddingBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedCategoryButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: Colors.text,
  },
  selectedCategoryButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  unlockedFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckboxContainer: {
    backgroundColor: Colors.primary,
  },
  unlockedFilterText: {
    fontSize: 14,
    color: Colors.text,
  },
  badgesList: {
    padding: 16,
  },
  badgeCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  badgeIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lockedBadgeIconContainer: {
    backgroundColor: `${Colors.textSecondary}15`,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
    marginRight: 8,
  },
  lockedBadgeName: {
    color: Colors.textSecondary,
  },
  badgeCategoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeCategoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary,
  },
  badgeDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  lockedBadgeDescription: {
    color: Colors.textSecondary,
  },
  badgeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgePoints: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgePointsText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
  lockedBadgePointsText: {
    color: Colors.textSecondary,
  },
  badgeUnlockedDate: {
    fontSize: 12,
    color: Colors.success,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
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