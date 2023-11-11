/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';

import { useEditorX } from '@/core';
import { useIsFirstTime, useIsSignUp } from '@/core/hooks';
import { useUserStore } from '@/core/mainscreen/user';
import { Onboarding } from '@/screens';
import { SignUpForm } from '@/screens/login/signup';
import { DayList } from '@/screens/style/editor/day-list';
import { Tutorial } from '@/screens/style/editor/tutorials';
import { ImageEditor } from '@/screens/style/image-editor';
import type { UserType } from '@/types';

import { AuthNavigator } from './auth-navigator';
import { loadDataFromFirestore } from './loads';
import { NavigationContainer } from './navigation-container';
import { TabNavigator } from './tab-navigator';
import { ARView } from '../ui/widgets/products-list/arview';

const Stack = createNativeStackNavigator();
const prefix = Linking.createURL('/');
export const Root = () => {
  console.log('Root Stack Activated', Date.now());
  // const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const [isSignUp, setIsSignUp] = useIsSignUp();
  const [initializing, setInitializing] = useState(true);
  const setUserData = useUserStore((s) => s.setUser);
  const setBusiness = useEditorX((s) => s.setBusiness);
  const setEditor = useEditorX((s) => s.setEditor);

  // const [signupVar, setSignupVar] = useState(false);
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
          const userName = User?.info?.name
            ? User?.info?.name
            : User?.business
            ? User?.business
            : '';
          const userImage = User?.info?.photo
            ? User?.info?.photo
            : User?.photoUrl
            ? User?.photoUrl
            : '';
          const userEmail = User?.info?.email
            ? User?.info?.email
            : User?.email
            ? User?.email
            : '';
          const userPhone = User?.info?.phone ? User?.info?.phone : '';
          const userWebsite = User?.info?.website ? User?.info?.website : '';
          const userAddress = User?.info?.address ? User?.info?.address : '';
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
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  //https://firebasestorage.googleapis.com/v0/b/speedy-league-335221.appspot.com/o/app_assets%2Fbg-signup.png?alt=media&token=f27da6de-c20f-450f-9cf2-0f2156fcd98a
  //https://images.ganeshaspeaks.com/GSV7/images/Diwali-21-750.webp
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
                <Stack.Screen name="ImageEditor" component={ImageEditor} />
                <Stack.Screen name="Tutorials" component={Tutorial} />
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
