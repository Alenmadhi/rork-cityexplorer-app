import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Alert, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LogOut, User, Settings, Bell, HelpCircle, Shield, MapPin, Award } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useAuthStore } from '@/stores/auth-store';
import { useGamificationStore } from '@/stores/gamification-store';
import { BadgeCard } from '@/components/BadgeCard';
import { NewBadgeModal } from '@/components/NewBadgeModal';
import { Badge } from '@/types';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { badges, reportCount, neighborhoods, userStats } = useGamificationStore();
  
  // Get earned badges
  const earnedBadges = badges ? badges.filter(badge => badge.unlocked) : [];
  
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/login');
          },
        },
      ]
    );
  };
  
  const handleBadgePress = (badge: Badge) => {
    // Convert the gamification store badge to the type Badge
    const badgeData: Badge = {
      id: badge.id,
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      criteria: badge.criteria,
      image: badge.image
    };
    
    setSelectedBadge(badgeData);
    setShowBadgeModal(true);
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Profile',
          headerLargeTitle: true,
        }} 
      />
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <User size={40} color={Colors.background} />
              </View>
            )}
          </View>
          <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'Not signed in'}</Text>
          
          {user ? (
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.signInButton}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {user && (
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats?.reportsSubmitted || 0}</Text>
              <Text style={styles.statLabel}>Reports</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats?.reportsResolved || 0}</Text>
              <Text style={styles.statLabel}>Resolved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats?.totalUpvotesReceived || 0}</Text>
              <Text style={styles.statLabel}>Upvotes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{earnedBadges.length}</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
        )}
        
        {user && (
          <View style={styles.badgesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Badges</Text>
              <TouchableOpacity onPress={() => router.push('/badges')}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {earnedBadges.length > 0 ? (
              <View style={styles.badgesContainer}>
                {earnedBadges.slice(0, 3).map(badge => (
                  <BadgeCard 
                    key={badge.id} 
                    badge={{
                      id: badge.id,
                      name: badge.name,
                      description: badge.description,
                      icon: badge.icon,
                      criteria: badge.criteria,
                      image: badge.image
                    }}
                    earned={true}
                    earnedDate={badge.unlockedAt}
                    onPress={() => handleBadgePress(badge)}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.noBadgesContainer}>
                <Award size={40} color={Colors.textSecondary} />
                <Text style={styles.noBadgesText}>No badges earned yet</Text>
                <Text style={styles.noBadgesSubtext}>Report issues to earn badges!</Text>
              </View>
            )}
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <User size={20} color={Colors.primary} />
            </View>
            <Text style={styles.menuText}>Personal Information</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Bell size={20} color={Colors.primary} />
            </View>
            <Text style={styles.menuText}>Notifications</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/issues')}
          >
            <View style={styles.menuIconContainer}>
              <MapPin size={20} color={Colors.primary} />
            </View>
            <Text style={styles.menuText}>My Reported Issues</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Settings size={20} color={Colors.primary} />
            </View>
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <HelpCircle size={20} color={Colors.primary} />
            </View>
            <Text style={styles.menuText}>Help Center</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Shield size={20} color={Colors.primary} />
            </View>
            <Text style={styles.menuText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        
        {user ? (
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <LogOut size={20} color={Colors.error} style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push('/login')}
          >
            <User size={20} color={Colors.primary} style={styles.loginIcon} />
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        )}
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
      
      {selectedBadge && (
        <NewBadgeModal
          badge={selectedBadge}
          visible={showBadgeModal}
          onClose={() => setShowBadgeModal(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  editProfileButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  editProfileText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  signInButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  signInText: {
    color: Colors.background,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  badgesSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
  },
  badgesContainer: {
    marginBottom: 16,
  },
  noBadgesContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
  noBadgesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  noBadgesSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: Colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    color: Colors.error,
    fontWeight: '500',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.primary,
  },
  loginIcon: {
    marginRight: 8,
    color: '#fff',
  },
  loginText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 40,
  },
});