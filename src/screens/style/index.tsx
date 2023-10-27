/* eslint-disable max-lines-per-function */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { speak, useEditorX } from '@/core';
import { getGreetingByTimezone } from '@/core/greet';
import useFirestoreLiveQuery from '@/core/hooks/use-firestore';
import { useMainCategories } from '@/core/mainscreen';
import { useProductsStore } from '@/core/mainscreen/products';
import { setItem } from '@/core/storage';
import type { UserType } from '@/types';
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
  const id = auth().currentUser?.uid;
  const { navigate } = useNavigation();
  const { MainCategoriesData, isLoading, subscribeToMainCategories } =
    useMainCategories();
  const setBusiness = useEditorX((s) => s.setBusiness);
  const FestivalImage = useFirestoreLiveQuery('FestivalImage');
  const { productLoading, products } = useProductsStore();
  const data = products.filter((product) => product.featured);
  //use effects start//////////////////////////////
  // React.useEffect(() => {
  //   const greet = getGreetingByTimezone();

  //   speak(`${greet} sir, welcome back`);
  // }, []);
  React.useEffect(() => {
    const greet = getGreetingByTimezone();
    const collection = firestore().collection('Users').doc(id).get();
    // Subscribe to real-time updates
    const _unsubscribe = collection.then((doc) => {
      if (doc.exists) {
        const User = doc.data() as UserType;
        speak(`${greet} ${User?.name} sir, welcome back`);
        setBusiness(User?.info);
      } else {
        speak(`${greet} sir, welcome back`);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  React.useEffect(() => {
    const unsubscribe = subscribeToMainCategories();

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const PostcardCategory = React.useCallback(() => {
    return (
      <>
        <PostCard />
        <ChooseBrand
          title={'New Arrivals'}
          subtitle={'Our Newly Arrived Products'}
          link={() => {
            setItem('search', 'Hardware');
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
          {data.length > 0 && (
            <NewProductList data={data} isLoading={productLoading} />
          )}
        </View>

        {FestivalImage.isLoading ? null : (
          <PostModal data={FestivalImage.data} />
        )}
      </ScrollView>
    </>
  );
};
