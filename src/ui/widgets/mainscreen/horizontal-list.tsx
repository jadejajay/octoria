import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

import { useSearchStore } from '@/core';
import type { MainCategory } from '@/types';
import { RectCard } from '@/ui/core';
import { List } from '@/ui/list';
import { WIDTH } from '@/ui/theme';

type Props = {
  data: MainCategory[];
};
export const CategoriesList = ({ data }: Props) => {
  const { navigate } = useNavigation();
  const setSearch = useSearchStore((s) => s.setSearch);
  const CList = React.useCallback(() => {
    return (
      <List
        data={data}
        horizontal
        estimatedItemSize={WIDTH / 2}
        snapToInterval={WIDTH / 2}
        renderItem={({ item }) => {
          return (
            <RectCard
              item={{
                title: item.title,
                color: item?.color!,
                image: item.image,
              }}
              onClick={() => {
                setSearch(`${item.title}`);
                //@ts-ignore
                navigate('FeedNavigator', {
                  screen: 'Feed',
                });
              }}
            />
          );
        }}
        showsHorizontalScrollIndicator={false}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{CList()}</>;
};
