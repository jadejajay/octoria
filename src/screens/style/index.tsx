/* eslint-disable max-lines-per-function */
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler } from 'react-native';

import { speak } from '@/core';
import { getGreetingByTimezone } from '@/core/greet';
import useFirestoreLiveQuery from '@/core/hooks/use-firestore';
import { useMainCategories } from '@/core/mainscreen';
import { useProductsStore } from '@/core/mainscreen/products';
import { useSearchStore } from '@/core/mainscreen/search';
import { useUserStore } from '@/core/mainscreen/user';
import { FocusAwareStatusBar, ScrollView, View } from '@/ui';
import { MainCarousel } from '@/ui/core/carousel';
import { ChooseBrand } from '@/ui/widgets/mainscreen/categories-title';
import { Greeting } from '@/ui/widgets/mainscreen/greet';
import { CategoriesList } from '@/ui/widgets/mainscreen/horizontal-list';
import { SearchBar } from '@/ui/widgets/mainscreen/search-bar';
import { NewProductList } from '@/ui/widgets/mainscreen/two-item-verticle-list';

import { PostCard } from './post-maker';
import { PostModal } from './post-modal';

export const Style = () => {
  console.log('Style screen loaded', Date.now());

  const [modalVisible, setModalVisible] = useState(false);
  const { navigate } = useNavigation();
  const { MainCategoriesData, isLoading, subscribeToMainCategories } =
    useMainCategories();
  // const User = useUserStore((s) => s.user.name);
  const User = useUserStore((s) => s.user);
  const setSearch = useSearchStore((s) => s.setSearch);
  const FestivalImage = useFirestoreLiveQuery('FestivalImage');
  const { productLoading, products } = useProductsStore();
  const data = useCallback(
    () => products.filter((product) => product.featured),
    [products]
  );
  //use effects start//////////////////////////////
  useEffect(() => {
    if (User.name) {
      setModalVisible((prev) => {
        if (prev) return prev;
        return true;
      });
    }
  }, [User.name]);
  React.useEffect(() => {
    if (User.name) {
      const greet = getGreetingByTimezone();
      // Subscribe to real-time updates
      speak(`${greet} ${User.name}, welcome back`);
    }
  }, [User]);
  React.useEffect(() => {
    const unsubscribe = subscribeToMainCategories();

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  });
  // const ff = () => {
  //   FFmpegKit.execute('-formats').then(async (session) => {
  //     const returnCode = await session.getReturnCode();

  //     if (ReturnCode.isSuccess(returnCode)) {
  //       // SUCCESS
  //       console.log('ffmpeg command run successful');
  //     } else if (ReturnCode.isCancel(returnCode)) {
  //       // CANCEL
  //       console.log('ffmpeg command run cancelled');
  //     } else {
  //       // ERROR
  //       console.log('ffmpeg command run failed');
  //     }
  //   });
  // };
  const backAction = () => {
    Alert.alert('Exit App', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        // onPress: () => ff(),
        style: 'cancel',
      },
      {
        text: 'Exit',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };
  const PostcardCategory = React.useCallback(() => {
    return (
      <>
        <PostCard />
        <ChooseBrand
          title={'New Arrivals'}
          subtitle={'Our Newly Arrived Products'}
          link={() => {
            setSearch('Hardware');
            //@ts-ignore
            navigate('FeedNavigator', {
              screen: 'Feed',
            });
          }}
        />
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const PostCategoryList = React.useCallback(() => {
    return (
      <>
        <Greeting />
        <View className="py-2 pt-4 ">
          <MainCarousel />
        </View>
        <ChooseBrand title={'Categories'} />
      </>
    );
  }, []);
  const FestivalImageModal = React.useCallback(() => {
    return (
      <>
        {productLoading ? (
          FestivalImage.isLoading ? null : null
        ) : (
          <PostModal
            data={FestivalImage.data}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            User={User}
          />
        )}
      </>
    );
  }, [FestivalImage, User, modalVisible, productLoading]);

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <View className="pt-4">
          <SearchBar />
        </View>
        {PostCategoryList()}
        <View className="w-full">
          {isLoading ? null : <CategoriesList data={MainCategoriesData} />}
        </View>
        {PostcardCategory()}
        <View className="h-full w-full">
          {data().length > 0 && (
            <NewProductList data={data()} isLoading={productLoading} />
          )}
        </View>

        {FestivalImageModal()}
      </ScrollView>
    </>
  );
};
