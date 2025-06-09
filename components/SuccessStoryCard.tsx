import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, MessageCircle, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { SuccessStory } from '@/types';

interface SuccessStoryCardProps {
  story: SuccessStory;
  featured?: boolean;
}

export const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({ story, featured = false }) => {
  const router = useRouter();
  const { width } = Dimensions.get('window');
  const imageWidth = featured ? width - 32 : width * 0.4;
  
  const handlePress = () => {
    router.push(`/success-stories/${story.id}`);
  };
  
  // Safely handle comments count
  const commentsCount = typeof story.comments === 'number' 
    ? story.comments 
    : story.comments?.length || 0;
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        featured && styles.featuredContainer
      ]}
      onPress={handlePress}
    >
      <View style={[
        styles.content,
        featured && styles.featuredContent
      ]}>
        <View style={styles.imageContainer}>
          <View style={styles.beforeAfterContainer}>
            <Image 
              source={{ uri: story.beforeImage }} 
              style={[
                styles.image,
                { width: imageWidth }
              ]} 
              resizeMode="cover"
            />
            <View style={styles.beforeLabel}>
              <Text style={styles.beforeAfterText}>Before</Text>
            </View>
          </View>
          
          <View style={styles.beforeAfterContainer}>
            <Image 
              source={{ uri: story.afterImage }} 
              style={[
                styles.image,
                { width: imageWidth }
              ]} 
              resizeMode="cover"
            />
            <View style={styles.afterLabel}>
              <Text style={styles.beforeAfterText}>After</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>{story.title}</Text>
          
          <Text style={styles.location} numberOfLines={1}>
            {story.location}
          </Text>
          
          {featured && (
            <Text style={styles.description} numberOfLines={3}>
              {story.description}
            </Text>
          )}
          
          <View style={styles.footer}>
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Heart size={16} color={Colors.primary} />
                <Text style={styles.statText}>{story.likes || story.votes || 0}</Text>
              </View>
              
              <View style={styles.statItem}>
                <MessageCircle size={16} color={Colors.primary} />
                <Text style={styles.statText}>{commentsCount}</Text>
              </View>
            </View>
            
            <Text style={styles.date}>{story.date}</Text>
          </View>
          
          {featured && (
            <TouchableOpacity style={styles.viewButton} onPress={handlePress}>
              <Text style={styles.viewButtonText}>View Details</Text>
              <ChevronRight size={16} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featuredContainer: {
    marginBottom: 24,
  },
  content: {
    flexDirection: 'row',
    padding: 12,
  },
  featuredContent: {
    flexDirection: 'column',
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  beforeAfterContainer: {
    position: 'relative',
    marginRight: 8,
  },
  image: {
    height: 120,
    borderRadius: 8,
  },
  beforeLabel: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  afterLabel: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  beforeAfterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  date: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  viewButtonText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginRight: 4,
  },
});