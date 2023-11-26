import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import Shimmer from 'react-native-shimmer';

import { useUserStore } from '@/core';
import { Text, View } from '@/ui/core';

type Props = {};
export const Greeting = ({}: Props) => {
  const name = useUserStore((s) => s.user.name);
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-column justify-start pl-4 pt-4">
        <Text variant="h3" className="font-sfbold" numberOfLines={1}>
          Hello, {name ? name : 'Guest'}
        </Text>
        <View className="flex-row">
          <Text className="font-sfbold text-slate-400">
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
