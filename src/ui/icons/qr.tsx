/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Rect } from 'react-native-svg';
export const QR = ({ color = '#000', ...props }: SvgProps) => (
  <Svg
    fill="none"
    style={{ width: 24, height: 24 }}
    viewBox="0 0 24 24"
    {...props}
  >
    <Rect
      width={7}
      height={7}
      x={3}
      y={3}
      stroke={color}
      strokeWidth={2}
      rx={1}
      // fill={color}
    />
    <Rect
      width={7}
      height={7}
      x={3}
      y={14}
      stroke={color}
      strokeWidth={2}
      rx={1}
      // fill={color}
    />
    <Rect
      width={7}
      height={7}
      x={14}
      y={3}
      stroke={color}
      strokeWidth={2}
      rx={1}
      // fill={color}
    />
    <Rect width={3} height={3} x={13} y={13} fill={color} rx={0.5} />
    <Rect width={3} height={3} x={16} y={16} fill={color} rx={0.5} />
    <Rect width={3} height={3} x={19} y={13} fill={color} rx={0.5} />
    <Rect width={3} height={3} x={19} y={19} fill={color} rx={0.5} />
    <Rect width={3} height={3} x={13} y={19} fill={color} rx={0.5} />
  </Svg>
);
