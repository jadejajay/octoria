import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animated from 'react-native-animatable';

import type { Product } from '@/types';
import { AnimatedButton, Image, Text, View } from '@/ui/core';
type Props = { onPress: () => void; item: Product; index: number };

export const PostListCard = ({ item, onPress, index }: Props) => {
  return (
    <AnimatedButton key={`item-${item?.id}-${index}`} onClick={onPress}>
      <Animated.View animation="zoomIn">
        <View className="flex-column m-2 overflow-hidden">
          <View className="h-56 w-full ">
            {item?.thumbnail && (
              <Image
                src={item.thumbnail}
                style={styles.image}
                resizeMode="cover"
              />
            )}
          </View>
          <Text variant="sm" className="font-sfbold text-slate-500">
            {item?.name}
          </Text>
          <Text
            variant="sm"
            numberOfLines={2}
            className="font-semibold text-slate-500"
          >
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
