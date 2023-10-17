import React from 'react';
import { Modal } from 'react-native';

import { Text, View } from '@/ui';

type Props9 = {
  isVisible: boolean;
  onClose: () => void;
};
export const ElementsWidget = ({ isVisible, onClose }: Props9) => {
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-base">select elements Component</Text>
      </View>
    </Modal>
  );
};
