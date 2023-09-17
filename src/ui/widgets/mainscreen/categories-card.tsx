import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { setItem } from '@/core/storage';
import { Image, Text, View } from '@/ui';
import { AnimatedButton } from '@/ui/core/animated-button';

type Props = {
  item: {
    image: string;
    title: string;
  };
};
export const CategoriesCard = ({ item }: Props) => {
  const { navigate } = useNavigation();
  return (
    <AnimatedButton
      onClick={() => {
        setItem('search', `${item.title}`);
        //@ts-ignore
        navigate('FeedNavigator', {
          screen: 'Feed',
        });
      }}
    >
      <View className="m-2 flex-row items-center rounded-lg border border-slate-500 p-2">
        <Image src={item.image} style={styles.image} />
        <Text variant="sm" className="pl-2 text-center text-slate-500">
          {item.title}
        </Text>
      </View>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
