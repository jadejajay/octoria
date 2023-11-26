import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Text } from '../core/text';
import { View } from '../core/view';
import { NoData } from '../icons';
type Props = {
  isLoading: boolean;
};
export const EmptyList = React.memo(({ isLoading }: Props) => {
  return (
    <View className="min-h-[400px] flex-1 items-center justify-center">
      {!isLoading ? (
        <View>
          <NoData />
          <Text className="pt-4 text-center font-sfbold">
            Sorry! No data found
          </Text>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
});
