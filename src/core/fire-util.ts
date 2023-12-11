import firestore from '@react-native-firebase/firestore';
export const getCollection = async <T>(collection: string): Promise<T[]> => {
  const ProductSnapshot = await firestore().collection(collection).get();
  const data: T[] = ProductSnapshot.docs.map(
    (doc: { data: () => any; id: any }) => doc.data()
  );
  return data;
};

export class FirestoreData<T> {
  private collectionName: string = '';
  private lastVisible: any = null;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getData(limit: number): Promise<T[]> {
    const snapshot = await firestore()
      .collection(this.collectionName)
      .limit(limit)
      .get();
    const data: T[] = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }) as T[];
    // store last document snapshot for pagination
    this.lastVisible = snapshot.docs[snapshot.docs.length - 1];
    return data;
  }

  async getDataByCategory(limit: number, code: number): Promise<T[]> {
    const snapshot = await firestore()
      .collection(this.collectionName)
      .where('categoryCode', '==', code)
      .limit(limit)
      .get();
    const data: T[] = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }) as T[];
    // store last document snapshot for pagination
    this.lastVisible = snapshot.docs[snapshot.docs.length - 1];
    return data;
  }

  async loadMore(limit: number): Promise<T[] | []> {
    console.log('last visible', this.lastVisible);
    if (!this.lastVisible) {
      console.log('No more data to load');
      return [];
    }
    const snapshot = await firestore()
      .collection(this.collectionName)
      .startAfter(this.lastVisible)
      .limit(limit)
      .get();
    const data = snapshot.docs.map((doc) => doc.data()) as T[];
    // Update the last visible document snapshot for future pagination
    this.lastVisible = snapshot.docs[snapshot.docs.length - 1];

    return data;
  }
  // function to get filtered data based on a every field and value
  async getFilteredData(query: string, value: string): Promise<T[]> {
    const snapshot = await firestore()
      .collection(this.collectionName)
      .where(query, '==', value)
      .get();
    const data: T[] = snapshot.docs.map((doc) => doc.data()) as T[];
    return data;
  }
  async getFilteredData2({
    query,
    value,
    query2,
    value2,
  }: {
    query: string;
    value: string;
    query2: string;
    value2: string;
  }): Promise<T[]> {
    const snapshot = await firestore()
      .collection(this.collectionName)
      .where(query, '==', value)
      .where(query2, '==', value2)
      .get();
    const data: T[] = snapshot.docs.map((doc) => doc.data()) as T[];
    return data;
  }
}
