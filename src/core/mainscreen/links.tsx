// useLinks
import firestore from '@react-native-firebase/firestore';
import { create } from 'zustand';

import type { Links, Links2, LinksState } from '@/types';

import { createSelectors } from '../utils';

const _useLinks = create<LinksState>((set) => ({
  LinksData: [],
  isLoading: true,
  subscribeToLinks: () => {
    const unsubscribe = firestore()
      .collection('links')
      .onSnapshot((querySnapshot) => {
        const updatedMainCategories: Links[] = querySnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...(doc.data() as Links2),
          })
        );
        set({ LinksData: updatedMainCategories, isLoading: false });
      });

    return () => unsubscribe();
  },
}));

export const useLinks = createSelectors(_useLinks);
