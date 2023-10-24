/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
import { ResizeMode, Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import React from 'react';
import { Image, Modal, ToastAndroid } from 'react-native';

// import { handleWhatsappShare } from '@/core';
import { ActivityIndicator, Button, Text, View } from '@/ui';
type Props8 = {
  isVisible: boolean;
  progress: number;
  isLoading: boolean;
  onClose: () => void;
  render: () => void;
  type: 'photo' | 'video';
  renderedAsset: string | undefined;
  renderWidth: number;
};
export const RenderWidget = ({
  isVisible,
  isLoading,
  progress,
  onClose,
  type,
  render,
  renderedAsset,
}: Props8) => {
  const themecolor = 'white';
  const resource = renderedAsset;

  const saveToGallery = async () => {
    if (resource) {
      const albumName = await MediaLibrary.getAlbumAsync('Octoria');
      if (albumName) {
        const asset = await MediaLibrary.createAssetAsync(resource);
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
        const asset = await MediaLibrary.createAssetAsync(resource);
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
      <View
        className="flex-1 items-center"
        style={{ backgroundColor: themecolor }}
      >
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
                source={{ uri: renderedAsset }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
              />
            )
          )}
        </View>

        <Button variant="defaults" label="change resolution" onPress={render} />
        <Button
          variant="defaults"
          label="Save to Gallery"
          onPress={saveToGallery}
        />
      </View>
    </Modal>
  );
};
