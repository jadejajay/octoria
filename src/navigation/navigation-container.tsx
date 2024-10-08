import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useThemeConfig } from './use-theme-config';

export const NavigationContainer = ({
  children,
  linking,
}: {
  children: React.ReactNode;
  linking: any;
}) => {
  console.log('navigation container loaded', Date.now());
  const theme = useThemeConfig();
  return (
    <SafeAreaProvider>
      <RNNavigationContainer linking={linking} theme={theme}>
        {children}
      </RNNavigationContainer>
    </SafeAreaProvider>
  );
};
