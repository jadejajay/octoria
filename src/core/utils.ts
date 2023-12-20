// import storage from '@react-native-firebase/storage';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as Speech from 'expo-speech';
import { Linking, Platform, ToastAndroid } from 'react-native';
import type { ShareSingleOptions, Social } from 'react-native-share';
import Share from 'react-native-share';
import type { StoreApi, UseBoundStore } from 'zustand';

import type { TxKeyPath } from './i18n';
import { getLanguage, translate } from './i18n';
import { logger } from './logger';

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export function isVideoURL(url: string): boolean {
  // Define an array of video file extensions you want to consider as videos
  const videoExtensions = [
    'mp4',
    'webm',
    'ogg',
    'mov',
    'avi',
    'flv',
    'mkv',
    'wmv',
    'mpg',
    'mpeg',
  ];

  // Get the file extension from the URL
  const urlParts = url.split('.');
  const fileExtension = urlParts[urlParts.length - 1].toLowerCase();

  // Check if the file extension is in the list of video extensions
  return videoExtensions.includes(fileExtension);
}
export function isImageURL(url: string): boolean {
  // Define an array of image file extensions you want to consider as images
  const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'webp'];
  // Get the file extension from the URL
  function getFileExtension(url2: string): string {
    const urlParts = url2.split('.');
    const fileExtension = urlParts[urlParts.length - 1].toLowerCase();
    return fileExtension;
  }
  // Check if the file extension is in the list of image extensions
  const fileExtension = getFileExtension(url);
  const isImage = imageExtensions.includes(fileExtension);

  return isImage;
}
export function identifyContentType(
  contentLink: string
): 'image' | 'video' | 'pdf' | 'unknown' {
  // Extract the file extension from the content link
  const segments = contentLink.split('/');
  const filename = segments[segments.length - 1];
  const fileExtension = filename.split('.').pop()?.toLowerCase();

  if (fileExtension) {
    if (
      fileExtension === 'jpg' ||
      fileExtension === 'jpeg' ||
      fileExtension === 'png' ||
      fileExtension === 'gif'
    ) {
      return 'image';
    } else if (
      fileExtension === 'mp4' ||
      fileExtension === 'avi' ||
      fileExtension === 'mov'
    ) {
      return 'video';
    } else if (fileExtension === 'pdf') {
      return 'pdf';
    }
  }

  return 'unknown';
}

export function calculatePercentage(
  oldValue: number,
  newValue: number
): number {
  const difference = oldValue - newValue;
  const percentage = (difference / oldValue) * 100;
  let x = Math.abs(percentage); // Return the absolute value of the percentage
  return Number(x.toFixed(0));
}
export const shareImageWithTitle = async (fileUri: any, title: any) => {
  try {
    // Handle the result here
    const options: Sharing.SharingOptions = {
      mimeType: 'image/*', // Replace with the actual MIME type of your image
      UTI: 'image/*',
      dialogTitle: title, // Specify the title for the share dialog
    };

    Sharing.shareAsync(fileUri, options);
  } catch (error) {
    console.error('Error sharing image:', error);
  }
};

const speechOptions = {
  language: getLanguage() || 'en', // Set the desired language code (e.g., 'en', 'es', 'fr')
  pitch: 1.0, // Set the speech pitch (0.5 to 2.0, where 1.0 is normal)
  rate: 0.8, // Set the speech rate (0.1 to 2.0, where 1.0 is normal)
  volume: 1, // Set the speech volume (0.0 to 1.0, where 1.0 is maximum volume)
  phoneme: Platform.OS === 'ios' ? 'x-sampa' : 'ipa', // Use 'x-sampa' for iOS and 'ipa' for Android
};
export async function speak(text: TxKeyPath, vars?: string) {
  logger.log(speechOptions.language);
  if (vars) {
    const thingToSay2 = translate(text) as string;
    const thingToSay = `${vars} ${thingToSay2}`;
    logger.log(thingToSay);
    Speech.speak(thingToSay, speechOptions);
    return;
  } else {
    const thingToSay = translate(text);
    Speech.speak(thingToSay, speechOptions);
  }
}

