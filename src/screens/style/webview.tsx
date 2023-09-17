/* eslint-disable max-lines-per-function */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { BackHandler, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

import type { RouteProp } from '@/navigation/types';
// import IntentLauncher from 'react-native-intent-launcher';
import { View } from '@/ui';
import AbsoluteButton from '@/ui/core/absolute-button';

export const WebViewScreen = () => {
  const { params } = useRoute<RouteProp<'WebView'>>();
  const navigation = useNavigation();

  const webViewRef = useRef(null);
  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      //@ts-ignore
      webViewRef.current?.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onAndroidBackPress
        );
      };
    }
  }, []);
  // const handlewebViewRefNavigationStateChange = (newNavState: { url: any }) => {
  //   newNavState looks something like this:
  //   {
  //     url?: string;
  //     title?: string;
  //     loading?: boolean;
  //     canGoBack?: boolean;
  //     canGoForward?: boolean;
  //   }
  //   const { url } = newNavState;
  //   if (!url) return;
  //   // handle certain doctypes
  //   if (url.includes('.pdf')) {
  //     webViewRef.current?.stopLoading();
  //     // open a modal with the PDF viewer
  //   }
  //   // one way to handle a successful form submit is via query strings
  //   if (url.includes('?message=success')) {
  //     webViewRef.current?.stopLoading();
  //     // maybe close this view?
  //   }
  //   // one way to handle errors is via query string
  //   if (url.includes('?errors=true')) {
  //     webViewRef.current?.stopLoading();
  //   }
  //   // redirect somewhere else
  //   if (url.includes('google.com')) {
  //     const newURL = 'https://reactnative.dev/';
  //     const redirectTo = 'window.location = "' + newURL + '"';
  //     webViewRef.current?.injectJavaScript(redirectTo);
  //   }
  // };
  return (
    <View className="flex-1">
      {/* <View className="absolute h-40 top-0 w-full z-20 bg-white"></View> */}
      <WebView
        ref={webViewRef}
        source={{
          // uri: 'https://3dviewer.net/#model=assets/models/DamagedHelmet.glb',
          // uri: intentUri,
          uri: params.link,
        }}
        cacheEnabled={false}
        pullToRefreshEnabled
        setDisplayZoomControls
        onError={() => {}}
        // usewebViewRef2
        // onNavigationStateChange={handlewebViewRefNavigationStateChange}
      />
      <AbsoluteButton
        iconName={'arrow-back'}
        color="black"
        style="mt-8 bg-slate-400"
        onPress={() => {
          //@ts-ignore
          navigation.pop();
        }}
      />

      {/* <View className="absolute h-40 bottom-0 w-full z-20 bg-white"></View> */}
    </View>
  );
};
