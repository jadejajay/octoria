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
import FastImage from 'react-native-fast-image';
import ViewShot, { captureRef } from 'react-native-view-shot';

import {
  handleShare,
  saveToGallery,
  useFirestoreLiveQuery,
  useImageStore,
} from '@/core';
import { AbsoluteButton, ActivityIndicator, Image, Text } from '@/ui/core';

import { Gestures } from './simultaneous-gesture';

export const ShareCam = ({ route }: any) => {
  const { url } = route.params;
  const server = useFirestoreLiveQuery('links');
  const demoShare = 'Hello, This Post is Generate by Octoria Application.';
  const { image, setImage } = useImageStore();
  const imgRef = useRef(null);
  const imgRefMain = useRef(null);
  const [loading, setLoading] = useState(false);
  const [share, setShare] = useState(demoShare);
  const [imageData, setImageData] = useState<string>('');
  const [openShare, setOpenShare] = useState(false);
  const { goBack } = useNavigation();
  useEffect(() => {
    setLoading(true);
    const shareLink = server.data.find((item: any) => item.id === 'share');
    const backgroundLink = server.data.find(
      (item: any) => item.id === 'background'
    );
    if (shareLink) {
      setShare(shareLink.value!);
    }
    if (backgroundLink) {
      setImage(backgroundLink.url!);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server.data]);

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
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      setLoading(false);
      ToastAndroid.show('Something Unexpected Happen !', ToastAndroid.SHORT);
    }
  };
  const uploadImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      setLoading(false);
      ToastAndroid.show('Something Unexpected Happen !', ToastAndroid.SHORT);
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
  const handleCapture = async () => {
    try {
      setLoading(true);
      const _localUri = await captureRef(imgRefMain, {
        quality: 1,
      })
        .then((localUri) => {
          setImageData(localUri);
          setOpenShare(true);
        })
        .finally(() => setLoading(false));
    } catch (e) {
      setLoading(false);
      ToastAndroid.show('Capturing failed !', ToastAndroid.SHORT);
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

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.camera}
          source={{ uri: image }}
          resizeMode="cover"
          ref={imgRefMain}
        >
          <View style={styles.buttonContainer}>
            <Gestures
              comp={
                <FastImage
                  source={{ uri: url }}
                  style={{
                    width: 400,
                    height: 400,
                  }}
                  resizeMode="contain"
                />
              }
            />
          </View>
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
                backgroundColor: 'red',
              }}
            >
              {imageData && (
                <Image
                  source={{ uri: imageData }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="stretch"
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
              <TouchableOpacity
                onPress={handleDownload}
                style={styles.buttonKey}
              >
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
                <Text
                  variant="xs"
                  className="font-sfbold"
                  tx={'editor.share'}
                />
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
            onPress={pickImage}
            style={{ flexDirection: 'column', alignItems: 'center' }}
          >
            <MaterialIcons
              name="photo-camera-front"
              size={30}
              color={'white'}
            />
            <Text variant="xxs" className="font-sfregular text-white">
              Upload From Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCapture}
            style={{ flexDirection: 'column', alignItems: 'center' }}
          >
            <MaterialIcons name="camera-enhance" size={30} color={'white'} />
            <Text variant="xxs" className="font-sfregular text-white">
              Capture
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={uploadImage}
            style={{ flexDirection: 'column', alignItems: 'center' }}
          >
            <MaterialIcons name="photo-camera-back" size={30} color={'white'} />
            <Text variant="xxs" className="font-sfregular text-white">
              Upload From Gallery
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
    width: '70%',
    height: '70%',
    opacity: 0.45,
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
