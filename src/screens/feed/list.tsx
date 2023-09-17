/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, { useEffect } from 'react';

import { Env } from '@/core/env';
import { getItem } from '@/core/storage';
import { EmptyList, FocusAwareStatusBar, List, Text, View } from '@/ui';
import type { Product } from '@/ui/widgets/product-type';
import { Header } from '@/ui/widgets/products-list/header';

import { Card } from './card';

export const Feed = () => {
  const [globalSearch, setGlobalSearch] = React.useState<string>('');
  const [initialData, setInitialData] = React.useState<any[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const isFocused = useIsFocused();

  const fetchData = async (query: string) => {
    // Replace 'your_api_endpoint' with the actual API endpoint for paginated search
    try {
      setIsLoading(true);
      const response = await fetch(
        `${Env.API_URL}octoria/search.php?search=${query}&page=${currentPage}`
      );
      const jsonData = await response.json();

      setInitialData([...initialData, ...jsonData.data]);
      setTotalPages(jsonData.totalPages);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };
  const fetchData2 = async (query: string) => {
    // Replace 'your_api_endpoint' with the actual API endpoint for paginated search
    try {
      setIsLoading(true);
      const response = await fetch(
        `${Env.API_URL}octoria/search.php?search=${query}&page=${currentPage}`
      );
      const jsonData = await response.json();
      setInitialData(jsonData.data);
      setTotalPages(jsonData.totalPages);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };
  const { navigate } = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      // Perform actions or fetch data here
      const search = getItem<string>('search') || 'Hardware';
      setGlobalSearch(search);
      // Don't forget to return a cleanup function if necessary
      return () => {
        // Perform cleanup when the screen loses focus (optional)
      };
    }, [])
  );
  useEffect(() => {
    fetchData2(globalSearch);
  }, [globalSearch, isFocused]);

  const handleSearch = () => {
    setCurrentPage(1);
    setInitialData([]);
    fetchData2(globalSearch);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchData(globalSearch);
    }
  };

  const renderItem = React.useCallback(
    ({ item }: { item: Product }) => (
      <Card item={item} onPress={() => navigate('Post', { id: item.id })} />
    ),
    [navigate]
  );

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }
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
        estimatedItemSize={50}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        keyExtractor={(_, index) => `item-${index}`}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};
