// stores/dataStore.ts

import { create } from 'zustand';

type SearchStore = {
  text: string; // Replace 'any' with your data structure
  setSearch: (data: string) => void;
};

export const useBotSearchStore = create<SearchStore>((set) => ({
  text: '',
  setSearch: (data) => set((_) => ({ text: data })),
}));
