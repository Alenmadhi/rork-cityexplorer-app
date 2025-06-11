import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Award, Clock, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useChallengesStore, UserChallenge } from '@/stores/challenges-store';

export const DailyChallengeWidget: React.FC = () => {
  const router = useRouter();
  const { availableChallenges } = useChallengesStore();
  
  // Get daily challenges
  const dailyChallenges = availableChallenges.filter(c => c.type === 'daily');
  
  // Get the first incomplete daily challenge
  const featuredChallenge = dailyChallenges.find(c => !c.completed) || dailyChallenges[0];
  
  // Calculate progress percentage
  const getProgressPercentage = (challenge: UserChallenge) => {
    if (!challenge) return 0;
    return Math.min(challenge.progress / challenge.requirements.count * 100, 100);
  };
  
  // Format time remaining
  const formatTimeRemaining = (expiresAt?: string) => {
    if (!expiresAt) return 'No expiration';
    
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffMs = expiry.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Expired';
    
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHrs > 0) {
      return `${diffHrs}h ${diffMins}m left`;
    }
    
    return `${diffMins}m left`;
  };
  
  // If no challenges, show empty state
  if (!featuredChallenge) {
    return (
      <TouchableOpacity 
        style={styles.container}
        onPress={() => router.push('/challenges')}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Daily Challenges</Text>
          <ChevronRight size={16} color={Colors.primary} />
        </View>
        
        <Text style={styles.emptyText}>No active challenges</Text>
        
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => router.push('/challenges')}
        >
          <Text style={styles.viewAllText}>View All Challenges</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
  
  const progressPercentage = getProgressPercentage(featuredChallenge);
  const timeRemaining = formatTimeRemaining(featuredChallenge.expiresAt);
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push('/challenges')}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Daily Challenge</Text>
        <View style={styles.badgeContainer}>
          <Award size={12} color={Colors.primary} />
          <Text style={styles.pointsText}>{featuredChallenge.points} pts</Text>
        </View>
      </View>
      
      <Text style={styles.challengeTitle}>{featuredChallenge.title}</Text>
      <Text style={styles.challengeDescription} numberOfLines={2}>
        {featuredChallenge.description}
      </Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
        </View>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {featuredChallenge.progress}/{featuredChallenge.requirements.count} completed
          </Text>
          
          <View style={styles.timeContainer}>
            <Clock size={12} color={Colors.textSecondary} />
            <Text style={styles.timeText}>{timeRemaining}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.totalText}>
          {dailyChallenges.length} challenges today
        </Text>
        
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => router.push('/challenges')}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: `${Colors.primary}20`,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  totalText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    textAlign: 'center',
  },
});