import firestore from '@react-native-firebase/firestore';

import type { MainCategory } from '@/types';
import { F_MAIN_CATEGORY } from '@/types';

import { logger } from '../logger';

const mainCategory: MainCategory[] = [
  {
    image: 'https://ibaisindia.co.in/octoria/products-image/towerbolt.webp',
    title: 'Tower Bolt',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/products-image/hook.webp',
    title: 'khuti',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/products-image/cabinet.webp',
    title: 'Cabinet Handle',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/products-image/conceal.webp',
    title: 'Conceal Handle',
  },
];
export const addMainCategory = async () => {
  const batch = firestore().batch();
  for (let i = 0; i < mainCategory.length; i++) {
    const ref = firestore().collection(F_MAIN_CATEGORY).doc();
    batch.set(ref, mainCategory[i]);
    logger.log(`Added document ${i}`);
  }
  batch.commit();
  logger.log(`All Main Category Added Successfully.`);
};
