import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { TouristInfoCard } from '@/components/TouristInfoCard';
import { touristInfo } from '@/mocks/tourist-info';
import Colors from '@/constants/colors';

export default function TransportationScreen() {
  const transportationInfo = touristInfo.filter(info => info.category === 'transportation');

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Transportation in Elbasan</Text>
        <Text style={styles.headerSubtitle}>
          Getting around the city and beyond
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1556122071-e404eaedb77f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Transportation Options</Text>
        
        {transportationInfo.map(info => (
          <TouristInfoCard 
            key={info.id} 
            info={info} 
            showChevron={false}
          />
        ))}

        <View style={styles.additionalInfoBox}>
          <Text style={styles.additionalInfoTitle}>Taxi Services</Text>
          <Text style={styles.additionalInfoText}>
            Taxis in Elbasan are affordable and can be hailed on the street or called in advance. 
            A typical ride within the city costs around 300-500 ALL (3-5 EUR). 
            Make sure the taxi has a meter or agree on a price before starting your journey.
          </Text>
          <Text style={styles.additionalInfoText}>
            Recommended taxi companies:
          </Text>
          <View style={styles.taxiList}>
            <View style={styles.taxiItem}>
              <Text style={styles.taxiName}>Taxi Elbasan</Text>
              <Text style={styles.taxiPhone}>+355 54 123 456</Text>
            </View>
            <View style={styles.taxiItem}>
              <Text style={styles.taxiName}>City Taxi</Text>
              <Text style={styles.taxiPhone}>+355 54 789 012</Text>
            </View>
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
  additionalInfoBox: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  additionalInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  additionalInfoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  taxiList: {
    marginTop: 8,
  },
  taxiItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.text}10`,
  },
  taxiName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  taxiPhone: {
    fontSize: 14,
    color: Colors.primary,
  },
});