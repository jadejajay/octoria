/* eslint-disable max-lines-per-function */
/* eslint-disable react-native/no-inline-styles */
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Modal } from 'react-native';
import { ToastAndroid } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import ViewShot from 'react-native-view-shot';
import { WebView } from 'react-native-webview';

import {
  AbsoluteButton,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from '@/ui/core';
import { View } from '@/ui/core';
import { Platform } from 'react-native';
type Props = {
  route: any;
};
export const ARView = ({ route }: Props) => {
  const url = route.params?.model
    ? `http://itekindia.com/octoria/xrservice/?model=${route.params?.model}`
    : 'http://itekindia.com/octoria/xrservice/?model=handle.glb';
  // const url = 'https://github.com/benwinding';
  const share = 'Hello, This Post is Generate by Octoria Application.';
  const imgRef = useRef(null);
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [imageData, setImageData] = useState(null);
  const { goBack } = useNavigation();
  const captureContent = () => {
    if (webViewRef.current !== null) {
      // Send a message to the injected script to capture the content
      webViewRef.current.postMessage('captureContent');
    }
  };

  const handleUrlWithImage = async (imgUrl: any) => {
    console.log(imgUrl?.nativeEvent?.data);

    try {
      setLoading(true);
      setImageData(imgUrl?.nativeEvent?.data);
      setOpenShare(true);

      // handleShare(imgUrl?.nativeEvent?.data, share);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
      ToastAndroid.show('Sharing failed !', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        ref={webViewRef}
        nativeConfig={{
          props: {
            webContentsDebuggingEnabled: true,
            console: new MyLogger(),
          },
        }}
        // useWebView2
        // renderToHardwareTextureAndroid
        // mediaCapturePermissionGrantType="grant"
        // geolocationEnabled={true}
        // mixedContentMode="always"
        // mediaPlaybackRequiresUserAction={false}
        // domStorageEnabled={true}
        // allowFileAccess={true}
        // allowUniversalAccessFromFileURLs={true}
        // allowFileAccessFromFileURLs={true}
        // thirdPartyCookiesEnabled={true}
        // javaScriptEnabled={true}
        // bounces={false}
        onMessage={(result) => handleUrlWithImage(result)}
        // onNavigationStateChange={}
        source={{
          uri: 'http://192.168.0.8:3000/octoria/xrservice',
        }}
        style={styles.container}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
      <AbsoluteButton
        iconName="arrow-back"
        onPress={() => {
          goBack();
        }}
        color="#fff"
      />
      <Modal visible={loading} style={{ flex: 1 }} transparent={true}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      </Modal>
      <Modal
        visible={openShare}
        onRequestClose={() => {
          setOpenShare(false);
        }}
        style={{ flex: 1 }}
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
          }}
        >
          <Text variant="sm" className="text-center">
            Share Your AR View
          </Text>
          <ViewShot ref={imgRef} style={{ width: '90%', height: '70%' }}>
            {imageData && (
              <Image
                source={{ uri: `data:image;base64,${imageData}` }}
                style={{ width: '100%', height: '100%' }}
              />
            )}
            <View style={styles.abs}>
              <FastImage
                source={require('../../../../assets/logo_big.png')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </ViewShot>
        </View>
      </Modal>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <TouchableOpacity
          onPress={captureContent}
          style={{ flexDirection: 'column', alignItems: 'center' }}
        >
          <MaterialIcons name="share" size={30} color={'white'} />
          <Text variant="xs" className="font-aquire text-white">
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

class MyLogger {
  log = (message) => {
    console.log(message, '<==from webview'); // Print in RN logs for now...
  };
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  camera: {
    flex: 1,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    flex: 1,
  },
  image: {
    width: 400,
    height: 400,
    opacity: 0.3,
  },
  absContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  abs: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
