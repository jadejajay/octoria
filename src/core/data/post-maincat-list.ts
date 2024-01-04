import firestore from '@react-native-firebase/firestore';

import { F_POST_MAIN_CATEGORY, type PostMainCategoryType } from '@/types';

import { logger } from '../logger';

export const postMainCategory: PostMainCategoryType[] = [
  {
    code: 1,
    image: 'https://ibaisindia.co.in/chats/mainfestivalcategory/tiles.jpg',
    name: 'Start With Blank',
    subCode: 1,
  },
  {
    code: 2,
    image: 'https://ibaisindia.co.in/chats/mainfestivalcategory/fireworks.jpg',
    name: 'Festival',
    subCode: 1,
  },
  {
    code: 3,
    image: 'https://ibaisindia.co.in/chats/mainfestivalcategory/business.jpg',
    name: 'Business',
    subCode: 1,
  },
  {
    code: 4,
    image:
      'https://ibaisindia.co.in/chats/mainfestivalcategory/indian-flag.jpg',
    name: 'Special Days',
    subCode: 1,
  },
  {
    code: 5,
    image: 'https://ibaisindia.co.in/chats/mainfestivalcategory/cake.jpg',
    name: 'Greetings',
    subCode: 1,
  },
];
export const addPostMainCategory = async () => {
  const batch = firestore().batch();
  for (let i = 0; i < postMainCategory.length; i++) {
    const ref = firestore().collection(F_POST_MAIN_CATEGORY).doc();
    batch.set(ref, postMainCategory[i]);
    logger.log(`Added document ${i}`);
  }
  batch.commit();
  logger.log(`All Main Category Added Successfully.`);
};
