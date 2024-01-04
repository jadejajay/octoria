import firestore from '@react-native-firebase/firestore';

import { F_FRAME_LIST } from '@/types';

import { logger } from '../logger';
import { frames } from './frames';

export const addFrames = async () => {
  const batch = firestore().batch();
  for (let i = 0; i < frames.length; i++) {
    const ref = firestore().collection(F_FRAME_LIST).doc();
    batch.set(ref, frames[i]);
    logger.log(`Added document ${i}`);
  }
  batch.commit();
  logger.log(`All Frames Added Successfully.`);
};
