import * as React from 'react';
import { FlatList } from 'react-native';

import type { MainCategory } from '@/types';

import { CategoriesCard } from './categories-card';

type Props = {
  data: MainCategory[];
};
export const CategoriesList = ({ data }: Props) => {
  return (
    <FlatList
      data={data}
      horizontal
      renderItem={({ item }) => <CategoriesCard item={item} />}
      showsHorizontalScrollIndicator={false}
    />
  );
};
