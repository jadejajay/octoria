/* eslint-disable max-lines-per-function */
import * as React from 'react';

import { useLogStore } from '@/core';
import { addElements } from '@/core/data/elements';
import { addPostImages } from '@/core/data/festivals';
import { addFrames } from '@/core/data/frame';
import { addImagesList } from '@/core/data/images-list';
import { addLogos } from '@/core/data/logos';
import { addMainCarousel } from '@/core/data/main-carousel';
import { addMainCarousel2 } from '@/core/data/main-carousel2';
import { addMainCategory } from '@/core/data/main-categories';
import { addPostMainCategory } from '@/core/data/post-maincat-list';
import { addPostVideo } from '@/core/data/post-video';
import { addProducts } from '@/core/data/products-list';
import { addShapes } from '@/core/data/shapes';
import { addShareCamBg } from '@/core/data/sharecambg';
import { addStickers } from '@/core/data/stickers';
import { addSubCategory } from '@/core/data/subcate-cod';
import { ScrollView, Text, View } from '@/ui';

export const DeveloperScreen = () => {
  const [text, setText] = React.useState('');
  const log = useLogStore((state) => state.text);
  React.useEffect(() => {
    setText((prev) => `${prev}\n${log}`);
  }, [log]);
  const scrollViewRef = React.useRef<any>(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  return (
    <View className="flex-1">
      <Text className="text-center font-sfbold">Developer Mode</Text>
      <View className="h-0 w-full border-b-2" />
      <View className="h-44 w-full bg-slate-900">
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={handleContentSizeChange}
          className="flex-1"
        >
          <Text className="font-sfbold text-blue-200">{text}</Text>
        </ScrollView>
      </View>
      <ScrollView className="mt-4 flex-1 gap-4 p-4">
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addMainCarousel()}
        >
          Add Main Carousel
        </Text>
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addMainCarousel2()}
        >
          Add Main Carousel2
        </Text>
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addMainCategory()}
        >
          Add Main Categories
        </Text>
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addPostVideo()}
        >
          Add Videos
        </Text>
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addPostImages()}
        >
          Add Post Images
        </Text>
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addFrames()}
        >
          Add Frames
        </Text>
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addElements()}
        >
          Add Elements
        </Text>
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addImagesList()}
        >
          Add Images Elements
        </Text>
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addLogos()}
        >
          Add Logos
        </Text>
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addPostMainCategory()}
        >
          Add Post Main Category
        </Text>
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addProducts()}
        >
          Add Products
        </Text>
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addSubCategory()}
        >
          Add Sub Category
        </Text>
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addShareCamBg()}
        >
          Add ShareCamBg
        </Text>
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addShapes()}
        >
          Add Shapes
        </Text>
        <Text
          className="rounded bg-blue-600 p-3 text-center font-sfbold text-white"
          onPress={() => addStickers()}
        >
          Add Stickers
        </Text>
      </ScrollView>
    </View>
  );
};
