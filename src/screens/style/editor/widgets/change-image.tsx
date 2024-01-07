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

import { logger, useEditorX } from '@/core';
import { FirestoreData } from '@/core/fire-util';
import { F_IMAGES_ELEMENTS, type ImageListType } from '@/types';
import { Image, Text, TouchableOpacity, Vertical2CompList, View } from '@/ui';

const theme = '#07ab86';
export const ChangeImageModal = () => {
  const imagesHandler = new FirestoreData<ImageListType>(F_IMAGES_ELEMENTS);
  const [images, setImages] = React.useState<ImageListType[] | []>([]);
  const setImage = useEditorX((s) => s.setImage);
  const state = useEditorX((s) => s.selectedItem);
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
        setImage={setImage}
        onClose={() => {
          goBack();
        }}
        state={state}
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
        setImage({ id: state, image: result.assets[0]?.uri });
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
        setImage({ id: state, image: result.assets[0]?.uri });
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
          style={styles.shadow}
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
        <Vertical2CompList
          Comp={CardComp}
          data={images}
          onEndReached={handleEndReached}
          estimatedItemSize={130}
        />
      </View>
    </>
  );
};

type Props = {
  item: ImageListType;
  index: number;
  state: any;
  setImage: (element: any) => void;
  onClose: () => void;
};
const Card = ({ item, index, setImage, onClose, state }: Props) => {
  return (
    <View className="flex-1 p-2">
      <TouchableOpacity
        key={`festival-card-${index}`}
        className="aspect-square w-full overflow-hidden rounded-lg"
        style={styles.shadow}
        activeOpacity={1}
        onPress={() => {
          setImage({ id: state, image: item.image });
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
