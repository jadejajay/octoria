/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { useProductsStore, useSearchStore } from '@/core';
import type { Product } from '@/types';
import {
  EmptyList,
  FocusAwareStatusBar,
  Header,
  HEIGHT,
  List,
  View,
} from '@/ui';
import { Card } from '@/ui/widgets/mainscreen/card';

export const Feed = () => {
  const search = useSearchStore((s) => s.text);
  const [globalSearch, setGlobalSearch] = React.useState<string>('');
  const [initialData, setInitialData] = React.useState<any[]>([]);
  const [update, setUpdate] = React.useState(1);
  const [limit, setLimit] = React.useState(20);
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
    setInitialData([]);
    filterProductsBySearchWord(globalSearch);
  };

  const handleLoadMore = () => {
    setLimit((prev) => prev + 20);
  };

  const renderItem = React.useCallback(
    ({ item, index }: { item: Product; index: number }) => (
      <Card
        key={`card-${item.id}`}
        item={item}
        index={index}
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
        key={`list-${update}`}
        data={initialData.slice(0, limit)}
        renderItem={renderItem}
        estimatedItemSize={HEIGHT / 2.2}
        ListEmptyComponent={<EmptyList isLoading={false} />}
        keyExtractor={(_, index) => `item-${index}`}
        numColumns={2}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y < 0) {
            setUpdate((prev) => prev + 1);
          }
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};
