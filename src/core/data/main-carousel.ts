import firestore from '@react-native-firebase/firestore';

import type { MainCarouselType } from '@/types';
import { F_MAIN_CAROUSEL } from '@/types';

import { logger } from '../logger';

const mainCategory: MainCarouselType[] = [
  {
    image: 'https://ibaisindia.co.in/octoria/products-image/cabinet.webp',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/products-image/towerbolt.webp',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/products-image/hook.webp',
  },
  {
    video: 'https://ibaisindia.co.in/octoria/products-image/Octoria.mp4',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/products-image/conceal.webp',
  },
];
export const addMainCarousel = async () => {
  const batch = firestore().batch();
  for (let i = 0; i < mainCategory.length; i++) {
    const ref = firestore().collection(F_MAIN_CAROUSEL).doc();
    batch.set(ref, mainCategory[i]);
    logger.log(`Added document ${i}`);
  }
  batch.commit();
  logger.log(`All Main Carousel Added Successfully.`);
};
