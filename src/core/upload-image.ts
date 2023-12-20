import storage from '@react-native-firebase/storage';
import * as MediaLibrary from 'expo-media-library';
import { ToastAndroid } from 'react-native';

import { ImageProcessor } from './image-filter';
import { logger } from './logger';
export async function uploadImage(uri: string, user: any) {
  let x = '';
  if (user) {
    const imageProcessor = new ImageProcessor();
    imageProcessor
      .resize(uri)
      .then(async (resizedImage) => {
        logger.log('resizedImage', resizedImage);
        if (resizedImage?.uri) {
          const response = await fetch(resizedImage.uri);
          const blob = await response.blob();
          const ref = storage().ref().child(`images/${user.uid}/avatar.png`);
          await ref.put(blob);
          x = await ref.getDownloadURL();
        }
      })
      .catch((error) => {
        logger.log(error);
      });
    return x;
  }
  return x;
}
export const saveToGallery = async (renderedAsset: any) => {
  if (renderedAsset) {
    const albumName = await MediaLibrary.getAlbumAsync('Octoria');
    if (albumName) {
      const asset = await MediaLibrary.createAssetAsync(renderedAsset);
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
      const asset = await MediaLibrary.createAssetAsync(renderedAsset);
      const album = await MediaLibrary.createAlbumAsync('Octoria', asset, true);
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
