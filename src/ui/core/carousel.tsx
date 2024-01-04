/* eslint-disable max-lines-per-function */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';
import React, { useCallback } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { useFirestoreLiveQuery } from '@/core';
import type { MainCarouselType } from '@/types';

import { WIDTH } from '../theme';
import { AnimatedButton } from './animated-button';

const horizontalMargin = 4;
const SLIDER_WIDTH = WIDTH;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH) + horizontalMargin * 2;
type Props = {
  item: MainCarouselType;
  index: any;
};

export const MainCarousel = ({ name }: { name: string }) => {
  const { navigate } = useNavigation();
  const { data, isLoading } = useFirestoreLiveQuery<MainCarouselType>(name);

  const filteredData = data?.filter((item: any) => item?.image || item?.video);
  const isCarousel = React.useRef(null);

  const CarouselCardItem = useCallback(
    ({ item, index }: Props) => {
      return (
        <AnimatedButton
          onClick={() => {
            item.link
              ? navigate('WebView', {
                  link: item.link,
                })
              : {};
          }}
        >
          <View style={styles1.container} key={index}>
            {item?.image && (
              <Image source={{ uri: item.image }} style={styles1.image} />
            )}
            {item?.video && (
              <>
                <Video
                  style={{ flex: 1, borderRadius: 14 }}
                  source={{
                    uri: item.video,
                  }}
                  shouldPlay
                  useNativeControls
                  isMuted
                  resizeMode={ResizeMode.COVER}
                  isLooping
                />
              </>
            )}
          </View>
        </AnimatedButton>
      );
    },
    [navigate]
  );
  if (isLoading) {
    return null;
  }

  return (
    <View
      style={{
        width: '100%',
        height: 220,
      }}
    >
      <Carousel
        activeAnimationType="spring"
        activeSlideOffset={0}
        aria-expanded={true}
        autoplay={true}
        autoplayDelay={200}
        autoplayInterval={5000}
        automaticallyAdjustContentInsets={true}
        callbackOffsetMargin={0}
        centerContent={true}
        contentInsetAdjustmentBehavior="automatic"
        contentOffset={{ x: 0, y: 0 }}
        data={filteredData}
        enableMomentum={true}
        inactiveSlideOpacity={0.7}
        inactiveSlideScale={0.9}
        itemHeight={200}
        itemWidth={Math.round(ITEM_WIDTH * 0.86)}
        legacyImplementation={false}
        loop={true}
        loopClonesPerSide={1}
        nestedScrollEnabled={true}
        overScrollMode="always"
        ref={isCarousel}
        renderItem={CarouselCardItem}
        sliderHeight={200}
        sliderWidth={Math.round(SLIDER_WIDTH)}
      />
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    borderRadius: 14,
    backgroundColor: 'white',
    elevation: 8,
    width: ITEM_WIDTH * 0.88,
    height: 200,
    marginHorizontal: -horizontalMargin,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'stretch',
    borderRadius: 14,
  },
});
