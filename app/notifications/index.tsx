import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { Bell, CheckCircle, AlertTriangle, MessageCircle, Award, Calendar, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/colors';

// Types
interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'issue_update' | 'comment' | 'badge' | 'challenge' | 'system';
  relatedId?: string;
}

type FilterType = 'all' | 'unread' | 'issue_update' | 'comment' | 'badge' | 'challenge' | 'system';

// Mock data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Issue Status Updated',
    message: 'Your reported issue "Pothole on Qemal Stafa Street" has been marked as In Progress.',
    date: '2025-06-09T10:30:00Z',
    read: false,
    type: 'issue_update',
    relatedId: '1'
  },
  {
    id: '2',
    title: 'New Comment',
    message: 'Arben Maloku commented on your issue report: "I noticed this too, it\'s getting worse."',
    date: '2025-06-08T15:45:00Z',
    read: false,
    type: 'comment',
    relatedId: '1'
  },
  {
    id: '3',
    title: 'Badge Earned',
    message: 'Congratulations! You\'ve earned the "Problem Solver" badge for having 3 of your reported issues resolved.',
    date: '2025-06-07T09:15:00Z',
    read: true,
    type: 'badge',
    relatedId: '3'
  },
  {
    id: '4',
    title: 'Challenge Completed',
    message: 'You\'ve successfully completed the "Graffiti Cleanup" challenge! Claim your rewards now.',
    date: '2025-06-05T14:20:00Z',
    read: true,
    type: 'challenge',
    relatedId: '4'
  },
  {
    id: '5',
    title: 'Issue Resolved',
    message: 'Great news! Your reported issue "Broken Street Light" has been resolved.',
    date: '2025-06-04T11:10:00Z',
    read: true,
    type: 'issue_update',
    relatedId: '2'
  },
  {
    id: '6',
    title: 'New Challenge Available',
    message: 'A new challenge "Street Light Patrol" is now available. Join now to earn rewards!',
    date: '2025-06-03T16:30:00Z',
    read: true,
    type: 'challenge',
    relatedId: '2'
  },
  {
    id: '7',
    title: 'System Maintenance',
    message: 'The app will be undergoing maintenance on June 15th from 2:00 AM to 4:00 AM.',
    date: '2025-06-02T08:45:00Z',
    read: true,
    type: 'system'
  },
  {
    id: '8',
    title: 'New Comment',
    message: 'Elira Hoxha commented on your issue report: "The municipality should fix this soon."',
    date: '2025-06-01T13:25:00Z',
    read: true,
    type: 'comment',
    relatedId: '1'
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<FilterType>('all');
  
  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });
  
  // Format date
  const formatDate = (dateString: string) => {
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
  };
  
  // Get icon for notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'issue_update':
        return <CheckCircle size={24} color={Colors.success} />;
      case 'comment':
        return <MessageCircle size={24} color={Colors.info} />;
      case 'badge':
        return <Award size={24} color={Colors.primary} />;
      case 'challenge':
        return <Trophy size={24} color={Colors.warning} />;
      case 'system':
        return <Bell size={24} color={Colors.textSecondary} />;
      default:
        return <Bell size={24} color={Colors.textSecondary} />;
    }
  };
  
  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };
  
  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  // Render notification item
  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationIcon}>
        {getNotificationIcon(item.type)}
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationDate}>{formatDate(item.date)}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteNotification(item.id)}
      >
        <Trash2 size={18} color={Colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Notifications',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        {/* Header with actions */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {unreadCount > 0 
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` 
              : 'No unread notifications'}
          </Text>
          
          <View style={styles.headerActions}>
            {unreadCount > 0 && (
              <TouchableOpacity 
                style={styles.headerAction}
                onPress={markAllAsRead}
              >
                <Text style={styles.headerActionText}>Mark all as read</Text>
              </TouchableOpacity>
            )}
            
            {notifications.length > 0 && (
              <TouchableOpacity 
                style={styles.headerAction}
                onPress={clearAllNotifications}
              >
                <Text style={[styles.headerActionText, { color: Colors.error }]}>Clear all</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {/* Filters */}
        <ScrollableFilterTabs 
          currentFilter={filter} 
          onFilterChange={setFilter} 
        />
        
        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <FlatList
            data={filteredNotifications}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.notificationsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Bell size={48} color={Colors.textSecondary} />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyMessage}>
              {filter === 'all' 
                ? "You don't have any notifications yet." 
                : `You don't have any ${filter === 'unread' ? 'unread' : filter.replace('_', ' ')} notifications.`}
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

// Scrollable filter tabs component
const ScrollableFilterTabs = ({ 
  currentFilter, 
  onFilterChange 
}: { 
  currentFilter: FilterType, 
  onFilterChange: (filter: FilterType) => void 
}) => {
  const filters: { value: FilterType, label: string, icon: React.ReactNode }[] = [
    { value: 'all', label: 'All', icon: <Bell size={16} color={currentFilter === 'all' ? Colors.primary : Colors.textSecondary} /> },
    { value: 'unread', label: 'Unread', icon: <AlertTriangle size={16} color={currentFilter === 'unread' ? Colors.primary : Colors.textSecondary} /> },
    { value: 'issue_update', label: 'Issues', icon: <CheckCircle size={16} color={currentFilter === 'issue_update' ? Colors.primary : Colors.textSecondary} /> },
    { value: 'comment', label: 'Comments', icon: <MessageCircle size={16} color={currentFilter === 'comment' ? Colors.primary : Colors.textSecondary} /> },
    { value: 'badge', label: 'Badges', icon: <Award size={16} color={currentFilter === 'badge' ? Colors.primary : Colors.textSecondary} /> },
    { value: 'challenge', label: 'Challenges', icon: <Trophy size={16} color={currentFilter === 'challenge' ? Colors.primary : Colors.textSecondary} /> },
    { value: 'system', label: 'System', icon: <Bell size={16} color={currentFilter === 'system' ? Colors.primary : Colors.textSecondary} /> },
  ];
  
  return (
    <View style={styles.filtersContainer}>
      <FlatList
        data={filters}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterTab,
              currentFilter === item.value && styles.activeFilterTab
            ]}
            onPress={() => onFilterChange(item.value)}
          >
            {item.icon}
            <Text 
              style={[
                styles.filterTabText,
                currentFilter === item.value && styles.activeFilterTabText
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.value}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerAction: {
    marginLeft: 16,
  },
  headerActionText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  filtersContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filtersList: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 4,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeFilterTab: {
    backgroundColor: `${Colors.primary}15`,
    borderColor: Colors.primary,
  },
  filterTabText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  activeFilterTabText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  notificationsList: {
    padding: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  unreadNotification: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  notificationIcon: {
    marginRight: 12,
    alignSelf: 'flex-start',
    padding: 4,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  deleteButton: {
    padding: 4,
    alignSelf: 'flex-start',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});