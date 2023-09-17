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

export const handleWhatsappShare = async (fileUri: any, title: any) => {
  //https://api.whatsapp.com/send?phone=918734845201&text=
  // openLinkInBrowser(LINK);
  try {
    //@ts-ignore
    const options: ShareSingleOptions = {
      title: 'Share via WhatsApp',
      message: title,
      // type: 'image/*',
      // url: item.image3d, // The URI of the image you want to share
      // image: item.image3d,
      // filename: item.image3d,
      url: fileUri, //'data:image/png;base64,<imageInBase64>',
      type: 'image/*',
      social: Share.Social.WHATSAPP as Social,
      //@ts-ignore
      // whatsAppNumber: '918734845201',
      // appId: 'com.whatsapp',
    };

    await Share.shareSingle(options);
  } catch (error) {
    console.error(error);
    ToastAndroid.show('Some Error', ToastAndroid.SHORT);
  }
};

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
