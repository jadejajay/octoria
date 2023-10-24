/* eslint-disable react-native/no-inline-styles */
import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { isVideoURL } from '@/core';
import { Image } from '@/ui';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const CarouselCardItem = ({ item, index }: any) => {
  const isVideo = isVideoURL(item);

  return (
    <View style={styles1.container} key={index}>
      {isVideo ? (
        <Video
          style={{ flex: 1 }}
          source={{
            uri: item,
          }}
          shouldPlay
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      ) : (
        <Image src={item} style={styles1.image} resizeMode="contain" />
      )}
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: 'white',
    width: ITEM_WIDTH,
    height: 300,
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export const CarouselCards = ({ item }: any) => {
  console.log(item);

  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View style={{ width: '100%', height: 330 }}>
      <Carousel
        layout="stack"
        loop
        layoutCardOffset={9}
        ref={isCarousel}
        data={item}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index2) => setIndex(index2)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={item.length}
        activeDotIndex={index}
        //@ts-ignore
        carouselRef={isCarousel}
        dotStyle={{
          width: 30,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'darkgray',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
};
