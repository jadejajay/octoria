import React from 'react';
import { Modal } from 'react-native';

import { Text, View } from '@/ui';

type Props10 = {
  isVisible: boolean;
  onClose: () => void;
};
export const StickersWidget = ({ isVisible, onClose }: Props10) => {
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-base">select Stickers Component</Text>
      </View>
    </Modal>
  );
};
