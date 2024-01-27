import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback } from 'react';
import { ToastAndroid } from 'react-native';
import { StyleSheet } from 'react-native';

import {
  extractImagesFromObjects,
  shadow,
  useEditorX,
  useProductsStore,
} from '@/core';
import type { Product } from '@/types';
import { Image, Text, TouchableOpacity, Vertical2CompList, View } from '@/ui';

const theme = '#07ab86';
export const ProductsWidget = () => {
  const { products } = useProductsStore();
  const productList = extractImagesFromObjects<Product>(products);
  const { goBack } = useNavigation();
  const addElement = useEditorX((s) => s.addElement);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        addElement(element(result.assets[0].uri));
        goBack();
      }
    } catch (error) {
      ToastAndroid.show('Something Unexpected Happen !', ToastAndroid.SHORT);
    }
  };

  const CardComp = useCallback((item: any, index: number) => {
    return (
      <Card
        item={item.item}
        index={index}
        setElement={addElement}
        onClose={() => {
          goBack();
        }}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <View className="h-40 flex-row justify-around border-b-2 border-slate-100">
        <TouchableOpacity
          className="m-4 flex-1 items-center justify-center rounded-md"
          style={[styles.shadow, shadow.medium]}
          onPress={pickImage}
          activeOpacity={1}
        >
          <MaterialCommunityIcons name="camera-gopro" size={40} color={theme} />
          <Text className="font-sfbold text-lg" tx={'editor.select_product'} />
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        <Vertical2CompList
          Comp={CardComp}
          data={productList}
          estimatedItemSize={100}
          numColumn={3}
        />
      </View>
    </>
  );
};

type Props = {
  item: string;
  index: number;
  setElement: (element: any) => void;
  onClose: () => void;
};
const Card = ({ item, index, setElement, onClose }: Props) => {
  return (
    <TouchableOpacity
      key={`festival-card-${index}`}
      className="m-2 aspect-[3/4] w-11/12 overflow-hidden rounded-lg"
      style={[styles.shadow, shadow.medium]}
      activeOpacity={1}
      onPress={() => {
        setElement(element(item));
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
  shadow: {
    backgroundColor: '#fff',
    elevation: 5,
  },
});

const element = (item: string) => ({
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
});
