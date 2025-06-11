import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { TouristInfoCard } from '@/components/TouristInfoCard';
import { touristInfo } from '@/mocks/tourist-info';
import Colors from '@/constants/colors';
import { MapPin, Navigation, Hotel, Wifi, HeartPulse, Info } from 'lucide-react-native';

export default function TouristInfoScreen() {
  const router = useRouter();
  
  const transportationInfo = touristInfo.filter(info => info.category === 'transportation');
  const accommodationInfo = touristInfo.filter(info => info.category === 'accommodation');
  const emergencyInfo = touristInfo.filter(info => info.category === 'emergency');
  const tipsInfo = touristInfo.filter(info => info.category === 'tips');
  const wifiInfo = touristInfo.filter(info => info.category === 'wifi');

  const navigateToCategory = (category: string) => {
    router.push(`/tourist/${category}`);
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Tourist Information',
          headerLargeTitle: true,
        }} 
      />
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Visitor's Guide to</Text>
          <Text style={styles.cityName}>Elbasan, Albania</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>About Elbasan</Text>
          <Text style={styles.infoText}>
            Elbasan is a historic city in central Albania, known for its well-preserved Ottoman castle, 
            traditional cuisine, and the famous Summer Day Festival. Located on the Shkumbin River, 
            it has been an important cultural and economic center since ancient times.
          </Text>
        </View>

        <View style={styles.quickFactsContainer}>
          <Text style={styles.quickFactsTitle}>Quick Facts</Text>
          <View style={styles.factsGrid}>
            <View style={styles.factItem}>
              <Text style={styles.factLabel}>Language</Text>
              <Text style={styles.factValue}>Albanian</Text>
            </View>
            <View style={styles.factItem}>
              <Text style={styles.factLabel}>Currency</Text>
              <Text style={styles.factValue}>Albanian Lek (ALL)</Text>
            </View>
            <View style={styles.factItem}>
              <Text style={styles.factLabel}>Population</Text>
              <Text style={styles.factValue}>~100,000</Text>
            </View>
            <View style={styles.factItem}>
              <Text style={styles.factLabel}>Time Zone</Text>
              <Text style={styles.factValue}>CET (UTC+1)</Text>
            </View>
          </View>
        </View>

        <Text style={styles.categoriesTitle}>Information Categories</Text>
        
        <View style={styles.categoriesGrid}>
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => navigateToCategory('transportation')}
          >
            <View style={[styles.categoryIcon, { backgroundColor: `${Colors.primary}15` }]}>
              <Navigation size={24} color={Colors.primary} />
            </View>
            <Text style={styles.categoryText}>Transportation</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => navigateToCategory('accommodation')}
          >
            <View style={[styles.categoryIcon, { backgroundColor: `${Colors.secondary}15` }]}>
              <Hotel size={24} color={Colors.secondary} />
            </View>
            <Text style={styles.categoryText}>Accommodation</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => navigateToCategory('emergency')}
          >
            <View style={[styles.categoryIcon, { backgroundColor: '#FF585815' }]}>
              <HeartPulse size={24} color="#FF5858" />
            </View>
            <Text style={styles.categoryText}>Emergency</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => navigateToCategory('wifi')}
          >
            <View style={[styles.categoryIcon, { backgroundColor: '#4A6CFA15' }]}>
              <Wifi size={24} color="#4A6CFA" />
            </View>
            <Text style={styles.categoryText}>Wi-Fi Access</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => navigateToCategory('tips')}
          >
            <View style={[styles.categoryIcon, { backgroundColor: '#38B2AC15' }]}>
              <Info size={24} color="#38B2AC" />
            </View>
            <Text style={styles.categoryText}>Local Tips</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => {}}
          >
            <View style={[styles.categoryIcon, { backgroundColor: '#ED8A1915' }]}>
              <MapPin size={24} color="#ED8A19" />
            </View>
            <Text style={styles.categoryText}>Map</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Information</Text>
          {transportationInfo.slice(0, 1).map(info => (
            <TouristInfoCard 
              key={info.id} 
              info={info} 
              onPress={() => navigateToCategory('transportation')}
            />
          ))}
          {accommodationInfo.slice(0, 1).map(info => (
            <TouristInfoCard 
              key={info.id} 
              info={info}
              onPress={() => navigateToCategory('accommodation')}
            />
          ))}
          {emergencyInfo.slice(0, 1).map(info => (
            <TouristInfoCard 
              key={info.id} 
              info={info}
              onPress={() => navigateToCategory('emergency')}
            />
          ))}
        </View>
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
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  welcomeContainer: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  infoBox: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  quickFactsContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  quickFactsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  factsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  factItem: {
    width: '48%',
    marginBottom: 12,
  },
  factLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  factValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryCard: {
    width: '31%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    ...Platform.OS !== 'web' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    } : {
      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    },
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
});