import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import type { Product } from '@/types';
// import type { Post } from '@/api';
import { Image, Text, View } from '@/ui';
import { AnimatedButton } from '@/ui/core/animated-button';

type Props = { onPress: () => void; item: Product };

export const Card = ({ item, onPress }: Props) => {
  const [itemData, setItemData] = useState<Product>({
    id: '',
    name: '',
    images: [''],
    description: '',
  });

  useEffect(() => {
    const areAllValuesDefined = () => {
      for (const key in item) {
        if (
          Object.prototype.hasOwnProperty.call(item, key) &&
          item[key as keyof Product] === undefined
        ) {
          return false;
        }
      }
      return true;
    };
    if (areAllValuesDefined()) setItemData(item);
    console.log(item);
  }, [item]);
  return (
    <AnimatedButton key={`item-${item?.id}`} onClick={onPress}>
      <View className="flex-column m-2 overflow-hidden ">
        <View className="h-56 w-full ">
          <Image
            src={itemData?.images[0]}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Text variant="sm" className="font-bold text-slate-500">
          {itemData?.name}
        </Text>
        <Text variant="sm" numberOfLines={2} className=" text-slate-500">
          {itemData?.description}
        </Text>
        {itemData?.price && (
          <Text variant="sm" className="font-bold text-slate-500 ">
            Rs.{itemData?.price}
          </Text>
        )}
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
