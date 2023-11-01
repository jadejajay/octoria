// stores/dataStore.ts

import { create } from 'zustand';

type SearchStore = {
  text: string; // Replace 'any' with your data structure
  setSearch: (data: string) => void; // Replace 'any' with your data structure
};

export const useSearchStore = create<SearchStore>((set) => ({
  text: 'Hardware',
  setSearch: (data) => set((_) => ({ text: data })),
}));
