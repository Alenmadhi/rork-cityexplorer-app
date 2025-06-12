import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl as RNRefreshControl } from 'react-native';
import { Stack } from 'expo-router';
import { useCityChallenges } from '@/hooks/useCityChallenges';
import ChallengeCard from '@/components/ChallengeCard';
import { SectionHeader } from '@/components/SectionHeader';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ErrorMessage } from '@/components/ErrorMessage';
import { EmptyState } from '@/components/EmptyState';

export default function CityChallengesTab() {
  const { challenges, dailyChallenge, loading, error, refreshChallenges } = useCityChallenges();
  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshChallenges();
    setRefreshing(false);
  }, [refreshChallenges]);
  
  // Group challenges by difficulty
  const easyChallenges = challenges.filter(c => c.difficulty === 'easy');
  const mediumChallenges = challenges.filter(c => c.difficulty === 'medium');
  const hardChallenges = challenges.filter(c => c.difficulty === 'hard');
  
  if (loading) {
    return <LoadingIndicator message="Loading challenges..." />;
  }
  
  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={refreshChallenges} 
      />
    );
  }
  
  if (challenges.length === 0) {
    return (
      <EmptyState
        icon="map"
        title="No Challenges Available"
        message="There are no city challenges available at the moment. Check back later!"
        actionLabel="Refresh"
        onAction={refreshChallenges}
      />
    );
  }
  
  return (
    <>
      <Stack.Screen options={{ title: 'City Challenges' }} />
      
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RNRefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {dailyChallenge && (
          <View style={styles.section}>
            <SectionHeader 
              title="Daily Challenge" 
              actionLabel="View All" 
              actionLink="/city-challenges" 
            />
            <ChallengeCard challenge={dailyChallenge} />
          </View>
        )}
        
        {easyChallenges.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Easy Challenges" />
            {easyChallenges.slice(0, 3).map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </View>
        )}
        
        {mediumChallenges.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Medium Challenges" />
            {mediumChallenges.slice(0, 3).map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </View>
        )}
        
        {hardChallenges.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Hard Challenges" />
            {hardChallenges.slice(0, 3).map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </View>
        )}
      </ScrollView>
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
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
});