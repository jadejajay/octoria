import storage from '@react-native-firebase/storage';

import { ImageProcessor } from './image-filter';
import { logger } from './logger';
export async function uploadImage(uri: string, user: any) {
  logger.log('uri', uri);
  var x = '';
  if (user) {
    const imageProcessor = new ImageProcessor();
    await imageProcessor
      .resize(uri)
      .then(async (resizedImage) => {
        logger.log('resizedImage', resizedImage);
        if (resizedImage?.uri) {
          const response = await fetch(resizedImage.uri);
          const blob = await response.blob();
          const ref = storage().ref().child(`images/${user.uid}/avatar.png`);
          await ref.put(blob);
          x = await ref.getDownloadURL();
          logger.log('stored image ==> ', x);
        }
      })
      .catch((error) => {
        logger.log(error);
      });
    return x;
  }
  return x;
}
