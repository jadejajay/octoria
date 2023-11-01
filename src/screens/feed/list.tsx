/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { useProductsStore } from '@/core/mainscreen/products';
import { useSearchStore } from '@/core/mainscreen/search';
import type { Product } from '@/types';
import { EmptyList, FocusAwareStatusBar, List, View } from '@/ui';
import { Header } from '@/ui/widgets/products-list/header';

import { Card } from './card';

export const Feed = () => {
  const search = useSearchStore((s) => s.text);
  const [globalSearch, setGlobalSearch] = React.useState<string>('');
  const [initialData, setInitialData] = React.useState<any[]>([]);
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

  const handleLoadMore = () => {};

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
        ListEmptyComponent={<EmptyList isLoading={false} />}
        keyExtractor={(_, index) => `item-${index}`}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};
