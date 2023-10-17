import * as React from 'react';

import { EmptyList, List } from '@/ui';

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
  estimatedItemSize = 50,
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
