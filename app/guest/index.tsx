import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MapPin, Calendar, Newspaper, Info, User } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useAuthStore } from '@/stores/auth-store';

export default function GuestHomeScreen() {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleContinueAsGuest = () => {
    // Create a guest user
    const guestUser = {
      id: 'guest-' + Date.now(),
      name: 'Guest User',
      email: '',
      avatar: null
    };
    
    // Login as guest
    login(guestUser);
    
    // Navigate to home after a short delay to ensure state is updated
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 300);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1578297886235-f2be6e8f3c3e?q=80&w=1000&auto=format&fit=crop' }} 
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.headerContent}>
          <Text style={styles.title}>Welcome to Elbasan City</Text>
          <Text style={styles.subtitle}>Discover, explore, and connect with your city</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Explore as a Guest</Text>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <MapPin size={24} color={Colors.primary} />
            </View>
            <Text style={styles.featureTitle}>Discover Places</Text>
            <Text style={styles.featureDescription}>
              Explore attractions and landmarks around the city
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Calendar size={24} color={Colors.primary} />
            </View>
            <Text style={styles.featureTitle}>Events</Text>
            <Text style={styles.featureDescription}>
              Stay updated with local events and activities
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Newspaper size={24} color={Colors.primary} />
            </View>
            <Text style={styles.featureTitle}>News</Text>
            <Text style={styles.featureDescription}>
              Get the latest news and updates about Elbasan
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Info size={24} color={Colors.primary} />
            </View>
            <Text style={styles.featureTitle}>Tourist Info</Text>
            <Text style={styles.featureDescription}>
              Essential information for visitors and tourists
            </Text>
          </View>
        </View>
        
        <View style={styles.accountNote}>
          <User size={20} color={Colors.textSecondary} />
          <Text style={styles.accountNoteText}>
            Create an account to report issues, save favorites, and more
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.guestButton}
          onPress={handleContinueAsGuest}
          activeOpacity={0.8}
        >
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
        </TouchableOpacity>
        
        <View style={styles.authButtons}>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push('/login')}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.signupButton}
            onPress={() => router.push('/signup')}
            activeOpacity={0.8}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    backgroundColor: 'rgba(0,0,0,0.4)',
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
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  featureItem: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  accountNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}10`,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  accountNoteText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 12,
  },
  guestButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  guestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  authButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginButton: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  loginButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  signupButton: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});