/* eslint-disable max-lines-per-function */
/* eslint-disable react-native/no-inline-styles */
import { Env } from '@env';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import React, { useRef, useState } from 'react';
import { Modal } from 'react-native';
import { ToastAndroid } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { WebView } from 'react-native-webview';

import { handleShare, logger, saveToGallery } from '@/core';
import {
  AbsoluteButton,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from '@/ui/core';
import { View } from '@/ui/core';
type Props = {
  route: any;
};
export const ARView = ({ route }: Props) => {
  const url = route.params?.model
    ? `${route.params?.model}`
    : `${Env.XRSERVICE_FALLBACK}`;
  logger.log('url', url);

  const share = 'Hello, This Image is Generate by Octoria Application.';
  const imgRef = useRef(null);
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [imageData, setImageData] = useState(null);
  const { goBack } = useNavigation();
  const captureContent = () => {
    if (webViewRef.current !== null) {
      // Send a message to the injected script to capture the content
      //@ts-ignore
      webViewRef.current.postMessage('screenshot');
    }
  };
  const mediaLib = async (localUri: string) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      // You have permission to write to the storage here
      // MediaLibrary.saveToLibraryAsync(localUri);
      await saveToGallery(localUri);
      ToastAndroid.show('Photo Saved to Gallery !', ToastAndroid.SHORT);
      setLoading(false);
    } else {
      ToastAndroid.show(
        'Permission denied go to setting and give permission !',
        ToastAndroid.SHORT
      );
      setLoading(false);
      // Handle the case where permission is denied
    }
  };

  const handleShareButton = async () => {
    try {
      setLoading(true);
      const _localUri = await captureRef(imgRef, {
        quality: 1,
      })
        .then((localUri) => {
          handleShare(localUri, share);
        })
        .finally(() => setLoading(false));
    } catch (e) {
      setLoading(false);
      ToastAndroid.show('Sharing failed !', ToastAndroid.SHORT);
    }
  };
  async function handleDownload() {
    try {
      setLoading(true);
      const _localUri = await captureRef(imgRef, {
        quality: 1,
      })
        .then((localUri) => {
          mediaLib(localUri);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      setLoading(false);
      ToastAndroid.show('download Failed !', ToastAndroid.SHORT);
    }
  }

  const handleUrlWithImage = async (imgUrl: any) => {
    try {
      setLoading(true);
      setImageData(imgUrl?.nativeEvent?.data);
      setOpenShare(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      ToastAndroid.show('Capturing failed !', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        ref={webViewRef}
        onMessage={(result) => handleUrlWithImage(result)}
        source={{
          uri: url,
        }}
        style={styles.container}
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
            width: '100%',
            height: '100%',
            paddingTop: 50,
            backgroundColor: 'white',
          }}
        >
          <ViewShot
            ref={imgRef}
            style={{
              width: '100%',
              height: '80%',
              borderColor: 'white',
              overflow: 'hidden',
            }}
          >
            {imageData && (
              <Image
                source={{ uri: `data:image;base64,${imageData}` }}
                style={{ width: '100%', height: '100%' }}
              />
            )}
            <View style={styles.abs}>
              <FastImage
                source={require('assets/logo_big.png')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </ViewShot>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: 50,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity onPress={handleDownload} style={styles.buttonKey}>
              <MaterialIcons name="save-alt" size={30} color={'black'} />
              <Text
                variant="xs"
                className="font-sfbold"
                tx={'editor.download'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShareButton}
              style={styles.buttonKey}
            >
              <MaterialIcons name="share" size={30} color={'black'} />
              <Text variant="xs" className="font-sfbold" tx={'editor.share'} />
            </TouchableOpacity>
          </View>
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
          <MaterialIcons name="camera-alt" size={30} color={'white'} />
          <Text
            variant="xs"
            className="font-sfbold text-white"
            tx={'editor.capture'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    width: 350,
    height: 350,
    opacity: 0.2,
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
  },
  button: {
    flex: 1,
  },
  buttonKey: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 30,
    borderColor: 'black',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2,
    elevation: 4,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
