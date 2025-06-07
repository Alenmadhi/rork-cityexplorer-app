import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { MapPin, Calendar, AlertTriangle, ChevronRight, Map as MapIcon, List } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  status: 'pending' | 'in_progress' | 'resolved';
  type: string;
  image?: string;
}

const MOCK_ISSUES: Issue[] = [
  {
    id: '1',
    title: 'Pothole on Qemal Stafa Street',
    description: 'Large pothole causing traffic and potential damage to vehicles.',
    location: 'Rruga Qemal Stafa, near city center',
    date: '2023-06-15',
    status: 'in_progress',
    type: 'Road Damage',
    image: 'https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '2',
    title: 'Broken Street Light',
    description: 'Street light not working, creating a dark area at night.',
    location: 'Rruga 11 Nëntori, near the museum',
    date: '2023-06-10',
    status: 'pending',
    type: 'Broken Light',
    image: 'https://images.unsplash.com/photo-1617919759916-0642e3e3e1f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '3',
    title: 'Overflowing Trash Bin',
    description: 'Trash bin overflowing for several days, causing odor and attracting pests.',
    location: 'Park near Elbasan Castle',
    date: '2023-06-12',
    status: 'resolved',
    type: 'Trash',
    image: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '4',
    title: 'Water Leak on Sidewalk',
    description: 'Water leaking from underground pipe, creating puddles and slippery conditions.',
    location: 'Bulevardi Qemal Stafa, near the bank',
    date: '2023-06-08',
    status: 'in_progress',
    type: 'Water Issue',
    image: 'https://images.unsplash.com/photo-1584677626646-7c8f83690304?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '5',
    title: 'Graffiti on Historic Building',
    description: 'Vandalism with spray paint on the wall of a historic building.',
    location: 'Inside Elbasan Castle',
    date: '2023-06-05',
    status: 'pending',
    type: 'Graffiti',
    image: 'https://images.unsplash.com/photo-1572969095242-fa6a7da5b6d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
];

type ViewMode = 'list' | 'map';

export default function IssuesScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  
  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'pending':
        return Colors.warning;
      case 'in_progress':
        return Colors.info;
      case 'resolved':
        return Colors.success;
      default:
        return Colors.textSecondary;
    }
  };
  
  const getStatusText = (status: Issue['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      default:
        return 'Unknown';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const renderIssueItem = ({ item }: { item: Issue }) => (
    <TouchableOpacity 
      style={styles.issueCard}
      onPress={() => router.push(`/issues/${item.id}`)}
    >
      <View style={styles.issueHeader}>
        <View style={styles.issueTypeContainer}>
          <Text style={styles.issueType}>{item.type}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      <Text style={styles.issueTitle}>{item.title}</Text>
      
      <View style={styles.issueDetails}>
        <View style={styles.detailItem}>
          <MapPin size={14} color={Colors.textSecondary} style={styles.detailIcon} />
          <Text style={styles.detailText} numberOfLines={1}>{item.location}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Calendar size={14} color={Colors.textSecondary} style={styles.detailIcon} />
          <Text style={styles.detailText}>{formatDate(item.date)}</Text>
        </View>
      </View>
      
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={styles.issueImage}
          contentFit="cover"
        />
      )}
      
      <View style={styles.cardFooter}>
        <Text style={styles.viewDetailsText}>View Details</Text>
        <ChevronRight size={16} color={Colors.primary} />
      </View>
    </TouchableOpacity>
  );
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Reported Issues',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        <View style={styles.viewToggleContainer}>
          <TouchableOpacity 
            style={[
              styles.viewToggleButton, 
              viewMode === 'list' && styles.activeViewToggleButton
            ]}
            onPress={() => setViewMode('list')}
          >
            <List size={20} color={viewMode === 'list' ? Colors.background : Colors.text} />
            <Text 
              style={[
                styles.viewToggleText,
                viewMode === 'list' && styles.activeViewToggleText
              ]}
            >
              List View
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.viewToggleButton, 
              viewMode === 'map' && styles.activeViewToggleButton
            ]}
            onPress={() => setViewMode('map')}
          >
            <MapIcon size={20} color={viewMode === 'map' ? Colors.background : Colors.text} />
            <Text 
              style={[
                styles.viewToggleText,
                viewMode === 'map' && styles.activeViewToggleText
              ]}
            >
              Map View
            </Text>
          </TouchableOpacity>
        </View>
        
        {viewMode === 'list' ? (
          <FlatList
            data={MOCK_ISSUES}
            renderItem={renderIssueItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.issuesList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <MapIcon size={48} color={Colors.textSecondary} />
              <Text style={styles.mapPlaceholderText}>
                Map view would display all reported issues here.
              </Text>
              <Text style={styles.mapPlaceholderSubtext}>
                In a real app, this would integrate with Google Maps or MapView.
              </Text>
            </View>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.reportButton}
          onPress={() => router.push('/(tabs)/report-issue')}
        >
          <AlertTriangle size={20} color="#fff" style={styles.reportButtonIcon} />
          <Text style={styles.reportButtonText}>Report New Issue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  viewToggleContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 8,
  },
  viewToggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  activeViewToggleButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  viewToggleText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  activeViewToggleText: {
    color: Colors.background,
  },
  issuesList: {
    padding: 16,
    paddingBottom: 100, // Extra padding for the floating button
  },
  issueCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
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
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  issueTypeContainer: {
    backgroundColor: `${Colors.primary}15`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  issueType: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  issueDetails: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailIcon: {
    marginRight: 6,
  },
  detailText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  issueImage: {
    width: '100%',
    height: 160,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  viewDetailsText: {
    fontSize: 14,
    color: Colors.primary,
    marginRight: 4,
  },
  mapContainer: {
    flex: 1,
    padding: 16,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  reportButton: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  reportButtonIcon: {
    marginRight: 8,
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});