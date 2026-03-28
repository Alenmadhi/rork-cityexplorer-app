import { useState, useCallback, useMemo } from 'react';
import createContextHook from '@nkzw/create-context-hook';

export const [DrawerProvider, useDrawer] = createContextHook(() => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen(prev => !prev), []);

  return useMemo(() => ({
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  }), [isDrawerOpen, openDrawer, closeDrawer, toggleDrawer]);
});