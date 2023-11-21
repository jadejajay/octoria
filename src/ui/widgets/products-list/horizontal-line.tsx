import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '@/ui/core';

interface HorizontalLineProps {
  color?: string;
  thickness?: number;
  style?: string;
}

export const HorizontalLine: React.FC<HorizontalLineProps> = ({
  color = 'black',
  thickness = 1,
  style = '',
}) => {
  return (
    <View
      className={style}
      style={[
        styles.horizontalLine,
        { backgroundColor: color, height: thickness },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    width: '100%',
  },
});
