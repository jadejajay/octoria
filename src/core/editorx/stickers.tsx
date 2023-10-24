// stores/dataStore.ts

import { create } from 'zustand';

import type { StickerType } from '@/types';

type StickerStore = {
  stickers: StickerType[]; // Replace 'any' with your data structure
  setSticker: (data: StickerType[]) => void; // Replace 'any' with your data structure
};

export const useStickerStore = create<StickerStore>((set) => ({
  stickers: [],
  setSticker: (data) => set(() => ({ stickers: data })),
}));
