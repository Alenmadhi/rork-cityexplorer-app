import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { Wifi, WifiOff, Upload, Trash2 } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Colors from '@/constants/colors';
import { Issue } from '@/types';

export default function OfflineReportsScreen() {
  const [offlineReports, setOfflineReports] = useState<Issue[]>([]);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    loadOfflineReports();
    
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  const loadOfflineReports = async () => {
    try {
      const reportsJson = await AsyncStorage.getItem('offline-reports');
      if (reportsJson) {
        const reports = JSON.parse(reportsJson);
        setOfflineReports(reports);
      }
    } catch (error) {
      console.error('Failed to load offline reports:', error);
    }
  };
  
  const uploadReport = async (report: Issue) => {
    if (!isConnected) {
      Alert.alert('No Connection', 'Please connect to the internet to upload reports.');
      return;
    }
    
    setUploading(report.id);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Remove from offline storage
      const updatedReports = offlineReports.filter(r => r.id !== report.id);
      await AsyncStorage.setItem('offline-reports', JSON.stringify(updatedReports));
      setOfflineReports(updatedReports);
      
      Alert.alert('Success', 'Report uploaded successfully!');
    } catch (error) {
      Alert.alert('Upload Failed', 'Could not upload the report. Please try again later.');
    } finally {
      setUploading(null);
    }
  };
  
  const deleteReport = async (report: Issue) => {
    Alert.alert(
      'Delete Report',
      'Are you sure you want to delete this offline report?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedReports = offlineReports.filter(r => r.id !== report.id);
              await AsyncStorage.setItem('offline-reports', JSON.stringify(updatedReports));
              setOfflineReports(updatedReports);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete the report.');
            }
          }
        }
      ]
    );
  };
  
  const uploadAllReports = async () => {
    if (!isConnected) {
      Alert.alert('No Connection', 'Please connect to the internet to upload reports.');
      return;
    }
    
    if (offlineReports.length === 0) {
      Alert.alert('No Reports', 'There are no offline reports to upload.');
      return;
    }
    
    Alert.alert(
      'Upload All Reports',
      'Are you sure you want to upload all offline reports?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Upload All',
          onPress: async () => {
            try {
              // Simulate API call
              await new Promise(resolve => setTimeout(resolve, 2000));
              
              // Clear offline storage
              await AsyncStorage.removeItem('offline-reports');
              setOfflineReports([]);
              
              Alert.alert('Success', 'All reports uploaded successfully!');
            } catch (error) {
              Alert.alert('Upload Failed', 'Could not upload all reports. Please try again later.');
            }
          }
        }
      ]
    );
  };
  
  const renderItem = ({ item }: { item: Issue }) => (
    <View style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <Text style={styles.reportTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, styles.pendingBadge]}>
          <Text style={styles.badgeText}>Offline</Text>
        </View>
      </View>
      
      <Text style={styles.reportDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.reportMeta}>
        <Text style={styles.reportLocation}>{item.location}</Text>
        <Text style={styles.reportDate}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.uploadButton]}
          onPress={() => uploadReport(item)}
          disabled={uploading === item.id}
        >
          <Upload size={16} color="#fff" />
          <Text style={styles.actionButtonText}>
            {uploading === item.id ? 'Uploading...' : 'Upload'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => deleteReport(item)}
          disabled={uploading === item.id}
        >
          <Trash2 size={16} color="#fff" />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Offline Reports',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        <View style={styles.connectionStatus}>
          {isConnected ? (
            <View style={styles.statusContainer}>
              <Wifi size={18} color={Colors.success} />
              <Text style={[styles.statusText, styles.connectedText]}>Connected</Text>
            </View>
          ) : (
            <View style={styles.statusContainer}>
              <WifiOff size={18} color={Colors.error} />
              <Text style={[styles.statusText, styles.disconnectedText]}>Offline</Text>
            </View>
          )}
        </View>
        
        {offlineReports.length > 0 ? (
          <>
            <TouchableOpacity 
              style={styles.uploadAllButton}
              onPress={uploadAllReports}
              disabled={!isConnected}
            >
              <Upload size={18} color="#fff" />
              <Text style={styles.uploadAllText}>Upload All Reports</Text>
            </TouchableOpacity>
            
            <FlatList
              data={offlineReports}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
            />
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <WifiOff size={60} color={Colors.textSecondary} />
            <Text style={styles.emptyTitle}>No Offline Reports</Text>
            <Text style={styles.emptyMessage}>
              Reports created while offline will appear here for later upload
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  connectionStatus: {
    padding: 12,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  connectedText: {
    color: Colors.success,
  },
  disconnectedText: {
    color: Colors.error,
  },
  uploadAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  uploadAllText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listContent: {
    padding: 16,
  },
  reportCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  pendingBadge: {
    backgroundColor: `${Colors.warning}30`,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.warning,
  },
  reportDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  reportMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  reportLocation: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  reportDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  uploadButton: {
    backgroundColor: Colors.primary,
  },
  deleteButton: {
    backgroundColor: Colors.error,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 6,
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