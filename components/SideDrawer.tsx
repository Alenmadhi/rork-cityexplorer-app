import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDrawer } from '@/context/drawer-context';
import { useAuthStore } from '@/stores/auth-store';
import Colors from '@/constants/colors';
import {
  Home,
  Calendar,
  Newspaper,
  Map,
  Heart,
  ShoppingBag,
  Store,
  Info,
  User,
  Settings,
  Trophy,
  Bell,
  LogOut,
  X,
} from 'lucide-react-native';



interface DrawerItemProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

function DrawerItem({ icon, title, onPress }: DrawerItemProps) {
  return (
    <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
      <View style={styles.drawerItemIcon}>{icon}</View>
      <Text style={styles.drawerItemText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function SideDrawer() {
  const { isDrawerOpen, closeDrawer } = useDrawer();
  const { logout } = useAuthStore();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const DRAWER_WIDTH = width * 0.8;

  const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isDrawerOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isDrawerOpen, slideAnim, overlayOpacity, DRAWER_WIDTH]);

  const navigateAndClose = (route: string) => {
    closeDrawer();
    router.push(route as any);
  };

  const handleLogout = () => {
    closeDrawer();
    logout();
  };

  if (!isDrawerOpen) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayOpacity,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.overlayTouchable}
          onPress={closeDrawer}
          activeOpacity={1}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.drawer,
          {
            width: DRAWER_WIDTH,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <SafeAreaView style={styles.drawerContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Menu</Text>
            <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
              <X size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.menuItems} showsVerticalScrollIndicator={false}>
            <DrawerItem
              icon={<Home size={20} color={Colors.primary} />}
              title="Home"
              onPress={() => navigateAndClose('/(tabs)/')}
            />
            <DrawerItem
              icon={<Calendar size={20} color={Colors.primary} />}
              title="Events"
              onPress={() => navigateAndClose('/(tabs)/events')}
            />
            <DrawerItem
              icon={<Newspaper size={20} color={Colors.primary} />}
              title="News"
              onPress={() => navigateAndClose('/(tabs)/news')}
            />
            <DrawerItem
              icon={<Info size={20} color={Colors.primary} />}
              title="Tourist Info"
              onPress={() => navigateAndClose('/(tabs)/tourist')}
            />
            <DrawerItem
              icon={<Store size={20} color={Colors.primary} />}
              title="Shops"
              onPress={() => navigateAndClose('/(tabs)/shops')}
            />
            <DrawerItem
              icon={<Map size={20} color={Colors.primary} />}
              title="Attractions"
              onPress={() => navigateAndClose('/(tabs)/attractions')}
            />
            <DrawerItem
              icon={<ShoppingBag size={20} color={Colors.primary} />}
              title="Services"
              onPress={() => navigateAndClose('/(tabs)/services')}
            />
            <DrawerItem
              icon={<Heart size={20} color={Colors.primary} />}
              title="Favorites"
              onPress={() => navigateAndClose('/(tabs)/favorites')}
            />

            <View style={styles.separator} />

            <DrawerItem
              icon={<User size={20} color={Colors.primary} />}
              title="Profile"
              onPress={() => navigateAndClose('/profile/edit')}
            />
            <DrawerItem
              icon={<Trophy size={20} color={Colors.primary} />}
              title="Badges"
              onPress={() => navigateAndClose('/badges/index')}
            />
            <DrawerItem
              icon={<Bell size={20} color={Colors.primary} />}
              title="Notifications"
              onPress={() => navigateAndClose('/notifications/index')}
            />
            <DrawerItem
              icon={<Settings size={20} color={Colors.primary} />}
              title="Settings"
              onPress={() => navigateAndClose('/settings/index')}
            />

            <View style={styles.separator} />

            <DrawerItem
              icon={<LogOut size={20} color={Colors.error} />}
              title="Logout"
              onPress={handleLogout}
            />
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  overlayTouchable: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: Colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  menuItems: {
    flex: 1,
    paddingTop: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  drawerItemIcon: {
    marginRight: 16,
    width: 24,
    alignItems: 'center',
  },
  drawerItemText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 8,
    marginHorizontal: 20,
  },
});