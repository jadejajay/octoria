/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Image, TouchableOpacity } from '@/ui/core';
import { WIDTH } from '@/ui/theme';

type Props = {
  onClick?: () => void;
  index?: number;
  isSelected?: boolean;
  url?: string;
};
export const SmallCard2 = ({ onClick, index, isSelected, url }: Props) => {
  return (
    <TouchableOpacity
      key={`item-${index}`}
      onPress={onClick}
      activeOpacity={1}
      style={[
        styles.container,
        styles.shadow,
        isSelected ? { backgroundColor: '#86fbea' } : {},
      ]}
    >
      {url && (
        <Image
          key={index}
          src={url}
          resizeMode="stretch"
          style={styles.image}
        />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    // overflow: 'hidden',
    // padding: 4,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 3,
    width: WIDTH / 3 - 8,
    aspectRatio: 1,
    margin: 4,
    marginVertical: 8,
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
    elevation: 3,
  },
});
