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

import { useEditorX, useFrameStore } from '@/core';
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
      <View className="h-40 flex-row justify-around">
        <TouchableOpacity
          className="m-4 flex-1 items-center justify-center"
          onPress={pickImage}
          activeOpacity={1}
        >
          <MaterialCommunityIcons name="camera-gopro" size={40} color={theme} />
          <Text className="font-sfbold text-lg">Select Picture</Text>
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
        className="aspect-square w-full overflow-hidden rounded-lg bg-green-400"
        activeOpacity={1}
        onPress={() => {
          setBg(item.image);
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
