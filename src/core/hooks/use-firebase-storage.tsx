import storage from '@react-native-firebase/storage'; // Import Firebase Storage from your Firebase package
import { useEffect, useState } from 'react';

function useFirebaseStorageLiveQuery(storagePath: string) {
  const [downloadURL, setDownloadURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storageRef = storage().ref(storagePath);

    // Create a function to fetch the download URL
    const fetchDownloadURL = async () => {
      try {
        const url = await storageRef.getDownloadURL();
        setDownloadURL(url);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Firebase Storage data:', error);
        setIsLoading(false);
      }
    };

    // Fetch the initial download URL
    fetchDownloadURL();

    // Poll for updates (e.g., every 5 seconds)
    const interval = setInterval(() => {
      fetchDownloadURL();
    }, 5000); // Adjust the interval as needed

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [storagePath]);

  return { downloadURL, isLoading };
}

export default useFirebaseStorageLiveQuery;
