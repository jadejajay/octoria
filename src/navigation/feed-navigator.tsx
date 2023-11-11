import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { AddPost, Feed, Post } from '@/screens';
import { PDFExample } from '@/screens/feed/pdfscreen';
import { ShareCam } from '@/ui/widgets/products-list/sharecam';

export type FeedStackParamList = {
  Feed: undefined;
  Post: { id: string };
  Catalogue: { url: string };
  ShareCam: { url: string };
  Saved: undefined;
};

const Stack = createNativeStackNavigator<FeedStackParamList>();

export const FeedNavigator = () => {
  console.log('feed navigator loaded', Date.now());
  return (
    <Stack.Navigator initialRouteName="Feed" id="feed-navigator">
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="ShareCam" component={ShareCam} />
      </Stack.Group>
      <Stack.Screen name="Catalogue" component={PDFExample} />

      <Stack.Screen name="Saved" component={AddPost} />
    </Stack.Navigator>
  );
};
