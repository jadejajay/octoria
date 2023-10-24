// useLogoStore
import { create } from 'zustand';

import type { LogosType } from '@/types';

type LogoStore = {
  logos: LogosType[]; // Replace 'any' with your data structure
  setLogos: (data: LogosType[]) => void; // Replace 'any' with your data structure
};

export const useLogoStore = create<LogoStore>((set) => ({
  logos: [],
  setLogos: (data) => set((_) => ({ logos: data })),
}));
