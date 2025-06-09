import React from 'react';
import { Tabs } from 'expo-router';
import { Home, AlertTriangle, Award, Map, User, Trophy, BookOpen } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="issues"
        options={{
          title: 'Issues',
          tabBarIcon: ({ color }) => <AlertTriangle size={24} color={color} />,
          href: '/issues',
        }}
      />
      
      <Tabs.Screen
        name="report-issue"
        options={{
          title: 'Report',
          tabBarIcon: ({ color }) => <Map size={24} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Challenges',
          tabBarIcon: ({ color }) => <Trophy size={24} color={color} />,
          href: '/challenges',
        }}
      />
      
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color }) => <Award size={24} color={color} />,
          href: '/leaderboard',
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}