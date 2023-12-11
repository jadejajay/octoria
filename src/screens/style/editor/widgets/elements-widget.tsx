/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
/* eslint-disable react-native/no-inline-styles */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MasonryFlashList } from '@shopify/flash-list';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { StyleSheet } from 'react-native';

import { useEditorX } from '@/core';
import { FirestoreData } from '@/core/fire-util';
import type { ElementsType } from '@/types';
import { EmptyList, Image, Text, TouchableOpacity, View } from '@/ui';

type Props = {
  item: ElementsType;
  index: number;
};
type mesProp = {
  id: any;
  width: number;
  height: number;
};
const theme = '#07ab86';
export const ElementsWidget = () => {
  const elementsHandler = new FirestoreData<ElementsType>('elements');
  const [elements, setElements] = React.useState<
    ElementsType[] | undefined | null
  >([]);
  const addElement = useEditorX((s) => s.addElement);
  const { goBack } = useNavigation();
  const mes: mesProp[] = [];
  const getElements = useCallback(async () => {
    const data = await elementsHandler.getData(20);
    if (data) setElements(data);
  }, []);
  useEffect(() => {
    getElements();
  }, []);
  const handleEndReached = useCallback(async () => {
    const data = await elementsHandler.loadMore(20);
    if (data)
      setElements((p) => {
        if (p) return [...p, ...data];
        return data;
      });
  }, []);

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
        goBack();
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
                goBack();
              } else {
                addElement(element(item.image, mes[index]?.width, 150));
                goBack();
              }
            } else {
              addElement(element(item.image, 150, 150));
              goBack();
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
    <>
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
          <Text className="font-sfbold text-lg" tx={'editor.select_gallery'} />
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
