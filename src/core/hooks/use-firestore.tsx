import firestore from '@react-native-firebase/firestore'; // Import Firestore from your Firebase package
import { useEffect, useState } from 'react';

export function useFirestoreLiveQuery<T>(collectionName: string) {
  const [data, setData] = useState<T[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reference to the Firestore collection
    const collectionRef = firestore().collection(collectionName);

    // Subscribe to real-time updates
    const unsubscribe = collectionRef.onSnapshot((querySnapshot) => {
      const updatedData: any = [];
      querySnapshot?.forEach((doc) => {
        // Extract the document data along with its ID
        const docData = doc.data();
        const docWithId = { id: doc.id, ...docData } as T;
        updatedData.push(docWithId);
      });

      // Update the state with the live data
      setData(updatedData);
      setIsLoading(false);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [collectionName]);

  return { data, isLoading };
}
