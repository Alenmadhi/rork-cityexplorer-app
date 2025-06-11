import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Smile, Frown, Meh, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { news } from '@/mocks/news';

type CityVibe = 'positive' | 'neutral' | 'negative';
type VibeTrend = 'improving' | 'steady' | 'declining';

interface CityVibeData {
  vibe: CityVibe;
  trend: VibeTrend;
  summary: string;
  lastUpdated: string;
}

export default function CityVibeWidget() {
  const [vibeData, setVibeData] = useState<CityVibeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to analyze news sentiment and generate vibe data
  const analyzeNewsSentiment = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call to an AI service
      // For demo purposes, we'll simulate the analysis based on mock news
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Count positive, neutral, and negative news
      const recentNews = news.slice(0, 10); // Use 10 most recent news items
      
      // Simple keyword-based sentiment analysis (would be AI-powered in production)
      const positiveKeywords = ['success', 'celebration', 'improvement', 'growth', 'festival', 'award', 'achievement'];
      const negativeKeywords = ['accident', 'problem', 'issue', 'crime', 'protest', 'damage', 'conflict'];
      
      let positiveCount = 0;
      let negativeCount = 0;
      
      recentNews.forEach(item => {
        const combinedText = `${item.title} ${item.summary}`.toLowerCase();
        
        if (positiveKeywords.some(keyword => combinedText.includes(keyword))) {
          positiveCount++;
        } else if (negativeKeywords.some(keyword => combinedText.includes(keyword))) {
          negativeCount++;
        }
      });
      
      // Determine overall vibe
      let vibe: CityVibe = 'neutral';
      if (positiveCount > negativeCount + 2) {
        vibe = 'positive';
      } else if (negativeCount > positiveCount + 1) {
        vibe = 'negative';
      }
      
      // Determine trend (would be based on historical data in production)
      const trends: VibeTrend[] = ['improving', 'steady', 'declining'];
      const trend = trends[Math.floor(Math.random() * trends.length)];
      
      // Generate summary
      let summary = '';
      if (vibe === 'positive') {
        summary = "Today, Elbasan feels optimistic with local festivals and community initiatives creating a positive atmosphere.";
      } else if (vibe === 'negative') {
        summary = "Elbasan is experiencing some challenges today with traffic issues and weather concerns affecting the city mood.";
      } else {
        summary = "The city has a balanced energy today with regular activities and moderate engagement across Elbasan.";
      }
      
      // Create vibe data
      const newVibeData: CityVibeData = {
        vibe,
        trend,
        summary,
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setVibeData(newVibeData);
    } catch (err) {
      setError("Couldn't analyze city vibe. Please try again.");
      console.error("Error analyzing city vibe:", err);
    } finally {
      setLoading(false);
    }
  };
  
  // Analyze on component mount
  useEffect(() => {
    analyzeNewsSentiment();
  }, []);
  
  // Get gradient colors based on vibe
  const getGradientColors = (vibe: CityVibe) => {
    switch (vibe) {
      case 'positive':
        return ['#34D399', '#10B981'] as [string, string];
      case 'neutral':
        return ['#60A5FA', '#3B82F6'] as [string, string];
      case 'negative':
        return ['#F87171', '#EF4444'] as [string, string];
      default:
        return ['#60A5FA', '#3B82F6'] as [string, string];
    }
  };
  
  // Get vibe icon based on vibe
  const getVibeIcon = (vibe: CityVibe) => {
    switch (vibe) {
      case 'positive':
        return <Smile size={28} color="#fff" />;
      case 'neutral':
        return <Meh size={28} color="#fff" />;
      case 'negative':
        return <Frown size={28} color="#fff" />;
      default:
        return <Meh size={28} color="#fff" />;
    }
  };
  
  // Get trend icon based on trend
  const getTrendIcon = (trend: VibeTrend) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp size={20} color="#fff" />;
      case 'steady':
        return <View style={{ width: 20, height: 2, backgroundColor: '#fff', borderRadius: 1 }} />;
      case 'declining':
        return <TrendingDown size={20} color="#fff" />;
      default:
        return null;
    }
  };
  
  // Get trend text based on trend
  const getTrendText = (trend: VibeTrend) => {
    switch (trend) {
      case 'improving':
        return 'Improving';
      case 'steady':
        return 'Steady';
      case 'declining':
        return 'Declining';
      default:
        return '';
    }
  };
  
  // Handle refresh
  const handleRefresh = () => {
    analyzeNewsSentiment();
  };
  
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <RefreshCw size={16} color={Colors.primary} />
          <Text style={styles.refreshButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  if (loading || !vibeData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={Colors.primary} />
        <Text style={styles.loadingText}>Analyzing city vibe...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>City Vibe</Text>
        <TouchableOpacity style={styles.refreshIcon} onPress={handleRefresh}>
          <RefreshCw size={16} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <LinearGradient
        colors={getGradientColors(vibeData.vibe)}
        style={styles.vibeCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.vibeHeader}>
          <View style={styles.vibeIconContainer}>
            {getVibeIcon(vibeData.vibe)}
          </View>
          <View style={styles.vibeTrend}>
            {getTrendIcon(vibeData.trend)}
            <Text style={styles.vibeTrendText}>{getTrendText(vibeData.trend)}</Text>
          </View>
        </View>
        
        <Text style={styles.vibeSummary}>{vibeData.summary}</Text>
        
        <Text style={styles.vibeUpdated}>Last updated: {vibeData.lastUpdated}</Text>
      </LinearGradient>
      
      <Text style={styles.disclaimer}>
        Based on AI analysis of recent news and events in Elbasan
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  refreshIcon: {
    padding: 4,
  },
  vibeCard: {
    borderRadius: 16,
    padding: 16,
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
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  vibeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  vibeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vibeTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  vibeTrendText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 6,
  },
  vibeSummary: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  vibeUpdated: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'right',
  },
  disclaimer: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  loadingContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  loadingText: {
    color: Colors.textSecondary,
    marginTop: 12,
    fontSize: 14,
  },
  errorContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  errorText: {
    color: Colors.textSecondary,
    marginBottom: 16,
    fontSize: 14,
    textAlign: 'center',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.muted,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: Colors.primary,
    fontWeight: '500',
    marginLeft: 8,
  },
});