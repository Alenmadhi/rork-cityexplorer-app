import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Heart, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { NewsItem } from '@/types';
import Colors from '@/constants/colors';
import { useFavoritesStore } from '@/stores/favorites-store';

interface NewsCardProps {
  news: NewsItem;
  isFeatured?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, isFeatured = false }) => {
  const router = useRouter();
  const { isFavoriteNews, addFavoriteNews, removeFavoriteNews } = useFavoritesStore();
  const isFavorite = isFavoriteNews(news.id);

  const handlePress = () => {
    router.push(`/news/${news.id}`);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteNews(news.id);
    } else {
      addFavoriteNews(news.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, isFeatured && styles.featuredContainer]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{news.category.toUpperCase()}</Text>
          <View style={styles.dateContainer}>
            <Clock size={12} color={Colors.textSecondary} />
            <Text style={styles.date}>{formatDate(news.date)}</Text>
          </View>
        </View>
        <Text style={styles.title} numberOfLines={2}>{news.title}</Text>
        <Text style={styles.summary} numberOfLines={2}>{news.summary}</Text>
        <View style={styles.footer}>
          <Text style={styles.source}>{news.source}</Text>
        </View>
      </View>
      <Image
        source={{ uri: news.image }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={toggleFavorite}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Heart 
          size={20} 
          color={isFavorite ? Colors.secondary : Colors.textSecondary} 
          fill={isFavorite ? Colors.secondary : 'none'} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    flexDirection: 'row',
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
    marginBottom: 24,
  },
  content: {
    padding: 16,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.text,
  },
  summary: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  image: {
    width: 100,
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
});