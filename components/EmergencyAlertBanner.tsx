import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Linking } from 'react-native';
import { AlertTriangle, X, ExternalLink } from 'lucide-react-native';
import { useAlertsStore } from '@/stores/alerts-store';
import { EmergencyAlert } from '@/types';
import Colors from '@/constants/colors';

interface EmergencyAlertBannerProps {
  alert: EmergencyAlert;
}

export const EmergencyAlertBanner: React.FC<EmergencyAlertBannerProps> = ({ alert }) => {
  const { dismissAlert } = useAlertsStore();
  const [animation] = React.useState(new Animated.Value(0));
  
  React.useEffect(() => {
    // Animate in
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  
  const handleDismiss = () => {
    // Animate out
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      dismissAlert(alert.id);
    });
  };
  
  const handleLinkPress = () => {
    if (alert.link) {
      Linking.openURL(alert.link);
    }
  };
  
  const getBannerColor = () => {
    switch (alert.type) {
      case 'danger':
        return Colors.error;
      case 'warning':
        return Colors.warning;
      case 'info':
      default:
        return Colors.info;
    }
  };
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        { backgroundColor: getBannerColor() },
        { opacity: animation, transform: [{ translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0]
        })}] }
      ]}
    >
      <View style={styles.iconContainer}>
        <AlertTriangle size={20} color="#fff" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{alert.title}</Text>
        <Text style={styles.message}>{alert.message}</Text>
        
        {alert.link && (
          <TouchableOpacity style={styles.linkButton} onPress={handleLinkPress}>
            <Text style={styles.linkText}>More Info</Text>
            <ExternalLink size={14} color="#fff" style={styles.linkIcon} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.dismissButton} onPress={handleDismiss}>
        <X size={18} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  message: {
    color: '#fff',
    fontSize: 13,
    opacity: 0.9,
  },
  dismissButton: {
    padding: 4,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  linkText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    textDecorationLine: 'underline',
    marginRight: 4,
  },
  linkIcon: {
    marginTop: 1,
  },
});