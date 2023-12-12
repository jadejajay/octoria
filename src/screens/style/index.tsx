/* eslint-disable max-lines-per-function */
import { Stagger } from '@animatereactnative/stagger';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler } from 'react-native';
import { BounceInUp } from 'react-native-reanimated';

import {
  getGreetingByTimezone,
  speak,
  translate,
  useFirestoreLiveQuery,
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
  WIDTH,
} from '@/ui';

import { PostCard } from './post-maker';
import { PostModal } from './post-modal';

export const Style = () => {
  // console.log('Style screen loaded', Date.now());

  const [modalVisible, setModalVisible] = useState(false);
  const [update, setUpdate] = useState(1);
  const { navigate } = useNavigation();

  const MainCategories = useFirestoreLiveQuery('MainCategory');
  // console.log(MainCategories, '<=====MainCategories');

  const User = useUserStore((s) => s.user);
  const setSearch = useSearchStore((s) => s.setSearch);
  const FestivalImage = useFirestoreLiveQuery('FestivalImage');

  const { productLoading, products } = useProductsStore();
  const [assist, _] = useAssistance();
  const data = useCallback(
    () => products.filter((product) => product.featured).slice(0, 6),
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
      const hello = translate('mainscreen.hello');
      const vars = `${hello} ${User.name}. ${greet}`;

      // Subscribe to real-time updates
      if (assist) speak('assistance.welcome_back', vars);
    }
  }, [User.name, assist]);

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
          title={'mainscreen.new_prod'}
          subtitle={'mainscreen.subtitle_new_prod'}
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
          <MainCarousel name={'MainCarousel'} />
        </View>
        <ChooseBrand title={'mainscreen.categories'} />
      </>
    );
  }, []);
  const FestivalImageModal = React.useCallback(() => {
    return (
      <>
        {productLoading ? null : FestivalImage.isLoading ? null : (
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
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y < 0) {
            setUpdate((prev) => prev + 1);
          }
        }}
        className="flex-1"
      >
        <View className="pt-4">
          <SearchBar />
        </View>
        {PostCategoryList()}
        <Stagger
          key={`stagger-view-${update}`}
          stagger={50}
          entering={() => BounceInUp}
          duration={600}
          exitDirection={-1}
          style={{
            width: WIDTH,
          }}
        >
          <View className="w-full">
            {MainCategories.isLoading ? null : (
              <CategoriesList data={MainCategories.data} />
            )}
          </View>
          {PostcardCategory()}
        </Stagger>
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
