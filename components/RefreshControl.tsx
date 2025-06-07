import React from 'react';
import { RefreshControl as RNRefreshControl, RefreshControlProps } from 'react-native';
import Colors from '@/constants/colors';

interface CustomRefreshControlProps extends Omit<RefreshControlProps, 'colors' | 'tintColor' | 'titleColor'> {
  refreshing: boolean;
  onRefresh: () => void;
}

export const RefreshControl: React.FC<CustomRefreshControlProps> = ({ 
  refreshing, 
  onRefresh,
  ...rest
}) => {
  return (
    <RNRefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[Colors.primary]}
      tintColor={Colors.primary}
      titleColor={Colors.textSecondary}
      title="Pull to refresh"
      {...rest}
    />
  );
};