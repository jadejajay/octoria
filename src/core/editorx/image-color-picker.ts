// stores/dataStore.ts

import { create } from 'zustand';

type ImageStore = {
  image: string; // Replace 'any' with your data structure
  finalImage: string;
  setImage: (url: string) => void; // Replace 'any' with your data structure
  setFinalImage: (url: string) => void;
};

export const useImageColorPickerStore = create<ImageStore>((set) => ({
  image: '',
  finalImage: '',
  setImage: (url) => {
    set((_) => ({ image: url }));
  },
  setFinalImage: (url) => {
    set((_) => ({ finalImage: url }));
  },
}));
// setImage: (url) => {
//   getImageBase64(url).then((image) => {
//     set((_) => ({ image }));
//   });
// },
