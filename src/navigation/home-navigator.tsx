import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { logger } from '@/core';
import { PDFExample, Post, Style, WebViewScreen } from '@/screens';
import type { PostMainCategoryType } from '@/types';
import { ShareCam } from '@/ui';

export type HomeStackParamList = {
  Style: undefined;
  Post: { id: string };
  WebView: { link: string };
  Catalogue: { url: string };
  ShareCam: { url: string };
  ImageViewer: { url: string };
  ARView: { model: string };
  App: undefined;
  DayList: undefined;
  DayList2: { postMainCategory: PostMainCategoryType };
  Frames: undefined;
  TextModal: undefined;
  Gallery: undefined;
  ChangeImageModal: undefined;
  ImageEditor: undefined;
  RenderWidget: undefined;
  DragList: undefined;
  ColorWidget: undefined;
  FontWidget: undefined;
  FilterScreen: undefined;
  InfoWidget: undefined;
  Tutorials: undefined;
  Stickers: undefined;
  BackgroundModal: undefined;
  BackgroundVideosWidget: undefined;
  ImageModal: undefined;
  Shapes: undefined;
  Products: undefined;
  Logos: undefined;
  Elements: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  logger.log('home navigator loaded', Date.now());

  return (
    <Stack.Navigator initialRouteName="Style" id="home-navigator">
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Style" component={Style} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
        <Stack.Screen name="ShareCam" component={ShareCam} />
      </Stack.Group>
      <Stack.Screen name="Catalogue" component={PDFExample} />
    </Stack.Navigator>
  );
};
