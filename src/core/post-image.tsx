import storage from '@react-native-firebase/storage';
export async function uploadImage(uri: string, user: any) {
  let x = '';
  if (user) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref().child(`images/${user.uid}/avatar.png`);
    await ref.put(blob);
    x = await ref.getDownloadURL();
    return x;
  }
}
