/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-lines-per-function */
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useRef, useState } from 'react';
import {
  Image as IMage,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ToastAndroid } from 'react-native';
import { ImageBackground } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';

import { shareImageWithTitle } from '@/core';
import { useLinks } from '@/core/mainscreen';
// import { shareImageWithTitle } from '@/core';
import { ActivityIndicator } from '@/ui';
import AbsoluteButton from '@/ui/core/absolute-button';

import Gestures from '../lib';

export function ShareCam({ route }: any) {
  const { url } = route.params;
  const server = useLinks();
  const demoLink =
    'https://firebasestorage.googleapis.com/v0/b/speedy-league-335221.appspot.com/o/app_assets%2Fwood.jpg?alt=media&token=f21faf5c-5f0a-4330-a81d-242ca9ba21c3';
  const demoShare = 'Hello, This Post is Generate by Octoria Application.';
  // const share = useFirestoreDocLiveQuery('links', 'share');
  // const { data, isLoading } = useFirestoreDocLiveQuery('links', 'background');
  const [image, setImage] = useState(demoLink);
  const imgRef = useRef();
  const [loading, setLoading] = useState(false);
  const [share, setShare] = useState(demoShare);
  const { goBack } = useNavigation();
  // useEffect(() => {
  //   setImage(data?.url);
  // }, [data?.url, isLoading]);
  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server.isLoading]);

  async function handleDownload() {
    try {
      setLoading(true);
      const localUri = await captureRef(imgRef, {
        height: 440,
        quality: 1,
      });
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        // You have permission to write to the storage here
        await MediaLibrary.saveToLibraryAsync(localUri);
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
    } catch (_) {
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
    try {
      setLoading(true);
      const localUri = await captureRef(imgRef, {
        height: 440,
        quality: 1,
      });
      shareImageWithTitle(localUri, share);
      setLoading(false);
    } catch (e) {
      ToastAndroid.show('Sharing failed !', ToastAndroid.SHORT);
    }
  };
  if (server.isLoading) {
    return null;
  }

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
            {/* <PinchableBox image={url} /> */}
            <Gestures>
              <IMage
                source={{
                  uri: url,
                }}
                style={{
                  width: 200,
                  height: 200,
                  resizeMode: 'contain',
                }}
              />
            </Gestures>
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

        <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: 50,
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
            borderRadius: 999,
          }}
        >
          <TouchableOpacity
            onPress={handleShare}
            style={{
              alignSelf: 'center',
              margin: 10,
              marginRight: 50,
            }}
          >
            <MaterialIcons name="share" size={30} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pickImage}
            style={{
              alignSelf: 'center',
              margin: 10,
              marginRight: 50,
            }}
          >
            <MaterialIcons name="photo-camera-back" size={30} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDownload}
            style={{
              alignSelf: 'center',
              margin: 10,
            }}
          >
            <MaterialIcons name="cloud-download" size={30} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    // width: '100%',
    // height: '100%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    // position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    flex: 1,
  },
  button: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
