import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import Shimmer from 'react-native-shimmer';

import { Text, View } from '@/ui';

type Props = {};
export const Greeting = ({}: Props) => {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-column justify-start pl-4 pt-4">
        {/* <View className="items-center justify-center rounded-full bg-slate-100 p-1"> */}
        {/* <View className="translate-x-0.5 translate-y-1.5">
        <MenuIcon />
      </View> */}
        {/* </View> */}
        <Text variant="h1" className="font-varela font-bold">
          Hello
        </Text>
        <View className="flex-row">
          <Text variant="lg" className="font-varela text-slate-400">
            Welcome to Octoria.
          </Text>
        </View>
      </View>
      <View className="pr-4">
        <Shimmer tilt={45} duration={2000} opacity={1} animationOpacity={0.6}>
          <Image style={styles.image} source={require('assets/logo_big.png')} />
        </Shimmer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
  image: {
    width: 80,
    height: 80,
  },
});
