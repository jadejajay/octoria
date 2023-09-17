import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Image, Text, View } from '@/ui';
import { AnimatedButton } from '@/ui/core/animated-button';

import type { Product } from '../product-type';

type Props = {
  item: Product;
  index: any;
};
export const ProductCardHorizontal = ({ item, index }: Props) => {
  const navigation = useNavigation();
  return (
    <AnimatedButton
      key={index}
      onClick={() => {
        //@ts-ignore
        navigation.navigate('Post', { id: item.id });
      }}
    >
      <View className="flex-column m-2 overflow-hidden ">
        <View className="h-56 w-full ">
          <Image src={item.images[0]} style={styles.image} resizeMode="cover" />
        </View>
        <Text variant="sm" className="font-bold text-slate-500">
          {item.name}
        </Text>
        {item?.description && (
          <Text variant="sm" numberOfLines={2} className=" text-slate-500">
            {item.description}
          </Text>
        )}

        {item?.price ? (
          <Text variant="sm" className="font-bold text-slate-500 ">
            Rs.{item.price}
          </Text>
        ) : null}
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
