import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Platform, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, Award, Clock, Share2, Camera, HelpCircle, ChevronLeft, Compass, Check } from 'lucide-react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import Colors from '@/constants/colors';
import { useCityChallengesStore } from '@/stores/city-challenges-store';
import { useAuthStore } from '@/stores/auth-store';
import { useGamificationStore } from '@/stores/gamification-store';

export default function ChallengeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuthStore();
  const { userStats } = useGamificationStore();
  const { 
    availableChallenges, 
    dailyChallenge,
    userChallenges,
    checkProximity,
    completeChallenge,
    useHint,
    addNote,
    shareChallenge
  } = useCityChallengesStore();
  
  const [challenge, setChallenge] = useState(
    availableChallenges.find(c => c.id === id) || 
    (dailyChallenge?.id === id ? dailyChallenge : null)
  );
  
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [proximity, setProximity] = useState<{ isNearby: boolean; distance: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [note, setNote] = useState('');
  const [completed, setCompleted] = useState(false);
  
  // Get user challenge data
  const userChallenge = userChallenges.find(uc => uc.challengeId === id);
  
  useEffect(() => {
    if (!challenge) {
      // Challenge not found, go back
      Alert.alert('Error', 'Challenge not found');
      router.back();
      return;
    }
    
    // Check if challenge is already completed
    if (userChallenge?.status === 'completed') {
      setCompleted(true);
    }
    
    // Get user location
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          
          // Check proximity
          if (challenge) {
            setLoading(true);
            const result = await checkProximity(challenge.id, {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            });
            setProximity(result);
            setLoading(false);
          }
        }
      }
    })();
    
    // Set note from user challenge
    if (userChallenge?.notes) {
      setNote(userChallenge.notes);
    }
  }, [challenge, id]);
  
  if (!challenge) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  
  // Format expiry time
  const formatExpiryTime = () => {
    const expiryDate = new Date(challenge.expiresAt);
    const now = new Date();
    
    const diffMs = expiryDate.getTime() - now.getTime();
    if (diffMs <= 0) return 'Expired';
    
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHrs > 0) {
      return `${diffHrs}h ${diffMins}m`;
    }
    return `${diffMins}m`;
  };
  
  // Format distance
  const formatDistance = (meters?: number) => {
    if (!meters) return 'Unknown';
    
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };
  
  // Handle solve challenge
  const handleSolveChallenge = async () => {
    if (!user) {
      Alert.alert('Sign In Required', 'Please sign in to solve challenges');
      router.push('/(auth)/login');
      return;
    }
    
    if (!proximity?.isNearby) {
      Alert.alert(
        'Not Close Enough', 
        `You need to be within ${challenge.location.radius}m of the location to solve this challenge.`
      );
      return;
    }
    
    setLoading(true);
    
    try {
      await completeChallenge(challenge.id, user.id);
      setCompleted(true);
      
      Alert.alert(
        'Challenge Completed!', 
        `Congratulations! You've earned ${challenge.reward.points} points.`,
        [
          { text: 'OK' }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to complete challenge. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle use hint
  const handleUseHint = () => {
    useHint(challenge.id);
    setShowHint(true);
  };
  
  // Handle take photo
  const handleTakePhoto = async () => {
    if (!user) {
      Alert.alert('Sign In Required', 'Please sign in to take photos');
      router.push('/(auth)/login');
      return;
    }
    
    if (Platform.OS === 'web') {
      Alert.alert('Not Available', 'This feature is not available on web');
      return;
    }
    
    // Request camera permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera permission is required to take photos');
      return;
    }
    
    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });
    
    if (!result.canceled && result.assets && result.assets[0]) {
      const photo = result.assets[0];
      
      // In a real app, we would upload the photo to a server
      // For now, we'll just store it in the user challenge
      if (photo.base64) {
        await completeChallenge(challenge.id, user.id, `data:image/jpeg;base64,${photo.base64}`);
        setCompleted(true);
        
        Alert.alert(
          'Challenge Completed!', 
          `Congratulations! You've earned ${challenge.reward.points} points.`,
          [
            { text: 'OK' }
          ]
        );
      }
    }
  };
  
  // Handle share
  const handleShare = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not Available', 'Sharing is not available on web');
      return;
    }
    
    try {
      // In a real app, we would generate a shareable image or link
      // For now, we'll just mark the challenge as shared
      shareChallenge(challenge.id);
      
      // Check if sharing is available
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(
          Platform.select({
            ios: 'file://local/tmp/challenge.txt',
            android: 'file:///data/user/0/host.exp.exponent/cache/challenge.txt',
          }) || '',
          {
            dialogTitle: `Check out this challenge: ${challenge.title}`,
            mimeType: 'text/plain',
            UTI: 'public.plain-text',
          }
        );
      } else {
        Alert.alert('Sharing not available', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error sharing challenge:', error);
    }
  };
  
  // Handle add note
  const handleAddNote = () => {
    if (note.trim()) {
      addNote(challenge.id, note.trim());
      Alert.alert('Note Saved', 'Your note has been saved');
    }
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Challenge Details',
          headerBackTitle: 'Challenges',
        }} 
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {challenge.image && (
          <Image 
            source={{ uri: challenge.image }} 
            style={styles.image}
            resizeMode="cover"
          />
        )}
        
        <View style={styles.header}>
          <Text style={styles.title}>{challenge.title}</Text>
          
          <View style={styles.badges}>
            <View style={[
              styles.difficultyBadge, 
              { 
                backgroundColor: challenge.difficulty === 'easy' 
                  ? `${Colors.success}20` 
                  : challenge.difficulty === 'medium'
                    ? `${Colors.warning}20`
                    : `${Colors.error}20`
              }
            ]}>
              <Text style={[
                styles.difficultyText,
                { 
                  color: challenge.difficulty === 'easy' 
                    ? Colors.success 
                    : challenge.difficulty === 'medium'
                      ? Colors.warning
                      : Colors.error
                }
              ]}>
                {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
              </Text>
            </View>
            
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>
                {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
              </Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.description}>{challenge.description}</Text>
        
        <TouchableOpacity 
          style={styles.clueContainer}
          onPress={() => setShowClue(!showClue)}
        >
          <Text style={styles.clueLabel}>
            {showClue ? 'Hide Clue' : 'Show Clue'}
          </Text>
          {showClue && (
            <Text style={styles.clueText}>"{challenge.clue}"</Text>
          )}
        </TouchableOpacity>
        
        {showHint && challenge.location.hint && (
          <View style={styles.hintContainer}>
            <Text style={styles.hintLabel}>Hint:</Text>
            <Text style={styles.hintText}>{challenge.location.hint}</Text>
          </View>
        )}
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MapPin size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{challenge.location.name}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Award size={16} color={Colors.primary} />
            <Text style={styles.detailText}>{challenge.reward.points} points</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={16} color={Colors.warning} />
            <Text style={styles.detailText}>Expires in {formatExpiryTime()}</Text>
          </View>
          
          {proximity && (
            <View style={styles.detailItem}>
              <Compass size={16} color={proximity.isNearby ? Colors.success : Colors.textSecondary} />
              <Text style={[
                styles.detailText, 
                { color: proximity.isNearby ? Colors.success : Colors.textSecondary }
              ]}>
                {proximity.isNearby 
                  ? 'You are near this location!' 
                  : `Distance: ${formatDistance(proximity.distance)}`}
              </Text>
            </View>
          )}
        </View>
        
        {completed ? (
          <View style={styles.completedContainer}>
            <View style={styles.completedBadge}>
              <Check size={20} color="#fff" />
              <Text style={styles.completedText}>Challenge Completed</Text>
            </View>
            
            {challenge.reward.story && (
              <View style={styles.storyContainer}>
                <Text style={styles.storyLabel}>The Story Behind This Place:</Text>
                <Text style={styles.storyText}>{challenge.reward.story}</Text>
              </View>
            )}
            
            {challenge.reward.badge && (
              <View style={styles.badgeContainer}>
                <Award size={40} color={Colors.primary} />
                <Text style={styles.badgeText}>
                  You earned the {challenge.reward.badge.replace('_', ' ')} badge!
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.actionsContainer}>
            {!showHint && (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleUseHint}
              >
                <HelpCircle size={20} color={Colors.primary} />
                <Text style={styles.actionText}>Use Hint</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShare}
            >
              <Share2 size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleTakePhoto}
            >
              <Camera size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {!completed && (
          <TouchableOpacity 
            style={[
              styles.solveButton,
              (loading || !proximity?.isNearby) && styles.disabledButton
            ]}
            onPress={handleSolveChallenge}
            disabled={loading || !proximity?.isNearby}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.solveButtonText}>
                {proximity?.isNearby ? 'Solve Challenge' : 'Get Closer to Solve'}
              </Text>
            )}
          </TouchableOpacity>
        )}
        
        <View style={styles.mapContainer}>
          <Text style={styles.mapLabel}>Challenge Location:</Text>
          
          {/* Map placeholder - in a real app, this would be a map component */}
          <View style={styles.mapPlaceholder}>
            <MapPin size={40} color={Colors.primary} />
            <Text style={styles.mapPlaceholderText}>
              {Platform.OS === 'web' 
                ? 'Map view available in mobile app' 
                : 'Map view coming soon'}
            </Text>
          </View>
        </View>
        
        {challenge.completedBy !== undefined && (
          <View style={styles.statsContainer}>
            <Text style={styles.statsLabel}>
              {challenge.completedBy} {challenge.completedBy === 1 ? 'person has' : 'people have'} completed this challenge
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  badges: {
    flexDirection: 'row',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: `${Colors.secondary}20`,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.secondary,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 16,
    lineHeight: 24,
  },
  clueContainer: {
    backgroundColor: `${Colors.primary}10`,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  clueLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 8,
  },
  clueText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.text,
    lineHeight: 24,
  },
  hintContainer: {
    backgroundColor: `${Colors.warning}10`,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  hintLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.warning,
    marginBottom: 8,
  },
  hintText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 12,
  },
  actionText: {
    fontSize: 14,
    color: Colors.primary,
    marginTop: 4,
  },
  solveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor: Colors.textSecondary,
  },
  solveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  mapContainer: {
    marginBottom: 24,
  },
  mapLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: Colors.card,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  statsLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  completedContainer: {
    marginBottom: 24,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  completedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  storyContainer: {
    backgroundColor: `${Colors.secondary}10`,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  storyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondary,
    marginBottom: 8,
  },
  storyText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}10`,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 12,
    flex: 1,
  },
});