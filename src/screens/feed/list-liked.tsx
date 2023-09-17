import * as React from 'react';

import useFavorites from '@/core/hooks/use-favorite';
import { EmptyList, List, View } from '@/ui';
import { LikedCard } from '@/ui/widgets/liked/horizontal-card';

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
