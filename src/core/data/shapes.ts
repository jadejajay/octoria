import firestore from '@react-native-firebase/firestore';

import { F_SHAPES, type ShapesType } from '@/types';

import { logger } from '../logger';

export const shapes: ShapesType[] = [
  {
    image:
      'https://images.pexels.com/photos/4669636/pexels-photo-4669636.jpeg?auto=compress&cs=tinysrgb&w=1600',
    thumbnail:
      'https://images.pexels.com/photos/4669636/pexels-photo-4669636.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];
export const addShapes = async () => {
  const batch = firestore().batch();
  for (let i = 0; i < shapes.length; i++) {
    const ref = firestore().collection(F_SHAPES).doc();
    batch.set(ref, shapes[i]);
    logger.log(`Added document ${i}`);
  }
  batch.commit();
  logger.log(`All Shapes Added Successfully.`);
};
