import { useColorScheme } from 'nativewind/dist/use-color-scheme';
import * as React from 'react';
import type { ViewProps } from 'react-native';
import { StyleSheet } from 'react-native';

import { View } from '../core';

interface Props extends ViewProps {
  children: any;
  style?: any;
  className?: string;
}
export const Shadow = (Props: Props) => {
  const { colorScheme } = useColorScheme();
  return (
    <View
      style={[
        colorScheme === 'dark' ? styles.container : styles.container2,
        Props.style,
      ]}
      className={Props.className}
    >
      {Props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container2: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
