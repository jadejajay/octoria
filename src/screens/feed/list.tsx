/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import useFirestoreDocLiveQuery from '@/core/hooks/use-firestore-doc';
import { useProductsStore } from '@/core/mainscreen/products';
import { getItem } from '@/core/storage';
import type { Product } from '@/types';
import { EmptyList, FocusAwareStatusBar, List, Text, View } from '@/ui';
import { Header } from '@/ui/widgets/products-list/header';

import { Card } from './card';

export const Feed = () => {
  const search = getItem<string>('search') || 'Hardware';
  const [globalSearch, setGlobalSearch] = React.useState<string>('');
  const [initialData, setInitialData] = React.useState<any[]>([]);
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  // const [isError, setIsError] = React.useState(false);
  // const server = useFirestoreDocLiveQuery('links', 'server');
  const { products } = useProductsStore();

  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  function filterProductsBySearchWord(searchWord: string) {
    if (!searchWord) setInitialData([]);
    const lowerCaseSearchWord = searchWord.toLowerCase(); // Convert search word to lowercase for case-insensitive search
    const sd = products.filter((product: Product) =>
      Object.values(product).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerCaseSearchWord);
        }
        return false;
      })
    );
    if (sd !== undefined && sd !== null) setInitialData(sd);
  }

  // const fetchData = async (query: string) => {
  //   // Replace 'your_api_endpoint' with the actual API endpoint for paginated search
  //   try {
  //     setIsLoading(true);
  //     if (!server.isLoading) {
  //       const response = await fetch(
  //         `${server.data?.url}octoria/search.php?search=${query}&page=${currentPage}`
  //       );
  //       const jsonData = await response.json();

  //       setInitialData([...initialData, ...jsonData.data]);
  //       setTotalPages(jsonData.totalPages);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     setIsError(true);
  //   }
  // };
  // const fetchData2 = async (query: string) => {
  //   // Replace 'your_api_endpoint' with the actual API endpoint for paginated search
  //   try {
  //     setIsLoading(true);
  //     if (!server.isLoading) {
  //       const response = await fetch(
  //         `${server.data?.url}octoria/search.php?search=${query}&page=${currentPage}`
  //       );
  //       const jsonData = await response.json();
  //       setInitialData(jsonData.data);
  //       setTotalPages(jsonData.totalPages);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     setIsError(true);
  //   }
  // };
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Perform actions or fetch data here

  //     // Don't forget to return a cleanup function if necessary
  //     return () => {
  //       // Perform cleanup when the screen loses focus (optional)
  //     };
  //   }, [])
  // );
  useEffect(() => {
    setGlobalSearch(search);
  }, [search]);
  useEffect(() => {
    filterProductsBySearchWord(globalSearch);
  }, [globalSearch, isFocused]);

  const handleSearch = () => {
    // setCurrentPage(1);
    setInitialData([]);
    filterProductsBySearchWord(globalSearch);
  };

  const handleLoadMore = () => {
    // if (currentPage < totalPages) {
    //   setCurrentPage(currentPage + 1);
    //   fetchData(globalSearch);
    // }
  };

  const renderItem = React.useCallback(
    ({ item }: { item: Product }) => (
      <Card
        key={`card-${item.id}`}
        item={item}
        onPress={() => navigate('Post', { id: item.id })}
      />
    ),
    []
  );

  // if (isError) {
  //   return (
  //     <View>
  //       <Text> Error Loading data </Text>
  //     </View>
  //   );
  // }
  return (
    <View className="flex-1">
      <FocusAwareStatusBar />
      <Header
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
        handle={handleSearch}
      />
      <List
        key={77355}
        data={initialData}
        renderItem={renderItem}
        estimatedItemSize={60}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        keyExtractor={(_, index) => `item-${index}`}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};
