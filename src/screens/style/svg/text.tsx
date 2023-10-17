import * as React from 'react';
import { Text } from 'react-native-svg';
type Props = {
  text: string;
  props?: any;
  x: string;
  y: string;
  onPress?: () => void;
};
export const SvgText = ({ text, props, x, y, onPress = () => {} }: Props) => {
  return (
    <Text x={x} y={y} onPress={onPress} {...props}>
      {text}
    </Text>
  );
};
