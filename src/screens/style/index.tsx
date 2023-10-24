// import MenuIcon from '@/ui/icons/menu';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { speak } from '@/core';
import { getGreetingByTimezone } from '@/core/greet';
import useFirestoreLiveQuery from '@/core/hooks/use-firestore';
import { useMainCategories } from '@/core/mainscreen';
import { useProductsStore } from '@/core/mainscreen/products';
// import useMainCategories from '@/core/hooks/use-main-categories';
import { setItem } from '@/core/storage';
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
  const { navigate } = useNavigation();
  const { MainCategoriesData, isLoading, subscribeToMainCategories } =
    useMainCategories();
  const FestivalImage = useFirestoreLiveQuery('FestivalImage');
  const { productLoading, products } = useProductsStore();
  const data = products.filter((product) => product.featured);
  //use effects start//////////////////////////////
  React.useEffect(() => {
    const greet = getGreetingByTimezone();
    speak(`${greet} sir, welcome back`);
  }, []);
  React.useEffect(() => {
    const unsubscribe = subscribeToMainCategories();

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Greeting />

        <View className="py-2 pt-4 ">
          <MainCarousel />
        </View>
        <ChooseBrand title={'Categories'} />
        <View className="w-full">
          {isLoading ? null : <CategoriesList data={MainCategoriesData} />}
        </View>
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

// const newProducts = [
//   {
//     id: '60ddc1b0c9e9f40015f1b0a1',
//     images: [
//       'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8Mnx8c2tpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//     ],
//     name: '1001 XYLO',
//     price: '100',
//     description:
//       'Stainless Steel Tower Bolt Which Is Used To Stainless Steel Tower Bolt Which Is Used To',
//     category: 'Hardware',
//     subCategory: 'Tower Bolt',
//     sizes: ['4"'],
//     material: 'Stainless Steel',
//     finishing: ['Polished'],
//     type: 'Tower Bolt',
//     quantity: [1],
//     featured: true,
//     createdAt: '2021-07-01T12:00:00.000Z',
//     updatedAt: '2021-07-01T12:00:00.000Z',
//   },
// ];
