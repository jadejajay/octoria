import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function App() {
  const r = useSharedValue(20);

  const handlePress = () => {
    r.value += 10;
  };

  // highlight-start
  const animatedProps = useAnimatedStyle(() => ({
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
