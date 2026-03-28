import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Menu } from 'lucide-react-native';
import { useDrawer } from '@/context/drawer-context';
import Colors from '@/constants/colors';

export function HamburgerButton() {
  const { toggleDrawer } = useDrawer();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={toggleDrawer}
      testID="hamburger-menu-button"
    >
      <Menu size={24} color={Colors.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginLeft: 8,
  },
});