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
  {
    categoryCode: 2,
    id: '3YoMOHEbn2GPT6yf2onH',
    image: 'http://itekindia.com/chats/festival/13-Dusshera.webp',
    subCategory: 13,
    tags: 'Dusshera, festival, 15 october, indian festival',
  },
  {
    categoryCode: 4,
    id: '5jceRxUYHVhJ9FagdUHT',
    image:
      'http://itekindia.com/chats/festival/69 - Gujarat & Mharastra Stphtana Day.webp',
    subCategory: 69,
    tags: 'Gujarat & Mharastra Stphtana Day, festival, 1 may, indian flag',
  },
  {
    categoryCode: 2,
    id: '62NATOkewjol4KAQAjr4',
    image: 'http://itekindia.com/chats/festival/07-Raksha Bandhan.webp',
    subCategory: 7,
    tags: 'Raksha Bandhan, festival, 22 august, indian festival',
  },
  {
    categoryCode: 4,
    id: '7ruLEErLVUiYECd8DeJD',
    image:
      'http://itekindia.com/chats/festival/62 - World Photography Day.webp',
    subCategory: 62,
    tags: 'World Photography Day, festival, 19 august, indian flag',
  },
  {
    categoryCode: 4,
    id: '8v4XIWaIqbQSlodH5y93',
    image: 'http://itekindia.com/chats/festival/68 - Kisan Diwas.webp',
    subCategory: 68,
    tags: 'Kisan Diwas, festival, 23 december, indian flag',
  },
  {
    categoryCode: 2,
    id: 'AtDM6foBZjTJto4825DX',
    image: 'http://itekindia.com/chats/festival/52- Labhpacham.webp',
    subCategory: 52,
    tags: 'Labhpacham, festival, 14 november, indian festival',
  },
  {
    categoryCode: 2,
    id: 'B7vdxIqpaRc14t496cKN',
    image: 'http://itekindia.com/chats/festival/20-Hanuman Jayanti.webp',
    subCategory: 20,
    tags: 'Hanuman Jayanti, festival, 27 april, indian festival',
  },
  {
    categoryCode: 4,
    id: 'BYzb0xl1DjENESiDWDZG',
    image: 'http://itekindia.com/chats/festival/46-Doctors Day.webp',
    subCategory: 46,
    tags: 'Doctors Day, festival, 1 july, indian flag',
  },
  {
    categoryCode: 4,
    id: 'Bot5QCCRaf9tv6hYIrFH',
    image: 'http://itekindia.com/chats/festival/57- World ocean day.webp',
    subCategory: 57,
    tags: 'World ocean day, festival, 8 june, indian flag',
  },
  {
    categoryCode: 2,
    id: 'CBzbO1W7XAaVMMCbZpNT',
    image: 'http://itekindia.com/chats/festival/04-Holi.webp',
    subCategory: 4,
    tags: 'Holi, festival, 29 march, indian festival',
  },
  {
    categoryCode: 2,
    id: 'CggjZlpHaZxx0e7XVFZ4',
    image: 'http://itekindia.com/chats/festival/01-Utrayan.webp',
    subCategory: 1,
    tags: 'Utrayan, festival, 14 february, makar sankranti',
  },
  {
    categoryCode: 4,
    id: 'CnErjPmfSjCVsjxG9l9h',
    image: 'http://itekindia.com/chats/festival/71 - World Labour Day.webp',
    subCategory: 71,
    tags: 'World Labour Day, festival, 1 may, indian flag',
  },
  {
    categoryCode: 4,
    id: 'D1ZWhiM27kW08Y28B9sM',
    image: 'http://itekindia.com/chats/festival/47-Army Day.webp',
    subCategory: 47,
    tags: 'Army Day, festival, 15 january, indian flag',
  },
  {
    categoryCode: 4,
    id: 'DKX7M9NHHlR3NiUNwviR',
    image: 'http://itekindia.com/chats/festival/58- Anti Child Labour Day.webp',
    subCategory: 58,
    tags: 'Anti Child Labour Day, festival, 12 june, indian flag',
  },
  {
    categoryCode: 2,
    id: 'EeMgUoW8SYx5eLNXv2k3',
    image: 'http://itekindia.com/chats/festival/06-Mahashivratri.webp',
    subCategory: 6,
    tags: 'Mahashivratri, festival, 11 march, indian festival',
  },
  {
    categoryCode: 2,
    id: 'EpXvsQyCHS64kW49llsn',
    image: 'http://itekindia.com/chats/festival/35-Eid Mubarak.webp',
    subCategory: 35,
    tags: 'Eid Mubarak, festival, 13 may, indian festival',
  },
  {
    categoryCode: 4,
    id: 'EuLWAeD2eRjcQqQSopcc',
    image: 'http://itekindia.com/chats/festival/60 - Music Day.webp',
    subCategory: 60,
    tags: 'Music Day, festival, 21 june, indian flag',
  },
  {
    categoryCode: 2,
    id: 'FbGfWagbr5oxH3IFswGV',
    image: 'http://itekindia.com/chats/festival/09-Janmashatmi.webp',
    subCategory: 9,
    tags: 'Janmashatmi, festival, 30 august, indian festival',
  },
  {
    categoryCode: 2,
    id: 'Fp2I0IRGU80FZGxFDNL9',
    image: 'http://itekindia.com/chats/festival/24-Vasant Panchami.webp',
    subCategory: 24,
    tags: 'Vasant Panchami, festival, 16 february, indian festival',
  },
  {
    categoryCode: 4,
    id: 'GBnArD0fMab3QAhWHWTn',
    image: 'http://itekindia.com/chats/festival/66 - Indian Navy Day.webp',
    subCategory: 66,
    tags: 'Indian Navy Day, festival, 4 december, indian flag',
  },
  {
    categoryCode: 2,
    id: 'GUm1TeNg3wkVt0kfoP7L',
    image: 'http://itekindia.com/chats/festival/16-New Year.webp',
    subCategory: 16,
    tags: 'New Year, festival, 1 january, indian festival',
  },
  {
    categoryCode: 4,
    id: 'GVrUMfpL8mqxowcEIf7m',
    image: 'http://itekindia.com/chats/festival/59- World Blood Donor Day.webp',
    subCategory: 59,
    tags: 'World Blood Donor Day, festival, 14 june, indian flag',
  },
  {
    categoryCode: 2,
    id: 'HrmGDertm6jcFbPOxCRQ',
    image: 'http://itekindia.com/chats/festival/17-Bhai Duj.webp',
    subCategory: 17,
    tags: 'Bhai Duj, festival, 6 november, indian festival',
  },
  {
    categoryCode: 2,
    id: 'Jc57nmoR1bj2MaUQC4vy',
    image: 'http://itekindia.com/chats/festival/53- Jalaram Jayanti.webp',
    subCategory: 53,
    tags: 'Jalaram Jayanti, festival, 30 october, indian festival',
  },
  {
    categoryCode: 2,
    id: 'LJZpB25uewKZYN9bY1Hc',
    image: 'http://itekindia.com/chats/festival/12-Ramnavmi.webp',
    subCategory: 12,
    tags: 'Ramnavmi, festival, 2 april, indian festival',
  },
  {
    categoryCode: 2,
    id: 'MeG2gcuNtaGYvXUu5wTi',
    image: 'http://itekindia.com/chats/festival/29-Rath Yatra.webp',
    subCategory: 29,
    tags: 'Rath Yatra, festival, 12 july, indian festival',
  },
  {
    categoryCode: 4,
    id: 'NXYu4vyONSPA0vyqIqbL',
    image: 'http://itekindia.com/chats/festival/65 - World Aids Day.webp',
    subCategory: 65,
    tags: 'World Aids Day, festival, 1 december, indian flag',
  },
  {
    categoryCode: 4,
    id: 'O1G3dLMmq1M5egWzOOdQ',
    image: 'http://itekindia.com/chats/festival/55- World Bicycle Day.webp',
    subCategory: 55,
    tags: 'World Bicycle Day, festival, 3 june, indian flag',
  },
  {
    categoryCode: 2,
    id: 'OcUXqtaCHPNqtNbtimjK',
    image: 'http://itekindia.com/chats/festival/22-Mahavir Jayanti.webp',
    subCategory: 22,
    tags: 'Mahavir Jayanti, festival, 25 april, indian festival',
  },
  {
    categoryCode: 2,
    id: 'OeXfNGlpB8UlzxlIeqk7',
    image:
      'http://itekindia.com/chats/festival/43-Shivaji Maharaj Jayanti.webp',
    subCategory: 43,
    tags: 'Shivaji Maharaj Jayanti, festival, 19 february, indian festival',
  },
  {
    categoryCode: 4,
    id: 'Of3uNagLwHWAsbLDsOsM',
    image: 'http://itekindia.com/chats/festival/02-Republic Day.webp',
    subCategory: 2,
    tags: 'Republic Day, festival, 26 january, indian flag',
  },
  {
    categoryCode: 4,
    id: 'QTGp1RvpT06sL4S3L7E9',
    image: 'http://itekindia.com/chats/festival/56- World environment day.webp',
    subCategory: 56,
    tags: 'World environment day, festival, 5 june, indian flag',
  },
  {
    categoryCode: 2,
    id: 'RwnTkXXRLemnTYXLFSBf',
    image: 'http://itekindia.com/chats/festival/54- Dew Diwali.webp',
    subCategory: 54,
    tags: 'Dew Diwali, festival, 5 november, indian festival',
  },
  {
    categoryCode: 4,
    id: 'TAvkQFBdWcm9iUe3GBKg',
    image: 'http://itekindia.com/chats/festival/64 - World Television Day.webp',
    subCategory: 64,
    tags: 'World Television Day, festival, 21 november, indian flag',
  },
  {
    categoryCode: 4,
    id: 'TjafBrQX5pi2kzaT7Bo3',
    image: 'http://itekindia.com/chats/festival/08-Independent Day.webp',
    subCategory: 8,
    tags: 'Independent Day, festival, 15 august, indian flag',
  },
  {
    categoryCode: 4,
    id: 'UHAnRt9yvIkfiMWNFph3',
    image: 'http://itekindia.com/chats/festival/40-Earth Day.webp',
    subCategory: 40,
    tags: 'Earth Day, festival, 22 april, indian flag',
  },
  {
    categoryCode: 4,
    id: 'UTEeqPnp9TAc5bHWa8Md',
    image: 'http://itekindia.com/chats/festival/45-National Youth Day.webp',
    subCategory: 45,
    tags: 'National Youth Day, festival, 12 january, indian flag',
  },
  {
    categoryCode: 2,
    id: 'V69wqZvtst1bdZqG4cU6',
    image: 'http://itekindia.com/chats/festival/26-Gudi Padvo.webp',
    subCategory: 26,
    tags: 'Gudi Padvo, festival, 13 april, indian festival',
  },
  {
    categoryCode: 2,
    id: 'X4oGuiBIbzmr2uuDqgC5',
    image: 'http://itekindia.com/chats/festival/48-Rishi Panchami.webp',
    subCategory: 48,
    tags: 'Rishi Panchami, festival, 22 august, indian festival',
  },
  {
    categoryCode: 2,
    id: 'XKw9Zc7BqKyFtB3GCYBC',
    image: 'http://itekindia.com/chats/festival/10-Ganesh Chaturthi.webp',
    subCategory: 10,
    tags: 'Ganesh Chaturthi, festival, 10 september, indian festival',
  },
  {
    categoryCode: 2,
    id: 'XTc5nr2OtPLC9zLLX3QV',
    image: 'http://itekindia.com/chats/festival/14-Dhan Teras.webp',
    subCategory: 14,
    tags: 'Dhan Teras, festival, 2 november, indian festival',
  },
  {
    categoryCode: 2,
    id: 'YpX4I6JK5KoWsK3Rh8pp',
    image: 'http://itekindia.com/chats/festival/03-Valentine Day.webp',
    subCategory: 3,
    tags: 'Valentine Day, festival, 14 february, love',
  },
  {
    categoryCode: 4,
    id: 'aW3rZGfr5JN5YfV936Im',
    image: 'http://itekindia.com/chats/festival/41-Children Day.webp',
    subCategory: 41,
    tags: 'Children Day, festival, 14 november, indian flag',
  },
  {
    categoryCode: 2,
    id: 'anJNe68I4NgHQR88hniP',
    image: 'http://itekindia.com/chats/festival/15-Diwali.webp',
    subCategory: 15,
    tags: 'Diwali, festival, 4 november, indian festival',
  },
  {
    categoryCode: 4,
    id: 'bLNMRzezuQunA57CI2S2',
    image: 'http://itekindia.com/chats/festival/31-Fathers Day.webp',
    subCategory: 31,
    tags: 'Fathers Day, festival, 20 june, indian flag',
  },
  {
    categoryCode: 2,
    id: 'bhmsDF0i5iuRNqXLNvpG',
    image: 'http://itekindia.com/chats/festival/37-Onam.webp',
    subCategory: 37,
    tags: 'Onam, festival, 12 august, indian festival',
  },
  {
    categoryCode: 2,
    id: 'boJJPp3lNuymOf2qpVuM',
    image: 'http://itekindia.com/chats/festival/05-Dhuleti.webp',
    subCategory: 5,
    tags: 'Dhuleti, festival, 30 march, indian festival',
  },
  {
    categoryCode: 4,
    id: 'caoNFMB8Bg6P3S6O4Wnl',
    image: 'http://itekindia.com/chats/festival/32-World Heart Day.webp',
    subCategory: 32,
    tags: 'World Heart Day, festival, 29 september, indian flag',
  },
  {
    categoryCode: 2,
    id: 'eFUMTD5KQXQI450OveMW',
    image: 'http://itekindia.com/chats/festival/21-Vivekanand Jayanti.webp',
    subCategory: 21,
    tags: 'Vivekanand Jayanti, festival, 12 january, indian festival',
  },
  {
    categoryCode: 4,
    id: 'fKGTNufWmXB7vXPiSsNC',
    image:
      'http://itekindia.com/chats/festival/61 - World Senior Sitizen Day.webp',
    subCategory: 61,
    tags: 'World Senior Sitizen Day, festival, 21 june, indian flag',
  },
  {
    categoryCode: 2,
    id: 'gXwP8lgh4VFTaAl4r8VE',
    image: 'http://itekindia.com/chats/festival/50- Sharad Purnima.webp',
    subCategory: 50,
    tags: 'Sharad Purnima, festival, 20 october, indian festival',
  },
  {
    categoryCode: 2,
    id: 'gzYY6hRtR2V3vWHr1Muc',
    image: 'http://itekindia.com/chats/festival/28-Good Friday.webp',
    subCategory: 28,
    tags: 'Good Friday, festival, 2 april, indian festival',
  },
  {
    categoryCode: 4,
    id: 'h27fUggIalv0XksKtvcH',
    image: 'http://itekindia.com/chats/festival/63 - Sports Day.webp',
    subCategory: 63,
    tags: 'Sports Day, festival, 29 august, indian flag',
  },
  {
    categoryCode: 4,
    id: 'iAUNqRwaQvkopMs3yAC1',
    image: 'http://itekindia.com/chats/festival/30-Mothers Day.webp',
    subCategory: 30,
    tags: 'Mothers Day, festival, 9 may, indian flag',
  },
  {
    categoryCode: 2,
    id: 'mxz5dG84hgc6lWaSIMw9',
    image: 'http://itekindia.com/chats/festival/23-Gurunanak Jayanti.webp',
    subCategory: 23,
    tags: 'Gurunanak Jayanti, festival, 19 november, indian festival',
  },
  {
    categoryCode: 4,
    id: 'oZQpuTk2YEG6RytAP4yS',
    image: 'http://itekindia.com/chats/festival/38-Teahers Day.webp',
    subCategory: 38,
    tags: 'Teahers Day, festival, 5 september, indian flag',
  },
  {
    categoryCode: 4,
    id: 'oexEvJw6bgic804Os1Qi',
    image: 'http://itekindia.com/chats/festival/19-Ghandhi Jayanti.webp',
    subCategory: 19,
    tags: 'Ghandhi Jayanti, festival, 2 october, indian flag',
  },
  {
    categoryCode: 4,
    id: 'r0naBZcr0rUXHa8szkcn',
    image: 'http://itekindia.com/chats/festival/49- Sardar Patel Jayanti.webp',
    subCategory: 49,
    tags: 'Sardar Patel Jayanti, festival, 31 october, indian flag',
  },
  {
    categoryCode: 4,
    id: 'r0su4L48FTsYmp1gUmjh',
    image: 'http://itekindia.com/chats/festival/34-Daughters Day.webp',
    subCategory: 34,
    tags: 'Daughters Day, festival, 26 september, indian flag',
  },
  {
    categoryCode: 4,
    id: 'r6N50d5xRmo9U7YBownf',
    image: 'http://itekindia.com/chats/festival/36-Yoga Day.webp',
    subCategory: 36,
    tags: 'Yoga Day, festival, 21 june, indian flag',
  },
  {
    categoryCode: 2,
    id: 'tjlHx6ULP8uBR6bS2WeS',
    image: 'http://itekindia.com/chats/festival/11-Navratri.webp',
    subCategory: 11,
    tags: 'Navratri, festival, 7 october, indian festival',
  },
  {
    categoryCode: 2,
    id: 'tmQTidP7zvDLBrHeFGhV',
    image: 'http://itekindia.com/chats/festival/51- Karva Chowth.webp',
    subCategory: 51,
    tags: 'Karva Chowth, festival, 24 october, indian festival',
  },
  {
    categoryCode: 2,
    id: 'uHDe9gI5axz0hL2v641d',
    image: 'http://itekindia.com/chats/festival/18-Xmas.webp',
    subCategory: 18,
    tags: 'Xmas, festival, 25 december, indian festival',
  },
  {
    categoryCode: 4,
    id: 'uOvqcf1STHSFT7Uq4OB5',
    image: 'http://itekindia.com/chats/festival/33-Friendship Day.webp',
    subCategory: 33,
    tags: 'Friendship Day, festival, 1 august, indian flag',
  },
  {
    categoryCode: 4,
    id: 'uUWlqfLkOsySzCG4bN4K',
    image:
      'http://itekindia.com/chats/festival/70 - World Handicapped Day.webp',
    subCategory: 70,
    tags: 'World Handicapped Day, festival, 3 december, indian flag',
  },
  {
    categoryCode: 4,
    id: 'uwxkzSwYacFCTyYq1lzt',
    image: 'http://itekindia.com/chats/festival/42-Womens Day.webp',
    subCategory: 42,
    tags: 'Womens Day, festival, 8 march, indian flag',
  },
  {
    categoryCode: 2,
    id: 'vj0NSRqTIu6o2sFDj2Sf',
    image: 'http://itekindia.com/chats/festival/39-Guru Purnima.webp',
    subCategory: 39,
    tags: 'Guru Purnima, festival, 24 july, indian festival',
  },
  {
    categoryCode: 4,
    id: 'vklpCKxUu39AwaEyqMN0',
    image: 'http://itekindia.com/chats/festival/67 - Human Rights Day.webp',
    subCategory: 67,
    tags: 'Human Rights Day, festival, 10 december, indian flag',
  },
  {
    categoryCode: 2,
    id: 'wAsCAWSbmR9UejHBtVLD',
    image: 'http://itekindia.com/chats/festival/44-New Year 2021.webp',
    subCategory: 44,
    tags: 'New Year 2021, festival, 1 january, indian festival',
  },
];
