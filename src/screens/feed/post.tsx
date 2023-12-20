import { Stagger } from '@animatereactnative/stagger';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FadeOutDown, FlipInYRight } from 'react-native-reanimated';

import { useProductsStore } from '@/core';
import type { RouteProp } from '@/navigation/types';
import {
  AbsoluteButton,
  ActivityIndicator,
  CarouselCards,
  EmptyList,
  FocusAwareStatusBar,
  ProductDetails,
  ScrollView,
  Text,
  View,
  WIDTH,
} from '@/ui';

export const Post = ({ route }: { route: RouteProp<'Post'> }) => {
  const navigation = useNavigation();
  const { products, productLoading } = useProductsStore();
  const data = products.filter((pro) => pro.id === route.params.id)[0];
  const [update, setUpdate] = React.useState(1);
  if (productLoading) {
    return (
      <View className="flex-1 justify-center">
        <ActivityIndicator />
      </View>
    );
  }
  if (data === undefined || !data) {
    return <EmptyList isLoading={productLoading} />;
  }

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y < 0) {
            setUpdate((prev) => prev + 1);
          }
        }}
      >
        <Stagger
          key={`stagger-${update}`}
          stagger={50}
          duration={300}
          exitDirection={-1}
          entering={() => FlipInYRight.springify()}
          exiting={() => FadeOutDown.springify()}
          style={{
            width: WIDTH,
          }}
        >
          <View className="mt-4 w-full">
            <CarouselCards images={data?.images} />
          </View>
          <View className="px-1">
            <Text variant="h2">{data?.name}</Text>
            <Text variant="lg">{data?.description}</Text>
          </View>
          <ProductDetails item={data} />
        </Stagger>
      </ScrollView>
      <AbsoluteButton
        iconName="arrow-back"
        onPress={() => {
          navigation.goBack();
        }}
        color="#000"
      />
    </>
  );
};
