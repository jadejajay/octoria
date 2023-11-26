/* eslint-disable react-native/no-inline-styles */
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
    title: string;
    image: string;
    color: string;
  };
  onClick: () => void;
};
export const RectCard = ({ item, onClick }: Props) => {
  return (
    <View style={styles.card}>
      <AnimatedButton onClick={onClick}>
        <View
          className="m-1 flex-1 flex-row items-center justify-between rounded-lg p-2 shadow-lg"
          style={{ backgroundColor: item.color, elevation: 4 }}
        >
          <View className="absolute inset-0 overflow-hidden rounded-lg">
            <Animated.View animation="bounceIn">
              <Image
                src={item.image}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="cover"
              />
            </Animated.View>
          </View>
          <Text className="w-1/2 self-start font-gobold text-xs text-white">
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
});
