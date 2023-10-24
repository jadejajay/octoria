/* eslint-disable no-bitwise */
// import storage from '@react-native-firebase/storage';
import * as Sharing from 'expo-sharing';
import * as Speech from 'expo-speech';
import { Linking, Platform, ToastAndroid } from 'react-native';
import type { ShareSingleOptions, Social } from 'react-native-share';
import Share from 'react-native-share';
import type { StoreApi, UseBoundStore } from 'zustand';

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

// export async function uploadImage(uri: RequestInfo, name: any) {
//   if (user) {
//     const response = await fetch(uri);
//     const blob = await response.blob();

//     const ref = storage().ref().child(`images/${user.uid}/avatar.png`);
//     await ref.put(blob);

//     let x = await ref.getDownloadURL();
//     const update = {
//       displayName: name,
//       photoURL: x,
//     };

//     await user.updateProfile(update);
//     return x;
//   }
//   if (!user) {
//     return 'http://itekindia.com/sharva/Avatarbig.png';
//   }
// }
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

export function capitalizeWords(str: string) {
  // Split the string into an array of words
  const words = str.split(' ');

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the words back into a new string
  const capitalizedString = capitalizedWords.join(' ');

  return capitalizedString;
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
  language: 'hi-IN', // Set the desired language code (e.g., 'en', 'es', 'fr')
  identifier: 'hi-in-x-hia-local', // Set the voice identifier
  pitch: 1.0, // Set the speech pitch (0.5 to 2.0, where 1.0 is normal)
  rate: 0.8, // Set the speech rate (0.1 to 2.0, where 1.0 is normal)
  volume: 1, // Set the speech volume (0.0 to 1.0, where 1.0 is maximum volume)
  phoneme: Platform.OS === 'ios' ? 'x-sampa' : 'ipa', // Use 'x-sampa' for iOS and 'ipa' for Android
};
export async function speak(text: string) {
  const thingToSay = text;
  Speech.speak(thingToSay, speechOptions);
}

export function invertColor(hexColor: string) {
  // Remove the '#' if it's included
  hexColor = hexColor.replace(/^#/, '');

  // Convert the hex color to RGB
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  // Invert the RGB values
  const invertedR = 255 - r;
  const invertedG = 255 - g;
  const invertedB = 255 - b;

  // Convert the inverted RGB values back to hexadecimal
  const invertedHexColor = `#${(
    (invertedR << 16) |
    (invertedG << 8) |
    invertedB
  )
    .toString(16)
    .padStart(6, '0')}`;

  return invertedHexColor;
}

export function generateRandomCharmColor() {
  // Define the hue range for charm colors (e.g., 0 to 360 for the full range)
  const minHue = 60; // Adjust these values as needed
  const maxHue = 240;

  // Generate a random hue within the specified range
  const hue = Math.floor(Math.random() * (maxHue - minHue + 1)) + minHue;

  // Set saturation and value to create a more pastel color
  const saturation = Math.floor(Math.random() * (80 - 40 + 1)) + 40; // Adjust these values as needed
  const value = Math.floor(Math.random() * (80 - 40 + 1)) + 40;

  // Alpha value
  const alpha = 88;

  // Convert HSV to RGB
  const chroma = (1 - Math.abs(2 * value - 1)) * saturation;
  const huePrime = hue / 60;
  const x = chroma * (1 - Math.abs((huePrime % 2) - 1));
  const m = value - chroma / 2;

  let r, g, b;

  if (huePrime >= 0 && huePrime < 1) {
    r = chroma;
    g = x;
    b = 0;
  } else if (huePrime >= 1 && huePrime < 2) {
    r = x;
    g = chroma;
    b = 0;
  } else if (huePrime >= 2 && huePrime < 3) {
    r = 0;
    g = chroma;
    b = x;
  } else if (huePrime >= 3 && huePrime < 4) {
    r = 0;
    g = x;
    b = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    r = x;
    g = 0;
    b = chroma;
  } else {
    r = chroma;
    g = 0;
    b = x;
  }

  r = Math.floor((r + m) * 255);
  g = Math.floor((g + m) * 255);
  b = Math.floor((b + m) * 255);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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

  objectList.forEach((obj: any) => {
    const { images } = obj as { images: string[] };

    if (images && images.length > 0) {
      // Iterate through the images in the imageList
      images.forEach((image) => {
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
