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
import * as Animated from 'react-native-animatable';

import {
  shuffleArray,
  useEditorX,
  usePostVideoStore,
  useSubCategoryStore,
} from '@/core';
import { type PostVideoType } from '@/types';
import {
  Image,
  Text,
  TouchableOpacity,
  Vertical2CompList,
  View,
  WIDTH,
} from '@/ui';

const theme = '#07ab86';
export const BackgroundVideosWidget = () => {
  const { postVideos } = usePostVideoStore();
  const [state, setState] = React.useState(10);
  const setBg = useEditorX((s) => s.setBackground);
  const categoryCode = useEditorX((s) => s.categoryCode);
  const { goBack } = useNavigation();
  const filteredImages = postVideos.filter((img) => {
    if (categoryCode === 1) {
      return true;
    }
    return img.categoryCode === categoryCode;
  });
  const semifinalArray = shuffleArray(filteredImages);
  const finalArray =
    semifinalArray.length > state
      ? semifinalArray.slice(0, state)
      : semifinalArray;

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
  const captureImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        videoMaxDuration: 120,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setBg(result.assets[0].uri, 'video');
        goBack();
      }
    } catch (error) {
      ToastAndroid.show('Something Unexpected Happen !', ToastAndroid.SHORT);
    }
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        videoMaxDuration: 120,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setBg(result.assets[0].uri, 'video');
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
          <Text className="font-sfbold text-lg" tx={'editor.click_video'} />
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
          data={finalArray}
          estimatedItemSize={130}
          onEndReached={() => {
            setState((s) => s + 10);
          }}
        />
      </View>
    </>
  );
};

type Props = {
  item: PostVideoType;
  index: number;
  setBg: (image: string, type: 'video') => void;
  onClose: () => void;
};
const Card = ({ item, index, setBg, onClose }: Props) => {
  const codeToSubcategory = useSubCategoryStore((s) => s.codeToSubcategory);
  return (
    <View className="flex-1 p-2">
      <Animated.View
        key={index}
        animation="zoomIn"
        delay={((index % 10) + 1) * 400}
        style={styles.image2}
      >
        <TouchableOpacity
          key={`festival-card-${index}`}
          className="aspect-square w-full overflow-hidden rounded-lg"
          style={styles.shadow}
          activeOpacity={1}
          onPress={() => {
            setBg(item.video, 'video');
            onClose();
          }}
        >
          {item?.thumbnail && (
            <Image
              src={item.thumbnail}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>
        <Text variant="xs" className="text-center font-sfbold">
          {codeToSubcategory(item.subCategory)}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { width: WIDTH / 2, height: WIDTH / 2 },
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
