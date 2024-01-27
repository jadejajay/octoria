/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { shadow } from '@/core';
import { Image, TouchableOpacity } from '@/ui/core';
import { WIDTH } from '@/ui/theme';

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
      style={[
        styles.container,
        shadow.medium,
        styles.shadow,
        isSelected ? { backgroundColor: '#86fbea' } : {},
      ]}
    >
      <Image key={index} src={url} resizeMode="stretch" style={styles.image} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
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
    elevation: 3,
  },
});
