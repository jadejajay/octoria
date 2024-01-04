import firestore from '@react-native-firebase/firestore';

import type { ImageListType } from '@/types';
import { F_IMAGES_ELEMENTS } from '@/types';

import { logger } from '../logger';
export const images: ImageListType[] = [
  {
    image: 'https://ibaisindia.co.in/chats/imagesElement/cloud.png',
    thumbnail: 'https://ibaisindia.co.in/chats/imagesElement/cloud.png',
  },
];
export const addImagesList = async () => {
  const batch = firestore().batch();
  for (let i = 0; i < images.length; i++) {
    const ref = firestore().collection(F_IMAGES_ELEMENTS).doc();
    batch.set(ref, images[i]);
    logger.log(`Added document ${i}`);
  }
  batch.commit();
  logger.log(`All Images Added Successfully.`);
};
