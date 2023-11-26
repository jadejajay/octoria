// stores/dataStore.ts

import { create } from 'zustand';

type SearchStore = {
  text: string; // Replace 'any' with your data structure
  festival: string;
  setSearch: (data: string) => void; // Replace 'any' with your data structure
  setFestival: (data: string) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  text: 'Hardware',
  festival: '',
  setSearch: (data) => set((_) => ({ text: data })),
  setFestival: (data) => set((_) => ({ festival: data })),
}));
