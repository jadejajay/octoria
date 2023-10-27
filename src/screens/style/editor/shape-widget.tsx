/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MasonryFlashList } from '@shopify/flash-list';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback } from 'react';
import { Modal, ToastAndroid } from 'react-native';
import { StyleSheet } from 'react-native';

import { useEditorX } from '@/core';
import { useShapesStore } from '@/core/editorx/shapes';
import type { ShapesType } from '@/types';
import { EmptyList, Image, Text, TouchableOpacity, View } from '@/ui';
type Props7 = {
  isVisible: boolean;
  onClose: () => void;
};
type Props = {
  item: ShapesType;
  index: number;
};
type mesProp = {
  id: any;
  width: number;
  height: number;
};
const theme = '#07ab86';
export const ShapesWidget = ({ isVisible, onClose }: Props7) => {
  const { shapes } = useShapesStore();
  const addElement = useEditorX((s) => s.addElement);
  const mes: mesProp[] = [];

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        console.log(result);

        addElement(element(result.assets[0]?.uri, 150, 150));
        onClose();
      }
    } catch (error) {
      ToastAndroid.show('Something Unexpected Happen !', ToastAndroid.SHORT);
    }
  };

  const Card = useCallback(({ item, index }: Props) => {
    return (
      <View className="max-h-40 w-full p-2">
        <TouchableOpacity
          className="overflow-hidden rounded-lg"
          activeOpacity={1}
          onPress={() => {
            if (mes[index]?.width) {
              if (mes[index]?.height) {
                addElement(
                  element(item.image, mes[index]?.width, mes[index]?.height)
                );
                onClose();
              } else {
                addElement(element(item.image, mes[index]?.width, 150));
                onClose();
              }
            } else {
              addElement(element(item.image, 150, 150));
              onClose();
            }
          }}
          style={{ width: '100%', height: index % 2 === 0 ? 75 : 150 }}
        >
          <Image
            src={item.image}
            style={styles.image}
            resizeMode="contain"
            onLoad={(e) => {
              mes.push({
                id: index,
                width: e.nativeEvent.width,
                height: e.nativeEvent.height,
              });
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }, []);
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <View className="h-40 flex-row justify-around">
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
        <MasonryFlashList
          data={shapes}
          numColumns={2}
          getColumnFlex={(_, index) => {
            return index === 0 ? 2 : 1;
          }}
          //  onEndReached={onEndReached}
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
    </Modal>
  );
};

export const styles = StyleSheet.create({
  image: { width: '100%', height: '100%' },
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
