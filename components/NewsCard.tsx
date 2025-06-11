import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, ExternalLink, MapPin } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { NewsItem } from '@/types';

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  const router = useRouter();
  
  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffInDays === 0) {
        // Today - show time
        return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      } else if (diffInDays === 1) {
        // Yesterday
        return 'Yesterday';
      } else if (diffInDays < 7) {
        // Within a week
        return `${diffInDays} days ago`;
      } else {
        // More than a week
        return date.toLocaleDateString();
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Recent';
    }
  };
  
  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'local':
        return Colors.categoryLocal;
      case 'business':
        return Colors.categoryBusiness;
      case 'culture':
        return Colors.categoryCulture;
      case 'sports':
        return Colors.categorySports;
      case 'politics':
        return Colors.categoryPolitics;
      default:
        return Colors.categoryOther;
    }
  };
  
  // Handle card press
  const handlePress = () => {
    if (news.url) {
      handleExternalLink();
    } else {
      router.push(`/news/${news.id}`);
    }
  };
  
  // Handle external link press
  const handleExternalLink = async () => {
    if (news.url) {
      try {
        const canOpen = await Linking.canOpenURL(news.url);
        if (canOpen) {
          await Linking.openURL(news.url);
        } else {
          console.warn('Cannot open URL:', news.url);
        }
      } catch (error) {
        console.error('Error opening URL:', error);
      }
    }
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        featured && styles.featuredContainer
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: news.image }} 
        style={[
          styles.image,
          featured && styles.featuredImage
        ]}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View 
            style={[
              styles.categoryBadge,
              { backgroundColor: `${getCategoryColor(news.category)}20` }
            ]}
          >
            <Text 
              style={[
                styles.categoryText,
                { color: getCategoryColor(news.category) }
              ]}
            >
              {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
            </Text>
          </View>
          
          {news.url && (
            <TouchableOpacity 
              style={styles.externalLinkButton}
              onPress={handleExternalLink}
            >
              <ExternalLink size={16} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>
        
        <Text 
          style={[
            styles.title,
            featured && styles.featuredTitle
          ]}
          numberOfLines={2}
        >
          {news.title}
        </Text>
        
        <Text 
          style={styles.summary}
          numberOfLines={featured ? 3 : 2}
        >
          {news.summary}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <Calendar size={14} color={Colors.textSecondary} />
            <Text style={styles.date}>{formatDate(news.date)}</Text>
          </View>
          
          {news.locationName && (
            <View style={styles.locationContainer}>
              <MapPin size={14} color={Colors.textSecondary} />
              <Text style={styles.location} numberOfLines={1}>
                {news.locationName}
              </Text>
            </View>
          )}
          
          <Text style={styles.author}>{news.author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

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
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  featuredContainer: {
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 160,
  },
  featuredImage: {
    height: 200,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  externalLinkButton: {
    padding: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 18,
  },
  summary: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
    maxWidth: 100,
  },
  author: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});