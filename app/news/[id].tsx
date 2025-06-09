import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Linking, Platform, Share as RNShare } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, ArrowLeft, Share2, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { NewsItem } from '@/types';
import { useFavoritesStore } from '@/stores/favorites-store';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ErrorMessage } from '@/components/ErrorMessage';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addFavoriteNews, removeFavoriteNews, isFavoriteNews } = useFavoritesStore();
  
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check if news is in favorites
  const isNewsFavorite = news ? isFavoriteNews(news.id) : false;
  
  // Fetch news details
  useEffect(() => {
    const fetchNewsDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use our mock data
        const mockNews = require('@/mocks/news').news;
        const foundNews = mockNews.find((item: NewsItem) => item.id === id);
        
        if (foundNews) {
          setNews(foundNews);
        } else {
          setError('News not found');
        }
      } catch (err) {
        console.error('Error fetching news details:', err);
        setError('Failed to load news details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchNewsDetails();
    }
  }, [id]);
  
  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
  
  // Handle share
  const handleShare = async () => {
    if (!news) return;
    
    try {
      await RNShare.share({
        message: `Check out this news: ${news.title}`,
        url: news.url || `https://elbasan-city-app.com/news/${news.id}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  // Handle toggle favorite
  const handleToggleFavorite = () => {
    if (!news) return;
    
    if (isNewsFavorite) {
      removeFavoriteNews(news.id);
    } else {
      addFavoriteNews(news.id);
    }
  };
  
  // Handle external link
  const handleExternalLink = async () => {
    if (news?.url) {
      const canOpen = await Linking.canOpenURL(news.url);
      if (canOpen) {
        await Linking.openURL(news.url);
      }
    }
  };
  
  if (loading) {
    return <LoadingIndicator />;
  }
  
  if (error || !news) {
    return <ErrorMessage message={error || 'News not found'} />;
  }
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerActions}>
              {news.url && (
                <TouchableOpacity 
                  style={styles.headerAction}
                  onPress={handleExternalLink}
                >
                  <ExternalLink size={24} color={Colors.primary} />
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={styles.headerAction}
                onPress={handleShare}
              >
                <Share2 size={24} color={Colors.text} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.headerAction}
                onPress={handleToggleFavorite}
              >
                {isNewsFavorite ? (
                  <BookmarkCheck size={24} color={Colors.primary} />
                ) : (
                  <Bookmark size={24} color={Colors.text} />
                )}
              </TouchableOpacity>
            </View>
          ),
        }} 
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Image 
          source={{ uri: news.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.articleContainer}>
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
            
            <View style={styles.dateContainer}>
              <Calendar size={14} color={Colors.textSecondary} />
              <Text style={styles.date}>{formatDate(news.date)}</Text>
            </View>
          </View>
          
          <Text style={styles.title}>{news.title}</Text>
          
          <Text style={styles.author}>By {news.author}</Text>
          
          <Text style={styles.summary}>{news.summary}</Text>
          
          <Text style={styles.contentText}>{news.content}</Text>
          
          {news.url && (
            <TouchableOpacity 
              style={styles.sourceButton}
              onPress={handleExternalLink}
            >
              <Text style={styles.sourceButtonText}>Read full article</Text>
              <ExternalLink size={16} color={Colors.primary} style={styles.sourceButtonIcon} />
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
  headerActions: {
    flexDirection: 'row',
  },
  headerAction: {
    marginLeft: 16,
  },
  image: {
    width: '100%',
    height: 250,
  },
  articleContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    lineHeight: 32,
  },
  author: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  summary: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 16,
    lineHeight: 24,
  },
  contentText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  sourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.primary}15`,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  sourceButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
  },
  sourceButtonIcon: {
    marginLeft: 8,
  },
});