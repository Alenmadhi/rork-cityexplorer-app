import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Platform, KeyboardAvoidingView, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Camera, MapPin, AlertTriangle, Upload, X, Award } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useAuthStore } from '@/stores/auth-store';
import { useGamificationStore } from '@/stores/gamification-store';
import { NewBadgeModal } from '@/components/NewBadgeModal';
import { IssueType } from '@/types';

const ISSUE_TYPES: IssueType[] = [
  'Road Damage',
  'Trash',
  'Graffiti',
  'Broken Light',
  'Water Issue',
  'Other'
];

// Map neighborhoods to their general areas for gamification
const NEIGHBORHOODS = [
  'City Center',
  'Castle District',
  'Eastern District',
  'Western District',
  'Northern District',
  'Southern District',
  'Industrial Zone',
  'Riverside Area'
];

export default function ReportIssueScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { incrementReports, addNeighborhood, getLatestEarnedBadge } = useGamificationStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [issueType, setIssueType] = useState<IssueType | ''>('');
  const [image, setImage] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // For badge earning
  const [newBadge, setNewBadge] = useState<any>(null);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  
  // Determine neighborhood based on location
  useEffect(() => {
    if (location) {
      // Simple algorithm to assign a neighborhood based on location text
      // In a real app, this would use geolocation and mapping data
      for (const hood of NEIGHBORHOODS) {
        if (location.includes(hood)) {
          setNeighborhood(hood);
          return;
        }
      }
      // Default if no match
      setNeighborhood('City Center');
    }
  }, [location]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photo library to upload images.');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your camera to take photos.');
      return;
    }
    
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getCurrentLocation = () => {
    // In a real app, this would use expo-location to get the current location
    // For now, we'll just set a placeholder
    setLocation('Current Location (Elbasan City Center)');
  };

  const handleSubmit = async () => {
    if (!title || !description || !location || !issueType) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    
    if (!user && !isAnonymous) {
      Alert.alert(
        'Sign In Required',
        'You need to sign in to report an issue, or you can submit anonymously.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Submit Anonymously', onPress: () => setIsAnonymous(true) },
          { text: 'Sign In', onPress: () => router.push('/login') }
        ]
      );
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would send the data to a backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // If user is logged in and not anonymous, update gamification
      if (user && !isAnonymous) {
        // Increment reports count
        incrementReports();
        
        // Add neighborhood for neighborhood badge
        if (neighborhood) {
          addNeighborhood(neighborhood);
        }
        
        // Check if any badges were earned
        const earnedBadge = getLatestEarnedBadge();
        if (earnedBadge) {
          setNewBadge(earnedBadge);
          setShowBadgeModal(true);
        }
      }
      
      Alert.alert(
        'Issue Reported',
        'Thank you for reporting this issue. The city authorities have been notified.',
        [{ text: 'OK', onPress: () => resetForm() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit your report. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setIssueType('');
    setImage(null);
    setIsAnonymous(false);
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Report an Issue',
          headerLargeTitle: true,
        }} 
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <View style={styles.infoBox}>
            <AlertTriangle size={20} color={Colors.primary} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Report issues like potholes, broken streetlights, or trash to help improve Elbasan.
            </Text>
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.label}>Issue Type *</Text>
            <View style={styles.issueTypesContainer}>
              {ISSUE_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.issueTypeButton,
                    issueType === type && styles.selectedIssueType
                  ]}
                  onPress={() => setIssueType(type)}
                >
                  <Text 
                    style={[
                      styles.issueTypeText,
                      issueType === type && styles.selectedIssueTypeText
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Brief title of the issue"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={Colors.textSecondary}
            />
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Describe the issue in detail"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              placeholderTextColor={Colors.textSecondary}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.label}>Location *</Text>
            <View style={styles.locationContainer}>
              <TextInput
                style={styles.locationInput}
                placeholder="Enter location"
                value={location}
                onChangeText={setLocation}
                placeholderTextColor={Colors.textSecondary}
              />
              <TouchableOpacity 
                style={styles.locationButton}
                onPress={getCurrentLocation}
              >
                <MapPin size={20} color={Colors.background} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.label}>Photo</Text>
            {image ? (
              <View style={styles.imagePreviewContainer}>
                <Image
                  source={{ uri: image }}
                  style={styles.imagePreview}
                  contentFit="cover"
                />
                <TouchableOpacity 
                  style={styles.removeImageButton}
                  onPress={() => setImage(null)}
                >
                  <X size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.photoButtonsContainer}>
                <TouchableOpacity 
                  style={styles.photoButton}
                  onPress={takePhoto}
                >
                  <Camera size={20} color={Colors.primary} style={styles.photoButtonIcon} />
                  <Text style={styles.photoButtonText}>Take Photo</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.photoButton}
                  onPress={pickImage}
                >
                  <Upload size={20} color={Colors.primary} style={styles.photoButtonIcon} />
                  <Text style={styles.photoButtonText}>Upload Photo</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          <View style={styles.formSection}>
            <View style={styles.anonymousContainer}>
              <View>
                <Text style={styles.anonymousLabel}>Submit Anonymously</Text>
                <Text style={styles.anonymousDescription}>
                  Your identity will not be associated with this report
                </Text>
              </View>
              <Switch
                value={isAnonymous}
                onValueChange={setIsAnonymous}
                trackColor={{ false: Colors.border, true: `${Colors.primary}80` }}
                thumbColor={isAnonymous ? Colors.primary : '#f4f3f4'}
              />
            </View>
          </View>
          
          {!isAnonymous && !user && (
            <View style={styles.warningContainer}>
              <AlertTriangle size={16} color={Colors.warning} style={styles.warningIcon} />
              <Text style={styles.warningText}>
                Sign in to earn badges and track your contributions!
              </Text>
            </View>
          )}
          
          {!isAnonymous && user && (
            <View style={styles.badgeInfoContainer}>
              <Award size={16} color={Colors.primary} style={styles.badgeIcon} />
              <Text style={styles.badgeInfoText}>
                Submit reports to earn badges and recognition!
              </Text>
            </View>
          )}
          
          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Submitting...' : 'Submit Report'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      
      {newBadge && (
        <NewBadgeModal
          badge={newBadge}
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
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: `${Colors.primary}15`,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
  },
  textArea: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
    height: 120,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationInput: {
    flex: 1,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
  },
  locationButton: {
    backgroundColor: Colors.primary,
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  issueTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  issueTypeButton: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },
  selectedIssueType: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  issueTypeText: {
    fontSize: 14,
    color: Colors.text,
  },
  selectedIssueTypeText: {
    color: Colors.background,
  },
  photoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
  },
  photoButtonIcon: {
    marginRight: 8,
  },
  photoButtonText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  imagePreviewContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    height: 200,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  anonymousContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  anonymousLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  anonymousDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    maxWidth: '80%',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.warning}15`,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  warningIcon: {
    marginRight: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  badgeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}15`,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  badgeIcon: {
    marginRight: 8,
  },
  badgeInfoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});