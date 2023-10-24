// stores/dataStore.ts

import { create } from 'zustand';

import type { FrameType, ImageListType } from '@/types';

type ImageListStore = {
  images: ImageListType[]; // Replace 'any' with your data structure
  setImages: (data: FrameType[]) => void; // Replace 'any' with your data structure
};

export const useImageListStore = create<ImageListStore>((set) => ({
  images: [],
  setImages: (data) => set((_) => ({ images: data })),
}));
