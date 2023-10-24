// stores/dataStore.ts

import { create } from 'zustand';

import type { FrameType } from '@/types';

type FrameStore = {
  frames: FrameType[]; // Replace 'any' with your data structure
  setFrame: (data: FrameType[]) => void; // Replace 'any' with your data structure
};

export const useFrameStore = create<FrameStore>((set) => ({
  frames: [],
  setFrame: (data) => set((_) => ({ frames: data })),
}));
