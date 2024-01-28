import * as React from 'react';

import { Text } from '../core/text';
import { View } from '../core/view';

type ModalHeaderProps = {
  title?: string;
  dismiss: () => void;
};

export const ModalHeader = React.memo(({ title }: ModalHeaderProps) => {
  return (
    <View className="flex-row py-4 px-2">
      <View className="h-[24px] w-[24px]" />
      <View className="flex-1">
        <Text className="text-center text-[16px] font-bold text-[#26313D]">
          {title}
        </Text>
      </View>
    </View>
  );
});
