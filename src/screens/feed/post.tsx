import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

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
} from '@/ui';

export const Post = ({ route }: { route: RouteProp<'Post'> }) => {
  const navigation = useNavigation();
  const { products, productLoading } = useProductsStore();
  const data = products.filter((pro) => pro.id === route.params.id)[0];
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
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <FocusAwareStatusBar />
        <View className="mt-4 w-full">
          <CarouselCards item={data.images} />
        </View>
        <View className="px-1">
          <Text variant="h2">{data.name}</Text>
          <Text variant="lg">{data.description}</Text>
        </View>
        <ProductDetails item={data} />
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
