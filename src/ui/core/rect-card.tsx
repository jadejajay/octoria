import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as Animated from 'react-native-animatable';

import { WIDTH } from '../theme';
import { AnimatedButton } from './animated-button';
import { Image } from './image';
import { Text } from './text';
import { View } from './view';

type Props = {
  item: {
    title?: string;
    image?: string;
    color?: string;
  };
  onClick: () => void;
};
export const RectCard = ({ item, onClick }: Props) => {
  return (
    <View style={styles.card}>
      <AnimatedButton onClick={onClick}>
        <View
          className="m-1 flex-1 flex-row items-center justify-between rounded-lg shadow-lg"
          style={[styles.shadow, { backgroundColor: item.color }]}
        >
          <View className="absolute h-full w-full overflow-hidden rounded-lg">
            <Animated.View animation="bounceIn" style={styles.container}>
              <Image
                src={item.image}
                resizeMode="stretch"
                className="h-full w-full rounded-lg"
              />
            </Animated.View>
          </View>
          <Text className="self-start p-1.5 font-gobold text-xs text-white">
            {item.title}
          </Text>
        </View>
      </AnimatedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: WIDTH / 2,
    height: 120,
    padding: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,
  },
});
