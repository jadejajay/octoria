/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

type props = {
  children: React.ReactNode;
  onClick: () => void;
};
export const AnimatedButton = ({ onClick, children }: props) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const onPressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.8,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() => onClick()}
      style={{ flex: 1 }}
    >
      <Animated.View style={[animatedStyle, { flex: 1 }]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
