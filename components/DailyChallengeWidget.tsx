import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Target, Check, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useChallengesStore } from '@/stores/challenges-store';
import { useGamificationStore } from '@/stores/gamification-store';

export function DailyChallengeWidget() {
  const router = useRouter();
  const { availableChallenges, completeChallenge } = useChallengesStore();
  const { updateStats } = useGamificationStore();
  const [completed, setCompleted] = useState(false);
  
  // Get daily challenge - first uncompleted challenge or first challenge
  const dailyChallenge = availableChallenges.find(c => !c.completed) || availableChallenges[0];
  
  // Handle challenge completion
  const handleCompleteChallenge = () => {
    if (dailyChallenge && !dailyChallenge.completed && !completed) {
      // Mark challenge as completed
      completeChallenge(dailyChallenge.id);
      
      // Update user stats
      updateStats({
        points: dailyChallenge.points,
        challengesCompleted: 1
      });
      
      // Update local state
      setCompleted(true);
    }
  };
  
  if (!dailyChallenge) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Target size={20} color={Colors.primary} />
          <Text style={styles.title}>Daily Challenge</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => router.push('/challenges')}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.challengeContainer}>
        <Text style={styles.challengeTitle}>{dailyChallenge.title}</Text>
        <Text style={styles.challengeDescription}>{dailyChallenge.description}</Text>
        
        <View style={styles.rewardContainer}>
          <Text style={styles.rewardText}>
            Reward: <Text style={styles.pointsText}>{dailyChallenge.points} points</Text>
          </Text>
          
          {dailyChallenge.completed || completed ? (
            <View style={styles.completedButton}>
              <Check size={16} color="#fff" />
              <Text style={styles.completedButtonText}>Completed</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.completeButton}
              onPress={handleCompleteChallenge}
            >
              <Text style={styles.completeButtonText}>Complete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 8,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    marginRight: 2,
  },
  challengeContainer: {
    backgroundColor: `${Colors.primary}08`,
    borderRadius: 8,
    padding: 16,
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
    lineHeight: 20,
  },
  rewardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  pointsText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  completedButton: {
    backgroundColor: Colors.success,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
});