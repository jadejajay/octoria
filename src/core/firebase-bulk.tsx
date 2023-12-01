import firestore from '@react-native-firebase/firestore';
// export const addRandomData = async (num: any, database: any) => {
//   for (let i = 0; i < num; i++) {
//     try {
//       await firestore()
//         .collection(database)
//         .add({
//           time: 1696243535636 + 7200000 * i,
//         });
//       console.log(`Added document ${i + 1}`);
//     } catch (error) {
//       console.error(`Error adding document ${i + 1}:`, error);
//     }
//   }
// };
// // 'IBAIS HARDWARE GROUP'
// export const changeData = async () => {
//   const list: any = [];
//   try {
//     const collectionRef = firestore().collection('IBAIS HARDWARE GROUP');
//     // http://itekindia.com/chats/images/1.webp
//     // Fetch documents from the collection
//     const querySnapshot = await collectionRef.get();
//     querySnapshot.forEach(async (doc) => {
//       list.push(doc.id);
//     });
//     list.map(async (item: any, index: any) => {
//       try {
//         // Update the field in each document
//         await collectionRef.doc(item).update({
//           url: `http://itekindia.com/chats/images/${index + 1}.png`,
//         });
//         console.log(
//           `Field uploadTime updated in document with ID: ${item},${
//             1696243535636 + 7200000 * (index + 1)
//           }`
//         );
//       } catch (error) {
//         console.error(
//           `Error updating field in document with ID: ${item}`,
//           error
//         );
//       }
//     });

//     console.log(`changed document`);
//   } catch (error) {
//     console.error(`Error adding document :`, error);
//   }
// };
// // http://itekindia.com/chats/frames/format1.png
// export const addFrames = async () => {
//   try {
//     const collection = firestore().collection('frames');
//     for (let i = 2; i < 21; i++) {
//       try {
//         await collection.add({
//           image: `http://itekindia.com/chats/frames/format${i}.png`,
//         });
//         console.log(`Added document ${i}`);
//       } catch (error) {
//         console.error(`Error adding document ${i}:`, error);
//       }
//     }

//     console.log(`added document`);
//   } catch (error) {
//     console.error(`Error adding document :`, error);
//   }
// };
// http://itekindia.com/octoria/models/getmodel.php?file=handle.glb
export const addData = async () => {
  try {
    const collection = firestore().collection('postImages');
    for (let i = 0; i < posts.length; i++) {
      try {
        await collection.add(posts[i]);
        console.log(`Added document ${i}`);
      } catch (error) {
        console.error(`Error adding document ${i}:`, error);
      }
    }
    console.log(`added document`);
  } catch (error) {
    console.error(`Error adding document :`, error);
  }
};
// export const updateData = async () => {
//   let list: any = [];
//   try {
//     const collection = firestore().collection('postVideos');
//     // http://itekindia.com/chats/images/1.png
//     // Fetch documents from the collection
//     const querySnapshot = await collection.orderBy('video').get();
//     querySnapshot.forEach(async (doc) => {
//       list.push({
//         id: doc.id,
//       });
//     });
//     console.log(list);

//     for (let i = 0; i < videothumb.length; i++) {
//       try {
//         await collection.doc(list[i].id).update({
//           video: videos[i],
//           thumbnail: videothumb[i],
//         });
//         console.log(`updated document ${i}`);
//       } catch (error) {
//         console.error(`Error adding document ${i}:`, error);
//       }
//     }
//     console.log(`updated all document`);
//   } catch (error) {
//     console.error(`Error adding document :`, error);
//   }
// };
const posts = [
  {
    categoryCode: 2,
    id: '0Fjx4wdkOYHDyGZ0uK9c',
    image: 'http://itekindia.com/chats/festival/25-Pongal.webp',
    subCategory: 25,
    tags: 'Pongal, festival, 14 january, indian festival',
  },
];
