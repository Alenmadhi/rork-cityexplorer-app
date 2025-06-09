import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { MapPin, Calendar, ArrowLeft, Share2, ThumbsUp, MessageCircle } from 'lucide-react-native';
import { useSuccessStoriesStore } from '@/stores/success-stories-store';
import Colors from '@/constants/colors';
import { Comment } from '@/types';

export default function SuccessStoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getStoryById } = useSuccessStoriesStore();
  
  const story = getStoryById(id as string);
  
  if (!story) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Story not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Safely handle comments
  const storyComments = Array.isArray(story.comments) ? story.comments : [];
  const commentsCount = typeof story.comments === 'number' 
    ? story.comments 
    : story.comments?.length || 0;
  
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
        <View style={styles.beforeAfterContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: story.beforeImage }}
              style={styles.image}
              contentFit="cover"
            />
            <View style={styles.imageLabel}>
              <Text style={styles.imageLabelText}>Before</Text>
            </View>
          </View>
          
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: story.afterImage }}
              style={styles.image}
              contentFit="cover"
            />
            <View style={[styles.imageLabel, styles.afterLabel]}>
              <Text style={styles.imageLabelText}>After</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          {story.featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>Fix of the Week</Text>
            </View>
          )}
          
          <Text style={styles.title}>{story.title}</Text>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <MapPin size={16} color={Colors.primary} style={styles.detailIcon} />
              <Text style={styles.detailText}>{story.location}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Calendar size={16} color={Colors.primary} style={styles.detailIcon} />
              <Text style={styles.detailText}>Fixed on {formatDate(story.date)}</Text>
            </View>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>The Story</Text>
            <Text style={styles.description}>{story.description}</Text>
          </View>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <ThumbsUp size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Appreciate</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Comment</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>Comments ({commentsCount})</Text>
            
            {Array.isArray(story.comments) && story.comments.length > 0 ? (
              story.comments.map((comment: Comment) => (
                <View key={comment.id} style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>{comment.userName}</Text>
                    <Text style={styles.commentDate}>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
            )}
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
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  beforeAfterContainer: {
    height: 250,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageLabel: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  afterLabel: {
    backgroundColor: `${Colors.success}CC`,
  },
  imageLabelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
  },
  featuredBadge: {
    backgroundColor: `${Colors.primary}20`,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  featuredText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
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
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
  actionsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
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
  commentItem: {
    backgroundColor: `${Colors.card}80`,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  commentDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  commentText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  noCommentsText: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
});