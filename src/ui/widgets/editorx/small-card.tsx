/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Image, TouchableOpacity } from '@/ui/core';
import { Shadow } from '@/ui/shadow';

type Props = {
  onClick?: () => void;
  onLongPress?: () => void;
  index?: number;
  isSelected?: boolean;
  url?: string;
};
export const SmallCard = ({
  onClick = () => {},
  index,
  isSelected,
  url,
  onLongPress = () => {},
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      onLongPress={onLongPress}
      activeOpacity={1}
    >
      <Shadow
        style={[
          styles.container,
          isSelected ? { backgroundColor: '#86fbea' } : {},
        ]}
        className="justify-center rounded bg-white"
      >
        <Image
          key={index}
          src={url}
          resizeMode="stretch"
          style={styles.image}
        />
      </Shadow>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    margin: 4,
    width: 120,
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
  },
  shadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,
  },
});
