import { create } from 'zustand';

import type { PostMainCategoryType } from '@/types';

type PostMainCategoryStore = {
  postMainCategory: PostMainCategoryType[]; // Replace 'any' with your data structure
  setPostMainCategory: (data: PostMainCategoryType[]) => void; // Replace 'any' with your data structure
};

export const usePostMainCategoryStore = create<PostMainCategoryStore>(
  (set) => ({
    postMainCategory: [],
    setPostMainCategory: (data) => set((_) => ({ postMainCategory: data })),
  })
);
