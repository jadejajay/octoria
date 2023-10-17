/* eslint-disable max-lines-per-function */
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect } from 'react';
import { Image, Linking, Modal } from 'react-native';
import { showMessage } from 'react-native-flash-message';

// import { handleWhatsappShare } from '@/core';
import { Button, Text, View } from '@/ui';
type Props8 = {
  isVisible: boolean;
  onClose: () => void;
  render: () => void;
  renderedImage: string | undefined;
  setRenderedImageExtension: any;
  renderWidth: number;
};
export const RenderWidget = ({
  isVisible,
  onClose,
  render,
  renderedImage,
  setRenderedImageExtension,
  renderWidth,
}: Props8) => {
  const themecolor = 'white';
  useEffect(() => {
    render();
    console.log(renderedImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const saveToGallery = async () => {
    if (renderedImage) {
      const albumName = await MediaLibrary.getAlbumAsync('Octoria');
      if (albumName) {
        const asset = await MediaLibrary.createAssetAsync(renderedImage);
        const _album = await MediaLibrary.addAssetsToAlbumAsync(
          asset,
          albumName.id,
          true
        ).then((_) => {
          console.log(
            'Image saved successfully to IBAIS Media album in your gallery',
            asset.uri
          );
          showMessage({
            type: 'success',
            icon: 'success',
            message: `Image saved successfully to IBAIS Media album in your gallery ${asset.uri}`,
            duration: 4000,
            onPress: () => {
              Linking.openURL(asset.uri);
            },
          });

          // handleWhatsappShare(asset.uri, 'this is my rendered image');
        });
        // const album = await MediaLibrary.createAlbumAsync(
        //   'IBAIS Media',
        //   asset,
        //   false
        // );
      } else {
        const asset = await MediaLibrary.createAssetAsync(renderedImage);
        const _album = await MediaLibrary.createAlbumAsync(
          'Octoria',
          asset,
          true
        ).then(
          (_) => {
            console.log(
              'Image saved successfully to IBAIS Media album in your gallery',
              asset.uri
            );
            showMessage({
              type: 'success',
              icon: 'success',
              message: `Image saved successfully to IBAIS Media album in your gallery ${asset.uri}`,
              duration: 4000,
              onPress: () => {
                Linking.openURL(asset.uri);
              },
            });
            // handleWhatsappShare(asset.uri, 'this is my rendered image');
          },
          (e) => {
            showMessage({
              type: 'danger',
              message: `Error Creating assets ${e}`,
              duration: 4000,
              onPress: () => {
                Linking.openURL(asset.uri);
              },
            });
          }
        );
      }
    }
  };
  const _changeExtenstion = (str: 'jpg' | 'png' | 'webm') => {
    setRenderedImageExtension(str);
  };
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: themecolor }}
      >
        <View
          className="overflow-hidden rounded-lg border-2 border-cyan-400"
          style={{ width: renderWidth, height: renderWidth }}
        >
          {renderedImage && (
            <Image
              source={{ uri: renderedImage }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          )}
        </View>
        <Text className="text-base">select Render Component</Text>
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
