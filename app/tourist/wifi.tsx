import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { TouristInfoCard } from '@/components/TouristInfoCard';
import { touristInfo } from '@/mocks/tourist-info';
import Colors from '@/constants/colors';
import { Wifi, WifiOff, MapPin } from 'lucide-react-native';

export default function WifiScreen() {
  const wifiInfo = touristInfo.filter(info => info.category === 'wifi');

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Wi-Fi Access in Elbasan</Text>
        <Text style={styles.headerSubtitle}>
          Stay connected during your visit
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Internet Options</Text>
        
        {wifiInfo.map(info => (
          <TouristInfoCard 
            key={info.id} 
            info={info} 
            showChevron={false}
          />
        ))}

        <View style={styles.wifiOptionsContainer}>
          <Text style={styles.wifiOptionsTitle}>Mobile Data Options</Text>
          
          <View style={styles.providerCard}>
            <View style={[styles.providerIcon, { backgroundColor: '#F0453415' }]}>
              <Wifi size={24} color="#F04534" />
            </View>
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>Vodafone Albania</Text>
              <Text style={styles.providerDetails}>
                Tourist SIM: 10GB data, 7 days - 1000 ALL (~€8)
              </Text>
              <Text style={styles.providerLocation}>
                <MapPin size={14} color={Colors.textSecondary} style={styles.locationIcon} />
                Main store: Bulevardi Qemal Stafa
              </Text>
            </View>
          </View>
          
          <View style={styles.providerCard}>
            <View style={[styles.providerIcon, { backgroundColor: '#4A6CFA15' }]}>
              <Wifi size={24} color="#4A6CFA" />
            </View>
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>One Albania</Text>
              <Text style={styles.providerDetails}>
                Tourist SIM: 8GB data, 10 days - 1200 ALL (~€10)
              </Text>
              <Text style={styles.providerLocation}>
                <MapPin size={14} color={Colors.textSecondary} style={styles.locationIcon} />
                Store location: Near Elbasan Castle
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.wifiMapContainer}>
          <Text style={styles.wifiMapTitle}>Free Wi-Fi Hotspots</Text>
          
          <View style={styles.hotspotCard}>
            <View style={styles.hotspotHeader}>
              <View style={styles.hotspotIconContainer}>
                <Wifi size={18} color="#fff" />
              </View>
              <Text style={styles.hotspotName}>Elbasan Castle Area</Text>
            </View>
            <Text style={styles.hotspotDetails}>
              Free city Wi-Fi available throughout the castle area. Look for "Elbasan_Free_WiFi" network.
            </Text>
          </View>
          
          <View style={styles.hotspotCard}>
            <View style={styles.hotspotHeader}>
              <View style={styles.hotspotIconContainer}>
                <Wifi size={18} color="#fff" />
              </View>
              <Text style={styles.hotspotName}>Central Park</Text>
            </View>
            <Text style={styles.hotspotDetails}>
              Free Wi-Fi available in the central park area. Network name: "Parku_Elbasan"
            </Text>
          </View>
          
          <View style={styles.hotspotCard}>
            <View style={styles.hotspotHeader}>
              <View style={styles.hotspotIconContainer}>
                <Wifi size={18} color="#fff" />
              </View>
              <Text style={styles.hotspotName}>Public Library</Text>
            </View>
            <Text style={styles.hotspotDetails}>
              Strong free Wi-Fi available inside and around the public library building.
            </Text>
          </View>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Internet Tips</Text>
          
          <View style={styles.tipItem}>
            <WifiOff size={20} color={Colors.textSecondary} style={styles.tipIcon} />
            <Text style={styles.tipText}>
              Some rural areas around Elbasan may have limited connectivity. Download maps and information before traveling to remote locations.
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <Wifi size={20} color={Colors.textSecondary} style={styles.tipIcon} />
            <Text style={styles.tipText}>
              Most cafes and restaurants offer free Wi-Fi to customers. Just ask for the password when ordering.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 24,
  },
  headerContainer: {
    padding: 16,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  wifiOptionsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  wifiOptionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  providerCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
  providerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  providerDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  providerLocation: {
    fontSize: 13,
    color: Colors.textSecondary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 4,
  },
  wifiMapContainer: {
    marginBottom: 20,
  },
  wifiMapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  hotspotCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
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
  hotspotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  hotspotIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  hotspotName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  hotspotDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  tipsContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4A6CFA',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  tipIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});