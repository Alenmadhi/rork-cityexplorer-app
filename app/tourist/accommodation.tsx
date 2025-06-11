import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { Stack } from 'expo-router';
import { TouristInfoCard } from '@/components/TouristInfoCard';
import { touristInfo } from '@/mocks/tourist-info';
import Colors from '@/constants/colors';
import { ExternalLink } from 'lucide-react-native';

export default function AccommodationScreen() {
  const accommodationInfo = touristInfo.filter(info => info.category === 'accommodation');

  const openBookingLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't open link", err));
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Where to Stay in Elbasan</Text>
        <Text style={styles.headerSubtitle}>
          Find the perfect accommodation for your visit
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Accommodation Options</Text>
        
        {accommodationInfo.map(info => (
          <TouristInfoCard 
            key={info.id} 
            info={info} 
            showChevron={false}
          />
        ))}

        <Text style={styles.sectionTitle}>Recommended Places</Text>

        <View style={styles.hotelCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
            style={styles.hotelImage}
            resizeMode="cover"
          />
          <View style={styles.hotelInfo}>
            <Text style={styles.hotelName}>Hotel Grand Elbasan</Text>
            <Text style={styles.hotelLocation}>City Center, 5 min from Castle</Text>
            <View style={styles.hotelRating}>
              <Text style={styles.ratingText}>4.7</Text>
              <Text style={styles.ratingCount}>(120 reviews)</Text>
            </View>
            <Text style={styles.hotelPrice}>From €50/night</Text>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => openBookingLink('https://www.booking.com')}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
              <ExternalLink size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.hotelCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
            style={styles.hotelImage}
            resizeMode="cover"
          />
          <View style={styles.hotelInfo}>
            <Text style={styles.hotelName}>Castle View Guesthouse</Text>
            <Text style={styles.hotelLocation}>Inside Castle Walls</Text>
            <View style={styles.hotelRating}>
              <Text style={styles.ratingText}>4.9</Text>
              <Text style={styles.ratingCount}>(85 reviews)</Text>
            </View>
            <Text style={styles.hotelPrice}>From €35/night</Text>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => openBookingLink('https://www.airbnb.com')}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
              <ExternalLink size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.additionalInfoBox}>
          <Text style={styles.additionalInfoTitle}>Booking Tips</Text>
          <Text style={styles.additionalInfoText}>
            • Book in advance during Summer Day Festival (March 14)
          </Text>
          <Text style={styles.additionalInfoText}>
            • Many accommodations offer discounts for stays longer than 3 nights
          </Text>
          <Text style={styles.additionalInfoText}>
            • Ask about breakfast - many places include traditional Albanian breakfast
          </Text>
          <Text style={styles.additionalInfoText}>
            • Consider location - staying near the castle provides easy access to main attractions
          </Text>
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
    marginTop: 16,
  },
  hotelCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    ...Platform.OS !== 'web' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    } : {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
  },
  hotelImage: {
    width: '100%',
    height: 150,
  },
  hotelInfo: {
    padding: 16,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  hotelLocation: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  hotelRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
    marginRight: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  hotelPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 12,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '500',
    marginRight: 6,
  },
  additionalInfoBox: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  additionalInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  additionalInfoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
});