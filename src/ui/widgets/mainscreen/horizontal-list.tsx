import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FlatList } from 'react-native';

import type { MainCategory } from '@/types';
import { View } from '@/ui';
import { RectCard } from '@/ui/core/rect-card';
import { useSearchStore } from '@/core/mainscreen/search';

type Props = {
  data: MainCategory[];
};
export const CategoriesList = ({ data }: Props) => {
  const { navigate } = useNavigation();
  const setSearch = useSearchStore((s) => s.setSearch);
  const List = React.useCallback(() => {
    return (
      <FlatList
        data={data}
        horizontal
        renderItem={({ item }) => {
          return (
            <View className="ml-2">
              <RectCard
                item={{
                  title: item.title,
                  color: item?.color!,
                  image: item.image,
                }}
                onClick={() => {
                  setSearch(`${item.title}`)
                  //@ts-ignore
                  navigate('FeedNavigator', {
                    screen: 'Feed',
                  });
                }}
              />
            </View>
          );
        }}
        showsHorizontalScrollIndicator={false}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{List()}</>;
};
