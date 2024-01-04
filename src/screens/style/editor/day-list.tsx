/* eslint-disable react-hooks/exhaustive-deps */
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
  useSubCategoryStore,
} from '@/core';
import { isDateInRange } from '@/core/date-util';
import type { FestivalType, PostVideoType } from '@/types';
import {
  F_MAIN_CAROUSEL2,
  POST_IMAGE,
  type PostMainCategoryType,
  SUB_CATEGORY,
} from '@/types';
import {
  HEIGHT,
  HorizontalList,
  Image,
  MainCarousel,
  ScrollView,
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
type Props = {};
const SNAP = WIDTH / 3 - 5;
export const DayList = ({}: Props) => {
  const [image, setImage] = React.useState('');
  const navigation = useNavigation();
  const categories = usePostMainCategoryStore((s) => s.postMainCategory);
  const setCategoryCode = useEditorX((s) => s.setCategoryCode);
  const setFestival = useSearchStore((s) => s.setFestival);
  const codeToDate = useSubCategoryStore((s) => s.codeToDate);
  const setbg = useEditorX((s) => s.setBackground);
  const images = useFestivalStore((s) => s.festival);
  const videos = usePostVideoStore((s) => s.postVideos);
  React.useEffect(() => {
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
    ({ item, index }: { item: FestivalType; index: number }) => {
      return (
        <SmallPostImageCard item={item} index={index} handleNav={handleNav3} />
      );
    },
    []
  );
  const SmallVideoCard = React.useCallback(
    ({ item, index }: { item: PostVideoType; index: number }) => {
      return (
        <SmallPostVideoCard item={item} index={index} handleNav={handleNav4} />
      );
    },
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
            className="mt-4 h-32 overflow-hidden rounded-lg bg-green-400"
          >
            {item?.image && (
              <Image
                src={item.image}
                className="h-full w-full"
                resizeMode="cover"
              />
            )}
            <View className="absolute h-full w-full items-center justify-center">
              <Text className="font-sfregular text-3xl leading-10 text-white">
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
          {imagesInRange.length > 0 ? (
            <View className="my-4 h-44">
              <PostCardHeader title={item?.name} subtitle={'This Month'} />
              <Text variant="sm" className="mx-5 text-left font-sfregular">
                Images
              </Text>
              <HorizontalList
                key={`horizontal-list-${index}`}
                Comp={SmallImageCard}
                padding={7.5}
                estimatedItemSize={SNAP}
                snapToInterval={SNAP}
                data={imagesInRange.slice(0, 10)}
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
                data={videosInRange.slice(0, 10)}
              />
            </View>
          ) : (
            <View />
          )}
        </>
      );
    },
    [
      SmallImageCard,
      SmallVideoCard,
      codeToDate,
      images,
      navigation,
      setFestival,
      videos,
    ]
  );
  const CardCompHeader = React.useCallback(() => {
    return (
      <View
        key={`category-card-header`}
        className="mt-2 h-28 overflow-hidden rounded-lg"
        style={styles.container2}
      >
        {image && (
          <Image src={image} style={styles.imageMain} resizeMode="contain" />
        )}
        <TouchableOpacity
          className="absolute h-full w-full items-center justify-center"
          onPress={() => handleNav2()}
          activeOpacity={1}
        >
          <Text
            className="font-sfbold text-xl leading-10 text-green-400"
            tx={'editor.continue_last_post'}
          />
        </TouchableOpacity>
      </View>
    );
  }, [image]);
  const PostCategoryList = React.useCallback(() => {
    return (
      <>
        <View className="py-2 pt-4 ">
          <MainCarousel name={F_MAIN_CAROUSEL2} />
        </View>
      </>
    );
  }, []);

  return (
    <ScrollView className="flex-1">
      <View className="h-60 w-full">{PostCategoryList()}</View>
      <View style={styles.cStyle}>
        <Vertical2CompList
          Comp={CardComp}
          Header={image ? CardCompHeader : null}
          data={categories}
          estimatedItemSize={300}
          numColumn={1}
        />
      </View>
    </ScrollView>
  );
};
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
  cStyle: {
    width: WIDTH,
    height: HEIGHT * 4 - 80,
  },
  imageMain: {
    width: '100%',
    height: '100%',
    opacity: 0.3,
    transform: [{ rotate: '45deg' }, { scale: 1.7 }],
  },
});
// Abs => Abstract 1
// Fest => Festival 2
// Bus => Business 3
// SD => Special Days 4
// Gd => Greetings 5
