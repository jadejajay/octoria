import * as React from 'react';
import { StatusBar } from 'react-native';

type Props = React.ComponentProps<typeof StatusBar>;
export const FocusAwareStatusBar = (props: Props) => {
  const barStyle = 'dark-content';
  return <StatusBar barStyle={barStyle} backgroundColor={'#fff'} {...props} />;
};
