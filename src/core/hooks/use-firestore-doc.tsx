import firestore from '@react-native-firebase/firestore'; // Import Firestore from your Firebase package
import { useEffect, useState } from 'react';

export function useFirestoreDocLiveQuery(collectionName: string, id: string) {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reference to the Firestore collection
    const collectionRef = firestore().collection(collectionName).doc(id);

    // Subscribe to real-time updates
    const unsubscribe = collectionRef.onSnapshot((querySnapshot) => {
      const updatedData: any = querySnapshot?.data();
      // Extract the document data along with its ID
      // Update the state with the live data
      setData(updatedData);
      setIsLoading(false);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [collectionName, id]);

  return { data, isLoading };
}
