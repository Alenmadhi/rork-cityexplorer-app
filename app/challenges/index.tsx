import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Award, CheckCircle, Clock, Calendar, ChevronRight, RefreshCw, AlertTriangle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useChallengesStore, UserChallenge } from '@/stores/challenges-store';
import { useGamificationStore } from '@/stores/gamification-store';

export default function ChallengesScreen() {
  const router = useRouter();
  const { 
    availableChallenges, 
    completedChallenges, 
    fetchChallenges, 
    claimChallengeReward,
    isLoading,
    refreshDailyChallenges
  } = useChallengesStore();
  const { userStats } = useGamificationStore();
  
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'available' | 'completed'>('available');
  
  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchChallenges();
    setRefreshing(false);
  };
  
  const handleRefreshDailyChallenges = async () => {
    setRefreshing(true);
    await refreshDailyChallenges();
    setRefreshing(false);
  };
  
  // Filter challenges by type
  const dailyChallenges = availableChallenges.filter(c => c.type === 'daily');
  const weeklyChallenges = availableChallenges.filter(c => c.type === 'weekly');
  const monthlyChallenges = availableChallenges.filter(c => c.type === 'monthly');
  const oneTimeChallenges = availableChallenges.filter(c => c.type === 'one-time');
  
  // Format time remaining
  const formatTimeRemaining = (expiresAt?: string) => {
    if (!expiresAt) return 'No expiration';
    
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffMs = expiry.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Expired';
    
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHrs > 24) {
      const diffDays = Math.floor(diffHrs / 24);
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} left`;
    }
    
    if (diffHrs > 0) {
      return `${diffHrs} hr${diffHrs !== 1 ? 's' : ''} ${diffMins} min${diffMins !== 1 ? 's' : ''} left`;
    }
    
    return `${diffMins} min${diffMins !== 1 ? 's' : ''} left`;
  };
  
  // Render challenge item
  const renderChallengeItem = ({ item }: { item: UserChallenge }) => {
    const isCompleted = item.completed;
    const isClaimed = item.claimed;
    const progress = Math.min(item.progress / item.requirements.count, 1);
    const timeRemaining = formatTimeRemaining(item.expiresAt);
    const isExpired = item.expiresAt && new Date(item.expiresAt) < new Date();
    
    return (
      <View style={styles.challengeCard}>
        <View style={styles.challengeHeader}>
          <View style={[styles.categoryBadge, getCategoryStyle(item.category)]}>
            <Text style={styles.categoryText}>{formatCategory(item.category)}</Text>
          </View>
          
          <View style={[styles.typeBadge, getTypeStyle(item.type)]}>
            <Text style={styles.typeText}>{formatType(item.type)}</Text>
          </View>
        </View>
        
        <Text style={styles.challengeTitle}>{item.title}</Text>
        <Text style={styles.challengeDescription}>{item.description}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {item.progress} / {item.requirements.count}
          </Text>
        </View>
        
        <View style={styles.challengeFooter}>
          <View style={styles.rewardContainer}>
            <Award size={16} color={Colors.primary} />
            <Text style={styles.rewardText}>{item.points} points</Text>
          </View>
          
          {item.expiresAt && !isCompleted && !isExpired && (
            <View style={styles.timeContainer}>
              <Clock size={16} color={timeRemaining.includes('min') ? Colors.warning : Colors.textSecondary} />
              <Text style={[
                styles.timeText, 
                timeRemaining.includes('min') && { color: Colors.warning }
              ]}>
                {timeRemaining}
              </Text>
            </View>
          )}
          
          {isExpired && !isCompleted && (
            <View style={styles.timeContainer}>
              <AlertTriangle size={16} color={Colors.error} />
              <Text style={[styles.timeText, { color: Colors.error }]}>
                Expired
              </Text>
            </View>
          )}
          
          {isCompleted && !isClaimed && activeTab === 'available' && (
            <TouchableOpacity 
              style={styles.claimButton}
              onPress={() => claimChallengeReward(item.id)}
            >
              <Text style={styles.claimButtonText}>Claim Reward</Text>
            </TouchableOpacity>
          )}
          
          {isCompleted && isClaimed && (
            <View style={styles.completedContainer}>
              <CheckCircle size={16} color={Colors.success} />
              <Text style={styles.completedText}>Completed</Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  
  // Helper functions for styling
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'reporting':
        return { backgroundColor: `${Colors.primary}20` };
      case 'engagement':
        return { backgroundColor: `${Colors.secondary}20` };
      case 'exploration':
        return { backgroundColor: `${Colors.success}20` };
      case 'community':
        return { backgroundColor: `${Colors.warning}20` };
      default:
        return { backgroundColor: `${Colors.primary}20` };
    }
  };
  
  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'daily':
        return { backgroundColor: `${Colors.info}20` };
      case 'weekly':
        return { backgroundColor: `${Colors.success}20` };
      case 'monthly':
        return { backgroundColor: `${Colors.warning}20` };
      case 'one-time':
        return { backgroundColor: `${Colors.secondary}20` };
      default:
        return { backgroundColor: `${Colors.info}20` };
    }
  };
  
  const formatCategory = (category: string) => {
    switch (category) {
      case 'reporting':
        return 'Reporting';
      case 'engagement':
        return 'Engagement';
      case 'exploration':
        return 'Exploration';
      case 'community':
        return 'Community';
      default:
        return category;
    }
  };
  
  const formatType = (type: string) => {
    switch (type) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'monthly':
        return 'Monthly';
      case 'one-time':
        return 'One-time';
      default:
        return type;
    }
  };
  
  // Render section header
  const renderSectionHeader = (title: string, count: number) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionCount}>{count}</Text>
    </View>
  );
  
  // Render available challenges
  const renderAvailableChallenges = () => (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={() => (
        <>
          {/* User Stats Summary */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats?.points || 0}</Text>
              <Text style={styles.statLabel}>Total Points</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {completedChallenges.length}
              </Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {availableChallenges.filter(c => c.completed && !c.claimed).length}
              </Text>
              <Text style={styles.statLabel}>To Claim</Text>
            </View>
          </View>
          
          {/* Daily Challenges */}
          {dailyChallenges.length > 0 && (
            <>
              <View style={styles.sectionHeaderContainer}>
                {renderSectionHeader('Daily Challenges', dailyChallenges.length)}
                
                <TouchableOpacity 
                  style={styles.refreshButton}
                  onPress={handleRefreshDailyChallenges}
                >
                  <RefreshCw size={16} color={Colors.primary} />
                  <Text style={styles.refreshButtonText}>Refresh</Text>
                </TouchableOpacity>
              </View>
              
              {dailyChallenges.map(challenge => (
                <React.Fragment key={challenge.id}>
                  {renderChallengeItem({ item: challenge })}
                </React.Fragment>
              ))}
            </>
          )}
          
          {/* Weekly Challenges */}
          {weeklyChallenges.length > 0 && (
            <>
              {renderSectionHeader('Weekly Challenges', weeklyChallenges.length)}
              
              {weeklyChallenges.map(challenge => (
                <React.Fragment key={challenge.id}>
                  {renderChallengeItem({ item: challenge })}
                </React.Fragment>
              ))}
            </>
          )}
          
          {/* Monthly Challenges */}
          {monthlyChallenges.length > 0 && (
            <>
              {renderSectionHeader('Monthly Challenges', monthlyChallenges.length)}
              
              {monthlyChallenges.map(challenge => (
                <React.Fragment key={challenge.id}>
                  {renderChallengeItem({ item: challenge })}
                </React.Fragment>
              ))}
            </>
          )}
          
          {/* One-time Challenges */}
          {oneTimeChallenges.length > 0 && (
            <>
              {renderSectionHeader('One-time Challenges', oneTimeChallenges.length)}
              
              {oneTimeChallenges.map(challenge => (
                <React.Fragment key={challenge.id}>
                  {renderChallengeItem({ item: challenge })}
                </React.Fragment>
              ))}
            </>
          )}
          
          {availableChallenges.length === 0 && (
            <View style={styles.emptyContainer}>
              <Calendar size={60} color={Colors.textSecondary} />
              <Text style={styles.emptyTitle}>No Available Challenges</Text>
              <Text style={styles.emptyMessage}>
                Check back later for new challenges or pull down to refresh
              </Text>
            </View>
          )}
        </>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.listContent}
    />
  );
  
  // Render completed challenges
  const renderCompletedChallenges = () => (
    <FlatList
      data={completedChallenges}
      renderItem={renderChallengeItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <CheckCircle size={60} color={Colors.textSecondary} />
          <Text style={styles.emptyTitle}>No Completed Challenges</Text>
          <Text style={styles.emptyMessage}>
            Complete challenges to see them here
          </Text>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.listContent}
    />
  );
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Challenges',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'available' && styles.activeTabButton]}
            onPress={() => setActiveTab('available')}
          >
            <Text style={[styles.tabText, activeTab === 'available' && styles.activeTabText]}>
              Available
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'completed' && styles.activeTabButton]}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
              Completed
            </Text>
            {completedChallenges.length > 0 && (
              <View style={styles.badgeCount}>
                <Text style={styles.badgeCountText}>{completedChallenges.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Challenge Lists */}
        {activeTab === 'available' ? renderAvailableChallenges() : renderCompletedChallenges()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.card,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  badgeCount: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  badgeCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 8,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  sectionCount: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginLeft: 8,
    backgroundColor: `${Colors.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}15`,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  refreshButtonText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
  challengeCard: {
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
  challengeHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.info,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBarBackground: {
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
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginLeft: 6,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  claimButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  claimButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 14,
    color: Colors.success,
    fontWeight: '500',
    marginLeft: 6,
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