import 'react-native-gesture-handler';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { firebase } from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { APIProvider } from '@/api';
import { loadSelectedTheme } from '@/core';
import { RootNavigator } from '@/navigation';

// hydrateAuth();
loadSelectedTheme();
SplashScreen.preventAutoHideAsync();

const App = () => {
  // const auth = firebase.auth();
  // auth.useEmulator('http://192.168.0.8:9099');
  // firestore().useEmulator('http://192.168.0.8', 8080);
  // storage().useEmulator('http://192.168.0.8', 9199);
  return (
    <GestureHandlerRootView style={styles.container}>
      <APIProvider>
        <BottomSheetModalProvider>
          <RootNavigator />
          <FlashMessage position="top" />
        </BottomSheetModalProvider>
      </APIProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
