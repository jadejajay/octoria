import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { Post, Style } from '@/screens';
import { PDFExample } from '@/screens/feed/pdfscreen';
import { WebViewScreen } from '@/screens/style/webview';
import { ShareCam } from '@/ui/widgets/products-list/sharecam';

export type HomeStackParamList = {
  Style: undefined;
  Post: { id: string };
  WebView: { link: string };
  Catalogue: { url: string };
  ShareCam: { url: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
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
