import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Calendar, Info, Newspaper, Camera, ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useAuthStore } from '@/stores/auth-store';

const { width } = Dimensions.get('window');

export default function GuestScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const handleContinue = () => {
    // Login as guest
    login({ email: 'guest@example.com', isGuest: true });
    router.replace('/(tabs)');
  };
  
  const handleBackToLogin = () => {
    router.replace('/(auth)/login');
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1578297886235-f2be6e8f3c3e?q=80&w=1000&auto=format&fit=crop' }} 
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.headerContent}>
          <Text style={styles.title}>Explore Elbasan</Text>
          <Text style={styles.subtitle}>Discover the beauty and culture of Elbasan, Albania</Text>
        </View>
      </View>
      
      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>Available as Guest</Text>
        
        <View style={styles.featureRow}>
          <View style={styles.feature}>
            <View style={styles.featureIconContainer}>
              <MapPin size={24} color={Colors.primary} />
            </View>
            <Text style={styles.featureTitle}>Attractions</Text>
            <Text style={styles.featureDescription}>Discover beautiful places to visit</Text>
          </View>
          
          <View style={styles.feature}>
            <View style={styles.featureIconContainer}>
              <Calendar size={24} color={Colors.primary} />
            </View>
            <Text style={styles.featureTitle}>Events</Text>
            <Text style={styles.featureDescription}>Find upcoming events and activities</Text>
          </View>
        </View>
        
        <View style={styles.featureRow}>
          <View style={styles.feature}>
            <View style={styles.featureIconContainer}>
              <Info size={24} color={Colors.primary} />
            </View>
            <Text style={styles.featureTitle}>Tourist Info</Text>
            <Text style={styles.featureDescription}>Essential information for visitors</Text>
          </View>
          
          <View style={styles.feature}>
            <View style={styles.featureIconContainer}>
              <Newspaper size={24} color={Colors.primary} />
            </View>
            <Text style={styles.featureTitle}>News</Text>
            <Text style={styles.featureDescription}>Stay updated with local news</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Create an Account for More</Text>
        
        <View style={styles.premiumFeature}>
          <View style={styles.premiumFeatureContent}>
            <View style={styles.premiumIconContainer}>
              <Camera size={24} color={Colors.background} />
            </View>
            <View style={styles.premiumTextContainer}>
              <Text style={styles.premiumTitle}>Report Issues</Text>
              <Text style={styles.premiumDescription}>Help improve the city by reporting problems</Text>
            </View>
          </View>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>Premium</Text>
          </View>
        </View>
        
        <View style={styles.premiumFeature}>
          <View style={styles.premiumFeatureContent}>
            <View style={styles.premiumIconContainer}>
              <Camera size={24} color={Colors.background} />
            </View>
            <View style={styles.premiumTextContainer}>
              <Text style={styles.premiumTitle}>Personalization</Text>
              <Text style={styles.premiumDescription}>Save favorites and get personalized recommendations</Text>
            </View>
          </View>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>Premium</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue as Guest</Text>
          <ArrowRight size={20} color={Colors.background} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackToLogin}
        >
          <Text style={styles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
  },
  header: {
    height: 250,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  featuresContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
    marginTop: 16,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  feature: {
    width: (width - 60) / 2,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
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
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  premiumFeature: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  premiumFeatureContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  premiumIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  premiumTextContainer: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  premiumDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  premiumBadge: {
    backgroundColor: `${Colors.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  premiumBadgeText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  buttonsContainer: {
    padding: 20,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
  },
  continueButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  backButton: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
});