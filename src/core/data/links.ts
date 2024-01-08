import firestore from '@react-native-firebase/firestore';

import {
  F_LINKS,
  F_LINKS_BACKGROUND,
  F_LINKS_GSTAPIKEY,
  F_LINKS_SERVER,
  F_LINKS_SETTINGS,
  F_LINKS_SHARE,
} from '@/types';

import { logger } from '../logger';

export const addLinks = async () => {
  await firestore().collection(F_LINKS).doc(F_LINKS_BACKGROUND).set({
    url: 'https://firebasestorage.googleapis.com/v0/b/speedy-league-335221.appspot.com/o/app_assets%2Fwood.jpg?alt=media&token=f21faf5c-5f0a-4330-a81d-242ca9ba21c3',
  });
  await firestore().collection(F_LINKS).doc(F_LINKS_GSTAPIKEY).set({
    apikey: 'e494d334bcd83ed215f6b2398dfc2a4a',
  });
  await firestore().collection(F_LINKS).doc(F_LINKS_SERVER).set({
    url: 'https://ibaisindia.com/',
  });
  await firestore().collection(F_LINKS).doc(F_LINKS_SETTINGS).set({
    feedback: 'htps://octoriahardware.com',
  });
  await firestore().collection(F_LINKS).doc(F_LINKS_SHARE).set({
    phone: '918734845201',
    value: 'Hello, This Post is Generate by Octoria Application.',
  });
  logger.log('addShapes', 'Shapes Added');
};
