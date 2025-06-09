import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Settings, Edit, Award, AlertTriangle, Bell, LogOut, ChevronRight, MapPin, Mail, Calendar, Shield, Phone } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useAuthStore } from '@/stores/auth-store';
import { useGamificationStore } from '@/stores/gamification-store';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { userStats, userAchievements } = useGamificationStore();
  
  // Calculate level progress
  const levelProgress = userStats ? Math.min(100, (userStats.points % 100)) : 0;
  
  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    router.replace('/login');
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Profile',
          headerLargeTitle: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/settings')}>
              <Settings size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }} 
              style={styles.profileImage}
            />
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => router.push('/profile/edit')}
            >
              <Edit size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'User Name'}</Text>
            <Text style={styles.profileBio}>{user?.bio || 'No bio provided'}</Text>
            
            <View style={styles.profileStats}>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatValue}>{userStats?.level || 0}</Text>
                <Text style={styles.profileStatLabel}>Level</Text>
              </View>
              
              <View style={styles.profileStat}>
                <Text style={styles.profileStatValue}>{userStats?.points || 0}</Text>
                <Text style={styles.profileStatLabel}>Points</Text>
              </View>
              
              <View style={styles.profileStat}>
                <Text style={styles.profileStatValue}>{userAchievements?.length || 0}</Text>
                <Text style={styles.profileStatLabel}>Badges</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Level Progress */}
        <View style={styles.levelProgressContainer}>
          <View style={styles.levelProgressHeader}>
            <Text style={styles.levelProgressTitle}>Level {userStats?.level || 0}</Text>
            <Text style={styles.levelProgressPoints}>{userStats?.points || 0} points</Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${levelProgress}%` }]} />
          </View>
          
          <Text style={styles.levelProgressText}>
            {100 - (userStats?.points % 100)} points to level {(userStats?.level || 0) + 1}
          </Text>
        </View>
        
        {/* Contact Information */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Mail size={20} color={Colors.primary} style={styles.infoIcon} />
              <Text style={styles.infoText}>{user?.email || 'No email provided'}</Text>
            </View>
            
            {user?.phone && (
              <View style={styles.infoItem}>
                <Phone size={20} color={Colors.primary} style={styles.infoIcon} />
                <Text style={styles.infoText}>{user.phone}</Text>
              </View>
            )}
            
            {user?.address && (
              <View style={styles.infoItem}>
                <MapPin size={20} color={Colors.primary} style={styles.infoIcon} />
                <Text style={styles.infoText}>{user.address}</Text>
              </View>
            )}
            
            <View style={styles.infoItem}>
              <Calendar size={20} color={Colors.primary} style={styles.infoIcon} />
              <Text style={styles.infoText}>Member since {formatDate(user?.createdAt || new Date().toISOString())}</Text>
            </View>
          </View>
        </View>
        
        {/* Activity Summary */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Activity Summary</Text>
          
          <View style={styles.activityCard}>
            <View style={styles.activityRow}>
              <View style={styles.activityItem}>
                <Text style={styles.activityValue}>{userStats?.reportsSubmitted || 0}</Text>
                <Text style={styles.activityLabel}>Reports Submitted</Text>
              </View>
              
              <View style={styles.activityItem}>
                <Text style={styles.activityValue}>{userStats?.reportsResolved || 0}</Text>
                <Text style={styles.activityLabel}>Reports Resolved</Text>
              </View>
            </View>
            
            <View style={styles.activityRow}>
              <View style={styles.activityItem}>
                <Text style={styles.activityValue}>{userStats?.commentsPosted || 0}</Text>
                <Text style={styles.activityLabel}>Comments Posted</Text>
              </View>
              
              <View style={styles.activityItem}>
                <Text style={styles.activityValue}>{userStats?.votesGiven || 0}</Text>
                <Text style={styles.activityLabel}>Votes Given</Text>
              </View>
            </View>
            
            <View style={styles.activityRow}>
              <View style={styles.activityItem}>
                <Text style={styles.activityValue}>{userStats?.consecutiveDays || 0}</Text>
                <Text style={styles.activityLabel}>Day Streak</Text>
              </View>
              
              <View style={styles.activityItem}>
                <Text style={styles.activityValue}>{userAchievements?.length || 0}</Text>
                <Text style={styles.activityLabel}>Badges Earned</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Quick Links */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          
          <View style={styles.quickLinksCard}>
            <TouchableOpacity 
              style={styles.quickLinkItem}
              onPress={() => router.push('/badges')}
            >
              <Award size={20} color={Colors.primary} style={styles.quickLinkIcon} />
              <Text style={styles.quickLinkText}>My Badges</Text>
              <ChevronRight size={16} color={Colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickLinkItem}
              onPress={() => router.push('/issues')}
            >
              <AlertTriangle size={20} color={Colors.primary} style={styles.quickLinkIcon} />
              <Text style={styles.quickLinkText}>My Reports</Text>
              <ChevronRight size={16} color={Colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickLinkItem}
              onPress={() => router.push('/notifications')}
            >
              <Bell size={20} color={Colors.primary} style={styles.quickLinkIcon} />
              <Text style={styles.quickLinkText}>Notifications</Text>
              <ChevronRight size={16} color={Colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickLinkItem}
              onPress={() => router.push('/settings/privacy')}
            >
              <Shield size={20} color={Colors.primary} style={styles.quickLinkIcon} />
              <Text style={styles.quickLinkText}>Privacy & Security</Text>
              <ChevronRight size={16} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  profileBio: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  profileStats: {
    flexDirection: 'row',
  },
  profileStat: {
    marginRight: 16,
  },
  profileStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  profileStatLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  levelProgressContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
  levelProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  levelProgressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  levelProgressPoints: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: `${Colors.primary}20`,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  levelProgressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
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
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
  },
  activityCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
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
  activityRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  activityItem: {
    flex: 1,
    alignItems: 'center',
  },
  activityValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  activityLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  quickLinksCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
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
  quickLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  quickLinkIcon: {
    marginRight: 12,
  },
  quickLinkText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.error}15`,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.error,
    marginLeft: 8,
  },
});