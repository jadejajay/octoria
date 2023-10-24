import { MasonryFlashList } from '@shopify/flash-list';
import React from 'react';
import { Modal } from 'react-native';

import { EmptyList, Text, View } from '@/ui';

type Props9 = {
  isVisible: boolean;
  onClose: () => void;
};
export const ElementsWidget = ({ isVisible, onClose }: Props9) => {
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
          numColumns={3}
          //  onEndReached={onEndReached}
          keyExtractor={(_, index) => {
            return index.toString();
          }}
          //  snapToInterval={snapToInterval}
          //  estimatedItemSize={estimatedItemSize}
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
        style={{ width: '100%', height: index % 2 === 0 ? 100 : 150 }}
      />
    </View>
  );
};
