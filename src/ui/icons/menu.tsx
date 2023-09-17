import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';
const MenuIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill={'none'} {...props}>
    <Path
      stroke="#1D1E20"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.25 11h12.5M1 6h18.75M1 1h12.5"
    />
  </Svg>
);
export default MenuIcon;
