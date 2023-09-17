import * as React from 'react';

// import { FlatList } from 'react-native';
import { EmptyList, List } from '@/ui';

import type { Product } from '../product-type';
import { ProductCardHorizontal } from './product-card-horizontal';

type Props = {
  data: Product[];
  isLoading: boolean;
};
export const NewProductList = ({ data, isLoading }: Props) => {
  return (
    <List
      key={7735}
      data={data}
      renderItem={({ item, index }) => (
        <ProductCardHorizontal item={item} index={index} />
      )}
      estimatedItemSize={100}
      ListEmptyComponent={<EmptyList isLoading={isLoading} />}
      keyExtractor={(_, index) => `item-${index}`}
      numColumns={2}
      // onEndReached={() => handle()}
      onEndReachedThreshold={0.1}
    />
  );
};
