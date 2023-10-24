import React, { useCallback } from 'react';
import { Modal } from 'react-native';
import { StyleSheet } from 'react-native';

import { extractImagesFromObjects, useEditorX } from '@/core';
import { useProductsStore } from '@/core/mainscreen/products';
import type { Product } from '@/types';
import { Image, Text, TouchableOpacity, View } from '@/ui';
import { Vertical2CompList } from '@/ui/core/list/vertical-2comp';
type Props9 = {
  isVisible: boolean;
  onClose: () => void;
};
const theme = '#07ab86';
export const ProductsWidget = ({ isVisible, onClose }: Props9) => {
  const { products } = useProductsStore();
  const productList = extractImagesFromObjects<Product>(products);
  const addElement = useEditorX((s) => s.addElement);

  const CardComp = useCallback((item: any, index: number) => {
    return (
      <Card
        item={item.item}
        index={index}
        setElement={addElement}
        onClose={onClose}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <View className="h-40 flex-row bg-red-100">
        <View className="flex-1 items-center justify-center bg-slate-700">
          <Text variant="sm" className="text-center">
            gallery
          </Text>
        </View>
      </View>
      <View className="flex-1">
        <Vertical2CompList
          Comp={CardComp}
          data={productList}
          estimatedItemSize={100}
          numColumn={3}
        />
      </View>
    </Modal>
  );
};

type Props = {
  item: string;
  index: number;
  setElement: (element: any) => void;
  onClose: () => void;
};
export const Card = ({ item, index, setElement, onClose }: Props) => {
  const element = {
    component: 'image',
    properties: {
      height: 120,
      width: 90,
      image: item,
      viewProps: {
        style: {
          overflow: 'hidden',
        },
      },
      resizeMode: 'contain',
      offset: {
        x: 0,
        y: 0,
      },
      start: {
        x: 0,
        y: 0,
      },
      scale: 1,
      rotation: 0,
    },
  };
  return (
    <TouchableOpacity
      key={`festival-card-${index}`}
      className="m-2 aspect-[3/4] w-11/12 overflow-hidden rounded-lg bg-slate-100"
      activeOpacity={1}
      onPress={() => {
        setElement(element);
        onClose();
      }}
    >
      <Image src={item} style={styles.image} resizeMode="contain" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: { width: '100%', height: '100%' },
  image2: { width: '100%', height: '100%', opacity: 1 },
  color1: { color: theme },
});
