import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { PDFExample, Post, Style, WebViewScreen } from '@/screens';
import { ShareCam } from '@/ui';

export type HomeStackParamList = {
  Style: undefined;
  Post: { id: string };
  WebView: { link: string };
  Catalogue: { url: string };
  ShareCam: { url: string };
  ARView: { url: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  console.log('home navigator loaded', Date.now());

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
