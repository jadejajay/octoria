/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback } from 'react';
import { Modal, ToastAndroid } from 'react-native';
import { StyleSheet } from 'react-native';

import { extractImagesFromObjects, useEditorX, useProductsStore } from '@/core';
import type { Product } from '@/types';
import { Image, Text, TouchableOpacity, Vertical2CompList, View } from '@/ui';
type Props9 = {
  isVisible: boolean;
  onClose: () => void;
};
const theme = '#07ab86';
export const ProductsWidget = ({ isVisible, onClose }: Props9) => {
  const { products } = useProductsStore();
  const productList = extractImagesFromObjects<Product>(products);
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
        onClose();
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
        onClose={onClose}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <View className="h-40 flex-row justify-around">
        <TouchableOpacity
          className="m-4 flex-1 items-center justify-center"
          onPress={pickImage}
          activeOpacity={1}
        >
          <MaterialCommunityIcons name="camera-gopro" size={40} color={theme} />
          <Text className="font-kalam text-lg">Select Picture</Text>
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
    </Modal>
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
      className="m-2 aspect-[3/4] w-11/12 overflow-hidden rounded-lg bg-green-400"
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
