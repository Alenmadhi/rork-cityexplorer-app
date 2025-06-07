import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Stack } from 'expo-router';
import { TouristInfoCard } from '@/components/TouristInfoCard';
import { touristInfo } from '@/mocks/tourist-info';
import Colors from '@/constants/colors';

export default function TouristInfoScreen() {
  const transportationInfo = touristInfo.filter(info => info.category === 'transportation');
  const accommodationInfo = touristInfo.filter(info => info.category === 'accommodation');
  const emergencyInfo = touristInfo.filter(info => info.category === 'emergency');
  const tipsInfo = touristInfo.filter(info => info.category === 'tips');
  const wifiInfo = touristInfo.filter(info => info.category === 'wifi');

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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transportation</Text>
          {transportationInfo.map(info => (
            <TouristInfoCard key={info.id} info={info} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accommodation</Text>
          {accommodationInfo.map(info => (
            <TouristInfoCard key={info.id} info={info} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Services</Text>
          {emergencyInfo.map(info => (
            <TouristInfoCard key={info.id} info={info} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wi-Fi Access</Text>
          {wifiInfo.map(info => (
            <TouristInfoCard key={info.id} info={info} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Local Tips</Text>
          {tipsInfo.map(info => (
            <TouristInfoCard key={info.id} info={info} />
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