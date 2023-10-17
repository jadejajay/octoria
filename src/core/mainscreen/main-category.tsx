// useMainCategories
import firestore from '@react-native-firebase/firestore';
import { create } from 'zustand';

import type { MainCategoriesState, MainCategory, MainCategory2 } from '@/types';

import { createSelectors } from '../utils';

const _useMainCategories = create<MainCategoriesState>((set) => ({
  MainCategoriesData: [],
  isLoading: true,
  subscribeToMainCategories: () => {
    const unsubscribe = firestore()
      .collection('MainCategory')
      .onSnapshot((querySnapshot) => {
        const updatedMainCategories: MainCategory[] = querySnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...(doc.data() as MainCategory2),
          })
        );

        set({ MainCategoriesData: updatedMainCategories, isLoading: false });
      });

    return () => unsubscribe();
  },
}));

export const useMainCategories = createSelectors(_useMainCategories);
