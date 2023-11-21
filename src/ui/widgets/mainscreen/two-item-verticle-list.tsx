import * as React from 'react';

import type { Product } from '@/types';
import { EmptyList, List } from '@/ui/list';

// import { FlatList } from 'react-native';
import { ProductCardHorizontal } from './product-card-horizontal';

type Props = {
  data: Product[];
  isLoading: boolean;
};
export const NewProductList = ({ data, isLoading }: Props) => {
  console.log('new Product List loaded', Date.now());
  const ListComponent = React.useCallback(
    () => (
      <List
        key={7735}
        data={data}
        renderItem={({ item, index }) => (
          <ProductCardHorizontal item={item} index={index} />
        )}
        estimatedItemSize={200}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        keyExtractor={(_, index) => `product-item-${index}`}
        numColumns={2}
        // onEndReached={() => handle()}
        onEndReachedThreshold={0.1}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return <>{ListComponent()}</>;
};
