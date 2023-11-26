import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { BackHandler, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

import type { RouteProp } from '@/navigation/types';
import { AbsoluteButton, View } from '@/ui';

export const WebViewScreen = () => {
  const { params } = useRoute<RouteProp<'WebView'>>();
  const navigation = useNavigation();

  const webViewRef = useRef(null);
  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      //@ts-ignore
      webViewRef.current?.goBack();
      return true;
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

  return (
    <View className="flex-1">
      <WebView
        ref={webViewRef}
        source={{
          uri: params.link,
        }}
        cacheEnabled={false}
        pullToRefreshEnabled
        setDisplayZoomControls
        onError={() => {}}
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
    </View>
  );
};
