import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { SearchBar } from '@/components/SearchBar';
import { Phone, Mail, Globe, MapPin, Clock, AlertCircle, Droplets, Zap, Trash2, Ambulance, Shield, FireExtinguisher } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface Service {
  id: string;
  name: string;
  category: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  hours?: string;
  description?: string;
  emergency?: boolean;
}

const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Elbasan Water Supply',
    category: 'utilities',
    phone: '+355 54 123 456',
    email: 'info@elbasanwater.al',
    website: 'https://elbasanwater.al',
    address: 'Rruga Qemal Stafa, Elbasan',
    hours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    description: 'Responsible for water supply and sewage services in Elbasan.',
  },
  {
    id: '2',
    name: 'Elbasan Electric Company',
    category: 'utilities',
    phone: '+355 54 234 567',
    email: 'support@elbasanelectric.al',
    website: 'https://elbasanelectric.al',
    address: 'Bulevardi Qemal Stafa, Elbasan',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    description: 'Electricity provider for Elbasan region.',
  },
  {
    id: '3',
    name: 'Waste Management Department',
    category: 'utilities',
    phone: '+355 54 345 678',
    email: 'waste@elbasan.gov.al',
    website: 'https://elbasan.gov.al/waste',
    address: 'Rruga 11 Nëntori, Elbasan',
    hours: 'Mon-Fri: 8:00 AM - 3:00 PM',
    description: 'Responsible for waste collection and disposal in Elbasan.',
  },
  {
    id: '4',
    name: 'Elbasan General Hospital',
    category: 'healthcare',
    phone: '+355 54 456 789',
    website: 'https://spitalielbasan.al',
    address: 'Rruga Kozma Naska, Elbasan',
    hours: '24/7',
    description: 'Main hospital providing emergency and general healthcare services.',
    emergency: true,
  },
  {
    id: '5',
    name: 'Elbasan Police Department',
    category: 'emergency',
    phone: '+355 54 567 890',
    website: 'https://policia.al/elbasan',
    address: 'Bulevardi Qemal Stafa, Elbasan',
    hours: '24/7',
    description: 'Local police department for emergencies and security.',
    emergency: true,
  },
  {
    id: '6',
    name: 'Elbasan Fire Department',
    category: 'emergency',
    phone: '+355 54 678 901',
    address: 'Rruga 28 Nëntori, Elbasan',
    hours: '24/7',
    description: 'Fire and rescue services for Elbasan region.',
    emergency: true,
  },
  {
    id: '7',
    name: 'City Hall',
    category: 'government',
    phone: '+355 54 789 012',
    email: 'info@elbasan.gov.al',
    website: 'https://elbasan.gov.al',
    address: 'Rruga 11 Nëntori, Elbasan',
    hours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    description: 'Main administrative office for Elbasan municipality.',
  },
  {
    id: '8',
    name: 'Tourist Information Center',
    category: 'tourism',
    phone: '+355 54 890 123',
    email: 'tourism@elbasan.gov.al',
    website: 'https://visitelbasan.al',
    address: 'Elbasan Castle, Elbasan',
    hours: 'Daily: 9:00 AM - 6:00 PM',
    description: 'Information and assistance for tourists visiting Elbasan.',
  },
];

const CATEGORIES = [
  'all',
  'emergency',
  'utilities',
  'healthcare',
  'government',
  'tourism',
];

export default function ServicesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (service.description && service.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsite = (website: string) => {
    Linking.openURL(website);
  };

  const handleMap = (address: string) => {
    const query = encodeURIComponent(address);
    const url = Platform.select({
      ios: `maps:0,0?q=${query}`,
      android: `geo:0,0?q=${query}`,
      web: `https://maps.google.com/?q=${query}`,
    });
    
    if (url) {
      Linking.openURL(url);
    }
  };

  const getCategoryIcon = (category: string, serviceName: string) => {
    switch (category) {
      case 'utilities':
        if (serviceName.includes('Water')) return <Droplets size={24} color={Colors.primary} />;
        if (serviceName.includes('Electric')) return <Zap size={24} color={Colors.primary} />;
        if (serviceName.includes('Waste')) return <Trash2 size={24} color={Colors.primary} />;
        return <Droplets size={24} color={Colors.primary} />;
      case 'healthcare':
        return <Ambulance size={24} color={Colors.primary} />;
      case 'emergency':
        if (serviceName.includes('Police')) return <Shield size={24} color={Colors.primary} />;
        if (serviceName.includes('Fire')) return <FireExtinguisher size={24} color={Colors.primary} />;
        return <AlertCircle size={24} color={Colors.primary} />;
      case 'government':
        return <Globe size={24} color={Colors.primary} />;
      case 'tourism':
        return <MapPin size={24} color={Colors.primary} />;
      default:
        return <Globe size={24} color={Colors.primary} />;
    }
  };

  const renderCategoryButton = (category: string) => {
    const isSelected = category === selectedCategory;
    const displayName = category.charAt(0).toUpperCase() + category.slice(1);
    
    return (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryButton,
          isSelected && styles.selectedCategoryButton
        ]}
        onPress={() => setSelectedCategory(category)}
      >
        <Text 
          style={[
            styles.categoryButtonText,
            isSelected && styles.selectedCategoryButtonText
          ]}
        >
          {displayName}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderService = (item: Service) => {
    return (
      <View key={item.id} style={styles.serviceCard}>
        <View style={styles.serviceHeader}>
          <View style={styles.serviceIconContainer}>
            {getCategoryIcon(item.category, item.name)}
          </View>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.serviceCategory}>
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              {item.emergency && ' • Emergency Service'}
            </Text>
          </View>
          {item.emergency && (
            <View style={styles.emergencyBadge}>
              <Text style={styles.emergencyText}>24/7</Text>
            </View>
          )}
        </View>
        
        {item.description && (
          <Text style={styles.serviceDescription}>{item.description}</Text>
        )}
        
        <View style={styles.serviceDetails}>
          {item.address && (
            <TouchableOpacity 
              style={styles.detailItem}
              onPress={() => handleMap(item.address!)}
            >
              <MapPin size={16} color={Colors.primary} style={styles.detailIcon} />
              <Text style={styles.detailText} numberOfLines={1}>{item.address}</Text>
            </TouchableOpacity>
          )}
          
          {item.hours && (
            <View style={styles.detailItem}>
              <Clock size={16} color={Colors.primary} style={styles.detailIcon} />
              <Text style={styles.detailText}>{item.hours}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.serviceActions}>
          {item.phone && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleCall(item.phone!)}
            >
              <Phone size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
          )}
          
          {item.email && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleEmail(item.email!)}
            >
              <Mail size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Email</Text>
            </TouchableOpacity>
          )}
          
          {item.website && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleWebsite(item.website!)}
            >
              <Globe size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Website</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'City Services',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search services..."
        />
        
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map(renderCategoryButton)}
        </ScrollView>
        
        <ScrollView 
          style={styles.servicesContainer}
          contentContainerStyle={styles.servicesContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredServices.length > 0 ? (
            filteredServices.map(renderService)
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No services found</Text>
              <Text style={styles.emptyMessage}>Try adjusting your search or filters</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  selectedCategoryButtonText: {
    color: Colors.background,
  },
  servicesContainer: {
    flex: 1,
  },
  servicesContent: {
    padding: 16,
    paddingBottom: 40,
  },
  serviceCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  serviceCategory: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  emergencyBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  emergencyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  serviceDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  serviceDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  serviceActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});