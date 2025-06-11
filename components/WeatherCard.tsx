import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Cloud, CloudRain, CloudSnow, RefreshCw, Sun, Wind, CloudSun } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Weather } from '@/types';

interface WeatherCardProps {
  weather: Weather;
  onRefresh?: () => void;
}

export function WeatherCard({ weather, onRefresh }: WeatherCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return 'Unknown';
    }
  };
  
  // Render weather icon based on condition
  const renderWeatherIcon = (icon: string, size: number = 40) => {
    switch (icon) {
      case 'cloud':
        return <Cloud size={size} color={Colors.textSecondary} />;
      case 'cloud-rain':
        return <CloudRain size={size} color={Colors.textSecondary} />;
      case 'cloud-snow':
        return <CloudSnow size={size} color={Colors.textSecondary} />;
      case 'cloud-sun':
        return <CloudSun size={size} color={Colors.textSecondary} />;
      case 'sun':
      default:
        return <Sun size={size} color={Colors.warning} />;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>{weather?.location || 'Unknown Location'}</Text>
          <Text style={styles.updatedAt}>Updated at {formatDate(weather?.lastUpdated || new Date().toISOString())}</Text>
        </View>
        
        {onRefresh && (
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={onRefresh}
          >
            <RefreshCw size={16} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.currentWeather}>
        <View style={styles.temperatureContainer}>
          {renderWeatherIcon(weather?.icon || 'sun')}
          <Text style={styles.temperature}>{weather?.temperature || '--'}°</Text>
        </View>
        
        <View style={styles.detailsContainer}>
          <Text style={styles.condition}>{weather?.condition || 'Unknown'}</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Wind size={16} color={Colors.textSecondary} />
              <Text style={styles.detailText}>{weather?.windSpeed || '--'} km/h</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Cloud size={16} color={Colors.textSecondary} />
              <Text style={styles.detailText}>{weather?.humidity || '--'}% humidity</Text>
            </View>
          </View>
        </View>
      </View>
      
      {weather?.forecast && weather.forecast.length > 0 && (
        <View style={styles.forecastContainer}>
          {weather.forecast.map((day, index) => (
            <View 
              key={index}
              style={[
                styles.forecastDay,
                index < weather.forecast.length - 1 && styles.forecastDayBorder
              ]}
            >
              <Text style={styles.forecastDayName}>{day.day}</Text>
              {renderWeatherIcon(day.icon, 24)}
              <Text style={styles.forecastTemperature}>
                {day.temperature.min}° / {day.temperature.max}°
              </Text>
            </View>
          ))}
        </View>
      )}
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
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  locationContainer: {
    flex: 1,
  },
  location: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  updatedAt: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  refreshButton: {
    padding: 4,
  },
  currentWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 8,
  },
  detailsContainer: {
    flex: 1,
  },
  condition: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },
  forecastDay: {
    alignItems: 'center',
    flex: 1,
  },
  forecastDayBorder: {
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  forecastDayName: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  forecastTemperature: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
  },
});