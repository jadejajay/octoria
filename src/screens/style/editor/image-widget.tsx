import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';

import { View } from '@/ui';
import { IconButton } from '@/ui/core/bounce';

type Props3 = {
  add: any;
  element: any;
  set: any;
  state: any;
};
export const ImageWidget = ({ add, element, set, state }: Props3) => {
  const { colorScheme } = useColorScheme();
  const themecolor = colorScheme === 'dark' ? 'white' : 'black';
  return (
    <View className="flex-row flex-wrap justify-around">
      <IconButton
        icon={
          <MaterialCommunityIcons
            name="image-edit"
            size={24}
            color={themecolor}
          />
        }
        onPress={() => {
          add('Object1', 'image', {
            image: 'http://itekindia.com/dashboard/ford.jpg',
            width: '100%',
            height: '100%',
            borderRadius: 100,
            transform: [{ scaleX: -1 }],
          });
        }}
        title="change image"
        className="my-1"
      />
      <IconButton
        icon={
          <MaterialCommunityIcons
            name="image-auto-adjust"
            size={24}
            color={themecolor}
          />
        }
        badgeValue={'✨Premium'}
        onPress={() => {}}
        title="A.I. Enhance"
        className="my-1"
      />
      <IconButton
        icon={
          <MaterialCommunityIcons
            name="image-size-select-large"
            size={24}
            color={themecolor}
          />
        }
        badgeValue={'✨Premium'}
        onPress={() => {}}
        title="Remove Background"
        className="my-1"
      />
      <IconButton
        icon={
          <MaterialCommunityIcons
            name="tooltip-image-outline"
            size={24}
            color={themecolor}
          />
        }
        badgeValue={'✨Premium'}
        onPress={() => {}}
        title="A.I. Filters"
        className="my-1"
      />
    </View>
  );
};

/* <TouchableOpacity
onPress={() => {
  add('Object1', 'image', {
    image: 'http://itekindia.com/dashboard/ford.jpg',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    transform: [{ scaleX: -1 }],
  });
}}
>
<Text className="text-base">IMageWidget Component</Text>
</TouchableOpacity> */
