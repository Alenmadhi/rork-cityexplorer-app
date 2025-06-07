import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { MapPin, Calendar, ArrowLeft, MessageCircle, ThumbsUp, Share2, AlertTriangle } from 'lucide-react-native';
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
  updates?: {
    date: string;
    message: string;
  }[];
}

const MOCK_ISSUES: Record<string, Issue> = {
  '1': {
    id: '1',
    title: 'Pothole on Qemal Stafa Street',
    description: 'Large pothole causing traffic and potential damage to vehicles. The pothole is approximately 50cm in diameter and 10cm deep. It has been growing larger over the past few weeks due to recent rainfall. Several cars have reported damage from hitting this pothole, especially at night when it is difficult to see.',
    location: 'Rruga Qemal Stafa, near city center',
    date: '2023-06-15',
    status: 'in_progress',
    type: 'Road Damage',
    image: 'https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    updates: [
      {
        date: '2023-06-16',
        message: 'Issue reported to the Road Maintenance Department.'
      },
      {
        date: '2023-06-18',
        message: 'Road Maintenance Department has scheduled repairs for next week.'
      }
    ]
  },
  '2': {
    id: '2',
    title: 'Broken Street Light',
    description: 'Street light not working, creating a dark area at night. This is a safety concern for pedestrians walking in the evening. The light has been out for approximately one week.',
    location: 'Rruga 11 Nëntori, near the museum',
    date: '2023-06-10',
    status: 'pending',
    type: 'Broken Light',
    image: 'https://images.unsplash.com/photo-1617919759916-0642e3e3e1f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    updates: [
      {
        date: '2023-06-11',
        message: 'Issue reported to the Electric Company.'
      }
    ]
  },
  '3': {
    id: '3',
    title: 'Overflowing Trash Bin',
    description: 'Trash bin overflowing for several days, causing odor and attracting pests. The bin is located in a high-traffic area of the park, and the overflow is creating an unsightly and unhygienic situation.',
    location: 'Park near Elbasan Castle',
    date: '2023-06-12',
    status: 'resolved',
    type: 'Trash',
    image: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    updates: [
      {
        date: '2023-06-13',
        message: 'Issue reported to Waste Management Department.'
      },
      {
        date: '2023-06-14',
        message: 'Waste Management Department has scheduled collection.'
      },
      {
        date: '2023-06-15',
        message: 'Trash has been collected and the area has been cleaned.'
      }
    ]
  },
  '4': {
    id: '4',
    title: 'Water Leak on Sidewalk',
    description: 'Water leaking from underground pipe, creating puddles and slippery conditions. The leak appears to be coming from a municipal water pipe. The water has been flowing continuously for at least two days.',
    location: 'Bulevardi Qemal Stafa, near the bank',
    date: '2023-06-08',
    status: 'in_progress',
    type: 'Water Issue',
    image: 'https://images.unsplash.com/photo-1584677626646-7c8f83690304?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    updates: [
      {
        date: '2023-06-09',
        message: 'Issue reported to Water Supply Company.'
      },
      {
        date: '2023-06-10',
        message: 'Water Supply Company has dispatched a team to investigate.'
      },
      {
        date: '2023-06-12',
        message: 'Repair work has begun. Temporary barriers have been placed around the area.'
      }
    ]
  },
  '5': {
    id: '5',
    title: 'Graffiti on Historic Building',
    description: 'Vandalism with spray paint on the wall of a historic building. The graffiti covers approximately 2 square meters of the exterior wall. This is a protected historic structure and requires specialized cleaning methods.',
    location: 'Inside Elbasan Castle',
    date: '2023-06-05',
    status: 'pending',
    type: 'Graffiti',
    image: 'https://images.unsplash.com/photo-1572969095242-fa6a7da5b6d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    updates: [
      {
        date: '2023-06-06',
        message: 'Issue reported to Cultural Heritage Department.'
      }
    ]
  },
};

