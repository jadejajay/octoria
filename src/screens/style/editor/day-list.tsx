/* eslint-disable max-lines-per-function */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { useEditorX } from '@/core';
import { useFestivalStore } from '@/core/editorx/festival';
import { usePostMainCategoryStore } from '@/core/editorx/post-main-category';
import { usePostVideoStore } from '@/core/editorx/post-video';
import { setItem } from '@/core/storage';
import {
  type FestivalType,
  type PostMainCategoryType,
  type PostVideoType,
  SUB_CATEGORY,
} from '@/types';
import { Image, Text, TouchableOpacity, View } from '@/ui';
import { HorizontalList } from '@/ui/core/list/horizontal-list';
import { Vertical2CompList } from '@/ui/core/list/vertical-2comp';
// import { addData } from '@/core/firebase-bulk';
type Props = {};
export const DayList = ({}: Props) => {
  const image = '';
  const navigation = useNavigation();
  const categories = usePostMainCategoryStore((s) => s.postMainCategory);
  const setCategoryCode = useEditorX((s) => s.setCategoryCode);
  const setbg = useEditorX((s) => s.setBackground);
  const images = useFestivalStore((s) => s.festival);
  const videos = usePostVideoStore((s) => s.postVideos);
  React.useEffect(() => {
    // addData();
  }, []);
  const handleNav1 = async (code: number, subCode: number) => {
    console.log(
      '🚀 ~ file: day-list.tsx ~ line 52 ~ handleNav1 ~ subCode',
      subCode,
      code
    );
    setCategoryCode(code);
    await setItem(SUB_CATEGORY, subCode);
    navigation.navigate('ImageEditor');
  };
  const handleNav3 = async (code: number, subCode: number, image1: any) => {
    console.log(
      '🚀 ~ file: day-list.tsx ~ line 52 ~ handleNav3 ~ subCode',
      subCode,
      code,
      image1
    );
    setCategoryCode(code);
    setbg(image1, 'photo');
    await setItem(SUB_CATEGORY, subCode);
    navigation.navigate('ImageEditor');
  };
  const handleNav4 = async (code: number, subCode: number, video: any) => {
    console.log(
      '🚀 ~ file: day-list.tsx ~ line 52 ~ handleNav4 ~ subCode',
      subCode,
      code,
      video
    );
    setCategoryCode(code);
    setbg(video, 'video');
    await setItem(SUB_CATEGORY, subCode);
    navigation.navigate('ImageEditor');
  };
  const handleNav2 = async () => {
    await setItem(SUB_CATEGORY, 1);
    navigation.navigate('ImageEditor');
  };
  const CardComp = React.useCallback(
    ({ item, index }: { item: PostMainCategoryType; index: number }) => {
      const filtered = images.filter((img) => {
        return img.categoryCode === item.code;
      });
      const filteredVideos = videos.filter((img) => {
        return img.categoryCode === item.code;
      });
      return (
        <>
          <TouchableOpacity
            key={`category-card-${index}`}
            style={styles.container2}
            className="mt-4 h-28 overflow-hidden rounded-lg bg-green-400"
            activeOpacity={1}
            onPress={() => handleNav1(item.code, item.subCode)}
          >
            {item?.image && (
              <Image
                src={item.image}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            )}
            <View className="absolute inset-0 items-center justify-center">
              <Text className="font-kalam text-3xl leading-10 text-white">
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
          {filtered.length > 0 ? (
            <View className="mt-4 h-28">
              <HorizontalList
                key={`horizontal-list-${index}`}
                Comp={SmallCard}
                estimatedItemSize={100}
                snapToInterval={120}
                Header={CardCompHeader}
                data={filtered}
              />
            </View>
          ) : (
            <View />
          )}
          {filteredVideos.length > 0 ? (
            <View className="mt-4 h-28">
              <HorizontalList
                key={`horizontal-list-${index}`}
                Comp={SmallCard2}
                estimatedItemSize={100}
                snapToInterval={120}
                Header={CardCompHeader}
                data={filteredVideos}
              />
            </View>
          ) : (
            <View />
          )}
        </>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const CardCompHeader = React.useCallback(
    () => {
      return (
        <View
          key={`category-card-header`}
          className="mt-2 h-28 overflow-hidden rounded-lg bg-green-400"
          style={styles.container2}
        >
          {image && (
            <Image
              src={image}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          )}
          <TouchableOpacity
            className="absolute inset-0 items-center justify-center"
            onPress={() => handleNav2()}
            activeOpacity={1}
          >
            <Text className="font-kalam text-xl leading-10 text-green-400">
              Continue Last Post 🚀
            </Text>
          </TouchableOpacity>
        </View>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [image]
  );
  const SmallCard = React.useCallback(
    ({ item, index }: { item: FestivalType; index: number }) => {
      return (
        <TouchableOpacity
          key={`category-card-${index}`}
          className="h-28 w-28 p-1"
          activeOpacity={1}
          onPress={() =>
            handleNav3(item.categoryCode, item.subCategory, item.image)
          }
        >
          <View
            className="overflow-hidden rounded-lg"
            style={styles.container2}
          >
            {item?.image && (
              <Image
                src={item.image}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            )}
          </View>
        </TouchableOpacity>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const SmallCard2 = React.useCallback(
    ({ item, index }: { item: PostVideoType; index: number }) => {
      return (
        <TouchableOpacity
          key={`category-card-${index}`}
          className="h-28 w-28 p-1"
          activeOpacity={1}
          onPress={() =>
            handleNav4(item.categoryCode, item.subCategory, item.video)
          }
        >
          <View
            className="overflow-hidden rounded-lg"
            style={styles.container2}
          >
            {item?.video && (
              <Image
                src={item.thumbnail}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            )}
          </View>
        </TouchableOpacity>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <View className="flex-1">
      <Vertical2CompList
        Comp={CardComp}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ padding: 20 }}
        Header={CardCompHeader}
        data={categories}
        estimatedItemSize={300}
        numColumn={1}
      />
    </View>
  );
};
//https://firebasestorage.googleapis.com/v0/b/speedy-league-335221.appspot.com/o/app_assets%2Findependent-day.jpg?alt=media&token=08bb9d54-bca7-4a2e-b2dc-a1cfe8d390a4
const styles = StyleSheet.create({
  container2: {
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
});
// Abs => Abstract 1
// Fest => Festival 2
// Bus => Business 3
// SD => Special Days 4
// Gd => Greetings 5
