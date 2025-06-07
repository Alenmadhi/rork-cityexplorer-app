import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Heart, Calendar, ArrowLeft, Share2, ExternalLink } from 'lucide-react-native';
import { useNews } from '@/hooks/useNews';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ErrorMessage } from '@/components/ErrorMessage';
import Colors from '@/constants/colors';
import { useFavoritesStore } from '@/stores/favorites-store';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { news, loading, error, refreshNews } = useNews();
  const { isFavoriteNews, addFavoriteNews, removeFavoriteNews } = useFavoritesStore();
  
  if (loading) {
    return <LoadingIndicator message="Loading article..." />;
  }
  
  if (error) {
    return <ErrorMessage message={error} onRetry={refreshNews} />;
  }
  
  const newsItem = news.find(n => n.id === id);
  
  if (!newsItem) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>News article not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isFavorite = isFavoriteNews(newsItem.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteNews(newsItem.id);
    } else {
      addFavoriteNews(newsItem.id);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
            <View style={styles.headerRightContainer}>
              <TouchableOpacity style={styles.headerButton}>
                <Share2 size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerButton} 
                onPress={toggleFavorite}
              >
                <Heart 
                  size={24} 
                  color="#fff" 
                  fill={isFavorite ? "#fff" : "none"} 
                />
              </TouchableOpacity>
            </View>
          ),
        }} 
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: newsItem.image }}
            style={styles.image}
            contentFit="cover"
          />
          <View style={styles.overlay} />
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{newsItem.category.toUpperCase()}</Text>
            </View>
            
            <View style={styles.dateContainer}>
              <Calendar size={16} color={Colors.textSecondary} />
              <Text style={styles.date}>{formatDate(newsItem.date)}</Text>
            </View>
          </View>
          
          <Text style={styles.title}>{newsItem.title}</Text>
          <Text style={styles.summary}>{newsItem.summary}</Text>
          
          <View style={styles.sourceContainer}>
            <Text style={styles.sourceLabel}>Source:</Text>
            <Text style={styles.source}>{newsItem.source}</Text>
          </View>
          
          <View style={styles.contentTextContainer}>
            <Text style={styles.contentText}>{newsItem.content}</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <ExternalLink size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Read Full Article</Text>
          </TouchableOpacity>
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
  headerRightContainer: {
    flexDirection: 'row',
  },
  contentContainer: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryContainer: {
    backgroundColor: `${Colors.primary}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  category: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  summary: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 16,
    lineHeight: 24,
  },
  sourceContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  sourceLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 4,
  },
  source: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  contentTextContainer: {
    marginBottom: 24,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 26,
    color: Colors.text,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 8,
  },
});