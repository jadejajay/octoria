import * as React from 'react';

import { EmptyList } from './empty-list';
import { List } from './list-styled';

type Props = {
  data: any;
  Comp: any;
  Header?: any;
  style?: any;
  onEndReached?: () => void;
  snapToInterval?: number;
  estimatedItemSize?: number;
  numColumn?: number;
};
export const Vertical2CompList = ({
  data,
  Comp,
  style,
  Header,
  onEndReached,
  numColumn = 2,
  snapToInterval,
  estimatedItemSize = 100,
}: Props) => {
  return (
    <List
      data={data}
      contentContainerStyle={style}
      numColumns={numColumn}
      onEndReached={onEndReached}
      keyExtractor={(_, index) => {
        return index.toString();
      }}
      snapToInterval={snapToInterval}
      estimatedItemSize={estimatedItemSize}
      ListEmptyComponent={<EmptyList isLoading={false} />}
      renderItem={Comp}
      ListHeaderComponent={Header}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
    />
  );
};
