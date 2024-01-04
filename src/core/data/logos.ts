import firestore from '@react-native-firebase/firestore';

import { F_LOGOS_LIST, type LogosType } from '@/types';

import { logger } from '../logger';

export const logos: LogosType[] = [
  {
    image: 'https://ibaisindia.co.in/chats/logos/Octoria%20Mark%20Png.webp',
    thumbnail: 'https://ibaisindia.co.in/chats/logos/Octoria%20Mark%20Png.webp',
  },
  {
    image: 'https://ibaisindia.co.in/chats/logos/icons8-whatsapp-48.webp',
    thumbnail: 'https://ibaisindia.co.in/chats/logos/icons8-whatsapp-48.webp',
  },
  {
    image: 'https://ibaisindia.co.in/chats/logos/icons8-youtube-48.webp',
    thumbnail: 'https://ibaisindia.co.in/chats/logos/icons8-youtube-48.webp',
  },
  {
    image: 'https://ibaisindia.co.in/chats/logos/icons8-instagram-48.webp',
    thumbnail: 'https://ibaisindia.co.in/chats/logos/icons8-instagram-48.webp',
  },
  {
    image: 'https://ibaisindia.co.in/chats/logos/icons8-telegram-app-48.webp',
    thumbnail:
      'https://ibaisindia.co.in/chats/logos/icons8-telegram-app-48.webp',
  },
  {
    image: 'https://ibaisindia.co.in/chats/logos/icons8-pinterest-48.webp',
    thumbnail: 'https://ibaisindia.co.in/chats/logos/icons8-pinterest-48.webp',
  },
  {
    image: 'https://ibaisindia.co.in/chats/logos/icons8-facebook-48.webp',
    thumbnail: 'https://ibaisindia.co.in/chats/logos/icons8-facebook-48.webp',
  },
];
export const addLogos = async () => {
  const batch = firestore().batch();
  for (let i = 0; i < logos.length; i++) {
    const ref = firestore().collection(F_LOGOS_LIST).doc();
    batch.set(ref, logos[i]);
    logger.log(`Added document ${i}`);
  }
  batch.commit();
  logger.log(`All Logos Added Successfully.`);
};
