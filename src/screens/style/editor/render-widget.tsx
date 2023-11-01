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

import { useEditorX } from '@/core';
// import { handleWhatsappShare } from '@/core';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from '@/ui';
type Props8 = {
  isVisible: boolean;
  progress: number;
  isLoading: boolean;
  onClose: () => void;
  renderedAsset: string | undefined;
  renderWidth: number;
};
export const RenderWidget = ({
  isVisible,
  isLoading,
  progress,
  onClose,
  renderedAsset,
}: Props8) => {
  const type = useEditorX((state) => state.editorData.bgType);
  const [res, setRes] = useState('');
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
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <View className="flex-1 items-center">
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
          className="overflow-hidden p-4"
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
                  backgroundColor: 'yellow',
                }}
                resizeMode="contain"
              />
            )
          )}
        </View>
        <View className="flex-column w-full items-center justify-around">
          <View className="w-full flex-row items-center justify-around">
            <Image
              src={
                'http://itekindia.com/chats/bgimages/whatsapp-1623579_1280.png'
              }
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
            <Image
              src={
                'http://itekindia.com/chats/bgimages/instagram-1675670_1280.png'
              }
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity onPress={saveToGallery} className="">
            <Image
              src={
                'http://itekindia.com/chats/bgimages/download-155424_1280.png'
              }
              style={{ width: 200, height: 100 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
