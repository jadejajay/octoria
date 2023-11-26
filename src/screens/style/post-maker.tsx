import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Shimmer from 'react-native-shimmer';

import { Image, Text, TouchableOpacity, View } from '@/ui';

type Props = {};
export const PostCard = ({}: Props) => {
  const float = {
    from: {
      ['translateY']: -30,
    },
    to: {
      ['translateY']: 0,
    },
  };

  const { getParent } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        getParent()?.getParent()?.navigate('DayList', {
          url: 'https://picsum.photos/200/200',
        });
      }}
      activeOpacity={1}
      className="mx-2 mb-4 h-40"
    >
      <View className="flex-1 justify-end">
        <Shimmer tilt={45} duration={3000} opacity={1} animationOpacity={0.8}>
          <View className="h-3/4 flex-row rounded-3xl " style={styles.bg} />
        </Shimmer>
      </View>
      <View className="absolute inset-y-0 justify-end p-4">
        <View className="h-3/4 flex-row">
          <View className="w-2/3 justify-center">
            <Text variant="md" className="font-varela text-white">
              Create a Social Media Post with Fast & Easy Post Maker
            </Text>
          </View>
          <View className="w-1/3 justify-end">
            <Animatable.View
              animation={float}
              iterationCount="infinite"
              direction="alternate"
              duration={5000}
              style={styles.container}
            >
              {ImageComp(styles.image)}
              {ImageComp(styles.image2)}
            </Animatable.View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ImageComp = (style: any) => {
  return (
    <Image
      src="http://itekindia.com/chats/bgimages/imageedit.webp"
      style={style}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  bg: {
    backgroundColor: '#6781ff',
  },
  image: {
    width: 110,
    height: 110,
    transform: [
      { perspective: 400 },
      { rotateX: '0deg' },
      { rotateY: '-45deg' },
    ],
  },
  image2: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 110,
    height: 110,
    transform: [
      { perspective: 400 },
      { rotateX: '0deg' },
      { rotateY: '-45deg' },
    ],
  },
});
