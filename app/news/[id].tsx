import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Linking, ActivityIndicator, Platform } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Calendar, Clock, ArrowLeft, ExternalLink, Share2 } from 'lucide-react-native';
import { Share as RNShare } from 'react-native';
import Colors from '@/constants/colors';
import { useNews } from '@/hooks/useNews';
import { NewsItem } from '@/types';
import { ErrorMessage } from '@/components/ErrorMessage';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { news, loading } = useNews();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (news && news.length > 0 && id) {
      const item = news.find(item => item.id === id);
      if (item) {
        setNewsItem(item);
      } else {
        setError('News article not found');
      }
    }
  }, [news, id]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'local':
        return Colors.primary;
      case 'business':
        return Colors.success;
      case 'culture':
        return Colors.warning;
      case 'sports':
        return '#FF6B6B';
      case 'politics':
        return '#6B66FF';
      default:
        return Colors.textSecondary;
    }
  };
  
  // Handle external link press
  const handleExternalLink = async () => {
    if (newsItem?.url) {
      try {
        const canOpen = await Linking.canOpenURL(newsItem.url);
        if (canOpen) {
          await Linking.openURL(newsItem.url);
        } else {
          console.warn('Cannot open URL:', newsItem.url);
        }
      } catch (error) {
        console.error('Error opening URL:', error);
      }
    }
  };
  
  // Handle share
  const handleShare = async () => {
    if (newsItem) {
      try {
        const shareOptions = {
          title: newsItem.title,
          message: `${newsItem.title}

${newsItem.summary}

${newsItem.url || 'Elbasan City App'}`,
          url: newsItem.url,
        };
        
        if (Platform.OS === 'web') {
          if (navigator.share) {
            await navigator.share({
              title: shareOptions.title,
              text: shareOptions.message,
              url: shareOptions.url,
            });
          } else {
            console.log('Web share not supported');
          }
        } else {
          await RNShare.share(shareOptions);
        }
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  if (!newsItem) {
    return <ErrorMessage message="News article not found" />;
  }
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerButtons}>
              {newsItem.url && (
                <TouchableOpacity onPress={handleExternalLink} style={styles.headerButton}>
                  <ExternalLink size={24} color={Colors.primary} />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
                <Share2 size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          ),
        }} 
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Image 
          source={{ uri: newsItem.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.articleContainer}>
          <View 
            style={[
              styles.categoryBadge,
              { backgroundColor: `${getCategoryColor(newsItem.category)}20` }
            ]}
          >
            <Text 
              style={[
                styles.categoryText,
                { color: getCategoryColor(newsItem.category) }
              ]}
            >
              {newsItem.category.charAt(0).toUpperCase() + newsItem.category.slice(1)}
            </Text>
          </View>
          
          <Text style={styles.title}>{newsItem.title}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Calendar size={16} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{formatDate(newsItem.date)}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Clock size={16} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{formatTime(newsItem.date)}</Text>
            </View>
          </View>
          
          <Text style={styles.author}>By {newsItem.author}</Text>
          
          <Text style={styles.articleContent}>{newsItem.content}</Text>
          
          {newsItem.url && (
            <TouchableOpacity 
              style={styles.sourceButton}
              onPress={handleExternalLink}
            >
              <Text style={styles.sourceButtonText}>Read full article</Text>
              <ExternalLink size={16} color={Colors.primary} />
            </TouchableOpacity>
          )}
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
  contentContainer: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  image: {
    width: '100%',
    height: 250,
  },
  articleContainer: {
    padding: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
    lineHeight: 32,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  author: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.text,
    marginBottom: 24,
  },
  articleContent: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  sourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.primary}15`,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  sourceButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
    marginRight: 8,
  },
});