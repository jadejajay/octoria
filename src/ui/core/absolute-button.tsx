import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import { TouchableOpacity } from './touchable-opacity';

interface AbsoluteButtonProps {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  style?: string;
  sstyle?: any;
  color?: string;
}

const getButtonPositionStyle = (position: string) => {
  switch (position) {
    case 'top-left':
      return 'top-2 left-2';
    case 'top-right':
      return 'top-2 right-2';
    case 'bottom-left':
      return 'bottom-2 left-2';
    case 'bottom-right':
      return 'bottom-2 right-2';
    default:
      return 'top-2 left-2';
  }
};

export const AbsoluteButton: React.FC<AbsoluteButtonProps> = ({
  iconName,
  onPress,
  position = 'top-left',
  style = '',
  sstyle,
  color = 'white',
}) => {
  const buttonPositionStyle = getButtonPositionStyle(position);
  const style2 = `absolute rounded-full p-1 ${buttonPositionStyle} ${style}`;

  return (
    <TouchableOpacity className={style2} onPress={onPress} style={sstyle}>
      <Ionicons name={iconName} size={24} color={color} />
    </TouchableOpacity>
  );
};
