// stores/dataStore.ts

import { create } from 'zustand';

import type { SubCategoryType } from '@/types';

import { formatDateLabel } from '../date-util';

type SubCategoryStore = {
  SubCategory: SubCategoryType[]; // Replace 'any' with your data structure
  setSubCategory: (data: SubCategoryType[]) => void; // Replace 'any' with your data structure
  codeToSubcategory: (code: number) => string;
  codeToDate: (code: number) => string;
  codeToDateFormated: (code: number) => string;
};

export const useSubCategoryStore = create<SubCategoryStore>((set, get) => ({
  SubCategory: [],
  setSubCategory: (data) => set((_) => ({ SubCategory: data })),
  codeToSubcategory: (code) => {
    const subcategory = get().SubCategory.find((item) => item.code === code);
    return subcategory ? subcategory.name : 'every';
  },
  codeToDate: (code) => {
    const subcategory = get().SubCategory.find((item) => item.code === code);
    return subcategory ? subcategory.date : 'every';
  },
  codeToDateFormated: (code) => {
    const subcategory = get().SubCategory.find((item) => item.code === code);
    const dt = subcategory ? subcategory.date : 'every';
    return formatDateLabel(dt);
  },
}));
