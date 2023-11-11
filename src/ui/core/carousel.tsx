/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable max-lines-per-function */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import useMainCarousel from '@/core/hooks/use-main-carousel';

import { AnimatedButton } from './animated-button';

const horizontalMargin = 4;
export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH) + horizontalMargin * 2;
type Props = {
  item: any;
  index: any;
};

export const MainCarousel = () => {
  const { navigate } = useNavigation();
  const { MainCarouselData, isLoading } = useMainCarousel();
  const isCarousel = React.useRef(null);

  if (isLoading) {
    return null;
  }
  const CarouselCardItem = ({ item, index }: Props) => {
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
          {item.image && (
            <Image source={{ uri: item.image }} style={styles1.image} />
          )}
          {item.video && (
            <>
              <Video
                style={{ flex: 1 }}
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
  };

  return (
    <View
      style={{
        width: '100%',
      }}
    >
      <Carousel
        alwaysBounceHorizontal={false}
        activeAnimationType="spring"
        activeSlideOffset={0}
        // activeSlideAlignment="center"
        aria-expanded={true}
        autoplay={true}
        autoplayDelay={200}
        autoplayInterval={5000}
        automaticallyAdjustContentInsets={true}
        // bounces={false}
        // bouncesZoom={false}
        callbackOffsetMargin={0}
        centerContent={true}
        // contentInset= { top: 0, left: 20, bottom: 0, right: 20 }
        contentInsetAdjustmentBehavior="automatic"
        contentOffset={{ x: 0, y: 0 }}
        data={MainCarouselData}
        // directionalLockEnabled={true}
        enableMomentum={true}
        // enableSnap={true}
        // fadingEdgeLength= 10
        // hasParallaxImages={true}
        // hitSlop= { top: 20, bottom: 20, left: 20, right: 20 }
        inactiveSlideOpacity={0.7}
        inactiveSlideScale={0.9}
        // inactiveSlideShift= 20
        itemHeight={200}
        itemWidth={ITEM_WIDTH * 0.86}
        layout="default"
        // layoutCardOffset={100}
        legacyImplementation={true}
        loop={true}
        loopClonesPerSide={5}
        nestedScrollEnabled={true}
        overScrollMode="auto"
        // pinchGestureEnabled={true}
        ref={isCarousel}
        renderItem={CarouselCardItem}
        sliderHeight={200}
        sliderWidth={SLIDER_WIDTH}
        useScrollView={true}
      />
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    borderRadius: 14,
    backgroundColor: 'white',
    elevation: 4,
    width: ITEM_WIDTH * 0.88,
    height: 200,
    marginHorizontal: -horizontalMargin,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'stretch',
    borderRadius: 14,
  },
});