export default function IssueDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [supportCount, setSupportCount] = useState(12);
  const [hasSupported, setHasSupported] = useState(false);
  const [comment, setComment] = useState('');
  
  const issue = MOCK_ISSUES[id as string];
  
  if (!issue) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Issue not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
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
        return 'Pending Review';
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
  
  const handleSupport = () => {
    if (hasSupported) {
      setSupportCount(supportCount - 1);
    } else {
      setSupportCount(supportCount + 1);
    }
    setHasSupported(!hasSupported);
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.headerButton} 
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <Share2 size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }} 
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          {issue.image ? (
            <Image
              source={{ uri: issue.image }}
              style={styles.image}
              contentFit="cover"
            />
          ) : (
            <View style={styles.noImageContainer}>
              <AlertTriangle size={48} color={Colors.textSecondary} />
              <Text style={styles.noImageText}>No image available</Text>
            </View>
          )}
          <View style={styles.overlay} />
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.typeContainer}>
              <Text style={styles.type}>{issue.type}</Text>
            </View>
            
            <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(issue.status)}20` }]}>
              <Text style={[styles.statusText, { color: getStatusColor(issue.status) }]}>
                {getStatusText(issue.status)}
              </Text>
            </View>
          </View>
          
          <Text style={styles.title}>{issue.title}</Text>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <MapPin size={16} color={Colors.primary} style={styles.detailIcon} />
              <Text style={styles.detailText}>{issue.location}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Calendar size={16} color={Colors.primary} style={styles.detailIcon} />
              <Text style={styles.detailText}>Reported on {formatDate(issue.date)}</Text>
            </View>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{issue.description}</Text>
          </View>
          
          {issue.updates && issue.updates.length > 0 && (
            <View style={styles.updatesContainer}>
              <Text style={styles.updatesTitle}>Updates</Text>
              {issue.updates.map((update, index) => (
                <View key={index} style={styles.updateItem}>
                  <View style={styles.updateDot} />
                  <View style={styles.updateContent}>
                    <Text style={styles.updateDate}>{formatDate(update.date)}</Text>
                    <Text style={styles.updateMessage}>{update.message}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
          
          <View style={styles.supportContainer}>
            <TouchableOpacity 
              style={[styles.supportButton, hasSupported && styles.supportedButton]}
              onPress={handleSupport}
            >
              <ThumbsUp 
                size={20} 
                color={hasSupported ? Colors.background : Colors.primary} 
              />
              <Text 
                style={[styles.supportButtonText, hasSupported && styles.supportedButtonText]}
              >
                {hasSupported ? 'Supported' : 'Support This Issue'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.supportCount}>{supportCount} people support this issue</Text>
          </View>
          
          <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>Comments</Text>
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={comment}
                onChangeText={setComment}
                multiline
                placeholderTextColor={Colors.textSecondary}
              />
              <TouchableOpacity 
                style={[styles.commentButton, !comment && styles.commentButtonDisabled]}
                disabled={!comment}
              >
                <MessageCircle size={20} color={Colors.background} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
          </View>
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
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  contentContainer: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    backgroundColor: `${Colors.primary}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  type: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 20,
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
    fontSize: 15,
    color: Colors.text,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
  updatesContainer: {
    marginBottom: 24,
  },
  updatesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  updateItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  updateDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    marginTop: 4,
    marginRight: 12,
  },
  updateContent: {
    flex: 1,
  },
  updateDate: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  updateMessage: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  supportContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.primary}15`,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 8,
  },
  supportedButton: {
    backgroundColor: Colors.primary,
  },
  supportButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 8,
  },
  supportedButtonText: {
    color: Colors.background,
  },
  supportCount: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  commentsContainer: {
    marginBottom: 40,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  commentInputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentInput: {
    flex: 1,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.text,
    marginRight: 8,
  },
  commentButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentButtonDisabled: {
    backgroundColor: Colors.border,
  },
  noCommentsText: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
});