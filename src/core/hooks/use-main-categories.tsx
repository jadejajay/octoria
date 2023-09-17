import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

function useMainCategories() {
  const [MainCategoriesData, setMainCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('MainCategory')
      .onSnapshot((querySnapshot) => {
        const updatedMainCategories: any = [];
        querySnapshot.forEach((doc) => {
          const favoriteData = doc.data();
          // Filter documents based on userId
          if (favoriteData) {
            updatedMainCategories.push({ id: doc.id, ...favoriteData });
          }
        });

        setMainCategories(updatedMainCategories);
        setIsLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return { MainCategoriesData, isLoading };
}

export default useMainCategories;
