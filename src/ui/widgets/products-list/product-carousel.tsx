/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Image } from '@/ui';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const CarouselCardItem = ({ item, index }: any) => {
  return (
    <View style={styles1.container} key={index}>
      <Image src={item.imgUrl} style={styles1.image} resizeMode="contain" />
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
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  const data = item.image.map((i: { image: any }) => ({ imgUrl: i }));

  return (
    <View style={{ width: '100%', height: 330 }}>
      <Carousel
        layout="stack"
        loop
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index2) => setIndex(index2)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={data.length}
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
