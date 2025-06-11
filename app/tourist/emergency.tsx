import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { TouristInfoCard } from '@/components/TouristInfoCard';
import { touristInfo } from '@/mocks/tourist-info';
import Colors from '@/constants/colors';
import { Phone, Hospital, Shield, AlertTriangle } from 'lucide-react-native';

export default function EmergencyScreen() {
  const emergencyInfo = touristInfo.filter(info => info.category === 'emergency');

  const callEmergency = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`).catch(err => 
      console.error("Couldn't open phone dialer", err)
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Emergency Services</Text>
        <Text style={styles.headerSubtitle}>
          Important contacts and information for emergencies
        </Text>
      </View>

      <View style={styles.alertContainer}>
        <AlertTriangle size={24} color="#fff" style={styles.alertIcon} />
        <Text style={styles.alertText}>
          In case of emergency, dial 112 for the general emergency number in Albania
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Emergency Information</Text>
        
        {emergencyInfo.map(info => (
          <TouristInfoCard 
            key={info.id} 
            info={info} 
            showChevron={false}
          />
        ))}

        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        
        <TouchableOpacity 
          style={styles.contactCard}
          onPress={() => Platform.OS !== 'web' ? callEmergency('112') : null}
          activeOpacity={0.7}
        >
          <View style={[styles.contactIcon, { backgroundColor: '#F0453415' }]}>
            <Phone size={24} color="#F04534" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>General Emergency</Text>
            <Text style={styles.contactNumber}>112</Text>
          </View>
          {Platform.OS !== 'web' && (
            <TouchableOpacity 
              style={styles.callButton}
              onPress={() => callEmergency('112')}
            >
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactCard}
          onPress={() => Platform.OS !== 'web' ? callEmergency('127') : null}
          activeOpacity={0.7}
        >
          <View style={[styles.contactIcon, { backgroundColor: '#38B2AC15' }]}>
            <Hospital size={24} color="#38B2AC" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>Ambulance</Text>
            <Text style={styles.contactNumber}>127</Text>
          </View>
          {Platform.OS !== 'web' && (
            <TouchableOpacity 
              style={styles.callButton}
              onPress={() => callEmergency('127')}
            >
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactCard}
          onPress={() => Platform.OS !== 'web' ? callEmergency('129') : null}
          activeOpacity={0.7}
        >
          <View style={[styles.contactIcon, { backgroundColor: '#4A6CFA15' }]}>
            <Shield size={24} color="#4A6CFA" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>Police</Text>
            <Text style={styles.contactNumber}>129</Text>
          </View>
          {Platform.OS !== 'web' && (
            <TouchableOpacity 
              style={styles.callButton}
              onPress={() => callEmergency('129')}
            >
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactCard}
          onPress={() => Platform.OS !== 'web' ? callEmergency('+355 54 252 529') : null}
          activeOpacity={0.7}
        >
          <View style={[styles.contactIcon, { backgroundColor: '#ED8A1915' }]}>
            <Shield size={24} color="#ED8A19" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>Tourist Police</Text>
            <Text style={styles.contactNumber}>+355 54 252 529</Text>
          </View>
          {Platform.OS !== 'web' && (
            <TouchableOpacity 
              style={styles.callButton}
              onPress={() => callEmergency('+355 54 252 529')}
            >
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        <View style={styles.facilitiesContainer}>
          <Text style={styles.facilitiesTitle}>Medical Facilities</Text>
          
          <View style={styles.facilityCard}>
            <View style={styles.facilityHeader}>
              <Hospital size={20} color={Colors.primary} style={styles.facilityIcon} />
              <Text style={styles.facilityName}>Elbasan Regional Hospital</Text>
            </View>
            <Text style={styles.facilityAddress}>Rruga Kozma Naska, Elbasan</Text>
            <Text style={styles.facilityPhone}>+355 54 258 644</Text>
            <Text style={styles.facilityHours}>Open 24/7</Text>
            <Text style={styles.facilityNote}>
              Main public hospital with emergency services
            </Text>
          </View>
          
          <View style={styles.facilityCard}>
            <View style={styles.facilityHeader}>
              <Hospital size={20} color={Colors.primary} style={styles.facilityIcon} />
              <Text style={styles.facilityName}>American Hospital Elbasan</Text>
            </View>
            <Text style={styles.facilityAddress}>Bulevardi Qemal Stafa, Elbasan</Text>
            <Text style={styles.facilityPhone}>+355 54 400 500</Text>
            <Text style={styles.facilityHours}>Mon-Sat: 8:00-20:00, Sun: 8:00-14:00</Text>
            <Text style={styles.facilityNote}>
              Private hospital with English-speaking staff
            </Text>
          </View>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Emergency Tips</Text>
          
          <View style={styles.tipItem}>
            <AlertTriangle size={18} color={Colors.textSecondary} style={styles.tipIcon} />
            <Text style={styles.tipText}>
              Keep a copy of your passport and travel insurance details with you at all times.
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <AlertTriangle size={18} color={Colors.textSecondary} style={styles.tipIcon} />
            <Text style={styles.tipText}>
              Save emergency numbers in your phone and write them down on paper as backup.
            </Text>
          </View>
          
          <View style={styles.tipItem}>
            <AlertTriangle size={18} color={Colors.textSecondary} style={styles.tipIcon} />
            <Text style={styles.tipText}>
              Learn basic emergency phrases in Albanian or keep a translation app ready.
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
  alertContainer: {
    backgroundColor: '#F04534',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
  },
  alertIcon: {
    marginRight: 12,
  },
  alertText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
    lineHeight: 22,
  },
  infoContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    marginTop: 8,
  },
  contactCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '500',
  },
  callButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  callButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  facilitiesContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  facilitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  facilityCard: {
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
  facilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  facilityIcon: {
    marginRight: 8,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  facilityAddress: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  facilityPhone: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 4,
  },
  facilityHours: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  facilityNote: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  tipsContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F04534',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 10,
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