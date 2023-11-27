/* eslint-disable max-lines-per-function */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback } from 'react';
import { ToastAndroid } from 'react-native';
import { StyleSheet } from 'react-native';

import { useEditorX, useImageListStore } from '@/core';
import type { ImageListType } from '@/types';
import { Image, Text, TouchableOpacity, Vertical2CompList, View } from '@/ui';

const theme = '#07ab86';
export const ImageModal = () => {
  const { images } = useImageListStore();
  const addElement = useEditorX((s) => s.addElement);
  const { goBack } = useNavigation();

  const CardComp = useCallback((item: any, index: number) => {
    return (
      <Card
        item={item.item}
        index={index}
        addElement={addElement}
        onClose={() => {
          goBack();
        }}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const captureImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        addElement(element(result.assets[0]?.uri));
        goBack();
      }
    } catch (error) {
      ToastAndroid.show('Something Unexpected Happen !', ToastAndroid.SHORT);
    }
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        addElement(element(result.assets[0]?.uri));
        goBack();
      }
    } catch (error) {
      ToastAndroid.show('Something Unexpected Happen !', ToastAndroid.SHORT);
    }
  };
  return (
    <>
      <View className="h-40 flex-row justify-around">
        <TouchableOpacity
          className="m-4 flex-1 items-center justify-center"
          onPress={captureImage}
          activeOpacity={1}
        >
          <MaterialCommunityIcons
            name="camera-enhance-outline"
            size={40}
            color={theme}
          />
          <Text className="font-sfbold text-lg">Click Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="m-4 flex-1 items-center justify-center"
          onPress={pickImage}
          activeOpacity={1}
        >
          <MaterialCommunityIcons
            name="view-gallery-outline"
            size={40}
            color={theme}
          />
          <Text className="font-sfbold text-lg">Select From Gallery</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        <Vertical2CompList
          Comp={CardComp}
          data={images}
          estimatedItemSize={130}
        />
      </View>
    </>
  );
};

type Props = {
  item: ImageListType;
  index: number;
  addElement: (element: any) => void;
  onClose: () => void;
};
const Card = ({ item, index, addElement, onClose }: Props) => {
  return (
    <View className="flex-1 p-2">
      <TouchableOpacity
        key={`festival-card-${index}`}
        className="aspect-square w-full overflow-hidden rounded-lg bg-green-400"
        activeOpacity={1}
        onPress={() => {
          addElement(element(item.image));
          onClose();
        }}
      >
        <Image src={item.image} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { width: '100%', height: '100%' },
  image2: { width: '100%', height: '100%', opacity: 1 },
  color1: { color: theme },
});

const element = (image: string) => ({
  component: 'image',
  properties: {
    height: 100,
    width: 100,
    image: image,
    viewProps: {
      style: {
        overflow: 'hidden',
      },
    },
    resizeMode: 'stretch',
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
