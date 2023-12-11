/* eslint-disable max-lines-per-function */
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as Animated from 'react-native-animatable';

import {
  setItem,
  useEditorX,
  useFestivalStore,
  usePostVideoStore,
  useSearchStore,
  useSubCategoryStore,
} from '@/core';
import type {
  FestivalType,
  PostMainCategoryType,
  PostVideoType,
} from '@/types';
import { SUB_CATEGORY } from '@/types';
import { HorizontalList, Text, Vertical2CompList, View, WIDTH } from '@/ui';

import { PostCardHeader } from './components/postcard-header';
import { FestivalSearchBar } from './components/searchbar';
import {
  SmallPostImageCard,
  SmallPostVideoCard,
} from './components/small-card';

type Props = {
  route: any;
};
const SNAP = WIDTH / 3 - 5;
export const DayList2 = ({ route }: Props) => {
  const postMainCategory = route.params
    .postMainCategory as PostMainCategoryType;
  const images = useFestivalStore((s) => s.festival);
  const videos = usePostVideoStore((s) => s.postVideos);
  const searchText = useSearchStore((s) => s.festival);
  const list_of_subcategory = useSubCategoryStore((s) => s.SubCategory);
  const codeToSubcategory = useSubCategoryStore((s) => s.codeToSubcategory);
  const codeToDateFormated = useSubCategoryStore((s) => s.codeToDateFormated);
  const filteredImages = images.filter((img) => {
    return img?.categoryCode === postMainCategory.code;
  });
  const filteredVideos = videos.filter((img) => {
    return img?.categoryCode === postMainCategory.code;
  });
  const combinedData = filteredImages.map((festival) => ({
    ...festival,
    ...list_of_subcategory.find((code) => code.code === festival.subCategory),
  }));
  const today = new Date();
  const sortedFestivals = combinedData.map((festival) => {
    if (festival.date === undefined) return festival;
    const festivalDate = new Date(
      parseInt(festival.date.split('/')[2], 10),
      parseInt(festival.date.split('/')[1], 10) - 1,
      parseInt(festival.date.split('/')[0], 10)
    );
    const dateDifference = Math.floor(
      //@ts-ignore
      (festivalDate - today) / (1000 * 60 * 60 * 24)
    );
    if (dateDifference >= -1) return { ...festival, dateDifference };
    return { ...festival, dateDifference: 365 + dateDifference };
  });
  //@ts-ignore
  sortedFestivals.sort((a, b) => a.dateDifference - b.dateDifference);
  const sortedFestivals2 = combinedData.map((festival) => {
    if (festival.date === undefined) return festival;
    if (festival.date === 'every') return festival;
  });
  //@ts-ignore
  const semiFinalArray = sortedFestivals.concat(sortedFestivals2);
  const uniqueCategoryCodesSet = new Set<number>();
  const newArray: FestivalType[] = semiFinalArray.reduce((result, obj) => {
    // Check if the categoryCode is not in the Set
    if (!uniqueCategoryCodesSet.has(obj?.subCategory)) {
      // Add the object to the result array
      //@ts-ignore
      result.push(obj);
      // Add the categoryCode to the Set to mark it as seen
      uniqueCategoryCodesSet.add(obj?.subCategory);
    }
    return result;
  }, []);
  function fuzzySearch(query: string): FestivalType[] {
    return newArray.filter((festival) => {
      if (festival?.tags === undefined) return null;
      const fieldValue = festival?.tags.toLowerCase();
      const lowercasedQuery = query.toLowerCase();
      // Check if the field value contains the query as a whole or substring
      return fieldValue.includes(lowercasedQuery);
    });
  }
  // match date and tags field with search text and return filtered array
  const finalArray = fuzzySearch(searchText);
  const navigation = useNavigation();
  const setCategoryCode = useEditorX((s) => s.setCategoryCode);
  const setbg = useEditorX((s) => s.setBackground);

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
  const SmallVideoCard = React.useCallback(
    ({ item, index }: { item: PostVideoType; index: number }) => {
      return (
        <SmallPostVideoCard item={item} index={index} handleNav={handleNav4} />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const SmallImageCard = React.useCallback(
    ({ item, index }: { item: FestivalType; index: number }) => {
      return (
        <SmallPostImageCard item={item} index={index} handleNav={handleNav3} />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const PostListCard = React.useCallback(
    ({ index, item }: { index: number; item: FestivalType }) => {
      console.log(item, 'item');

      const imagesWithSameSubcategory = filteredImages.filter(
        (img) => img.subCategory === item.subCategory
      );
      const videosWithSameSubcategory = filteredVideos.filter(
        (img) => img.subCategory === item.subCategory
      );

      return (
        <>
          <View key={index} className="my-2">
            <Animated.View
              key={index}
              animation="zoomIn"
              delay={((index % 10) + 1) * 400}
              style={styles.button}
            >
              <PostCardHeader
                title={codeToSubcategory(item.subCategory)}
                subtitle={codeToDateFormated(item.subCategory)}
              />
              {imagesWithSameSubcategory.length > 0 && (
                <>
                  <Text
                    variant="sm"
                    className="mx-5 text-left font-sfregular"
                    tx={'editor.images'}
                  />
                  <HorizontalList
                    key={`horizontal-list-${index}`}
                    Comp={SmallImageCard}
                    padding={7.5}
                    estimatedItemSize={SNAP}
                    snapToInterval={SNAP}
                    data={imagesWithSameSubcategory}
                  />
                </>
              )}
              {videosWithSameSubcategory.length > 0 && (
                <>
                  <Text
                    variant="sm"
                    className="mx-5 text-left font-sfregular"
                    tx={'editor.videos'}
                  />
                  <HorizontalList
                    key={`horizontal-list-${index}`}
                    Comp={SmallVideoCard}
                    padding={7.5}
                    estimatedItemSize={SNAP}
                    snapToInterval={SNAP}
                    data={videosWithSameSubcategory}
                  />
                </>
              )}
            </Animated.View>
          </View>
        </>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filteredImages, filteredVideos, finalArray]
  );

  return (
    <>
      <View className="absolute inset-x-0 top-3 z-20 items-center justify-center">
        <FestivalSearchBar />
      </View>
      <Vertical2CompList
        style={styles.cStyle}
        Comp={PostListCard}
        data={finalArray.slice(0, 4)}
        estimatedItemSize={400}
        numColumn={1}
      />
    </>
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
  button: {
    flex: 1,
  },
  cStyle: {
    paddingTop: 80,
  },
});
