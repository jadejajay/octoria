/* eslint-disable max-lines-per-function */
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler } from 'react-native';

import {
  getGreetingByTimezone,
  speak,
  useFirestoreLiveQuery,
  useMainCategories,
  useProductsStore,
  useSearchStore,
  useUserStore,
} from '@/core';
import { useAssistance } from '@/core/hooks/use-assistance';
import {
  CategoriesList,
  ChooseBrand,
  FocusAwareStatusBar,
  Greeting,
  MainCarousel,
  NewProductList,
  ScrollView,
  SearchBar,
  View,
} from '@/ui';

import { PostCard } from './post-maker';
import { PostModal } from './post-modal';

export const Style = () => {
  console.log('Style screen loaded', Date.now());

  const [modalVisible, setModalVisible] = useState(false);
  const { navigate } = useNavigation();
  const { MainCategoriesData, isLoading, subscribeToMainCategories } =
    useMainCategories();
  const User = useUserStore((s) => s.user);
  const setSearch = useSearchStore((s) => s.setSearch);
  const FestivalImage = useFirestoreLiveQuery('FestivalImage');

  const { productLoading, products } = useProductsStore();
  const [assist, _] = useAssistance();
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
      console.log(assist, '<========assisatnce');

      // Subscribe to real-time updates
      if (assist) speak(`${greet} ${User.name}, welcome back`);
    }
  }, [User, assist]);
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

export * from './editor';
export * from './image-editor';
export * from './webview';
