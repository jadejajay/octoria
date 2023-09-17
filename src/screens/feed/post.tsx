/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

import { Env } from '@/core/env';
import type { RouteProp } from '@/navigation/types';
import { EmptyList, FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';
import AbsoluteButton from '@/ui/core/absolute-button';
import type { Product } from '@/ui/widgets/product-type';
import { CarouselCards } from '@/ui/widgets/products-list/product-carousel';
import { ProductDetails } from '@/ui/widgets/products-list/product-details';

export const Post = ({ route }: { route: RouteProp<'Post'> }) => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [data, setData] = React.useState<Product>();

  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    // Replace 'your_api_endpoint' with the actual API endpoint for paginated search
    try {
      setIsLoading(true);
      if (route.params.id) {
        const response = await fetch(
          `${Env.API_URL}octoria/product.php?id=${route.params.id}`
        );
        const jsonData = await response.json();
        //@ts-ignore
        setData(jsonData);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  // if (isLoading) {
  //   return (
  //     <View className="flex-1 justify-center">
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }
  if (isError) {
    return (
      <View className="flex-1 justify-center">
        <FocusAwareStatusBar />
        <Text variant="md" className="text-center">
          Error loading post
        </Text>
      </View>
    );
  }
  if (data === undefined) {
    return <EmptyList isLoading={isLoading} />;
  }

  return (
    <>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <FocusAwareStatusBar />
        <View className="mt-4 w-full">
          <CarouselCards
            item={{
              image: data.images,
            }}
          />
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
