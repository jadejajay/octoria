/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { isVideoURL } from '@/core';
import { Image, TouchableOpacity } from '@/ui/core';

export const SLIDER_WIDTH = Math.round(Dimensions.get('window').width);
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const CarouselCardItem = ({ item, index, onPress }: any) => {
  const isVideo = isVideoURL(item);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (!isVideo) onPress();
      }}
      style={styles1.container}
      key={index}
    >
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
    </TouchableOpacity>
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

export const CarouselCards = ({ images }: any) => {
  const { navigate } = useNavigation();
  const [index3, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View style={{ width: '100%', height: 330 }}>
      <Carousel
        layout="stack"
        loop
        layoutCardOffset={9}
        ref={isCarousel}
        data={images}
        renderItem={({ item, index }: { item: any; index: number }) => {
          return (
            <CarouselCardItem
              key={`carousel-card-item-${index}`}
              item={item}
              index={index}
              onPress={() => navigate('ImageViewer', { url: item })}
            />
          );
        }}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index2) => setIndex(index2)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={images.length}
        activeDotIndex={index3}
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
