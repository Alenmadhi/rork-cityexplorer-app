import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { Camera, X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useAuthStore } from '@/stores/auth-store';

export default function QRScannerScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    setScanned(true);
    setScanResult(data);
    
    // Process the QR code data
    try {
      // Try to parse as JSON
      const jsonData = JSON.parse(data);
      
      // Handle different types of QR codes
      if (jsonData.type === 'issue') {
        // Navigate to issue details
        router.push(`/issues/${jsonData.id}`);
      } else if (jsonData.type === 'location') {
        // Navigate to map with specific location
        router.push({
          pathname: '/issues/map',
          params: { lat: jsonData.lat, lng: jsonData.lng }
        });
      } else if (jsonData.type === 'event') {
        // Navigate to event details
        router.push(`/events/${jsonData.id}`);
      } else {
        // Unknown QR code type
        console.log('Unknown QR code type:', jsonData);
      }
    } catch (error) {
      // Not a JSON QR code, might be a URL or plain text
      if (data.startsWith('http')) {
        // It's a URL, open it
        router.push(data);
      } else {
        // Just plain text
        console.log('QR code contains plain text:', data);
      }
    }
  };

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'QR Scanner' }} />
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'QR Scanner' }} />
        <Text style={styles.permissionText}>We need your permission to use the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'QR Scanner',
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color={Colors.text} />
            </TouchableOpacity>
          )
        }} 
      />
      
      {Platform.OS !== 'web' ? (
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.scanArea} />
          </View>
          
          {scanned && (
            <View style={styles.scanResultContainer}>
              <Text style={styles.scanResultText}>
                {scanResult}
              </Text>
              <TouchableOpacity 
                style={styles.scanAgainButton}
                onPress={() => setScanned(false)}
              >
                <Text style={styles.scanAgainButtonText}>Scan Again</Text>
              </TouchableOpacity>
            </View>
          )}
        </CameraView>
      ) : (
        // Web fallback
        <View style={styles.webFallback}>
          <Camera size={64} color={Colors.primary} />
          <Text style={styles.webFallbackText}>
            QR scanning is only available in the mobile app
          </Text>
          <TouchableOpacity 
            style={styles.webFallbackButton}
            onPress={() => router.back()}
          >
            <Text style={styles.webFallbackButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Scan QR codes to quickly access issue details, locations, or events
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
    borderRadius: 12,
  },
  scanResultContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    alignItems: 'center',
  },
  scanResultText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  scanAgainButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  scanAgainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerText: {
    color: Colors.textSecondary,
    textAlign: 'center',
    fontSize: 14,
  },
  permissionText: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  permissionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  webFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webFallbackText: {
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  webFallbackButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  webFallbackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});