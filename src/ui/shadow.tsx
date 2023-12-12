import * as React from 'react';
import type { ViewProps } from 'react-native';
import { StyleSheet } from 'react-native';

import { View } from './core';

interface Props extends ViewProps {
  children: any;
  style?: any;
  className?: string;
}
export const Shadow = (Props: Props) => {
  return (
    <View style={[styles.container2, Props.style]} className={Props.className}>
      {Props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    backgroundColor: '#fff',
    padding: 3,
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
