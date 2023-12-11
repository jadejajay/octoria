// import firestore from '@react-native-firebase/firestore';
// import { useEffect, useState } from 'react';

// export function useMainCarousel() {
//   const [MainCarouselData, setMainCarousel] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = firestore()
//       .collection('MainCarousel')
//       .onSnapshot((querySnapshot) => {
//         const updatedMainCarousel: any = [];
//         querySnapshot.forEach((doc) => {
//           const favoriteData = doc.data();
//           // Filter documents based on userId
//           updatedMainCarousel.push({ id: doc.id, ...favoriteData });
//         });

//         setMainCarousel(updatedMainCarousel);
//         setIsLoading(false);
//       });

//     return () => unsubscribe();
//   }, []);

//   return { MainCarouselData, isLoading };
// }
