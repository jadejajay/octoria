/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Image, TouchableOpacity } from '@/ui';
import { Shadow } from '@/ui/core/shadow';

type Props = {
  onClick?: () => void;
  index?: number;
  isSelected?: boolean;
  url?: string;
};
export const SmallCard2 = ({ onClick, index, isSelected, url }: Props) => {
  return (
    <TouchableOpacity key={`item-${index}`} onPress={onClick} activeOpacity={1}>
      <Shadow
        style={[
          styles.container,
          isSelected ? { backgroundColor: '#86fbea' } : {},
        ]}
        className="justify-center rounded bg-white"
      >
        {url && (
          <Image
            key={index}
            src={url}
            resizeMode="stretch"
            style={styles.image}
          />
        )}
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
  },
});
