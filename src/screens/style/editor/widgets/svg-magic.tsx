import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Circle, Svg } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function SvgMagic() {
  const r = useSharedValue(20);

  const handlePress = () => {
    r.value += 10;
  };

  // highlight-start
  const _animatedProps = useAnimatedStyle(() => ({
    width: withTiming(r.value),
  }));
  // highlight-end

  return (
    <View style={styles.container}>
      <Svg style={styles.svg}>
        <AnimatedCircle cx="50%" cy="50%" fill="#b58df1" r={r.value} />
      </Svg>
      <Button onPress={handlePress} title="Click me" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  svg: {
    height: 250,
    width: '100%',
  },
});
