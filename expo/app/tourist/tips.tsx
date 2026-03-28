import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { TouristInfoCard } from '@/components/TouristInfoCard';
import { touristInfo } from '@/mocks/tourist-info';
import Colors from '@/constants/colors';
import { Calendar, DollarSign, Utensils, Sun, Umbrella, Clock } from 'lucide-react-native';

export default function TipsScreen() {
  const tipsInfo = touristInfo.filter(info => info.category === 'tips');

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Local Tips for Visitors</Text>
        <Text style={styles.headerSubtitle}>
          Make the most of your stay in Elbasan
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Visitor Tips</Text>
        
        {tipsInfo.map(info => (
          <TouristInfoCard 
            key={info.id} 
            info={info} 
            showChevron={false}
          />
        ))}

        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Essential Information</Text>
          
          <View style={styles.categoryRow}>
            <View style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: `${Colors.primary}15` }]}>
                <Calendar size={24} color={Colors.primary} />
              </View>
              <Text style={styles.categoryLabel}>Best Time</Text>
              <Text style={styles.categoryValue}>Mar-May, Sep-Oct</Text>
            </View>
            
            <View style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: '#38B2AC15' }]}>
                <DollarSign size={24} color="#38B2AC" />
              </View>
              <Text style={styles.categoryLabel}>Currency</Text>
              <Text style={styles.categoryValue}>Albanian Lek (ALL)</Text>
            </View>
          </View>
          
          <View style={styles.categoryRow}>
            <View style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: '#ED8A1915' }]}>
                <Utensils size={24} color="#ED8A19" />
              </View>
              <Text style={styles.categoryLabel}>Tipping</Text>
              <Text style={styles.categoryValue}>10% in restaurants</Text>
            </View>
            
            <View style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: '#F0453415' }]}>
                <Clock size={24} color="#F04534" />
              </View>
              <Text style={styles.categoryLabel}>Business Hours</Text>
              <Text style={styles.categoryValue}>9:00-20:00</Text>
            </View>
          </View>
        </View>

        <View style={styles.seasonalContainer}>
          <Text style={styles.seasonalTitle}>Seasonal Tips</Text>
          
          <View style={styles.seasonCard}>
            <View style={styles.seasonHeader}>
              <View style={[styles.seasonIcon, { backgroundColor: '#F9A82515' }]}>
                <Sun size={24} color="#F9A825" />
              </View>
              <View>
                <Text style={styles.seasonName}>Summer (Jun-Aug)</Text>
                <Text style={styles.seasonTemp}>25-35°C</Text>
              </View>
            </View>
            <View style={styles.seasonTips}>
              <Text style={styles.seasonTipItem}>• Pack light, breathable clothing</Text>
              <Text style={styles.seasonTipItem}>• Bring sunscreen and a hat</Text>
              <Text style={styles.seasonTipItem}>• Explore early morning or evening to avoid heat</Text>
              <Text style={styles.seasonTipItem}>• Stay hydrated - carry water</Text>
            </View>
          </View>
          
          <View style={styles.seasonCard}>
            <View style={styles.seasonHeader}>
              <View style={[styles.seasonIcon, { backgroundColor: '#4A6CFA15' }]}>
                <Umbrella size={24} color="#4A6CFA" />
              </View>
              <View>
                <Text style={styles.seasonName}>Spring (Mar-May)</Text>
                <Text style={styles.seasonTemp}>15-25°C</Text>
              </View>
            </View>
            <View style={styles.seasonTips}>
              <Text style={styles.seasonTipItem}>• Perfect time for the Summer Day Festival (March 14)</Text>
              <Text style={styles.seasonTipItem}>• Pack layers for changing temperatures</Text>
              <Text style={styles.seasonTipItem}>• Bring a light raincoat</Text>
              <Text style={styles.seasonTipItem}>• Best time for outdoor activities</Text>
            </View>
          </View>
        </View>

        <View style={styles.customsContainer}>
          <Text style={styles.customsTitle}>Local Customs</Text>
          
          <View style={styles.customCard}>
            <Text style={styles.customLabel}>Greetings</Text>
            <Text style={styles.customText}>
              Albanians typically greet with a handshake. Close friends may greet with a kiss on each cheek. 
              Using basic Albanian greetings is appreciated: "Përshëndetje" (hello) and "Faleminderit" (thank you).
            </Text>
          </View>
          
          <View style={styles.customCard}>
            <Text style={styles.customLabel}>Hospitality</Text>
            <Text style={styles.customText}>
              Albanian hospitality is legendary. If invited to someone's home, bringing a small gift like sweets or 
              flowers is appreciated. It's polite to remove shoes when entering someone's home.
            </Text>
          </View>
          
          <View style={styles.customCard}>
            <Text style={styles.customLabel}>Dining</Text>
            <Text style={styles.customText}>
              Meals are social events in Albania. Don't rush your meal. It's common for restaurants to serve 
              complimentary raki (local spirit) after dinner. Refusing food or drink can be considered impolite.
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
  categoriesContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
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
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  categoryValue: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
  seasonalContainer: {
    marginBottom: 24,
  },
  seasonalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  seasonCard: {
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
  seasonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  seasonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  seasonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  seasonTemp: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  seasonTips: {
    paddingLeft: 8,
  },
  seasonTipItem: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 6,
    lineHeight: 20,
  },
  customsContainer: {
    marginBottom: 16,
  },
  customsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  customCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: Colors.secondary,
  },
  customLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  customText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});