import firestore from '@react-native-firebase/firestore';

import type { ShareCamBgType } from '@/types';
import { F_SHARE_CAM_BG_IMAGES } from '@/types';

import { logger } from '../logger';
export const images: ShareCamBgType[] = [
  {
    image:
      'https://ibaisindia.co.in/octoria/database/sharecambg/plain-wall-with-door-front-face-without-any-objects.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/database/sharecambg/thumbnails/plain-wall-with-door-front-face-without-any-objects.webp',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/sharecambg/plain-wall-with-door-front-face-without-any-objects2.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/database/sharecambg/thumbnails/plain-wall-with-door-front-face-without-any-objects2.webp',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/sharecambg/sliding-door-plain-style-front-face.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/database/sharecambg/thumbnails/sliding-door-plain-style-front-face.webp',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/sharecambg/wooden-door-best-design-from-face-without-any-handles.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/database/sharecambg/thumbnails/wooden-door-best-design-from-face-without-any-handles.webp',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/sharecambg/wooden-door-best-design-from-face-without-any-handles (1).webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/database/sharecambg/thumbnails/wooden-door-best-design-from-face-without-any-handles (1).webp',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/sharecambg/wooden-door-best-design-from-face-without-any-handles (2).webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/database/sharecambg/thumbnails/wooden-door-best-design-from-face-without-any-handles (2).webp',
  },
];
export const addShareCamBg = async () => {
  const batch = firestore().batch();
  for (let i = 0; i < images.length; i++) {
    const ref = firestore().collection(F_SHARE_CAM_BG_IMAGES).doc();
    batch.set(ref, images[i]);
    logger.log(`Added document ${i}`);
  }
  batch.commit();
  logger.log(`All ShareCam Images Added Successfully.`);
};
