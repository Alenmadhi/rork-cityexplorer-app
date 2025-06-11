import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { TouristInfoCard } from '@/components/TouristInfoCard';
import { touristInfo } from '@/mocks/tourist-info';
import Colors from '@/constants/colors';
import { MapPin, Navigation, Hotel, Wifi, HeartPulse, Info, Camera, Coffee, Utensils } from 'lucide-react-native';

export default function TouristIndexScreen() {
  const router = useRouter();
  
  const transportationInfo = touristInfo.filter(info => info.category === 'transportation');
  const accommodationInfo = touristInfo.filter(info => info.category === 'accommodation');
  const emergencyInfo = touristInfo.filter(info => info.category === 'emergency');

  const navigateToCategory = (category: string) => {
    router.push(`/tourist/${category}`);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1578297886235-f2be6e8f3c3e?q=80&w=1000&auto=format&fit=crop' }} 
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Explore Elbasan</Text>
          <Text style={styles.heroSubtitle}>Your complete visitor guide</Text>
        </View>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.cityName}>Elbasan, Albania</Text>
        <Text style={styles.cityDescription}>
          A historic city with Ottoman architecture, traditional cuisine, and warm hospitality
        </Text>
      </View>

      <View style={styles.quickLinksContainer}>
        <Text style={styles.quickLinksTitle}>Quick Links</Text>
        <View style={styles.quickLinksGrid}>
          <TouchableOpacity 
            style={styles.quickLinkCard}
            onPress={() => navigateToCategory('emergency')}
          >
            <HeartPulse size={24} color="#FF5858" />
            <Text style={styles.quickLinkText}>Emergency</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickLinkCard}
            onPress={() => navigateToCategory('transportation')}
          >
            <Navigation size={24} color={Colors.primary} />
            <Text style={styles.quickLinkText}>Transport</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickLinkCard}
            onPress={() => navigateToCategory('accommodation')}
          >
            <Hotel size={24} color={Colors.secondary} />
            <Text style={styles.quickLinkText}>Hotels</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickLinkCard}
            onPress={() => navigateToCategory('wifi')}
          >
            <Wifi size={24} color="#4A6CFA" />
            <Text style={styles.quickLinkText}>Wi-Fi</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>About Elbasan</Text>
        <Text style={styles.infoText}>
          Elbasan is a historic city in central Albania, known for its well-preserved Ottoman castle, 
          traditional cuisine, and the famous Summer Day Festival. Located on the Shkumbin River, 
          it has been an important cultural and economic center since ancient times.
        </Text>
      </View>

      <View style={styles.mustSeeContainer}>
        <Text style={styles.mustSeeTitle}>Must-See Attractions</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.mustSeeScroll}
        >
          <TouchableOpacity style={styles.attractionCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
              style={styles.attractionImage}
            />
            <View style={styles.attractionContent}>
              <Text style={styles.attractionName}>Elbasan Castle</Text>
              <View style={styles.attractionInfo}>
                <MapPin size={12} color={Colors.textSecondary} />
                <Text style={styles.attractionLocation}>City Center</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.attractionCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
              style={styles.attractionImage}
            />
            <View style={styles.attractionContent}>
              <Text style={styles.attractionName}>King Mosque</Text>
              <View style={styles.attractionInfo}>
                <MapPin size={12} color={Colors.textSecondary} />
                <Text style={styles.attractionLocation}>Inside Castle</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.attractionCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1552248524-10d9a7e4b84a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
              style={styles.attractionImage}
            />
            <View style={styles.attractionContent}>
              <Text style={styles.attractionName}>Ethnographic Museum</Text>
              <View style={styles.attractionInfo}>
                <MapPin size={12} color={Colors.textSecondary} />
                <Text style={styles.attractionLocation}>Old Town</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.experiencesContainer}>
        <Text style={styles.experiencesTitle}>Local Experiences</Text>
        <View style={styles.experiencesGrid}>
          <TouchableOpacity style={styles.experienceCard}>
            <View style={[styles.experienceIcon, { backgroundColor: '#F9A82515' }]}>
              <Utensils size={24} color="#F9A825" />
            </View>
            <Text style={styles.experienceName}>Traditional Food</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.experienceCard}>
            <View style={[styles.experienceIcon, { backgroundColor: '#38B2AC15' }]}>
              <Coffee size={24} color="#38B2AC" />
            </View>
            <Text style={styles.experienceName}>Café Culture</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.experienceCard}>
            <View style={[styles.experienceIcon, { backgroundColor: '#4A6CFA15' }]}>
              <Camera size={24} color="#4A6CFA" />
            </View>
            <Text style={styles.experienceName}>Photo Spots</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
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
  heroContainer: {
    height: 220,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  welcomeContainer: {
    padding: 16,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  cityDescription: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  quickLinksContainer: {
    padding: 16,
    paddingTop: 8,
  },
  quickLinksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickLinkCard: {
    width: '23%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
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
  quickLinkText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 8,
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
  mustSeeContainer: {
    padding: 16,
    paddingTop: 8,
  },
  mustSeeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  mustSeeScroll: {
    paddingRight: 16,
  },
  attractionCard: {
    width: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: Colors.card,
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
  attractionImage: {
    width: '100%',
    height: 100,
  },
  attractionContent: {
    padding: 10,
  },
  attractionName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  attractionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attractionLocation: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  experiencesContainer: {
    padding: 16,
    paddingTop: 8,
  },
  experiencesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  experiencesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  experienceCard: {
    width: '31%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
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
  experienceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  experienceName: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
  categoriesContainer: {
    padding: 16,
    paddingTop: 8,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '31%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
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
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
});