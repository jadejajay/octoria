/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { Env } from '@env';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';

import { useEditorX, useIsFirstTime, useIsSignUp, useUserStore } from '@/core';
import {
  DayList,
  DayList2,
  Gallery,
  ImageEditor,
  ImageViewer,
  Onboarding,
  SignUpForm,
  Tutorial,
} from '@/screens';
import {
  BackgroundVideosWidget,
  BackgroundWidget,
  ChangeImageModal,
  ElementsWidget,
  FrameWidget,
  ImageModal,
  InfoWidget,
  LogosWidget,
  ProductsWidget,
  RenderWidget,
  ShapesWidget,
  StickersWidget,
  TextModal,
} from '@/screens/style/editor/widgets';
import type { UserType } from '@/types';
import { ARView } from '@/ui';

import { AuthNavigator } from './auth-navigator';
import { loadDataFromFirestore } from './loads';
import { NavigationContainer } from './navigation-container';
import { TabNavigator } from './tab-navigator';

const prefix = Linking.createURL('/');
const Stack = createNativeStackNavigator();
export const Root = () => {
  console.log('Root Stack Activated', Date.now());
  const [isFirstTime] = useIsFirstTime();
  const [isSignUp, setIsSignUp] = useIsSignUp();
  const [initializing, setInitializing] = useState(true);
  const setUserData = useUserStore((s) => s.setUser);
  const setBusiness = useEditorX((s) => s.setBusiness);
  const setEditor = useEditorX((s) => s.setEditor);
  const [user, setUser] = useState<any>();

  const hideSplash = React.useCallback(async () => {
    await SplashScreen.hideAsync();
    loadDataFromFirestore();
  }, []);
  useEffect(() => {
    if (initializing) {
      hideSplash();
    }
    async function onAuthStateChanged(userw: any) {
      setUser(userw);
      try {
        setEditor(userw?.uid);
        const userDoc = await firestore()
          .collection('Users')
          .doc(userw?.uid)
          .get();

        if (userDoc.exists) {
          const User = { id: userw?.uid, ...userDoc.data() } as UserType;
          setUserData(User);
          const userName = User?.info?.name || User?.business || 'Octoria';
          const userImage =
            User?.info?.photo || User?.photoUrl || Env.USERPHOTO_URL;
          const userEmail =
            User?.info?.email || User?.email || 'abcd@gmail.com';
          const userPhone = User?.info?.phone || '+91 12345678900';
          const userWebsite = User?.info?.website || 'www.octoriahardware.com';
          const userAddress = User?.info?.address || 'example address';
          setBusiness({
            name: userName,
            photo: userImage,
            email: userEmail,
            phone: userPhone,
            website: userWebsite,
            address: userAddress,
          });
          const isUserSignedUp = !!User?.email;
          setIsSignUp(isUserSignedUp);
          console.log('user loaded', Date.now());
        } else {
          setIsSignUp(false);
        }
      } catch (error) {}

      if (userw !== null || isFirstTime) setInitializing(false);
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [initializing]);

  return (
    <Stack.Navigator
      id="root-navigator"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
      }}
    >
      {isFirstTime ? (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      ) : (
        <Stack.Group>
          {user !== null ? (
            isSignUp ? (
              <>
                <Stack.Screen name="App" component={TabNavigator} />
                <Stack.Screen name="DayList" component={DayList} />
                <Stack.Screen name="DayList2" component={DayList2} />
                <Stack.Screen name="ImageEditor" component={ImageEditor} />
                <Stack.Screen name="Tutorials" component={Tutorial} />
                <Stack.Screen name="Stickers" component={StickersWidget} />
                <Stack.Screen name="Shapes" component={ShapesWidget} />
                <Stack.Screen name="Products" component={ProductsWidget} />
                <Stack.Screen name="Logos" component={LogosWidget} />
                <Stack.Screen
                  name="ChangeImageModal"
                  component={ChangeImageModal}
                />
                <Stack.Screen name="ImageModal" component={ImageModal} />
                <Stack.Screen name="InfoWidget" component={InfoWidget} />
                <Stack.Screen name="TextModal" component={TextModal} />
                <Stack.Screen name="Gallery" component={Gallery} />
                <Stack.Screen name="ImageViewer" component={ImageViewer} />
                <Stack.Screen name="RenderWidget" component={RenderWidget} />
                <Stack.Screen name="Elements" component={ElementsWidget} />
                <Stack.Screen
                  name="BackgroundVideosWidget"
                  component={BackgroundVideosWidget}
                />
                <Stack.Screen name="Frames" component={FrameWidget} />
                <Stack.Screen
                  name="BackgroundModal"
                  component={BackgroundWidget}
                />
                <Stack.Screen name="ARView" component={ARView} />
              </>
            ) : (
              <Stack.Screen name="SignUp" component={SignUpForm} />
            )
          ) : (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          )}
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  const linking = {
    prefixes: [prefix, `https://octoriahardware.com/`],
    config: {
      screens: {
        ImageEditor: 'editorx/',
        App: {
          screens: {
            SettingNavigator: 'profile/',
            FeedNavigator: {
              path: 'products/',
              screens: {
                Post: 'id/:id',
              },
            },
          },
        },
      },
    },
  };
  return (
    <NavigationContainer linking={linking}>
      <Root />
    </NavigationContainer>
  );
};
