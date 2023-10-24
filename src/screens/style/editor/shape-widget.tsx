import { MasonryFlashList } from '@shopify/flash-list';
import React from 'react';
import { Modal } from 'react-native';

import { EmptyList, Text, View } from '@/ui';
type Props7 = {
  isVisible: boolean;
  onClose: () => void;
};
export const ShapesWidget = ({ isVisible, onClose }: Props7) => {
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <View className="h-40 flex-row bg-red-100">
        <View className="flex-1 items-center justify-center bg-slate-700">
          <Text variant="sm" className="text-center">
            gallery
          </Text>
        </View>
      </View>
      <View className="flex-1">
        <MasonryFlashList
          data={[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 89, 867, 56, 4, 3, 23, 22, 2, 45, 43, 65,
            56, 453, 7, 77, 76, 87, 8, 7, 76, 54,
          ]}
          numColumns={2}
          getColumnFlex={(items, index, maxColumns, extraData) => {
            return index === 0 ? 2 : 1;
          }}
          //  onEndReached={onEndReached}
          keyExtractor={(_, index) => {
            return index.toString();
          }}
          //  snapToInterval={snapToInterval}
          estimatedItemSize={100}
          ListEmptyComponent={<EmptyList isLoading={false} />}
          renderItem={Card}
          //  ListHeaderComponent={Header}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
  );
};

type Props = {
  item: number;
  index: number;
};
export const Card = ({ item, index }: Props) => {
  return (
    <View className="w-full p-2">
      <View
        className="rounded-lg bg-red-100"
        style={{ height: index % 3 === 0 ? 100 : 150 }}
      />
    </View>
  );
};