export function generateRandomCharmColor2() {
  const isPrimaryColor = (color: any) => {
    const primaryColors = [
      'ff0000', // Red
      '00ff00', // Green
      '0000ff', // Blue
      'ff00ff', // Magenta
      'ffff00', // Yellow
      '00ffff', // Cyan
    ];
    return primaryColors.includes(color);
  };

  let color;
  do {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    color = `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } while (isPrimaryColor(color));

  return color;
}

export function extractImagesFromObjects<T>(objectList: T[]): string[] {
  const extractedImages: string[] = [];

  objectList?.forEach((obj: any) => {
    const { images } = obj as { images: string[] };

    if (images && images.length > 0) {
      // Iterate through the images in the imageList
      images?.forEach((image) => {
        // Do something with the image (e.g., push it to the extractedImages array)
        if (!isVideoURL(image)) extractedImages.push(image);
      });
    }
  });

  return extractedImages;
}
export const handleWhatsappShare = async (
  fileUri: any,
  title: any,
  whatsAppNumber: any = '918734845201'
) => {
  //https://api.whatsapp.com/send?phone=918734845201&text=
  // openLinkInBrowser(LINK);
  try {
    //@ts-ignore
    const options: ShareSingleOptions = {
      title: 'Share via WhatsApp',
      message: title,
      // type: 'image/*',
      // url: fileUri,
      url: `data:image/png;base64,${fileUri}`,
      // url: `http://itekindia.com/dashboard/test.jpg`, // The URI of the image you want to share
      // image: fileUri,
      // filename: item.image3d,
      // url: 'http://itekindia.com/dashboard/bronco.jpg', //'data:image/png;base64,<imageInBase64>',
      type: 'image/*',
      social: Share.Social.WHATSAPP as Social,
      //@ts-ignore
      whatsAppNumber: whatsAppNumber,
      appId: 'com.whatsapp',
    };

    await Share.shareSingle(options);
  } catch (error) {
    console.error(error);
    ToastAndroid.show('Some Error', ToastAndroid.SHORT);
  }
};
export const handleShare = async (fileUri: any, title: any) => {
  try {
    //@ts-ignore
    const options: ShareSingleOptions = {
      title: 'Share via WhatsApp',
      message: title,
      type: 'image/*',
      social: Share.Social.WHATSAPP as Social,
      url: fileUri,
    };

    await Share.shareSingle(options);
  } catch (error) {
    console.error(error);
    ToastAndroid.show('Some Error', ToastAndroid.SHORT);
  }
};
export const handleWhatsappShare2 = async (
  fileUri: any,
  title: any,
  type: any
) => {
  //https://api.whatsapp.com/send?phone=918734845201&text=
  // openLinkInBrowser(LINK);
  try {
    //@ts-ignore
    const options: ShareSingleOptions = {
      title: 'Share via WhatsApp',
      message: title,
      // type: 'image/*',
      // url: fileUri,
      url: `data:${type};base64,${fileUri}`,
      // url: `http://itekindia.com/dashboard/test.jpg`, // The URI of the image you want to share
      // image: fileUri,
      // filename: item.image3d,
      // url: 'http://itekindia.com/dashboard/bronco.jpg', //'data:image/png;base64,<imageInBase64>',
      social: Share.Social.WHATSAPP as Social,
      //@ts-ignore
      appId: 'com.whatsapp',
    };
    logger.log('whatsapp share called');

    await Share.shareSingle(options);
  } catch (error) {
    console.error(error);
    ToastAndroid.show('Some Error', ToastAndroid.SHORT);
  }
};
export const handleInstagramShare = async (
  fileUri: any,
  title: any,
  type: any
) => {
  //https://api.whatsapp.com/send?phone=918734845201&text=
  // openLinkInBrowser(LINK);
  try {
    //@ts-ignore
    const options: ShareSingleOptions = {
      title: 'Share via Instagram',
      message: title,
      type: type,
      // url: fileUri,
      url: `data:${type};base64,${fileUri}`,
      // url: `http://itekindia.com/dashboard/test.jpg`, // The URI of the image you want to share
      // image: fileUri,
      // filename: item.image3d,
      // url: 'http://itekindia.com/dashboard/bronco.jpg', //'data:image/png;base64,<imageInBase64>',
      social: Share.Social.INSTAGRAM as Social,
    };
    logger.log('instagram share called');

    await Share.shareSingle(options);
  } catch (error) {
    logger.error(error);
    ToastAndroid.show('Some Error', ToastAndroid.SHORT);
  }
};
export const handleTelegramShare = async (
  fileUri: any,
  title: any,
  type: any
) => {
  //https://api.whatsapp.com/send?phone=918734845201&text=
  // openLinkInBrowser(LINK);
  try {
    //@ts-ignore
    const options: ShareSingleOptions = {
      title: 'Share via Telegram',
      message: title,
      type: type,
      // url: fileUri,
      url: `data:${type};base64,${fileUri}`,
      // url: `http://itekindia.com/dashboard/test.jpg`, // The URI of the image you want to share
      // image: fileUri,
      // filename: item.image3d,
      // url: 'http://itekindia.com/dashboard/bronco.jpg', //'data:image/png;base64,<imageInBase64>',
      social: Share.Social.TELEGRAM as Social,
    };
    // logger.log('telegram share called');

    await Share.shareSingle(options);
  } catch (error) {
    logger.error(error);
    ToastAndroid.show('Some Error', ToastAndroid.SHORT);
  }
};
export const handleFacebookShare = async (
  fileUri: any,
  title: any,
  type: any
) => {
  //https://api.whatsapp.com/send?phone=918734845201&text=
  // openLinkInBrowser(LINK);
  try {
    //@ts-ignore
    const options: ShareSingleOptions = {
      title: 'Share via Facebook',
      message: title,
      type: type,
      // url: fileUri,
      url: `data:${type};base64,${fileUri}`,
      // url: `http://itekindia.com/dashboard/test.jpg`, // The URI of the image you want to share
      // image: fileUri,
      // filename: item.image3d,
      // url: 'http://itekindia.com/dashboard/bronco.jpg', //'data:image/png;base64,<imageInBase64>',
      social: Share.Social.FACEBOOK as Social,
    };
    // logger.log('facebook share called');

    await Share.shareSingle(options);
  } catch (error) {
    logger.error(error);
    ToastAndroid.show('Some Error', ToastAndroid.SHORT);
  }
};
export const saveToGallery = async (res: string) => {
  if (res) {
    const albumName = await MediaLibrary.getAlbumAsync('Octoria');
    if (albumName) {
      const asset = await MediaLibrary.createAssetAsync(res);
      const album = await MediaLibrary.addAssetsToAlbumAsync(
        asset,
        albumName.id,
        true
      );
      if (album) {
        ToastAndroid.show(
          `Post saved successfully to Octoria album in your gallery.`,
          ToastAndroid.LONG
        );
      } else {
        ToastAndroid.show(
          `Error Creating assets give permissions`,
          ToastAndroid.LONG
        );
      }
    } else {
      const asset = await MediaLibrary.createAssetAsync(res);
      const album = await MediaLibrary.createAlbumAsync('Octoria', asset, true);
      if (album) {
        ToastAndroid.show(
          `Post saved successfully to Octoria album in your gallery.`,
          ToastAndroid.LONG
        );
      } else {
        ToastAndroid.show(
          `Error Creating assets give permissions`,
          ToastAndroid.LONG
        );
      }
    }
  }
};

export function getImageBase64(url: string): Promise<string> {
  logger.log('get base64 of url: ', url);

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          //@ts-ignore
          const base64Data = reader?.result.split(',')[1]; // Remove data:image/jpeg;base64,
          logger.log('url to base64 resolved');

          resolve(base64Data);
        };
        reader.readAsDataURL(blob);
      })
      .catch((error2) => {
        logger.log('url to base64 rejected');
        reject(error2);
      });
  });
}
export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // Create a shallow copy to avoid modifying the original array.
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements at i and j.
  }
  return shuffledArray;
}
export const newValue = ({
  newWidth,
  oldWidth,
  oldValue,
}: {
  newWidth: number;
  oldWidth: number;
  oldValue: number;
}) => {
  return (newWidth / oldWidth) * oldValue;
};
