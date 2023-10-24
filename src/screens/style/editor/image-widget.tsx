import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';

import { View } from '@/ui';
import { IconButton } from '@/ui/core/bounce';

type Props3 = {
  handleRotationPress: (r: number) => void;
  handlePressMoveToCenter: () => void;
};
export const ImageWidget = ({
  handleRotationPress,
  handlePressMoveToCenter,
}: Props3) => {
  const [rotationDegree, setRotationDegree] = useState(0);
  const rotateRight = () => {
    const newDegree = (rotationDegree + 90) % 360;
    setRotationDegree(newDegree);
    handleRotationPress(rotationDegree);
  };

  return (
    <View className="flex-row flex-wrap justify-around">
      <IconButton
        icon={
          <MaterialCommunityIcons name="image-edit" size={24} color={'black'} />
        }
        onPress={() => {}}
        title="change image"
        className="my-1"
      />
      <IconButton
        icon={
          <MaterialCommunityIcons
            name="image-filter-center-focus-weak"
            size={24}
            color={'black'}
          />
        }
        onPress={handlePressMoveToCenter}
        title="Center Image"
        className="my-1"
      />
      <IconButton
        icon={
          <MaterialCommunityIcons
            name="rotate-right"
            size={24}
            color={'black'}
          />
        }
        badgeValue={`${rotationDegree.toString()}deg`}
        onPress={rotateRight}
        title="Rotate"
        className="my-1"
      />
      <IconButton
        icon={
          <MaterialCommunityIcons
            name="tooltip-image-outline"
            size={24}
            color={'black'}
          />
        }
        onPress={() => {}}
        title="A.I. Filters"
        className="my-1"
      />
    </View>
  );
};
