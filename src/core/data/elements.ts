import firestore from '@react-native-firebase/firestore';

import { type ElementsType, F_ELEMENTS } from '@/types';

import { logger } from '../logger';

export const elements: ElementsType[] = [
  {
    image:
      'https://png.pngtree.com/thumb_back/fh260/background/20230224/pngtree-d-game-art-natural-landscape-for-games-mobile-applications-and-computers-image_1696195.jpg',
    thumbnail:
      'https://png.pngtree.com/thumb_back/fh260/background/20230224/pngtree-d-game-art-natural-landscape-for-games-mobile-applications-and-computers-image_1696195.jpg',
  },
  {
    image:
      'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-cartoon-stereo-bar-button-image_2284093.jpg',
    thumbnail:
      'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-cartoon-stereo-bar-button-image_2284093.jpg',
  },
  {
    image:
      'https://i.pinimg.com/474x/89/80/62/898062c1632c15f5bbdd32117fba94c0.jpg',
    thumbnail:
      'https://i.pinimg.com/474x/89/80/62/898062c1632c15f5bbdd32117fba94c0.jpg',
  },
  {
    image:
      'https://png.pngtree.com/png-vector/20200805/ourmid/pngtree-hand-drawn-cube-creative-illustration-technology-sense-flat-design-strip-png-image_2319014.jpg',
    thumbnail:
      'https://png.pngtree.com/png-vector/20200805/ourmid/pngtree-hand-drawn-cube-creative-illustration-technology-sense-flat-design-strip-png-image_2319014.jpg',
  },
  {
    image:
      'https://images.pexels.com/photos/4669636/pexels-photo-4669636.jpeg?auto=compress&cs=tinysrgb&w=1600',
    thumbnail:
      'https://images.pexels.com/photos/4669636/pexels-photo-4669636.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];
export const addElements = async () => {
  const batch = firestore().batch();
  for (let i = 0; i < elements.length; i++) {
    const ref = firestore().collection(F_ELEMENTS).doc();
    batch.set(ref, elements[i]);
    logger.log(`Added document ${i}`);
  }
  batch.commit();
  logger.log(`All Elements Added Successfully.`);
};
