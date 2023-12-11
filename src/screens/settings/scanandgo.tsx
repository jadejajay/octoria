/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
import { Ionicons } from '@expo/vector-icons';
import Clipboard from '@react-native-clipboard/clipboard';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet, ToastAndroid, Vibration } from 'react-native';

import { Text, TouchableOpacity, View } from '@/ui';
export const ScanNGo = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [scanned, setScanned] = useState(false);
  const [Data, setData] = useState('');
  const handleOpenURL = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      Clipboard.setString(url);
      ToastAndroid.show(
        'Content Copied To Clipboard: ' + url,
        ToastAndroid.SHORT
      );
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    const unsubscribe = navigation.addListener('blur', () => {
      // The screen is focused
      // Call any action
      setScanned(false);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text variant="lg" className="text-red-600">
          No access to camera
        </Text>
      </View>
    );
  }
  if (isFocused) {
    return (
      <View style={styles.container}>
        {scanned && (
          <TouchableOpacity
            className=" h-1/2 w-5/6 items-center justify-around gap-4 rounded-lg"
            style={{
              backgroundColor: 'white',
              elevation: 5,
            }}
            activeOpacity={1}
          >
            <Text className="font-varela text-lg  text-blue-700">{Data}</Text>
            <TouchableOpacity onPress={() => handleOpenURL(Data)}>
              <Text
                className="text-text rounded-2xl bg-blue-700 p-2 font-varela text-xl text-white"
                tx={'scanqr.open_link'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setScanned(false)}>
              <Text
                className="text-text rounded-xl p-2 font-varela text-xl"
                style={{ elevation: 4, backgroundColor: 'white' }}
                tx={'scanqr.scan_again'}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        {!scanned && (
          <>
            <Camera
              onBarCodeScanned={(...args) => {
                const data = args[0].data;
                setData(data);
                Vibration.vibrate();
                setScanned(true);
              }}
              barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
              }}
              style={styles.camera}
            />
            <View className="absolute z-10 flex-1 items-center justify-center">
              <Ionicons name="scan-outline" size={340} color="white" />
            </View>
            <View className="absolute z-10 flex-1 items-center justify-end">
              <Text className="font-varela text-sm text-white">powered by</Text>
              <Text className="font-varela text-xl text-white">
                IBAIS MEDIA
              </Text>
            </View>
          </>
        )}
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
