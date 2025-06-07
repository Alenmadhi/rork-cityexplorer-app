import React from 'react';
import { StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import { Weather } from '@/types';
import Colors from '@/constants/colors';
import { 
  CloudSun, CloudRain, Sun, Cloud, Wind, Droplets, RefreshCw
} from 'lucide-react-native';

interface WeatherCardProps {
  weather: Weather;
  onRefresh?: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onRefresh }) => {
  const getWeatherIcon = () => {
    switch (weather.icon) {
      case 'cloud-sun':
        return <CloudSun size={36} color={Colors.primary} />;
      case 'cloud-rain':
        return <CloudRain size={36} color={Colors.primary} />;
      case 'sun':
        return <Sun size={36} color={Colors.warning} />;
      case 'cloud':
        return <Cloud size={36} color={Colors.primary} />;
      default:
        return <CloudSun size={36} color={Colors.primary} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.location}>Elbasan, Albania</Text>
        {onRefresh && (
          <TouchableOpacity onPress={onRefresh} style={styles.refreshButton} hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
            <RefreshCw size={16} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.mainInfo}>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>{weather.temperature}°</Text>
          <Text style={styles.condition}>{weather.condition}</Text>
          <Text style={styles.highLow}>H:{weather.high}° L:{weather.low}°</Text>
        </View>
        <View style={styles.iconContainer}>
          {getWeatherIcon()}
        </View>
      </View>
      
      <View style={styles.separator} />
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Droplets size={20} color={Colors.primary} />
          <Text style={styles.detailText}>Humidity</Text>
          <Text style={styles.detailValue}>{weather.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Wind size={20} color={Colors.primary} />
          <Text style={styles.detailText}>Wind</Text>
          <Text style={styles.detailValue}>{weather.windSpeed} km/h</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  refreshButton: {
    padding: 4,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperatureContainer: {
    flex: 1,
  },
  temperature: {
    fontSize: 42,
    fontWeight: 'bold',
    color: Colors.text,
  },
  condition: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  highLow: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 30,
    backgroundColor: `${Colors.primary}10`,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 2,
  },
});