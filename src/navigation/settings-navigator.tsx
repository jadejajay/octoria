import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { Settings } from '@/screens';
import { SignUpForm } from '@/screens/login/signup';
import { GstView } from '@/screens/settings/gstscreen';
import { ScanNGo } from '@/screens/settings/scanandgo';
import { WebViewScreen } from '@/screens/style/webview';

export type SettingStackParamList = {
  Settings: undefined;
  ScanNGo: undefined;
  Gst: undefined;
  SignUp: undefined;
  WebView: { link: string };
};

const Stack = createNativeStackNavigator<SettingStackParamList>();

export const SettingNavigator = () => {
  console.log('setting navigator loaded', Date.now());
  return (
    <Stack.Navigator initialRouteName="Settings" id="setting-navigator">
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ScanNGo" component={ScanNGo} />
        <Stack.Screen name="Gst" component={GstView} />
        <Stack.Screen name="SignUp" component={SignUpForm} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
