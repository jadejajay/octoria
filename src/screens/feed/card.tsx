import React from 'react';
import { StyleSheet } from 'react-native';

// import type { Post } from '@/api';
import { Image, Text, View } from '@/ui';
import { AnimatedButton } from '@/ui/core/animated-button';
import type { Product } from '@/ui/widgets/product-type';

type Props = { onPress?: () => void; item: Product };

export const Card = ({ item, onPress = () => {} }: Props) => {
  return (
    <AnimatedButton onClick={onPress}>
      <View className="flex-column m-2 overflow-hidden ">
        <View className="h-56 w-full ">
          <Image src={item.images[0]} style={styles.image} resizeMode="cover" />
        </View>
        <Text variant="sm" className="font-bold text-slate-500">
          {item.name}
        </Text>
        <Text variant="sm" numberOfLines={2} className=" text-slate-500">
          {item.description}
        </Text>
        <Text variant="sm" className="font-bold text-slate-500 ">
          Rs.{item.price}
        </Text>
      </View>
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
