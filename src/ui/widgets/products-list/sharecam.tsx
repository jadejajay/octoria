/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-lines-per-function */
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useRef, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ToastAndroid } from 'react-native';
import { ImageBackground } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';

import { shareImageWithTitle } from '@/core';
import { useImageStore } from '@/core/camshare';
import { useLinks } from '@/core/mainscreen';
// import { shareImageWithTitle } from '@/core';
import { ActivityIndicator, Image, Text } from '@/ui';
import AbsoluteButton from '@/ui/core/absolute-button';

import { Gestures } from './simultaneous-gesture';

// import Gestures from '../lib';

export const ShareCam = ({ route }: any) => {
  const { url } = route.params;
  const server = useLinks();
  const demoShare = 'Hello, This Post is Generate by Octoria Application.';
  const { image, setImage } = useImageStore();
  const imgRef = useRef();
  const [loading, setLoading] = useState(false);
  const [share, setShare] = useState(demoShare);
  const { goBack } = useNavigation();
  useEffect(() => {
    setLoading(true);
    const shareLink = server.LinksData.find((item) => item.id === 'share');
    const backgroundLink = server.LinksData.find(
      (item) => item.id === 'background'
    );
    if (shareLink) {
      setShare(shareLink.value!);
    }
    if (backgroundLink) {
      setImage(backgroundLink.url!);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server.isLoading]);

  const mediaLib = async (localUri: string) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      // You have permission to write to the storage here
      MediaLibrary.saveToLibraryAsync(localUri);
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
  function delayedPromise(): Promise<void> {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 400);
    });
  }

  async function handleDownload() {
    const _ = await delayedPromise();
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
      ToastAndroid.show('download Failed !', ToastAndroid.SHORT);
    }
  }
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      ToastAndroid.show('Something Unexpected Happen !', ToastAndroid.SHORT);
    }
  };

  const handleShare = async () => {
    const _ = await delayedPromise();
    try {
      setLoading(true);
      const _localUri = await captureRef(imgRef, {
        quality: 1,
      })
        .then((localUri) => {
          shareImageWithTitle(localUri, share);
        })
        .finally(() => setLoading(false));
    } catch (e) {
      ToastAndroid.show('Sharing failed !', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.camera}
          source={{ uri: image }}
          resizeMode="cover"
          //@ts-ignore
          ref={imgRef}
        >
          <View style={styles.buttonContainer}>
            <Gestures
              comp={
                <Image
                  src={url}
                  style={{
                    width: 400,
                    height: 400,
                  }}
                  resizeMode="contain"
                />
              }
            />
          </View>
          {loading && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
            >
              <Image
                src={'http://itekindia.com/octoria/logo_big.png'}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          )}
        </ImageBackground>
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
            onPress={handleShare}
            style={{ flexDirection: 'column', alignItems: 'center' }}
          >
            <MaterialIcons name="share" size={30} color={'white'} />
            <Text variant="xs" className="font-aquire text-white">
              Share
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pickImage}
            style={{ flexDirection: 'column', alignItems: 'center' }}
          >
            <MaterialIcons name="camera-enhance" size={30} color={'white'} />
            <Text variant="xs" className="font-aquire text-white">
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDownload}
            style={{ flexDirection: 'column', alignItems: 'center' }}
          >
            <MaterialIcons name="cloud-download" size={30} color={'white'} />
            <Text variant="xs" className="font-aquire text-white">
              Download
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
