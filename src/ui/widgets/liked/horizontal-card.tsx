/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Image } from 'react-native';

import { Button, Text, View } from '@/ui';
import { AnimatedButton } from '@/ui/core/animated-button';

type Props = {
  item: any;
  index: number;
  deleteFavorite: any;
};
export const LikedCard = ({ item, index, deleteFavorite }: Props) => {
  const { navigate } = useNavigation();
  return (
    <AnimatedButton
      onClick={() => {
        navigate('Post', { id: item.id });
      }}
    >
      <View
        key={index}
        className="m-1 w-full flex-row rounded-xl"
        style={{ backgroundColor: 'white', elevation: 4 }}
      >
        <View
          className="h-32 w-32 rounded-lg p-1"
          style={{ backgroundColor: 'white', elevation: 4 }}
        >
          <Image
            style={{ flex: 1, borderRadius: 6 }}
            source={{ uri: item.image }}
          />
        </View>
        <View className="pl-2">
          <Text className="font-varela font-bold">{item.name}</Text>
          <Text numberOfLines={1}>{item.desc}</Text>
          <Button
            label="remove"
            // className="bg-red-400"
            variant="secondary"
            onPress={() => {
              deleteFavorite(item.id);
            }}
          />
        </View>
      </View>
    </AnimatedButton>
  );
};
