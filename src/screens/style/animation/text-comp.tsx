import * as React from 'react';
import { useRef } from 'react';
import { Animated, PanResponder, StyleSheet } from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { Text, View } from '@/ui';

type Props = {};
export const TextComp = ({}: Props) => {
  const rotate = useSharedValue(0);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;
  const animatedStyle = useAnimatedStyle(() => {
    // const rotateXDeg = interpolate(rotateX.value, [-200, 200], [-360, 360]);
    // const rotateYDeg = interpolate(rotateY.value, [-200, 200], [-360, 360]);
    const rotateDeg = interpolate(rotate.value, [-100, 100], [-360, 360]);

    return {
      transform: [{ rotate: `${rotateDeg}deg` }],
    };
  });
  return (
    <View className="flex-1">
      <Animated.View
        style={[animatedStyle, styles.box]}
        {...panResponder.panHandlers}
      >
        <Text variant="sm" className="text-center">
          hello
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
