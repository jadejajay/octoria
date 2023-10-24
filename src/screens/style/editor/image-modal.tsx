/* eslint-disable max-lines-per-function */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback } from 'react';
import { Modal, ToastAndroid } from 'react-native';
import { StyleSheet } from 'react-native';

import { useEditorX } from '@/core';
import { useImageListStore } from '@/core/editorx/image-element';
import type { ImageListType } from '@/types';
import { Image, Text, TouchableOpacity, View } from '@/ui';
import { Vertical2CompList } from '@/ui/core/list/vertical-2comp';
type Props7 = {
  isVisible: boolean;
  onClose: () => void;
};
const theme = '#07ab86';
export const ImageModal = ({ isVisible, onClose }: Props7) => {
  const { images } = useImageListStore();
  const addElement = useEditorX((s) => s.addElement);

  const CardComp = useCallback((item: any, index: number) => {
    return (
      <Card
        item={item.item}
        index={index}
        addElement={addElement}
        onClose={onClose}
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
        onClose();
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
        onClose();
      }
    } catch (error) {
      ToastAndroid.show('Something Unexpected Happen !', ToastAndroid.SHORT);
    }
  };
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
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
          <Text className="font-kalam text-lg">Click Picture</Text>
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
          <Text className="font-kalam text-lg">Select From Gallery</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        <Vertical2CompList
          Comp={CardComp}
          data={images}
          estimatedItemSize={130}
        />
      </View>
    </Modal>
  );
};

type Props = {
  item: ImageListType;
  index: number;
  addElement: (element: any) => void;
  onClose: () => void;
};
export const Card = ({ item, index, addElement, onClose }: Props) => {
  return (
    <View className="flex-1 p-2">
      <TouchableOpacity
        key={`festival-card-${index}`}
        className="aspect-square w-full overflow-hidden rounded-lg bg-red-200"
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
