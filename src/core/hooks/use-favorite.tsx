/* eslint-disable max-params */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('favorites')
      .onSnapshot((querySnapshot) => {
        const updatedFavorites: any = [];
        querySnapshot.forEach((doc) => {
          const favoriteData = doc.data();
          // Filter documents based on userId
          if (favoriteData.userId === userId) {
            updatedFavorites.push({ id: doc.id, ...favoriteData });
          }
        });

        setFavorites(updatedFavorites);
        setIsLoading(false);
      });

    return () => unsubscribe();
  }, [userId]);

  const addFavorite = async (
    id: string | undefined,
    name: any,
    desc: any,
    image: any
  ) => {
    try {
      await firestore().collection('favorites').doc(id).set({
        userId,
        name,
        desc,
        image,
      });
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };
  const isFavorite = (itemId: string) => {
    // Check if the item with itemId exists in the favorites list
    //@ts-ignore
    return favorites.some((favorite) => favorite?.id === itemId);
  };

  const deleteFavorite = async (favoriteId: string | undefined) => {
    try {
      await firestore().collection('favorites').doc(favoriteId).delete();
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  return { favorites, isLoading, addFavorite, isFavorite, deleteFavorite };
}

export default useFavorites;
