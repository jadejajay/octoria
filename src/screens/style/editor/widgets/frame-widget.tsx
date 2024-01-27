/* eslint-disable max-lines-per-function */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback } from 'react';
import { ToastAndroid } from 'react-native';
import { StyleSheet } from 'react-native';

import { shadow, useEditorX, useFrameStore } from '@/core';
import type { FrameType } from '@/types';
import { Image, Text, TouchableOpacity, Vertical2CompList, View } from '@/ui';

const theme = '#07ab86';
export const FrameWidget = () => {
  const { frames } = useFrameStore();
  const { goBack } = useNavigation();
  const setBg = useEditorX((s) => s.setFrame);

  const CardComp = useCallback((item: any, index: number) => {
    return (
      <Card
        item={item.item}
        index={index}
        setBg={setBg}
        onClose={() => {
          goBack();
        }}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setBg(result.assets[0].uri);
        goBack();
      }
    } catch (error) {
      ToastAndroid.show('Something Unexpected Happen !', ToastAndroid.SHORT);
    }
  };
  return (
    <>
      <View className="h-40 flex-row justify-around border-b-2 border-slate-100">
        <TouchableOpacity
          className="m-4 flex-1 items-center justify-center rounded-md"
          style={[styles.shadow, shadow.medium]}
          onPress={() => {
            setBg('');
            goBack();
          }}
          activeOpacity={1}
        >
          <MaterialCommunityIcons
            name="square-off-outline"
            size={40}
            color={theme}
          />
          <Text className="font-sfbold text-sm" tx={'editor.remove_frame'} />
        </TouchableOpacity>
        <TouchableOpacity
          className="m-4 flex-1 items-center justify-center rounded-md"
          style={[styles.shadow, shadow.medium]}
          onPress={pickImage}
          activeOpacity={1}
        >
          <MaterialCommunityIcons name="camera-gopro" size={40} color={theme} />
          <Text className="font-sfbold text-sm" tx={'editor.select_frame'} />
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        <Vertical2CompList
          Comp={CardComp}
          data={frames}
          estimatedItemSize={130}
        />
      </View>
    </>
  );
};

type Props = {
  item: FrameType;
  index: number;
  setBg: (image: string) => void;
  onClose: () => void;
};
const Card = ({ item, index, setBg, onClose }: Props) => {
  return (
    <View className="flex-1 p-2">
      <TouchableOpacity
        key={`festival-card-${index}`}
        className="aspect-square w-full overflow-hidden rounded-lg"
        style={[styles.shadow, shadow.medium]}
        activeOpacity={1}
        onPress={() => {
          if (item?.image) setBg(item.image);
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
