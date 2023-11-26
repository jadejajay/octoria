import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as Animated from 'react-native-animatable';

import { codeToSubcategory } from '@/core/subcategory-code';
import type { FestivalType, PostVideoType } from '@/types';
import { Image, Text, TouchableOpacity, View, WIDTH } from '@/ui';

type Props = {
  item: FestivalType;
  index: number;
  handleNav: (code: number, subCode: number, image1: any) => void;
};
export const SmallPostImageCard = ({ item, index, handleNav }: Props) => {
  return (
    <TouchableOpacity
      key={`category-card-${index}`}
      className="p-1"
      activeOpacity={1}
      style={styles.postImage}
      onPress={() => handleNav(item.categoryCode, item.subCategory, item.image)}
    >
      <Animated.View
        key={index}
        animation="zoomIn"
        delay={((index % 10) + 1) * 200}
        style={styles.button}
      >
        <View
          className="overflow-hidden rounded-lg"
          style={[styles.container2, styles.imageCard]}
        >
          {item?.image && (
            <Image
              src={item.image}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          )}
        </View>
        <Text
          variant="xxs"
          className="mt-2 overflow-hidden text-center"
          numberOfLines={2}
        >
          {codeToSubcategory(item.subCategory)}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const SmallPostVideoCard = ({
  item,
  index,
  handleNav,
}: {
  item: PostVideoType;
  index: number;
  handleNav: (code: number, subCode: number, image1: any) => void;
}) => {
  return (
    <TouchableOpacity
      key={`category-card-${index}`}
      className="p-1"
      style={styles.postImage}
      activeOpacity={1}
      onPress={() => handleNav(item.categoryCode, item.subCategory, item.video)}
    >
      <Animated.View
        key={index}
        animation="zoomIn"
        delay={((index % 10) + 1) * 200}
        style={styles.button}
      >
        <View
          className="overflow-hidden rounded-lg"
          style={[styles.container2, styles.imageCard]}
        >
          {item?.video && (
            <Image
              src={item.thumbnail}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          )}
        </View>
        <Text
          variant="xxs"
          className="mt-2 overflow-hidden text-center"
          numberOfLines={2}
        >
          {codeToSubcategory(item.subCategory)}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container2: {
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  imageCard: {
    width: '100%',
    aspectRatio: 1,
  },
  postImage: {
    // width: '33.3333%',
    width: WIDTH / 3 - 5,
    height: WIDTH / 3 + 30,
  },
  button: {
    flex: 1,
  },
});
