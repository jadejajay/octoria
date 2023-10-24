// useShapesStore
import { create } from 'zustand';

import type { ShapesType } from '@/types';

type ShapesStore = {
  shapes: ShapesType[]; // Replace 'any' with your data structure
  setShapes: (data: ShapesType[]) => void; // Replace 'any' with your data structure
};

export const useShapesStore = create<ShapesStore>((set) => ({
  shapes: [],
  setShapes: (data) => set((_) => ({ shapes: data })),
}));
