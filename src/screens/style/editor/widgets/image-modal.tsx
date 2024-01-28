/* eslint-disable max-lines-per-function */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { logger, shadow, showErrorMessage, useEditorX } from '@/core';
import { FirestoreData } from '@/core/fire-util';
import { F_IMAGES_ELEMENTS, type ImageListType } from '@/types';
import { Image, Text, TouchableOpacity, Vertical2CompList, View } from '@/ui';

const theme = '#07ab86';
export const ImageModal = () => {
  const imagesHandler = new FirestoreData<ImageListType>(F_IMAGES_ELEMENTS);
  const [images, setImages] = React.useState<ImageListType[] | []>([]);
  const addElement = useEditorX((s) => s.addElement);
  const { goBack } = useNavigation();

  const getImages = useCallback(async () => {
    const data = await imagesHandler.getData(20);
    if (data) setImages(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleEndReached = useCallback(async () => {
    logger.log('handleEndReached');
    const data = await imagesHandler.loadMore(20);
    if (data)
      setImages((p) => {
        if (p) return [...p, ...data];
        return data;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        const aspect = result.assets[0].width / result.assets[0].height;
        addElement(element(result.assets[0]?.uri, aspect));
        goBack();
      }
    } catch (error) {
      showErrorMessage('capture.failed');
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
        const aspect = result.assets[0].width / result.assets[0].height;
        addElement(element(result.assets[0]?.uri, aspect));
        goBack();
      }
    } catch (error) {
      showErrorMessage('capture.failed');
    }
  };
  return (
    <>
      <View className="h-40 flex-row justify-around border-b-2 border-slate-100">
        <TouchableOpacity
          className="m-4 flex-1 items-center justify-center rounded-md"
          style={[styles.shadow, shadow.medium]}
          onPress={captureImage}
          activeOpacity={1}
        >
          <MaterialCommunityIcons
            name="camera-enhance-outline"
            size={40}
            color={theme}
          />
          <Text className="font-sfbold text-sm" tx={'editor.click_picture'} />
        </TouchableOpacity>
        <TouchableOpacity
          className="m-4 flex-1 items-center justify-center rounded-md"
          style={[styles.shadow, shadow.medium]}
          onPress={pickImage}
          activeOpacity={1}
        >
          <MaterialCommunityIcons
            name="view-gallery-outline"
            size={40}
            color={theme}
          />
          <Text className="font-sfbold text-sm" tx={'editor.select_gallery'} />
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        <Vertical2CompList
          Comp={CardComp}
          numColumn={3}
          onEndReached={handleEndReached}
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
        className="aspect-square w-full overflow-hidden rounded-lg"
        style={[styles.shadow, shadow.medium]}
        activeOpacity={1}
        onPress={() => {
          addElement(element(item.image, 1));
          onClose();
        }}
      >
        {item?.thumbnail && (
          <Image src={item.thumbnail} style={styles.image} resizeMode="cover" />
        )}
      </TouchableOpacity>
    </View>
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

const element = (image: string, aspect: number) => ({
  component: 'image',
  properties: {
    height: 150 / aspect,
    width: 150,
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
