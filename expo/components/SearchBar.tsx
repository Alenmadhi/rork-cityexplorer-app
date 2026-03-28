import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Search, X } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onClear?: () => void;
  onSubmit?: () => void;
}

export function SearchBar({ 
  value = '', 
  placeholder = 'Search...', 
  onChangeText = () => {}, 
  onClear = () => {}, 
  onSubmit = () => {} 
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => {
            onChangeText('');
            onClear();
          }}>
            <X size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: Platform.OS === 'ios' ? 0 : 8,
  },
});