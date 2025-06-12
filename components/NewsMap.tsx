import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Layers, ZoomIn, ZoomOut, Info } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { NewsItem, NewsCategory } from '@/types';

interface NewsMapProps {
  news: NewsItem[];
  onSelectNews?: (news: NewsItem) => void;
}

export default function NewsMap({ news, onSelectNews }: NewsMapProps) {
  const router = useRouter();
  const mapRef = useRef(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // Default region (Elbasan city center)
  const defaultRegion = {
    latitude: 41.1116,
    longitude: 20.0822,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };
  
  // Get marker color based on news category
  const getMarkerColor = (category: NewsCategory): string => {
    switch (category) {
      case 'local':
        return Colors.categoryLocal;
      case 'business':
        return Colors.categoryBusiness;
      case 'culture':
        return Colors.categoryCulture;
      case 'sports':
        return Colors.categorySports;
      case 'politics':
        return Colors.categoryPolitics;
      default:
        return Colors.categoryOther;
    }
  };
  
  // Handle marker press
  const handleMarkerPress = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    if (onSelectNews) {
      onSelectNews(newsItem);
    }
  };
  
  // Handle callout press
  const handleCalloutPress = (newsItem: NewsItem) => {
    router.push(`/news/${newsItem.id}`);
  };
  
  // Zoom in
  const handleZoomIn = () => {
    if (mapRef.current && Platform.OS !== 'web') {
      // @ts-ignore - getCamera is available on native platforms
      mapRef.current.getCamera().then((camera: any) => {
        if (camera && camera.zoom !== undefined) {
          camera.zoom += 1;
          // @ts-ignore - animateCamera is available on native platforms
          mapRef.current?.animateCamera(camera, { duration: 300 });
        }
      });
    }
  };
  
  // Zoom out
  const handleZoomOut = () => {
    if (mapRef.current && Platform.OS !== 'web') {
      // @ts-ignore - getCamera is available on native platforms
      mapRef.current.getCamera().then((camera: any) => {
        if (camera && camera.zoom !== undefined) {
          camera.zoom -= 1;
          // @ts-ignore - animateCamera is available on native platforms
          mapRef.current?.animateCamera(camera, { duration: 300 });
        }
      });
    }
  };
  
  // Reset map to default view
  const handleResetMap = () => {
    if (mapRef.current && Platform.OS !== 'web') {
      // @ts-ignore - animateToRegion is available on native platforms
      mapRef.current?.animateToRegion(defaultRegion, 500);
    }
  };
  
  // Filter news items with valid coordinates
  const newsWithCoordinates = news.filter(item => item.coordinates);
  
  // Render map or fallback for web
  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <View style={styles.webFallback}>
          <Info size={24} color={Colors.textSecondary} />
          <Text style={styles.webFallbackText}>
            Interactive map view is only available on mobile devices.
          </Text>
          <Text style={styles.webFallbackSubtext}>
            Please use the list view to browse news articles.
          </Text>
        </View>
      ) : (
        <MapComponentWrapper 
          mapRef={mapRef}
          newsItems={newsWithCoordinates}
          defaultRegion={defaultRegion}
          getMarkerColor={getMarkerColor}
          handleMarkerPress={handleMarkerPress}
          handleCalloutPress={handleCalloutPress}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          handleResetMap={handleResetMap}
        />
      )}
    </View>
  );
}

// Props interface for the map component wrapper
interface MapComponentWrapperProps {
  mapRef: React.RefObject<any>;
  newsItems: NewsItem[];
  defaultRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  getMarkerColor: (category: NewsCategory) => string;
  handleMarkerPress: (newsItem: NewsItem) => void;
  handleCalloutPress: (newsItem: NewsItem) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleResetMap: () => void;
}

// Conditionally import and render MapView component
const MapComponentWrapper = (props: MapComponentWrapperProps) => {
  if (Platform.OS === 'web') {
    return null;
  }
  
  // Use state to store map components
  const [MapViewComponent, setMapViewComponent] = useState<any>(null);
  const [MarkerComponent, setMarkerComponent] = useState<any>(null);
  const [CalloutComponent, setCalloutComponent] = useState<any>(null);
  const [ProviderValue, setProviderValue] = useState<any>(null);
  
  useEffect(() => {
    // Import map components only on native platforms
    if (Platform.OS !== 'web') {
      import('react-native-maps').then((module) => {
        setMapViewComponent(module.default);
        setMarkerComponent(module.Marker);
        setCalloutComponent(module.Callout);
        setProviderValue(module.PROVIDER_GOOGLE);
      }).catch(err => console.error('Error loading maps:', err));
    }
  }, []);
  
  if (!MapViewComponent || !MarkerComponent || !CalloutComponent) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }
  
  const { 
    mapRef,
    newsItems, 
    defaultRegion, 
    getMarkerColor, 
    handleMarkerPress, 
    handleCalloutPress,
    handleZoomIn,
    handleZoomOut,
    handleResetMap
  } = props;
  
  return (
    <>
      <MapViewComponent
        ref={mapRef}
        style={styles.map}
        initialRegion={defaultRegion}
        provider={ProviderValue}
        showsUserLocation
        showsCompass
        showsScale
        showsBuildings
        showsTraffic={false}
        showsIndoors={false}
        showsPointsOfInterest
        toolbarEnabled={false}
      >
        {newsItems.map((item: NewsItem) => (
          <MarkerComponent
            key={item.id}
            coordinate={item.coordinates!}
            title={item.title}
            description={item.locationName || ''}
            pinColor={getMarkerColor(item.category)}
            onPress={() => handleMarkerPress(item)}
          >
            <CalloutComponent tooltip onPress={() => handleCalloutPress(item)}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.calloutCategory}>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </Text>
                <Text style={styles.calloutLocation}>
                  {item.locationName || 'Elbasan'}
                </Text>
                <Text style={styles.calloutAction}>Tap to read more</Text>
              </View>
            </CalloutComponent>
          </MarkerComponent>
        ))}
      </MapViewComponent>
      
      {/* Map controls */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.mapButton} onPress={handleZoomIn}>
          <ZoomIn size={20} color={Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapButton} onPress={handleZoomOut}>
          <ZoomOut size={20} color={Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapButton} onPress={handleResetMap}>
          <Layers size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>
      
      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>News Categories</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <MapPin size={16} color={Colors.categoryLocal} />
            <Text style={styles.legendText}>Local</Text>
          </View>
          <View style={styles.legendItem}>
            <MapPin size={16} color={Colors.categoryBusiness} />
            <Text style={styles.legendText}>Business</Text>
          </View>
          <View style={styles.legendItem}>
            <MapPin size={16} color={Colors.categoryCulture} />
            <Text style={styles.legendText}>Culture</Text>
          </View>
          <View style={styles.legendItem}>
            <MapPin size={16} color={Colors.categorySports} />
            <Text style={styles.legendText}>Sports</Text>
          </View>
          <View style={styles.legendItem}>
            <MapPin size={16} color={Colors.categoryPolitics} />
            <Text style={styles.legendText}>Politics</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  callout: {
    width: 200,
    padding: 12,
    backgroundColor: Colors.card,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  calloutCategory: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  calloutLocation: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  calloutAction: {
    fontSize: 12,
    color: Colors.primary,
    fontStyle: 'italic',
  },
  mapControls: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'transparent',
  },
  mapButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.card,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
    }),
  },
  legend: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 12,
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
    }),
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  legendText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  webFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webFallbackText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  webFallbackSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});