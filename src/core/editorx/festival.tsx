// stores/dataStore.ts

import { create } from 'zustand';

import type { FestivalType } from '@/types';

type FestivalStore = {
  festival: FestivalType[]; // Replace 'any' with your data structure
  setFestival: (data: FestivalType[]) => void; // Replace 'any' with your data structure
};

export const useFestivalStore = create<FestivalStore>((set) => ({
  festival: [],
  setFestival: (data) => set((_) => ({ festival: data })),
}));
