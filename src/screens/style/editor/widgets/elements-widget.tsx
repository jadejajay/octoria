/* eslint-disable max-lines-per-function */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MasonryFlashList } from '@shopify/flash-list';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { shadow, showErrorMessage, useEditorX } from '@/core';
import { FirestoreData } from '@/core/fire-util';
import { type ElementsType, F_ELEMENTS } from '@/types';
import { EmptyList, Image, Text, TouchableOpacity, View } from '@/ui';

type Props = {
  item: ElementsType;
  index: number;
};
const theme = '#07ab86';
export const ElementsWidget = () => {
  const elementsHandler = React.useMemo(
    () => new FirestoreData<ElementsType>(F_ELEMENTS),
    []
  );
  const [elements, setElements] = React.useState<ElementsType[]>([]);
  const addElement = useEditorX((s) => s.addElement);
  const { goBack } = useNavigation();
  const getElements = useCallback(async () => {
    const data = await elementsHandler.getData(20);
    if (data) setElements(data);
  }, [elementsHandler]);
  useEffect(() => {
    getElements();
  }, [getElements]);
  const handleEndReached = useCallback(async () => {
    const data = await elementsHandler.loadMore(20);
    if (data)
      setElements((p) => {
        if (p) return [...p, ...data];
        return data;
      });
  }, [elementsHandler]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        var aspect = result.assets[0].width / result.assets[0].height;
        addElement(element(result.assets[0].uri, 150, 150 / aspect));
        goBack();
      }
    } catch (error) {
      showErrorMessage('capture.failed');
    }
  };

  const Card = useCallback(
    ({ item, index }: Props) => {
      return (
        <View className="max-h-40 w-full p-2">
          <TouchableOpacity
            className="overflow-hidden rounded-lg"
            activeOpacity={1}
            onPress={() => {
              addElement(element(item.image, 150, 150));
              goBack();
            }}
            style={[
              styles.fullWidth,
              shadow.medium,
              styles.shadow,
              index % 2 === 0 ? styles.height75 : styles.height150,
            ]}
          >
            {item?.thumbnail && (
              <Image
                src={item.thumbnail}
                style={styles.image}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        </View>
      );
    },
    [addElement, goBack]
  );

  return (
    <>
      <View className="h-40 flex-row justify-around border-b-2 border-slate-100">
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
        <MasonryFlashList
          data={elements}
          onEndReachedThreshold={0.3}
          onEndReached={handleEndReached}
          numColumns={3}
          getColumnFlex={(_, index) => {
            return index === 0 ? 2 : 1;
          }}
          keyExtractor={(_, index) => {
            return index.toString();
          }}
          //  snapToInterval={snapToInterval}
          estimatedItemSize={100}
          ListEmptyComponent={<EmptyList isLoading={false} />}
          renderItem={Card}
          //  ListHeaderComponent={Header}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  image: { width: '100%', height: '100%' },
  fullWidth: { width: '100%' },
  height75: { height: 75 },
  height150: { height: 150 },
  shadow: {
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
});
const element = (image: string, width: number, height: number) => ({
  component: 'image',
  properties: {
    height: height,
    width: width,
    image: image,
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
