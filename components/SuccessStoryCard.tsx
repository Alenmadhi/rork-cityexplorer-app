import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Image } from 'expo-image';
import { MapPin, Calendar, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SuccessStory } from '@/types';
import Colors from '@/constants/colors';

interface SuccessStoryCardProps {
  story: SuccessStory;
  featured?: boolean;
}

export const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({ 
  story, 
  featured = false 
}) => {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/success-stories/${story.id}`);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, featured && styles.featuredContainer]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imagesContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: story.beforeImage }}
            style={styles.image}
            contentFit="cover"
          />
          <View style={styles.imageLabel}>
            <Text style={styles.imageLabelText}>Before</Text>
          </View>
        </View>
        
        <View style={styles.imageWrapper}>
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
      
      <View style={styles.content}>
        {featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Fix of the Week</Text>
          </View>
        )}
        
        <Text style={styles.title} numberOfLines={2}>{story.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{story.description}</Text>
        
        <View style={styles.footer}>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <MapPin size={14} color={Colors.textSecondary} style={styles.detailIcon} />
              <Text style={styles.detailText} numberOfLines={1}>{story.location}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Calendar size={14} color={Colors.textSecondary} style={styles.detailIcon} />
              <Text style={styles.detailText}>{formatDate(story.date)}</Text>
            </View>
          </View>
          
          <View style={styles.readMoreContainer}>
            <Text style={styles.readMoreText}>Read More</Text>
            <ArrowRight size={14} color={Colors.primary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
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
  featuredContainer: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  imagesContainer: {
    flexDirection: 'row',
    height: 150,
  },
  imageWrapper: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageLabel: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  afterLabel: {
    backgroundColor: `${Colors.success}CC`,
  },
  imageLabelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  featuredBadge: {
    backgroundColor: `${Colors.primary}20`,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  featuredText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  detailsContainer: {
    flex: 1,
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
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginRight: 4,
  },
});