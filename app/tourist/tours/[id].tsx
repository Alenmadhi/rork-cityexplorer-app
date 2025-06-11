import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Platform, Dimensions, Animated } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Clock, MapPin, Star, Users, ChevronLeft, ChevronRight, Play, Pause, Info, ArrowLeft, Map, List } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { tours } from '@/mocks/tours';
import { TourStopCard } from '@/components/TourStopCard';
import { TourMap } from '@/components/TourMap';
import { Tour, TourStop } from '@/types';

export default function TourDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [tour, setTour] = useState<Tour | null>(null);
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showFunFacts, setShowFunFacts] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const scrollRef = useRef<ScrollView>(null);
  
  // Animation for view mode toggle
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (id) {
      const foundTour = tours.find(t => t.id === id);
      if (foundTour) {
        setTour(foundTour);
      }
    }
  }, [id]);
  
  useEffect(() => {
    // Animate the view mode transition
    Animated.timing(slideAnim, {
      toValue: viewMode === 'list' ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [viewMode]);
  
  if (!tour) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading tour details...</Text>
      </View>
    );
  }
  
  const activeStop = tour.stops[activeStopIndex];
  
  const handlePreviousStop = () => {
    if (activeStopIndex > 0) {
      setActiveStopIndex(activeStopIndex - 1);
      setShowFunFacts(false);
    }
  };
  
  const handleNextStop = () => {
    if (activeStopIndex < tour.stops.length - 1) {
      setActiveStopIndex(activeStopIndex + 1);
      setShowFunFacts(false);
    }
  };
  
  const toggleAudio = () => {
    // In a real app, this would control audio playback
    setIsAudioPlaying(!isAudioPlaying);
  };
  
  const handleStopPress = (index: number) => {
    setActiveStopIndex(index);
    setShowFunFacts(false);
    
    // Scroll to the active stop section
    if (scrollRef.current && viewMode === 'list') {
      scrollRef.current.scrollTo({ y: 400, animated: true });
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'historical':
        return '#4361ee';
      case 'cultural':
        return '#3a86ff';
      case 'culinary':
        return '#f39c12';
      case 'nature':
        return '#2ecc71';
      case 'hidden-gems':
        return '#7209b7';
      case 'nightlife':
        return '#e74c3c';
      default:
        return Colors.primary;
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#2ecc71';
      case 'moderate':
        return '#f39c12';
      case 'challenging':
        return '#e74c3c';
      default:
        return Colors.textSecondary;
    }
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: tour.title,
          headerBackTitle: 'Tours',
        }} 
      />
      <ScrollView 
        ref={scrollRef}
        style={styles.container} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: tour.image }} 
            style={styles.image}
            resizeMode="cover"
          />
          
          <View 
            style={[
              styles.categoryBadge, 
              { backgroundColor: getCategoryColor(tour.category) }
            ]}
          >
            <Text style={styles.categoryText}>
              {tour.category.charAt(0).toUpperCase() + tour.category.slice(1).replace('-', ' ')}
            </Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{tour.title}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Clock size={16} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{tour.duration}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <MapPin size={16} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{tour.distance}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Users size={16} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{tour.stops.length} stops</Text>
            </View>
          </View>
          
          <View 
            style={[
              styles.difficultyBadge, 
              { backgroundColor: `${getDifficultyColor(tour.difficulty)}20` }
            ]}
          >
            <Text 
              style={[
                styles.difficultyText, 
                { color: getDifficultyColor(tour.difficulty) }
              ]}
            >
              Difficulty: {tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1)}
            </Text>
          </View>
          
          {tour.rating && (
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>{tour.rating.toFixed(1)}</Text>
              {tour.reviewCount && (
                <Text style={styles.reviewCount}>({tour.reviewCount} reviews)</Text>
              )}
            </View>
          )}
          
          <Text style={styles.description}>{tour.description}</Text>
          
          <View style={styles.tagsContainer}>
            {tour.tags.map((tag, index) => (
              <View key={index} style={styles.tagBadge}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.viewToggleContainer}>
            <Text style={styles.sectionTitle}>Tour Overview</Text>
            
            <View style={styles.viewToggleButtons}>
              <TouchableOpacity 
                style={[
                  styles.viewToggleButton,
                  viewMode === 'list' && styles.viewToggleButtonActive
                ]}
                onPress={() => setViewMode('list')}
              >
                <List 
                  size={16} 
                  color={viewMode === 'list' ? Colors.primary : Colors.textSecondary} 
                />
                <Text 
                  style={[
                    styles.viewToggleButtonText,
                    viewMode === 'list' && styles.viewToggleButtonTextActive
                  ]}
                >
                  List
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.viewToggleButton,
                  viewMode === 'map' && styles.viewToggleButtonActive
                ]}
                onPress={() => setViewMode('map')}
              >
                <Map 
                  size={16} 
                  color={viewMode === 'map' ? Colors.primary : Colors.textSecondary} 
                />
                <Text 
                  style={[
                    styles.viewToggleButtonText,
                    viewMode === 'map' && styles.viewToggleButtonTextActive
                  ]}
                >
                  Map
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {viewMode === 'map' && (
            <TourMap 
              stops={tour.stops} 
              activeStopIndex={activeStopIndex}
              onStopPress={handleStopPress}
            />
          )}
          
          <Text style={styles.sectionTitle}>Current Stop</Text>
          
          <View style={styles.activeStopContainer}>
            <View style={styles.activeStopHeader}>
              <View style={styles.stopProgress}>
                <Text style={styles.stopProgressText}>
                  Stop {activeStopIndex + 1} of {tour.stops.length}
                </Text>
              </View>
              
              <View style={styles.navigationButtons}>
                <TouchableOpacity 
                  style={[
                    styles.navButton,
                    activeStopIndex === 0 && styles.disabledNavButton
                  ]}
                  onPress={handlePreviousStop}
                  disabled={activeStopIndex === 0}
                >
                  <ChevronLeft 
                    size={20} 
                    color={activeStopIndex === 0 ? Colors.textSecondary : Colors.primary} 
                  />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.navButton,
                    activeStopIndex === tour.stops.length - 1 && styles.disabledNavButton
                  ]}
                  onPress={handleNextStop}
                  disabled={activeStopIndex === tour.stops.length - 1}
                >
                  <ChevronRight 
                    size={20} 
                    color={activeStopIndex === tour.stops.length - 1 ? Colors.textSecondary : Colors.primary} 
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.activeStopImageContainer}>
              <Image 
                source={{ uri: activeStop.image }} 
                style={styles.activeStopImage}
                resizeMode="cover"
              />
              
              {activeStop.audio && (
                <TouchableOpacity 
                  style={styles.audioButton}
                  onPress={toggleAudio}
                >
                  {isAudioPlaying ? (
                    <Pause size={24} color="#fff" />
                  ) : (
                    <Play size={24} color="#fff" />
                  )}
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.activeStopContent}>
              <Text style={styles.activeStopTitle}>{activeStop.title}</Text>
              
              <View style={styles.activeStopMeta}>
                <View style={styles.metaItem}>
                  <Clock size={14} color={Colors.textSecondary} />
                  <Text style={styles.metaText}>{activeStop.duration}</Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.locationButton}
                  onPress={() => setViewMode('map')}
                >
                  <MapPin size={14} color={Colors.primary} />
                  <Text style={styles.locationButtonText}>View on Map</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.activeStopDescription}>{activeStop.description}</Text>
              
              {activeStop.funFacts && activeStop.funFacts.length > 0 && (
                <TouchableOpacity 
                  style={styles.funFactsButton}
                  onPress={() => setShowFunFacts(!showFunFacts)}
                >
                  <Info size={16} color={Colors.primary} />
                  <Text style={styles.funFactsButtonText}>
                    {showFunFacts ? 'Hide Fun Facts' : 'Show Fun Facts'}
                  </Text>
                </TouchableOpacity>
              )}
              
              {showFunFacts && activeStop.funFacts && (
                <View style={styles.funFactsContainer}>
                  <Text style={styles.funFactsTitle}>Fun Facts</Text>
                  {activeStop.funFacts.map((fact, index) => (
                    <View key={index} style={styles.funFactItem}>
                      <View style={styles.funFactBullet} />
                      <Text style={styles.funFactText}>{fact}</Text>
                    </View>
                  ))}
                </View>
              )}
              
              {showFunFacts && activeStop.localTips && activeStop.localTips.length > 0 && (
                <View style={styles.tipsContainer}>
                  <Text style={styles.tipsTitle}>Local Tips</Text>
                  {activeStop.localTips.map((tip, index) => (
                    <View key={index} style={styles.tipItem}>
                      <View style={styles.tipBullet} />
                      <Text style={styles.tipText}>{tip}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
          
          <View style={styles.divider} />
          
          {viewMode === 'list' && (
            <>
              <Text style={styles.sectionTitle}>Tour Stops</Text>
              
              {tour.stops.map((stop, index) => (
                <TourStopCard 
                  key={stop.id}
                  stop={stop}
                  isActive={index === activeStopIndex}
                  onPress={() => handleStopPress(index)}
                />
              ))}
            </>
          )}
          
          <TouchableOpacity 
            style={styles.startTourButton}
            onPress={() => {
              // In a real app, this would start the guided tour experience
              // For now, we'll just show the first stop
              setActiveStopIndex(0);
              setShowFunFacts(false);
              setViewMode('map');
            }}
          >
            <Text style={styles.startTourButtonText}>Start Guided Tour</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 6,
  },
  reviewCount: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tagBadge: {
    backgroundColor: Colors.cardDarker,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 24,
  },
  viewToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewToggleButtons: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  viewToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewToggleButtonActive: {
    backgroundColor: `${Colors.primary}20`,
  },
  viewToggleButtonText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  viewToggleButtonTextActive: {
    color: Colors.primary,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  activeStopContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.primary,
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
  activeStopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: `${Colors.primary}10`,
  },
  stopProgress: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  stopProgressText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  disabledNavButton: {
    opacity: 0.5,
  },
  activeStopImageContainer: {
    position: 'relative',
    height: 200,
  },
  activeStopImage: {
    width: '100%',
    height: '100%',
  },
  audioButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStopContent: {
    padding: 16,
  },
  activeStopTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  activeStopMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationButtonText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 4,
    fontWeight: '500',
  },
  activeStopDescription: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  funFactsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  funFactsButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
    marginLeft: 6,
  },
  funFactsContainer: {
    backgroundColor: `${Colors.primary}10`,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  funFactsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  funFactItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  funFactBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 6,
    marginRight: 8,
  },
  funFactText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  tipsContainer: {
    backgroundColor: `${Colors.secondary}10`,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.secondary,
    marginTop: 6,
    marginRight: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  startTourButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  startTourButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});