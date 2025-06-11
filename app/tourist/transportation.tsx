import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { TouristInfoCard } from '@/components/TouristInfoCard';
import { touristInfo } from '@/mocks/tourist-info';
import Colors from '@/constants/colors';
import { Bus, Car, Train, MapPin } from 'lucide-react-native';

export default function TransportationScreen() {
  const transportationInfo = touristInfo.filter(info => info.category === 'transportation');

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Getting Around Elbasan</Text>
        <Text style={styles.headerSubtitle}>
          Transportation options for visitors
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
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

        <View style={styles.transportOptionsContainer}>
          <Text style={styles.transportOptionsTitle}>Local Transport</Text>
          
          <View style={styles.transportCard}>
            <View style={[styles.transportIcon, { backgroundColor: '#4A6CFA15' }]}>
              <Bus size={24} color="#4A6CFA" />
            </View>
            <View style={styles.transportInfo}>
              <Text style={styles.transportName}>City Buses</Text>
              <Text style={styles.transportDetails}>
                Fare: 40 ALL (~€0.30) per ride
              </Text>
              <Text style={styles.transportSchedule}>
                Operating hours: 6:00-22:00
              </Text>
              <Text style={styles.transportTip}>
                Buses run every 15-20 minutes on main routes
              </Text>
            </View>
          </View>
          
          <View style={styles.transportCard}>
            <View style={[styles.transportIcon, { backgroundColor: '#ED8A1915' }]}>
              <Car size={24} color="#ED8A19" />
            </View>
            <View style={styles.transportInfo}>
              <Text style={styles.transportName}>Taxis</Text>
              <Text style={styles.transportDetails}>
                Starting fare: 300 ALL (~€2.50)
              </Text>
              <Text style={styles.transportSchedule}>
                Available 24/7
              </Text>
              <Text style={styles.transportTip}>
                Always agree on price before starting your journey
              </Text>
            </View>
          </View>
          
          <View style={styles.transportCard}>
            <View style={[styles.transportIcon, { backgroundColor: '#38B2AC15' }]}>
              <Train size={24} color="#38B2AC" />
            </View>
            <View style={styles.transportInfo}>
              <Text style={styles.transportName}>Regional Trains</Text>
              <Text style={styles.transportDetails}>
                Elbasan to Tirana: 400 ALL (~€3.30)
              </Text>
              <Text style={styles.transportSchedule}>
                Departures: 7:00, 11:00, 16:00
              </Text>
              <Text style={styles.transportTip}>
                Purchase tickets at the station 30 minutes before departure
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <Text style={styles.mapTitle}>Key Transport Locations</Text>
          
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <MapPin size={20} color={Colors.primary} style={styles.locationIcon} />
              <Text style={styles.locationName}>Elbasan Bus Terminal</Text>
            </View>
            <Text style={styles.locationAddress}>Rruga Thoma Kalefi, near city center</Text>
            <Text style={styles.locationDetails}>
              Main hub for city buses and regional coaches
            </Text>
          </View>
          
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <MapPin size={20} color={Colors.primary} style={styles.locationIcon} />
              <Text style={styles.locationName}>Elbasan Train Station</Text>
            </View>
            <Text style={styles.locationAddress}>Bulevardi Qemal Stafa</Text>
            <Text style={styles.locationDetails}>
              Connects to Tirana, Durrës, and other major cities
            </Text>
          </View>
          
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <MapPin size={20} color={Colors.primary} style={styles.locationIcon} />
              <Text style={styles.locationName}>Taxi Stand</Text>
            </View>
            <Text style={styles.locationAddress}>Near Elbasan Castle entrance</Text>
            <Text style={styles.locationDetails}>
              Main taxi gathering point in the city center
            </Text>
          </View>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Transportation Tips</Text>
          
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>
              • Download offline maps before your trip to navigate without internet
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>
              • Keep small change (coins and small bills) for bus fares
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>
              • For taxis, use official services with meters or agree on price beforehand
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>
              • The historic center is compact and best explored on foot
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
  transportOptionsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  transportOptionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  transportCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  transportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transportInfo: {
    flex: 1,
  },
  transportName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  transportDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  transportSchedule: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  transportTip: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  mapContainer: {
    marginBottom: 20,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  locationCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    marginRight: 8,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  locationAddress: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  locationDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  tipsContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  tipItem: {
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});