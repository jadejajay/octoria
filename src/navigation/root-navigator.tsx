/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';

// import { useAuth } from '@/core';
import { useIsFirstTime, useIsSignUp } from '@/core/hooks';
import { Onboarding } from '@/screens';
import { SignUpForm } from '@/screens/login/signup';
import { DayList } from '@/screens/style/editor/day-list';
import { ImageEditor } from '@/screens/style/image-editor';

import { AuthNavigator } from './auth-navigator';
import { loadDataFromFirestore } from './loads';
import { NavigationContainer } from './navigation-container';
import { TabNavigator } from './tab-navigator';
const Stack = createNativeStackNavigator();

export const Root = () => {
  // const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const [isSignUp, setIsSignUp] = useIsSignUp();
  const [initializing, setInitializing] = useState(true);

  // const [signupVar, setSignupVar] = useState(false);
  const [user, setUser] = useState<any>();

  const hideSplash = React.useCallback(async () => {
    await loadDataFromFirestore();
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (initializing) {
      hideSplash();
    }
    async function onAuthStateChanged(userw: any) {
      setUser(userw);
      try {
        const userDoc = await firestore()
          .collection('Users')
          .doc(userw?.uid)
          .get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          const isUserSignedUp = !!userData?.email;
          setIsSignUp(isUserSignedUp);
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
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};
