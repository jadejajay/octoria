import * as React from 'react';

import { useFavorites } from '@/core';
import { EmptyList, LikedCard, List, View } from '@/ui';

type Props = {};
export const AddPost = ({}: Props) => {
  const { favorites, isLoading, deleteFavorite } = useFavorites();

  return (
    <View className="flex-1 p-2">
      <List
        key={'8347439'}
        data={favorites}
        keyExtractor={(_, index) => index.toString()}
        estimatedItemSize={100}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        renderItem={({ item, index }) => {
          return (
            <LikedCard
              index={index}
              item={item}
              deleteFavorite={deleteFavorite}
            />
          );
        }}
      />
    </View>
  );
};
