import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { MapPin, Award, Clock, Compass, HelpCircle, Share2, Camera } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { CityChallenge as CityChallengeType } from '@/types';

interface CityChallengeProps {
  challenge: CityChallengeType;
  onPress?: () => void;
  onHintPress?: () => void;
  onSharePress?: () => void;
  onCameraPress?: () => void;
  isNearby?: boolean;
  distance?: number;
  compact?: boolean;
}

export function CityChallenge({ 
  challenge, 
  onPress, 
  onHintPress, 
  onSharePress, 
  onCameraPress,
  isNearby,
  distance,
  compact = false
}: CityChallengeProps) {
  const [showClue, setShowClue] = useState(false);
  
  // Format expiry time
  const formatExpiryTime = () => {
    const expiryDate = new Date(challenge.expiresAt);
    const now = new Date();
    
    const diffMs = expiryDate.getTime() - now.getTime();
    if (diffMs <= 0) return 'Expired';
    
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHrs > 0) {
      return `${diffHrs}h ${diffMins}m`;
    }
    return `${diffMins}m`;
  };
  
  // Format difficulty
  const getDifficultyColor = () => {
    switch (challenge.difficulty) {
      case 'easy':
        return Colors.success;
      case 'medium':
        return Colors.warning;
      case 'hard':
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };
  
  // Format distance
  const formatDistance = (meters?: number) => {
    if (!meters) return 'Unknown';
    
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };
  
  if (compact) {
    return (
      <TouchableOpacity 
        style={styles.compactContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.compactContent}>
          <View style={styles.compactHeader}>
            <Text style={styles.compactTitle} numberOfLines={1}>{challenge.title}</Text>
            <View style={[styles.difficultyBadge, { backgroundColor: `${getDifficultyColor()}20` }]}>
              <Text style={[styles.difficultyText, { color: getDifficultyColor() }]}>
                {challenge.difficulty}
              </Text>
            </View>
          </View>
          
          <View style={styles.compactDetails}>
            <View style={styles.compactDetail}>
              <MapPin size={14} color={Colors.textSecondary} />
              <Text style={styles.compactDetailText} numberOfLines={1}>
                {challenge.location.name}
              </Text>
            </View>
            
            <View style={styles.compactDetail}>
              <Award size={14} color={Colors.primary} />
              <Text style={styles.compactDetailText}>
                {challenge.reward.points} pts
              </Text>
            </View>
            
            <View style={styles.compactDetail}>
              <Clock size={14} color={Colors.warning} />
              <Text style={styles.compactDetailText}>
                {formatExpiryTime()}
              </Text>
            </View>
          </View>
        </View>
        
        {isNearby !== undefined && (
          <View style={[
            styles.proximityBadge, 
            { backgroundColor: isNearby ? `${Colors.success}20` : `${Colors.textSecondary}20` }
          ]}>
            <Compass size={14} color={isNearby ? Colors.success : Colors.textSecondary} />
            <Text style={[
              styles.proximityText, 
              { color: isNearby ? Colors.success : Colors.textSecondary }
            ]}>
              {isNearby ? 'Nearby' : formatDistance(distance)}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
  
  return (
    <View style={styles.container}>
      {challenge.image && (
        <Image 
          source={{ uri: challenge.image }} 
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{challenge.title}</Text>
          
          <View style={styles.badges}>
            <View style={[styles.difficultyBadge, { backgroundColor: `${getDifficultyColor()}20` }]}>
              <Text style={[styles.difficultyText, { color: getDifficultyColor() }]}>
                {challenge.difficulty}
              </Text>
            </View>
            
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{challenge.type}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.description}>{challenge.description}</Text>
        
        <TouchableOpacity 
          style={styles.clueContainer}
          onPress={() => setShowClue(!showClue)}
        >
          <Text style={styles.clueLabel}>
            {showClue ? 'Hide Clue' : 'Show Clue'}
          </Text>
          {showClue && (
            <Text style={styles.clueText}>"{challenge.clue}"</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MapPin size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{challenge.location.name}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Award size={16} color={Colors.primary} />
            <Text style={styles.detailText}>{challenge.reward.points} points</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={16} color={Colors.warning} />
            <Text style={styles.detailText}>Expires in {formatExpiryTime()}</Text>
          </View>
          
          {isNearby !== undefined && (
            <View style={styles.detailItem}>
              <Compass size={16} color={isNearby ? Colors.success : Colors.textSecondary} />
              <Text style={[
                styles.detailText, 
                { color: isNearby ? Colors.success : Colors.textSecondary }
              ]}>
                {isNearby 
                  ? 'You are near this location!' 
                  : `Distance: ${formatDistance(distance)}`}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.actionsContainer}>
          {onHintPress && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={onHintPress}
            >
              <HelpCircle size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Hint</Text>
            </TouchableOpacity>
          )}
          
          {onSharePress && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={onSharePress}
            >
              <Share2 size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          )}
          
          {onCameraPress && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={onCameraPress}
            >
              <Camera size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Photo</Text>
            </TouchableOpacity>
          )}
          
          {onPress && (
            <TouchableOpacity 
              style={styles.solveButton}
              onPress={onPress}
            >
              <Text style={styles.solveButtonText}>
                {isNearby ? 'Solve Challenge' : 'View on Map'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
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
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  badges: {
    flexDirection: 'row',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: `${Colors.secondary}20`,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.secondary,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  clueContainer: {
    backgroundColor: `${Colors.primary}10`,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  clueLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 4,
  },
  clueText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.text,
    lineHeight: 20,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 4,
  },
  solveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  solveButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  compactContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  compactContent: {
    flex: 1,
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  compactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
    marginRight: 8,
  },
  compactDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  compactDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  compactDetailText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  proximityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  proximityText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});