import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animated from 'react-native-animatable';

import type { Product } from '@/types';
import { AnimatedButton, Image, Text, View } from '@/ui/core';
type Props = { onPress: () => void; item: Product; index: number };

export const Card = ({ item, onPress, index }: Props) => {
  return (
    <AnimatedButton key={`item-${item?.id}`} onClick={onPress}>
      <Animated.View key={`zoomIn-${index}`} animation="zoomIn">
        <View
          key={`zoomInView-${index}`}
          className="flex-column m-2 overflow-hidden "
        >
          <View key={`zoomInViewIMage-${index}`} className="h-56 w-full ">
            <Image
              key={`zoomInImage-${index}`}
              src={item?.images[0]}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <Text variant="sm" className="font-bold text-slate-500">
            {item?.name}
          </Text>
          <Text variant="sm" numberOfLines={2} className=" text-slate-500">
            {item?.description}
          </Text>
        </View>
      </Animated.View>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});
