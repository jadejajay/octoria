import * as React from 'react';

import { EmptyList } from './empty-list';
import { List } from './list-styled';

type Props = {
  data: any;
  Comp: any;
  Header?: any;
  onEndReached?: () => void;
  snapToInterval?: number;
  estimatedItemSize?: number;
};
export const HorizontalList = ({
  data,
  Comp,
  Header,
  onEndReached,
  snapToInterval,
  estimatedItemSize = 100,
}: Props) => {
  return (
    <List
      data={data}
      horizontal
      pagingEnabled
      onEndReached={onEndReached}
      keyExtractor={(_, index) => {
        return index.toString();
      }}
      snapToInterval={snapToInterval}
      estimatedItemSize={estimatedItemSize}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={<EmptyList isLoading={false} />}
      renderItem={Comp}
      ListHeaderComponent={Header}
    />
  );
};
