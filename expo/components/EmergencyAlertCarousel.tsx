import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { AlertTriangle, ChevronUp, ChevronDown } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { EmergencyAlert } from '@/types';

interface EmergencyAlertCarouselProps {
  alerts: EmergencyAlert[];
}

export const EmergencyAlertCarousel: React.FC<EmergencyAlertCarouselProps> = ({ alerts }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  
  // Auto-scroll through alerts
  useEffect(() => {
    if (alerts.length <= 1) return;
    
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % alerts.length;
      setCurrentIndex(nextIndex);
      const { width } = Dimensions.get('window');
      scrollViewRef.current?.scrollTo({ 
        x: nextIndex * (width - 32), // Account for padding
        animated: true
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, alerts.length]);
  
  // Handle manual navigation
  const handlePrev = useCallback(() => {
    const prevIndex = currentIndex === 0 ? alerts.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    const { width } = Dimensions.get('window');
    scrollViewRef.current?.scrollTo({ 
      x: prevIndex * (width - 32), // Account for padding
      animated: true
    });
  }, [currentIndex, alerts.length]);
  
  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % alerts.length;
    setCurrentIndex(nextIndex);
    const { width } = Dimensions.get('window');
    scrollViewRef.current?.scrollTo({ 
      x: nextIndex * (width - 32), // Account for padding
      animated: true
    });
  }, [currentIndex, alerts.length]);
  
  // Handle scroll events to update current index
  const handleScroll = useCallback((event: any) => {
    const { width } = Dimensions.get('window');
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / (width - 32));
    if (index !== currentIndex && index >= 0 && index < alerts.length) {
      setCurrentIndex(index);
    }
  }, [currentIndex, alerts.length]);
  
  const handleAlertPress = useCallback((alert: EmergencyAlert) => {
    if (alert.link) {
      router.push(alert.link);
    }
  }, [router]);
  
  const renderAlert = useCallback((item: EmergencyAlert) => {
    const { width } = Dimensions.get('window');
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.alertCard,
          { width: width - 32 }, // Account for container padding
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
  }, [handleAlertPress]);
  
  if (!alerts || alerts.length === 0) return null;
  
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {alerts.map(renderAlert)}
      </ScrollView>
      
      {alerts.length > 1 && (
        <View style={styles.navigation}>
          <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
            <ChevronUp size={20} color={Colors.text} />
          </TouchableOpacity>
          
          <View style={styles.indicators}>
            {alerts.map((alert, index) => (
              <View
                key={alert.id}
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
  scrollView: {
    maxHeight: 100, // Set a max height for the carousel
  },
  alertCard: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    marginRight: 16, // Gap between alerts
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