/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { ResizeMode, Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react';
import { Modal, ToastAndroid } from 'react-native';

import {
  handleFacebookShare,
  handleInstagramShare,
  handleTelegramShare,
  handleWhatsappShare2,
  useEditorX,
} from '@/core';
// import { handleWhatsappShare } from '@/core';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';
type Props8 = {
  isVisible: boolean;
  progress: number;
  isLoading: boolean;
  onClose: () => void;
  renderedAsset: string | undefined;
  renderedAssetData: any;
  renderWidth: number;
};
export const RenderWidget = ({
  isVisible,
  isLoading,
  progress,
  onClose,
  renderedAssetData,
  renderedAsset,
}: Props8) => {
  const type = useEditorX((state) => state.editorData.bgType);
  const [res, setRes] = useState('');
  console.log(res);
  useEffect(() => {
    if (renderedAsset) setRes(renderedAsset);
  }, [renderedAsset]);
  const saveToGallery = async () => {
    if (res) {
      const albumName = await MediaLibrary.getAlbumAsync('Octoria');
      if (albumName) {
        const asset = await MediaLibrary.createAssetAsync(res);
        const album = await MediaLibrary.addAssetsToAlbumAsync(
          asset,
          albumName.id,
          true
        );
        if (album) {
          ToastAndroid.show(
            `Post saved successfully to Octoria album in your gallery.`,
            ToastAndroid.LONG
          );
        } else {
          ToastAndroid.show(
            `Error Creating assets give permissions`,
            ToastAndroid.LONG
          );
        }
      } else {
        const asset = await MediaLibrary.createAssetAsync(res);
        const album = await MediaLibrary.createAlbumAsync(
          'Octoria',
          asset,
          true
        );
        if (album) {
          ToastAndroid.show(
            `Post saved successfully to Octoria album in your gallery.`,
            ToastAndroid.LONG
          );
        } else {
          ToastAndroid.show(
            `Error Creating assets give permissions`,
            ToastAndroid.LONG
          );
        }
      }
    }
  };
  const handleWP = async () => {
    const TYPE = type === 'photo' ? 'image/png' : 'video/mp4';
    if (renderedAssetData) {
      handleWhatsappShare2(
        renderedAssetData,
        'Hi, This Post is generated using Octoria Post maker application',
        TYPE
      );
    }
  };
  const handleIG = async () => {
    const TYPE = type === 'photo' ? 'image/png' : 'video/mp4';
    if (renderedAssetData) {
      handleInstagramShare(
        renderedAssetData,
        'Hi, This Post is generated using Octoria Post maker application',
        TYPE
      );
    }
  };
  const handleFB = async () => {
    const TYPE = type === 'photo' ? 'image/png' : 'video/mp4';
    if (renderedAssetData) {
      handleFacebookShare(
        renderedAssetData,
        'Hi, This Post is generated using Octoria Post maker application',
        TYPE
      );
    }
  };
  const handleTG = async () => {
    const TYPE = type === 'photo' ? 'image/png' : 'video/mp4';
    if (renderedAssetData) {
      handleTelegramShare(
        renderedAssetData,
        'Hi, This Post is generated using Octoria Post maker application',
        TYPE
      );
    }
  };
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <ScrollView>
        {isLoading && (
          <View className="absolute z-50 h-full w-full flex-col items-center justify-start">
            <View className="mt-40 h-20 w-full flex-col items-center justify-between">
              <ActivityIndicator size={50} />
              <Text className="font-varela text-lg">
                Generating Your {type === 'video' ? 'Video' : 'Image'}
                {progress % 2 === 0
                  ? progress % 3 === 0
                    ? progress % 5 === 0
                      ? ' 😍'
                      : ' 😋'
                    : ' 😊'
                  : ' 😑'}
              </Text>
            </View>
          </View>
        )}
        <View
          className="overflow-hidden"
          style={{ width: '100%', aspectRatio: 1 }}
        >
          {type === 'video' && renderedAsset ? (
            <Video
              style={{ flex: 1 }}
              source={{
                uri: renderedAsset,
              }}
              isMuted={false}
              volume={1}
              shouldPlay={true}
              useNativeControls={true}
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
          ) : (
            type === 'photo' &&
            renderedAsset && (
              <Image
                src={renderedAsset}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="contain"
              />
            )
          )}
        </View>
        <View className="flex-column w-full justify-around p-4">
          <TouchableOpacity
            className="m-2 w-full flex-row items-center"
            activeOpacity={1}
            onPress={handleWP}
          >
            <Image
              src={
                'http://itekindia.com/chats/bgimages/whatsapp-1623579_1280.png'
              }
              style={{ width: 50, height: 50 }}
              resizeMode="contain"
            />
            <Text variant="sm" className="ml-4 font-varela text-xl">
              Share on Whatsapp
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="m-2 w-full flex-row items-center"
            activeOpacity={1}
            onPress={handleIG}
          >
            <Image
              src={
                'http://itekindia.com/chats/bgimages/instagram-1675670_1280.png'
              }
              style={{ width: 50, height: 50 }}
              resizeMode="contain"
            />
            <Text className="ml-4 font-varela text-xl">Share on Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="m-2 w-full flex-row items-center"
            activeOpacity={1}
            onPress={handleFB}
          >
            <Image
              src={
                'http://itekindia.com/chats/bgimages/3D_Square_with_Facebook_Logo.jpg'
              }
              style={{ width: 50, height: 50 }}
              resizeMode="cover"
            />
            <Text className="ml-4 font-varela text-xl">Share on Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="m-2 w-full flex-row items-center"
            activeOpacity={1}
            onPress={handleTG}
          >
            <Image
              src={
                'http://itekindia.com/chats/bgimages/realistic_3d_square_with_telegram_logo.jpg'
              }
              style={{ width: 50, height: 50 }}
              resizeMode="cover"
            />
            <Text className="ml-4 font-varela text-xl">Share on Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={saveToGallery}
            className="h-16 w-full"
            activeOpacity={1}
          >
            <Image
              src={
                'http://itekindia.com/chats/bgimages/download-155424_1280.png'
              }
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};
