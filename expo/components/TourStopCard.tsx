import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { Clock, MapPin, Info } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { TourStop } from '@/types';

interface TourStopCardProps {
  stop: TourStop;
  onPress?: () => void;
  isActive?: boolean;
  showOrder?: boolean;
}

export function TourStopCard({ 
  stop, 
  onPress, 
  isActive = false,
  showOrder = true
}: TourStopCardProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isActive && styles.activeContainer
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {showOrder && (
        <View style={[
          styles.orderBadge,
          isActive && styles.activeOrderBadge
        ]}>
          <Text style={[
            styles.orderText,
            isActive && styles.activeOrderText
          ]}>
            {stop.order}
          </Text>
        </View>
      )}
      
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: stop.image }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{stop.title}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={14} color={Colors.textSecondary} />
            <Text style={styles.metaText}>{stop.duration}</Text>
          </View>
          
          {stop.funFacts && stop.funFacts.length > 0 && (
            <View style={styles.metaItem}>
              <Info size={14} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{stop.funFacts.length} fun facts</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {stop.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  activeContainer: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  orderBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeOrderBadge: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  orderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text,
  },
  activeOrderText: {
    color: '#fff',
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});