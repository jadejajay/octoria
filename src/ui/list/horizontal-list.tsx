import * as React from 'react';

import { EmptyList2 } from './emty-list2';
import { List } from './list-styled';

type Props = {
  data: any;
  Comp: any;
  Header?: any;
  onEndReached?: () => void;
  padding?: number;
  snapToInterval?: number;
  estimatedItemSize?: number;
};
export const HorizontalList = ({
  data,
  Comp,
  Header,
  padding,
  onEndReached,
  snapToInterval,
  estimatedItemSize = 100,
}: Props) => {
  return (
    <List
      data={data}
      horizontal
      contentContainerStyle={{ paddingLeft: padding || 0 }}
      pagingEnabled
      onEndReached={onEndReached}
      keyExtractor={(_, index) => {
        return index.toString();
      }}
      snapToInterval={snapToInterval}
      estimatedItemSize={estimatedItemSize}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={<EmptyList2 isLoading={false} />}
      renderItem={Comp}
      ListHeaderComponent={Header}
    />
  );
};
