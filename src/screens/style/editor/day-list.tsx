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

import {
  getItem,
  setItem,
  useEditorX,
  useFestivalStore,
  usePostMainCategoryStore,
  usePostVideoStore,
  useSearchStore,
} from '@/core';
import { isDateInRange } from '@/core/date-util';
import { codeToDate } from '@/core/subcategory-code';
import { POST_IMAGE, type PostMainCategoryType, SUB_CATEGORY } from '@/types';
import {
  HorizontalList,
  Image,
  Text,
  TouchableOpacity,
  Vertical2CompList,
  View,
  WIDTH,
} from '@/ui';

import { PostCardHeader } from './components/postcard-header';
import {
  SmallPostImageCard,
  SmallPostVideoCard,
} from './components/small-card';
// import { addData } from '@/core/firebase-bulk';
type Props = {};
const SNAP = WIDTH / 3 - 5;
export const DayList = ({}: Props) => {
  const [image, setImage] = React.useState('');
  const navigation = useNavigation();
  const categories = usePostMainCategoryStore((s) => s.postMainCategory);
  const setCategoryCode = useEditorX((s) => s.setCategoryCode);
  const setFestival = useSearchStore((s) => s.setFestival);
  const setbg = useEditorX((s) => s.setBackground);
  const images = useFestivalStore((s) => s.festival);
  const videos = usePostVideoStore((s) => s.postVideos);
  React.useEffect(() => {
    // addData();
    postImage();
  }, []);
  const postImage = async () => {
    const url = (await getItem(POST_IMAGE)) as string;
    if (url) setImage(url);
  };
  const handleNav3 = async (code: number, subCode: number, image1: any) => {
    setCategoryCode(code);
    setbg(image1, 'photo');
    await setItem(SUB_CATEGORY, subCode);
    navigation.navigate('ImageEditor');
  };
  const handleNav4 = async (code: number, subCode: number, video: any) => {
    setCategoryCode(code);
    setbg(video, 'video');
    await setItem(SUB_CATEGORY, subCode);
    navigation.navigate('ImageEditor');
  };

  const handleNav2 = async () => {
    await setItem(SUB_CATEGORY, 1);
    navigation.navigate('ImageEditor');
  };
  const SmallImageCard = React.useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <SmallPostImageCard item={item} index={index} handleNav={handleNav3} />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const SmallVideoCard = React.useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <SmallPostVideoCard item={item} index={index} handleNav={handleNav4} />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const CardComp = React.useCallback(
    ({ item, index }: { item: PostMainCategoryType; index: number }) => {
      const filteredImages = images.filter((img) => {
        return img.categoryCode === item.code;
      });
      const imagesInRange = filteredImages.filter((img) =>
        isDateInRange(codeToDate(img.subCategory))
      );
      const filteredVideos = videos.filter((img) => {
        return img.categoryCode === item.code;
      });
      const videosInRange = filteredVideos.filter((img) =>
        isDateInRange(codeToDate(img.subCategory))
      );
      return (
        <>
          <TouchableOpacity
            key={`category-card-${index}`}
            style={styles.container2}
            activeOpacity={1}
            onPress={() => {
              setFestival('');
              navigation.navigate('DayList2', { postMainCategory: item });
            }}
            className="mx-5 mt-4 h-32 overflow-hidden rounded-lg bg-green-400"
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
              <Text className="font-sfregular text-3xl leading-10 text-white">
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
          {imagesInRange.length > 0 ? (
            <View className="my-4 h-44">
              <PostCardHeader title={item.name} subtitle={'This Month'} />
              <Text variant="sm" className="mx-5 text-left font-sfregular">
                Images
              </Text>
              <HorizontalList
                key={`horizontal-list-${index}`}
                Comp={SmallImageCard}
                padding={7.5}
                estimatedItemSize={SNAP}
                snapToInterval={SNAP}
                data={imagesInRange}
              />
            </View>
          ) : (
            <View />
          )}
          {videosInRange.length > 0 ? (
            <View className="my-4 h-40">
              <Text variant="sm" className="mx-5 text-left font-sfregular">
                Videos
              </Text>
              <HorizontalList
                key={`horizontal-list-${index}`}
                Comp={SmallVideoCard}
                padding={7.5}
                estimatedItemSize={SNAP}
                snapToInterval={SNAP}
                data={videosInRange}
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
          className="mx-5 mt-2 h-28 overflow-hidden rounded-lg"
          style={styles.container2}
        >
          {image && (
            <Image
              src={image}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: '100%',
                height: '100%',
                opacity: 0.3,
                transform: [{ rotate: '45deg' }, { scale: 1.7 }],
              }}
              resizeMode="contain"
            />
          )}
          <TouchableOpacity
            className="absolute inset-0 items-center justify-center"
            onPress={() => handleNav2()}
            activeOpacity={1}
          >
            <Text className="font-sfbold text-xl leading-10 text-green-400">
              Continue Last Post 🚀
            </Text>
          </TouchableOpacity>
        </View>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [image]
  );

  return (
    <View className="flex-1">
      <Vertical2CompList
        Comp={CardComp}
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
