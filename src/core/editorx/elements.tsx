// useElementsStore
import { create } from 'zustand';

import type { ElementsType } from '@/types';

type ElementsStore = {
  elements: ElementsType[]; // Replace 'any' with your data structure
  setElements: (data: ElementsType[]) => void; // Replace 'any' with your data structure
};

export const useElementsStore = create<ElementsStore>((set) => ({
  elements: [],
  setElements: (data) => set((_) => ({ elements: data })),
}));
