import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions, Platform } from 'react-native';
import { AlertTriangle, ChevronUp, ChevronDown, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { EmergencyAlert } from '@/types';

interface EmergencyAlertCarouselProps {
  alerts: EmergencyAlert[];
}

export const EmergencyAlertCarousel: React.FC<EmergencyAlertCarouselProps> = ({ alerts }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [height, setHeight] = useState(80); // Default height for an alert
  
  // Auto-scroll through alerts
  useEffect(() => {
    if (alerts.length <= 1) return;
    
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % alerts.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ 
        index: nextIndex, 
        animated: true,
        viewPosition: 0.5
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, alerts.length]);
  
  // Handle manual navigation
  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? alerts.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    flatListRef.current?.scrollToIndex({ 
      index: prevIndex, 
      animated: true,
      viewPosition: 0.5
    });
  };
  
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % alerts.length;
    setCurrentIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ 
      index: nextIndex, 
      animated: true,
      viewPosition: 0.5
    });
  };
  
  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };
  
  const handleAlertPress = (alert: EmergencyAlert) => {
    if (alert.link) {
      router.push(alert.link);
    }
  };
  
  const renderItem = ({ item }: { item: EmergencyAlert }) => (
    <TouchableOpacity
      style={[
        styles.alertCard,
        item.type === 'warning' && styles.warningCard,
        item.type === 'danger' && styles.dangerCard,
      ]}
      onPress={() => handleAlertPress(item)}
      activeOpacity={item.link ? 0.7 : 1}
    >
      <View style={styles.alertContent}>
        <AlertTriangle size={24} color="#fff" />
        <View style={styles.alertTextContainer}>
          <Text style={styles.alertTitle}>{item.title}</Text>
          <Text style={styles.alertMessage}>{item.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  if (!alerts || alerts.length === 0) return null;
  
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={alerts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        style={styles.flatList}
        onLayout={(event) => {
          // Update height based on the first item
          setHeight(event.nativeEvent.layout.height);
        }}
      />
      
      {alerts.length > 1 && (
        <View style={styles.navigation}>
          <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
            <ChevronUp size={20} color={Colors.text} />
          </TouchableOpacity>
          
          <View style={styles.indicators}>
            {alerts.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
          
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <ChevronDown size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 12,
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
  flatList: {
    maxHeight: 100, // Set a max height for the carousel
  },
  alertCard: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 1, // Small gap between alerts
  },
  warningCard: {
    backgroundColor: Colors.warning,
  },
  dangerCard: {
    backgroundColor: Colors.error,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  navButton: {
    padding: 4,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: Colors.primary,
    width: 16,
  },
});