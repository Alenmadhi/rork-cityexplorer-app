import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { TouristInfo } from '@/types';
import Colors from '@/constants/colors';
import { 
  Train, Car, Hotel, HeartPulse, Wifi, Info,
  ChevronRight
} from 'lucide-react-native';

interface TouristInfoCardProps {
  info: TouristInfo;
}

export const TouristInfoCard: React.FC<TouristInfoCardProps> = ({ info }) => {
  const getIcon = () => {
    switch (info.icon) {
      case 'train':
        return <Train size={24} color={Colors.primary} />;
      case 'car':
        return <Car size={24} color={Colors.primary} />;
      case 'hotel':
        return <Hotel size={24} color={Colors.primary} />;
      case 'first-aid':
        return <HeartPulse size={24} color={Colors.primary} />;
      case 'wifi':
        return <Wifi size={24} color={Colors.primary} />;
      case 'info':
        return <Info size={24} color={Colors.primary} />;
      default:
        return <Info size={24} color={Colors.primary} />;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{info.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{info.description}</Text>
      </View>
      <ChevronRight size={20} color={Colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});