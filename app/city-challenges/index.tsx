import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, RefreshControl, Platform, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MapPin, Award, Compass, Filter, Map, Search, Calendar, RefreshCw } from 'lucide-react-native';
import * as Location from 'expo-location';
import Colors from '@/constants/colors';
import { useCityChallengesStore } from '@/stores/city-challenges-store';
import { useAuthStore } from '@/stores/auth-store';
import { CityChallenge } from '@/components/CityChallenge';
import { SearchBar } from '@/components/SearchBar';
import { CityChallenge as CityChallengeType } from '@/types';

export default function CityChallengesScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { 
    availableChallenges, 
    dailyChallenge,
    userChallenges,
    fetchChallenges, 
    fetchDailyChallenge,
    checkProximity,
    isLoading,
    lastUpdated,
    resetDailyChallenge
  } = useCityChallengesStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'riddle' | 'visual' | 'historical' | 'audio' | 'puzzle'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [proximityData, setProximityData] = useState<Record<string, { isNearby: boolean; distance: number }>>({});
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  
  // Fetch challenges on mount
  useEffect(() => {
    fetchChallenges();
    fetchDailyChallenge();
    
    // Request location permission
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationPermission(status === 'granted');
        
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          
          // Check proximity for all challenges
          if (availableChallenges.length > 0) {
            const proximityResults: Record<string, { isNearby: boolean; distance: number }> = {};
            
            for (const challenge of availableChallenges) {
              const result = await checkProximity(challenge.id, {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              });
              proximityResults[challenge.id] = result;
            }
            
            setProximityData(proximityResults);
          }
        }
      }
    })();
  }, []);
  
  // Handle refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchChallenges();
    await fetchDailyChallenge();
    
    // Update location and proximity data
    if (locationPermission) {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
      // Check proximity for all challenges
      if (availableChallenges.length > 0) {
        const proximityResults: Record<string, { isNearby: boolean; distance: number }> = {};
        
        for (const challenge of availableChallenges) {
          const result = await checkProximity(challenge.id, {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          });
          proximityResults[challenge.id] = result;
        }
        
        setProximityData(proximityResults);
      }
    }
    
    setRefreshing(false);
  }, [fetchChallenges, fetchDailyChallenge, locationPermission, availableChallenges]);
  
  // Filter challenges
  const filteredChallenges = availableChallenges.filter(challenge => {
    const matchesSearch = 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.location.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'all' || challenge.type === selectedType;
    
    return matchesSearch && matchesDifficulty && matchesType;
  });
  
  // Navigate to challenge detail
  const handleChallengePress = (challenge: CityChallengeType) => {
    router.push(`/city-challenges/${challenge.id}`);
  };
  
  // Reset daily challenge
  const handleResetDailyChallenge = async () => {
    await resetDailyChallenge();
  };
  
  // Render daily challenge
  const renderDailyChallenge = () => {
    if (!dailyChallenge) return null;
    
    const proximity = location && proximityData[dailyChallenge.id] 
      ? proximityData[dailyChallenge.id] 
      : undefined;
    
    const isCompleted = userChallenges.some(
      uc => uc.challengeId === dailyChallenge.id && uc.status === 'completed'
    );
    
    return (
      <View style={styles.dailyChallengeContainer}>
        <View style={styles.dailyChallengeHeader}>
          <Text style={styles.dailyChallengeTitle}>Today's Mystery Challenge</Text>
          
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={handleResetDailyChallenge}
          >
            <RefreshCw size={16} color={Colors.primary} />
            <Text style={styles.refreshButtonText}>New Challenge</Text>
          </TouchableOpacity>
        </View>
        
        {isCompleted ? (
          <View style={styles.completedChallengeCard}>
            <Image 
              source={{ uri: dailyChallenge.image || 'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?q=80&w=1000&auto=format&fit=crop' }}
              style={styles.completedChallengeImage}
              resizeMode="cover"
            />
            <View style={styles.completedChallengeOverlay}>
              <Award size={60} color="#fff" />
              <Text style={styles.completedChallengeText}>Challenge Completed!</Text>
              <Text style={styles.completedChallengePoints}>+{dailyChallenge.reward.points} points</Text>
              
              <TouchableOpacity 
                style={styles.viewDetailsButton}
                onPress={() => handleChallengePress(dailyChallenge)}
              >
                <Text style={styles.viewDetailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <CityChallenge 
            challenge={dailyChallenge}
            onPress={() => handleChallengePress(dailyChallenge)}
            onHintPress={() => router.push(`/city-challenges/${dailyChallenge.id}/hint`)}
            onSharePress={() => router.push(`/city-challenges/${dailyChallenge.id}/share`)}
            onCameraPress={() => router.push(`/city-challenges/${dailyChallenge.id}/camera`)}
            isNearby={proximity?.isNearby}
            distance={proximity?.distance}
          />
        )}
      </View>
    );
  };
  
  // Render filter buttons
  const renderFilterButtons = () => {
    if (!showFilters) return null;
    
    return (
      <View style={styles.filtersContainer}>
        <Text style={styles.filterLabel}>Difficulty:</Text>
        <View style={styles.filterButtonsRow}>
          {(['all', 'easy', 'medium', 'hard'] as const).map(difficulty => (
            <TouchableOpacity
              key={`difficulty-${difficulty}`}
              style={[
                styles.filterButton,
                selectedDifficulty === difficulty && styles.selectedFilterButton
              ]}
              onPress={() => setSelectedDifficulty(difficulty)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedDifficulty === difficulty && styles.selectedFilterButtonText
              ]}>
                {difficulty === 'all' ? 'All' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.filterLabel}>Type:</Text>
        <View style={styles.filterButtonsRow}>
          {(['all', 'riddle', 'visual', 'historical', 'audio', 'puzzle'] as const).map(type => (
            <TouchableOpacity
              key={`type-${type}`}
              style={[
                styles.filterButton,
                selectedType === type && styles.selectedFilterButton
              ]}
              onPress={() => setSelectedType(type)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedType === type && styles.selectedFilterButtonText
              ]}>
                {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  
  // Render challenge item
  const renderChallengeItem = ({ item }: { item: CityChallengeType }) => {
    const proximity = location && proximityData[item.id] 
      ? proximityData[item.id] 
      : undefined;
    
    return (
      <CityChallenge 
        challenge={item}
        onPress={() => handleChallengePress(item)}
        isNearby={proximity?.isNearby}
        distance={proximity?.distance}
        compact
      />
    );
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Hidden Elbasan',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search challenges..."
            style={styles.searchBar}
          />
          
          <TouchableOpacity 
            style={styles.filterToggleButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color={Colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.mapButton}
            onPress={() => router.push('/city-challenges/map')}
          >
            <Map size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        
        {renderFilterButtons()}
        
        <FlatList
          data={filteredChallenges}
          renderItem={renderChallengeItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={renderDailyChallenge}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Calendar size={60} color={Colors.textSecondary} />
              <Text style={styles.emptyTitle}>No Challenges Found</Text>
              <Text style={styles.emptyMessage}>
                {searchQuery || selectedDifficulty !== 'all' || selectedType !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Check back later for new challenges'}
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              colors={[Colors.primary]}
              tintColor={Colors.primary}
            />
          }
        />
        
        {!locationPermission && Platform.OS !== 'web' && (
          <View style={styles.permissionBanner}>
            <MapPin size={20} color="#fff" />
            <Text style={styles.permissionText}>
              Location permission is needed to find nearby challenges
            </Text>
            <TouchableOpacity 
              style={styles.permissionButton}
              onPress={async () => {
                const { status } = await Location.requestForegroundPermissionsAsync();
                setLocationPermission(status === 'granted');
                
                if (status === 'granted') {
                  const location = await Location.getCurrentPositionAsync({});
                  setLocation(location);
                }
              }}
            >
              <Text style={styles.permissionButtonText}>Grant</Text>
            </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
  },
  filterToggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  filtersContainer: {
    padding: 16,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  filterButtonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.background,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedFilterButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: 12,
    color: Colors.text,
  },
  selectedFilterButtonText: {
    color: '#fff',
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  dailyChallengeContainer: {
    marginBottom: 24,
  },
  dailyChallengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dailyChallengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
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
  completedChallengeCard: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
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
  completedChallengeImage: {
    width: '100%',
    height: '100%',
  },
  completedChallengeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  completedChallengeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    marginBottom: 8,
  },
  completedChallengePoints: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
  },
  viewDetailsButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  viewDetailsButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
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
  permissionBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
  permissionText: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
  permissionButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginLeft: 8,
  },
  permissionButtonText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 12,
  },
});