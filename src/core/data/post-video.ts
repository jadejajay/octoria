import firestore from '@react-native-firebase/firestore';

import type { PostVideoType } from '@/types';
import { F_POST_VIDEOS } from '@/types';

import { logger } from '../logger';
export const postVideo: PostVideoType[] = [
  {
    categoryCode: 2,
    subCategory: 15,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/12.gif',
    video: 'https://ibaisindia.co.in/chats/videos/12.mp4',
  },
  {
    categoryCode: 4,
    subCategory: 27,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/14.gif',
    video: 'https://ibaisindia.co.in/chats/videos/14.mp4',
  },
  {
    categoryCode: 2,
    subCategory: 9,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/6.gif',
    video: 'https://ibaisindia.co.in/chats/videos/6.mp4',
  },
  {
    categoryCode: 2,
    subCategory: 14,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/3.gif',
    video: 'https://ibaisindia.co.in/chats/videos/3.mp4',
  },
  {
    categoryCode: 4,
    subCategory: 8,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/4.gif',
    video: 'https://ibaisindia.co.in/chats/videos/4.mp4',
  },
  {
    categoryCode: 2,
    subCategory: 17,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/5.gif',
    video: 'https://ibaisindia.co.in/chats/videos/5.mp4',
  },
  {
    categoryCode: 2,
    subCategory: 15,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/11.gif',
    video: 'https://ibaisindia.co.in/chats/videos/11.mp4',
  },
  {
    categoryCode: 4,
    subCategory: 2,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/7.gif',
    video: 'https://ibaisindia.co.in/chats/videos/7.mp4',
  },
  {
    categoryCode: 2,
    subCategory: 13,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/18.gif',
    video: 'https://ibaisindia.co.in/chats/videos/18.mp4',
  },
  {
    categoryCode: 4,
    subCategory: 72,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/8.gif',
    video: 'https://ibaisindia.co.in/chats/videos/8.mp4',
  },
  {
    categoryCode: 2,
    subCategory: 15,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/13.gif',
    video: 'https://ibaisindia.co.in/chats/videos/13.mp4',
  },
  {
    categoryCode: 2,
    subCategory: 22,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/17.gif',
    video: 'https://ibaisindia.co.in/chats/videos/17.mp4',
  },
  {
    categoryCode: 2,
    subCategory: 10,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/16.gif',
    video: 'https://ibaisindia.co.in/chats/videos/16.mp4',
  },
  {
    categoryCode: 4,
    subCategory: 27,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/2.gif',
    video: 'https://ibaisindia.co.in/chats/videos/2.mp4',
  },
  {
    categoryCode: 5,
    subCategory: 73,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/9.gif',
    video: 'https://ibaisindia.co.in/chats/videos/9.mp4',
  },
  {
    categoryCode: 2,
    subCategory: 15,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/10.gif',
    video: 'https://ibaisindia.co.in/chats/videos/10.mp4',
  },
  {
    categoryCode: 2,
    subCategory: 10,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/15.gif',
    video: 'https://ibaisindia.co.in/chats/videos/15.mp4',
  },
  {
    categoryCode: 2,
    subCategory: 14,
    thumbnail: 'https://ibaisindia.co.in/chats/gifs/1.gif',
    video: 'https://ibaisindia.co.in/chats/videos/1.mp4',
  },
];
export const postVideosList = [
  'https://ibaisindia.co.in/chats/videos/1.mp4',
  'https://ibaisindia.co.in/chats/videos/2.mp4',
  'https://ibaisindia.co.in/chats/videos/3.mp4',
  'https://ibaisindia.co.in/chats/videos/4.mp4',
  'https://ibaisindia.co.in/chats/videos/5.mp4',
  'https://ibaisindia.co.in/chats/videos/6.mp4',
  'https://ibaisindia.co.in/chats/videos/7.mp4',
  'https://ibaisindia.co.in/chats/videos/8.mp4',
  'https://ibaisindia.co.in/chats/videos/9.mp4',
  'https://ibaisindia.co.in/chats/videos/10.mp4',
  'https://ibaisindia.co.in/chats/videos/11.mp4',
  'https://ibaisindia.co.in/chats/videos/12.mp4',
  'https://ibaisindia.co.in/chats/videos/13.mp4',
  'https://ibaisindia.co.in/chats/videos/14.mp4',
  'https://ibaisindia.co.in/chats/videos/15.mp4',
  'https://ibaisindia.co.in/chats/videos/16.mp4',
  'https://ibaisindia.co.in/chats/videos/17.mp4',
  'https://ibaisindia.co.in/chats/videos/18.mp4',
];
export const postVideoThumbnails = [
  'https://ibaisindia.co.in/chats/gifs/1.gif',
  'https://ibaisindia.co.in/chats/gifs/2.gif',
  'https://ibaisindia.co.in/chats/gifs/3.gif',
  'https://ibaisindia.co.in/chats/gifs/4.gif',
  'https://ibaisindia.co.in/chats/gifs/5.gif',
  'https://ibaisindia.co.in/chats/gifs/6.gif',
  'https://ibaisindia.co.in/chats/gifs/7.gif',
  'https://ibaisindia.co.in/chats/gifs/8.gif',
  'https://ibaisindia.co.in/chats/gifs/9.gif',
  'https://ibaisindia.co.in/chats/gifs/10.gif',
  'https://ibaisindia.co.in/chats/gifs/11.gif',
  'https://ibaisindia.co.in/chats/gifs/12.gif',
  'https://ibaisindia.co.in/chats/gifs/13.gif',
  'https://ibaisindia.co.in/chats/gifs/14.gif',
  'https://ibaisindia.co.in/chats/gifs/15.gif',
  'https://ibaisindia.co.in/chats/gifs/16.gif',
  'https://ibaisindia.co.in/chats/gifs/17.gif',
  'https://ibaisindia.co.in/chats/gifs/18.gif',
];

export const addPostVideo = async () => {
  const batch = firestore().batch();
  for (let i = 0; i < postVideo.length; i++) {
    const ref = firestore().collection(F_POST_VIDEOS).doc();
    batch.set(ref, postVideo[i]);
    logger.log(`Added document ${i}`);
  }
  batch.commit();
  logger.log(`All Videos Added Successfully.`);
};
