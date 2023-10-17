import React from 'react';
import { Modal } from 'react-native';

import { Text, View } from '@/ui';

type Props5 = {
  isVisible: boolean;
  onClose: () => void;
};
export const InfoWidget = ({ isVisible, onClose }: Props5) => {
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-base">info model Component</Text>
      </View>
    </Modal>
  );
};
