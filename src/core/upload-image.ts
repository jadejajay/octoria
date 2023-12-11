import storage from '@react-native-firebase/storage';
import * as MediaLibrary from 'expo-media-library';
import { ToastAndroid } from 'react-native';
export async function uploadImage(uri: string, user: any) {
  let x = '';
  if (user) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref().child(`images/${user.uid}/avatar.png`);
    await ref.put(blob);
    x = await ref.getDownloadURL();
    return x;
  }
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
