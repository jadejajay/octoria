/* eslint-disable max-lines-per-function */
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
import React, { useCallback } from 'react';
import { ToastAndroid } from 'react-native';
import { StyleSheet } from 'react-native';

import { logger, useEditorX } from '@/core';
import { FirestoreData } from '@/core/fire-util';
import { F_SHAPES, type ShapesType } from '@/types';
import { EmptyList, Image, Text, TouchableOpacity, View } from '@/ui';

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
export const ShapesWidget = () => {
  const shapesHandler = React.useMemo(
    () => new FirestoreData<ShapesType>(F_SHAPES),
    []
  );
  const [shapes, setShapes] = React.useState<ShapesType[] | []>([]);
  const addElement = useEditorX((s) => s.addElement);
  const { goBack } = useNavigation();
  const mes: mesProp[] = React.useMemo(() => [], []);

  const getShapes = useCallback(async () => {
    const data = await shapesHandler.getData(20);
    if (data) setShapes(data);
  }, [shapesHandler]);
  React.useEffect(() => {
    getShapes();
  }, [getShapes]);
  const handleEndReached = useCallback(async () => {
    logger.log('handleEndReached');
    const data = await shapesHandler.loadMore(20);
    if (data)
      setShapes((p) => {
        if (p) return [...p, ...data];
        return data;
      });
  }, [shapesHandler]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        logger.log(result);

        addElement(element(result.assets[0]?.uri, 150, 150));
        goBack();
      }
    } catch (error) {
      ToastAndroid.show('Something Unexpected Happen !', ToastAndroid.SHORT);
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
            style={[
              styles.fullWidth,
              styles.shadow,
              index % 2 === 0 ? styles.height75 : styles.height150,
            ]}
          >
            {item?.thumbnail && (
              <Image
                src={item.thumbnail}
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
            )}
          </TouchableOpacity>
        </View>
      );
    },
    [addElement, goBack, mes]
  );
  return (
    <>
      <View className="h-40 flex-row justify-around border-b-2 border-slate-100">
        <TouchableOpacity
          className="m-4 flex-1 items-center justify-center rounded-md"
          style={styles.shadow}
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
          data={shapes}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3}
          numColumns={2}
          getColumnFlex={(_, index) => {
            return index === 0 ? 2 : 1;
          }}
          keyExtractor={(_, index) => {
            return index.toString();
          }}
          estimatedItemSize={100}
          ListEmptyComponent={<EmptyList isLoading={false} />}
          renderItem={Card}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: { width: '100%', height: '100%' },
  fullWidth: { width: '100%' },
  height75: { height: 75 },
  height150: { height: 150 },
  shadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
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
