// import firestore from '@react-native-firebase/firestore';
// import { create } from 'zustand';

// import type { Background, Background2, BackgroundState } from '@/types';

// import { createSelectors } from '../utils';

// const _useBackground = create<BackgroundState>((set) => ({
//   BackgroundData: [],
//   BackgroundMain: [],
//   BackgroundSecondary: [],
//   isLoading: true,
//   subscribeToBackground: async (id) => {
//     try {
//       const querySnapshot = await firestore().collection(id).get();

//       const updatedMainCategories: Background[] = querySnapshot.docs.map(
//         (doc) => ({
//           id: doc.id,
//           ...(doc.data() as Background2),
//         })
//       );

//       set({ BackgroundData: updatedMainCategories, isLoading: false });
//     } catch (error) {
//       console.error('Error fetching MainCategories data:', error);
//     }
//   },
//   subscribeToBackgroundMainList: async () => {
//     // list main category
//     try {
//       const querySnapshot = await firestore()
//         .collection('BackgroundMain')
//         .get();

//       const updatedMainCategories: Background[] = querySnapshot.docs.map(
//         (doc) => ({
//           id: doc.id,
//           ...(doc.data() as Background2),
//         })
//       );

//       set({ BackgroundMain: updatedMainCategories, isLoading: false });
//     } catch (error) {
//       console.error('Error fetching MainCategories data:', error);
//     }
//   },
//   subscribeToBackgroundSecondaryList: async (id) => {
//     // list subcategory
//     try {
//       const querySnapshot = await firestore().collection(id).get();

//       const updatedMainCategories: Background[] = querySnapshot.docs.map(
//         (doc) => ({
//           id: doc.id,
//           ...(doc.data() as Background2),
//         })
//       );

//       set({ BackgroundSecondary: updatedMainCategories, isLoading: false });
//     } catch (error) {
//       console.error('Error fetching MainCategories data:', error);
//     }
//   },
// }));

// export const useBackground = createSelectors(_useBackground);
