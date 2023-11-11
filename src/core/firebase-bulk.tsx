import firestore from '@react-native-firebase/firestore';
export const addRandomData = async (num: any, database: any) => {
  for (let i = 0; i < num; i++) {
    try {
      await firestore()
        .collection(database)
        .add({
          time: 1696243535636 + 7200000 * i,
        });
      console.log(`Added document ${i + 1}`);
    } catch (error) {
      console.error(`Error adding document ${i + 1}:`, error);
    }
  }
};
// 'IBAIS HARDWARE GROUP'
export const changeData = async () => {
  const list: any = [];
  try {
    const collectionRef = firestore().collection('IBAIS HARDWARE GROUP');
    // http://itekindia.com/chats/images/1.png
    // Fetch documents from the collection
    const querySnapshot = await collectionRef.get();
    querySnapshot.forEach(async (doc) => {
      list.push(doc.id);
    });
    list.map(async (item: any, index: any) => {
      try {
        // Update the field in each document
        await collectionRef.doc(item).update({
          url: `http://itekindia.com/chats/images/${index + 1}.png`,
        });
        console.log(
          `Field uploadTime updated in document with ID: ${item},${
            1696243535636 + 7200000 * (index + 1)
          }`
        );
      } catch (error) {
        console.error(
          `Error updating field in document with ID: ${item}`,
          error
        );
      }
    });

    console.log(`changed document`);
  } catch (error) {
    console.error(`Error adding document :`, error);
  }
};
// http://itekindia.com/chats/frames/format1.png
export const addFrames = async () => {
  try {
    const collection = firestore().collection('frames');
    for (let i = 2; i < 21; i++) {
      try {
        await collection.add({
          image: `http://itekindia.com/chats/frames/format${i}.png`,
        });
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

export const addData = async () => {
  try {
    const collection = firestore().collection('postImages');
    for (let i = 0; i < imageObjects.length; i++) {
      try {
        await collection.add(imageObjects[i]);
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
export const updateData = async () => {
  let list: any = [];
  try {
    const collection = firestore().collection('postVideos');
    // http://itekindia.com/chats/images/1.png
    // Fetch documents from the collection
    const querySnapshot = await collection.orderBy('video').get();
    querySnapshot.forEach(async (doc) => {
      list.push({
        id: doc.id,
      });
    });
    console.log(list);

    for (let i = 0; i < videothumb.length; i++) {
      try {
        await collection.doc(list[i].id).update({
          video: videos[i],
          thumbnail: videothumb[i],
        });
        console.log(`updated document ${i}`);
      } catch (error) {
        console.error(`Error adding document ${i}:`, error);
      }
    }
    console.log(`updated all document`);
  } catch (error) {
    console.error(`Error adding document :`, error);
  }
};
const imageObjects = [
  {
    image: `http://itekindia.com/chats/festival/01-Utrayan.png`,
    categoryCode: 2,
    subCategory: 1,
    tags: 'Utrayan, festival, 14 february, makar sankranti',
  },
  {
    image: `http://itekindia.com/chats/festival/02-Republic Day.png`,
    categoryCode: 4,
    subCategory: 2,
    tags: 'Republic Day, festival, 26 january, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/03-Valentine Day.png`,
    categoryCode: 2,
    subCategory: 3,
    tags: 'Valentine Day, festival, 14 february, love',
  },
  {
    image: `http://itekindia.com/chats/festival/04-Holi.png`,
    categoryCode: 2,
    subCategory: 4,
    tags: 'Holi, festival, 29 march, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/05-Dhuleti.png`,
    categoryCode: 2,
    subCategory: 5,
    tags: 'Dhuleti, festival, 30 march, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/06-Mahashivratri.png`,
    categoryCode: 2,
    subCategory: 6,
    tags: 'Mahashivratri, festival, 11 march, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/07-Raksha Bandhan.png`,
    categoryCode: 2,
    subCategory: 7,
    tags: 'Raksha Bandhan, festival, 22 august, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/08-Independent Day.png`,
    categoryCode: 4,
    subCategory: 8,
    tags: 'Independent Day, festival, 15 august, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/09-Janmashatmi.png`,
    categoryCode: 2,
    subCategory: 9,
    tags: 'Janmashatmi, festival, 30 august, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/10-Ganesh Chaturthi.png`,
    categoryCode: 2,
    subCategory: 10,
    tags: 'Ganesh Chaturthi, festival, 10 september, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/11-Navratri.png`,
    categoryCode: 2,
    subCategory: 11,
    tags: 'Navratri, festival, 7 october, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/12-Ramnavmi.png`,
    categoryCode: 2,
    subCategory: 12,
    tags: 'Ramnavmi, festival, 2 april, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/13-Dusshera.png`,
    categoryCode: 2,
    subCategory: 13,
    tags: 'Dusshera, festival, 15 october, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/14-Dhan Teras.png`,
    categoryCode: 2,
    subCategory: 14,
    tags: 'Dhan Teras, festival, 2 november, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/15-Diwali.png`,
    categoryCode: 2,
    subCategory: 15,
    tags: 'Diwali, festival, 4 november, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/16-New Year.png`,
    categoryCode: 2,
    subCategory: 16,
    tags: 'New Year, festival, 1 january, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/17-Bhai Duj.png`,
    categoryCode: 2,
    subCategory: 17,
    tags: 'Bhai Duj, festival, 6 november, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/18-Xmas.png`,
    categoryCode: 2,
    subCategory: 18,
    tags: 'Xmas, festival, 25 december, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/19-Ghandhi Jayanti.png`,
    categoryCode: 4,
    subCategory: 19,
    tags: 'Ghandhi Jayanti, festival, 2 october, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/20-Hanuman Jayanti.png`,
    categoryCode: 2,
    subCategory: 20,
    tags: 'Hanuman Jayanti, festival, 27 april, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/21-Vivekanand Jayanti.png`,
    categoryCode: 2,
    subCategory: 21,
    tags: 'Vivekanand Jayanti, festival, 12 january, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/22-Mahavir Jayanti.png`,
    categoryCode: 2,
    subCategory: 22,
    tags: 'Mahavir Jayanti, festival, 25 april, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/23-Gurunanak Jayanti.png`,
    categoryCode: 2,
    subCategory: 23,
    tags: 'Gurunanak Jayanti, festival, 19 november, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/24-Vasant Panchami.png`,
    categoryCode: 2,
    subCategory: 24,
    tags: 'Vasant Panchami, festival, 16 february, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/25-Pongal.png`,
    categoryCode: 2,
    subCategory: 25,
    tags: 'Pongal, festival, 14 january, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/26-Gudi Padvo.png`,
    categoryCode: 2,
    subCategory: 26,
    tags: 'Gudi Padvo, festival, 13 april, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/28-Good Friday.png`,
    categoryCode: 2,
    subCategory: 28,
    tags: 'Good Friday, festival, 2 april, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/29-Rath Yatra.png`,
    categoryCode: 2,
    subCategory: 29,
    tags: 'Rath Yatra, festival, 12 july, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/30-Mothers Day.png`,
    categoryCode: 4,
    subCategory: 30,
    tags: 'Mothers Day, festival, 9 may, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/31-Fathers Day.png`,
    categoryCode: 4,
    subCategory: 31,
    tags: 'Fathers Day, festival, 20 june, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/32-World Heart Day.png`,
    categoryCode: 4,
    subCategory: 32,
    tags: 'World Heart Day, festival, 29 september, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/33-Friendship Day.png`,
    categoryCode: 4,
    subCategory: 33,
    tags: 'Friendship Day, festival, 1 august, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/34-Daughters Day.png`,
    categoryCode: 4,
    subCategory: 34,
    tags: 'Daughters Day, festival, 26 september, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/35-Eid Mubarak.png`,
    categoryCode: 2,
    subCategory: 35,
    tags: 'Eid Mubarak, festival, 13 may, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/36-Yoga Day.png`,
    categoryCode: 4,
    subCategory: 36,
    tags: 'Yoga Day, festival, 21 june, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/37-Onam.png`,
    categoryCode: 2,
    subCategory: 37,
    tags: 'Onam, festival, 12 august, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/38-Teahers Day.png`,
    categoryCode: 4,
    subCategory: 38,
    tags: 'Teahers Day, festival, 5 september, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/39-Guru Purnima.png`,
    categoryCode: 2,
    subCategory: 39,
    tags: 'Guru Purnima, festival, 24 july, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/40-Earth Day.png`,
    categoryCode: 4,
    subCategory: 40,
    tags: 'Earth Day, festival, 22 april, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/41-Children Day.png`,
    categoryCode: 4,
    subCategory: 41,
    tags: 'Children Day, festival, 14 november, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/42-Womens Day.png`,
    categoryCode: 4,
    subCategory: 42,
    tags: 'Womens Day, festival, 8 march, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/43-Shivaji Maharaj Jayanti.png`,
    categoryCode: 2,
    subCategory: 43,
    tags: 'Shivaji Maharaj Jayanti, festival, 19 february, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/44-New Year 2021.png`,
    categoryCode: 2,
    subCategory: 44,
    tags: 'New Year 2021, festival, 1 january, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/45-National Youth Day.png`,
    categoryCode: 4,
    subCategory: 45,
    tags: 'National Youth Day, festival, 12 january, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/46-Doctors Day.png`,
    categoryCode: 4,
    subCategory: 46,
    tags: 'Doctors Day, festival, 1 july, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/47-Army Day.png`,
    categoryCode: 4,
    subCategory: 47,
    tags: 'Army Day, festival, 15 january, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/48-Rishi Panchami.png`,
    categoryCode: 2,
    subCategory: 48,
    tags: 'Rishi Panchami, festival, 22 august, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/49- Sardar Patel Jayanti.png`,
    categoryCode: 4,
    subCategory: 49,
    tags: 'Sardar Patel Jayanti, festival, 31 october, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/50- Sharad Purnima.png`,
    categoryCode: 2,
    subCategory: 50,
    tags: 'Sharad Purnima, festival, 20 october, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/51- Karva Chowth.png`,
    categoryCode: 2,
    subCategory: 51,
    tags: 'Karva Chowth, festival, 24 october, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/52- Labhpacham.png`,
    categoryCode: 2,
    subCategory: 52,
    tags: 'Labhpacham, festival, 14 november, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/53- Jalaram Jayanti.png`,
    categoryCode: 2,
    subCategory: 53,
    tags: 'Jalaram Jayanti, festival, 30 october, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/54- Dew Diwali.png`,
    categoryCode: 2,
    subCategory: 54,
    tags: 'Dew Diwali, festival, 5 november, indian festival',
  },
  {
    image: `http://itekindia.com/chats/festival/55- World Bicycle Day.png`,
    categoryCode: 4,
    subCategory: 55,
    tags: 'World Bicycle Day, festival, 3 june, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/56- World environment day.png`,
    categoryCode: 4,
    subCategory: 56,
    tags: 'World environment day, festival, 5 june, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/57- World ocean day.png`,
    categoryCode: 4,
    subCategory: 57,
    tags: 'World ocean day, festival, 8 june, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/58- Anti Child Labour Day.png`,
    categoryCode: 4,
    subCategory: 58,
    tags: 'Anti Child Labour Day, festival, 12 june, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/59- World Blood Donor Day.png`,
    categoryCode: 4,
    subCategory: 59,
    tags: 'World Blood Donor Day, festival, 14 june, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/60 - Music Day.png`,
    categoryCode: 4,
    subCategory: 60,
    tags: 'Music Day, festival, 21 june, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/61 - World Senior Sitizen Day.png`,
    categoryCode: 4,
    subCategory: 61,
    tags: 'World Senior Sitizen Day, festival, 21 june, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/62 - World Photography Day.png`,
    categoryCode: 4,
    subCategory: 62,
    tags: 'World Photography Day, festival, 19 august, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/63 - Sports Day.png`,
    categoryCode: 4,
    subCategory: 63,
    tags: 'Sports Day, festival, 29 august, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/64 - World Television Day.png`,
    categoryCode: 4,
    subCategory: 64,
    tags: 'World Television Day, festival, 21 november, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/65 - World Aids Day.png`,
    categoryCode: 4,
    subCategory: 65,
    tags: 'World Aids Day, festival, 1 december, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/66 - Indian Navy Day.png`,
    categoryCode: 4,
    subCategory: 66,
    tags: 'Indian Navy Day, festival, 4 december, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/67 - Human Rights Day.png`,
    categoryCode: 4,
    subCategory: 67,
    tags: 'Human Rights Day, festival, 10 december, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/68 - Kisan Diwas.png`,
    categoryCode: 4,
    subCategory: 68,
    tags: 'Kisan Diwas, festival, 23 december, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/69 - Gujarat & Mharastra Stphtana Day.png`,
    categoryCode: 4,
    subCategory: 69,
    tags: 'Gujarat & Mharastra Stphtana Day, festival, 1 may, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/70 - World Handicapped Day.png`,
    categoryCode: 4,
    subCategory: 70,
    tags: 'World Handicapped Day, festival, 3 december, indian flag',
  },
  {
    image: `http://itekindia.com/chats/festival/71 - World Labour Day.png`,
    categoryCode: 4,
    subCategory: 71,
    tags: 'World Labour Day, festival, 1 may, indian flag',
  },
];
const _images2 = [
  `http://itekindia.com/chats/festival/01-Utrayan.png`,
  `http://itekindia.com/chats/festival/02-Republic Day.png`,
  `http://itekindia.com/chats/festival/03-Valentine Day.png`,
  `http://itekindia.com/chats/festival/04-Holi.png`,
  `http://itekindia.com/chats/festival/05-Dhuleti.png`,
  `http://itekindia.com/chats/festival/06-Mahashivratri.png`,
  `http://itekindia.com/chats/festival/07-Raksha Bandhan.png`,
  `http://itekindia.com/chats/festival/08-Independent Day.png`,
  `http://itekindia.com/chats/festival/09-Janmashatmi.png`,
  `http://itekindia.com/chats/festival/10-Ganesh Chaturthi.png`,
  `http://itekindia.com/chats/festival/11-Navratri.png`,
  `http://itekindia.com/chats/festival/12-Ramnavmi.png`,
  `http://itekindia.com/chats/festival/13-Dusshera.png`,
  `http://itekindia.com/chats/festival/14-Dhan Teras.png`,
  `http://itekindia.com/chats/festival/15-Diwali.png`,
  `http://itekindia.com/chats/festival/16-New Year.png`,
  `http://itekindia.com/chats/festival/17-Bhai Duj.png`,
  `http://itekindia.com/chats/festival/18-Xmas.png`,
  `http://itekindia.com/chats/festival/19-Ghandhi Jayanti.png`,
  `http://itekindia.com/chats/festival/20-Hanuman Jayanti.png`,
  `http://itekindia.com/chats/festival/21-Vivekanand Jayanti.png`,
  `http://itekindia.com/chats/festival/22-Mahavir Jayanti.png`,
  `http://itekindia.com/chats/festival/23-Gurunanak Jayanti.png`,
  `http://itekindia.com/chats/festival/24-Vasant Panchami.png`,
  `http://itekindia.com/chats/festival/25-Pongal.png`,
  `http://itekindia.com/chats/festival/26-Gudi Padvo.png`,
  `http://itekindia.com/chats/festival/28-Good Friday.png`,
  `http://itekindia.com/chats/festival/29-Rath Yatra.png`,
  `http://itekindia.com/chats/festival/30-Mothers Day.png`,
  `http://itekindia.com/chats/festival/31-Fathers Day.png`,
  `http://itekindia.com/chats/festival/32-World Heart Day.png`,
  `http://itekindia.com/chats/festival/33-Friendship Day.png`,
  `http://itekindia.com/chats/festival/34-Daughters Day.png`,
  `http://itekindia.com/chats/festival/35-Eid Mubarak.png`,
  `http://itekindia.com/chats/festival/36-Yoga Day.png`,
  `http://itekindia.com/chats/festival/37-Onam.png`,
  `http://itekindia.com/chats/festival/38-Teahers Day.png`,
  `http://itekindia.com/chats/festival/39-Guru Purnima.png`,
  `http://itekindia.com/chats/festival/40-Earth Day.png`,
  `http://itekindia.com/chats/festival/41-Children Day.png`,
  `http://itekindia.com/chats/festival/42-Womens Day.png`,
  `http://itekindia.com/chats/festival/43-Shivaji Maharaj Jayanti.png`,
  `http://itekindia.com/chats/festival/44-New Year 2021.png`,
  `http://itekindia.com/chats/festival/45-National Youth Day.png`,
  `http://itekindia.com/chats/festival/46-Doctors Day.png`,
  `http://itekindia.com/chats/festival/47-Army Day.png`,
  `http://itekindia.com/chats/festival/48-Rishi Panchami.png`,
  `http://itekindia.com/chats/festival/49- Sardar Patel Jayanti.png`,
  `http://itekindia.com/chats/festival/50- Sharad Purnima.png`,
  `http://itekindia.com/chats/festival/51- Karva Chowth.png`,
  `http://itekindia.com/chats/festival/52- Labhpacham.png`,
  `http://itekindia.com/chats/festival/53- Jalaram Jayanti.png`,
  `http://itekindia.com/chats/festival/54- Dew Diwali.png`,
  `http://itekindia.com/chats/festival/55- World Bicycle Day.png`,
  `http://itekindia.com/chats/festival/56- World environment day.png`,
  `http://itekindia.com/chats/festival/57- World ocean day.png`,
  `http://itekindia.com/chats/festival/58- Anti Child Labour Day.png`,
  `http://itekindia.com/chats/festival/59- World Blood Donor Day.png`,
  `http://itekindia.com/chats/festival/60 - Music Day.png`,
  `http://itekindia.com/chats/festival/61 - World Senior Sitizen Day.png`,
  `http://itekindia.com/chats/festival/62 - World Photography Day.png`,
  `http://itekindia.com/chats/festival/63 - Sports Day.png`,
  `http://itekindia.com/chats/festival/64 - World Television Day.png`,
  `http://itekindia.com/chats/festival/65 - World Aids Day.png`,
  `http://itekindia.com/chats/festival/66 - Indian Navy Day.png`,
  `http://itekindia.com/chats/festival/67 - Human Rights Day.png`,
  `http://itekindia.com/chats/festival/68 - Kisan Diwas.png`,
  `http://itekindia.com/chats/festival/69 - Gujarat & Mharastra Stphtana Day.png`,
  `http://itekindia.com/chats/festival/70 - World Handicapped Day.png`,
  `http://itekindia.com/chats/festival/71 - World Labour Day.png`,
];

const _images = [
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-1.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-2.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-3.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-4.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-5.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-6.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-7.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-8.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-9.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-10.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-11.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-12.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-13.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-14.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-15.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-16.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-17.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-18.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-19.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-20.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-21.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-22.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-23.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-24.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-25.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-26.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-27.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-28.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-29.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-30.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-31.png`,
  `http://itekindia.com/octoria/dashboard/uploads/Untitled-32.png`,
];

const videoObjects = [
  {
    video: 'http://itekindia.com/chats/videos/1.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/1.gif',
    categoryCode: 2,
    subCategory: 14,
    tags: 'dhan teras, fetival, diwali',
  },
  {
    video: 'http://itekindia.com/chats/videos/2.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/2.gif',
    categoryCode: 4,
    subCategory: 27,
    tags: 'engineers day, fetival',
  },
  {
    video: 'http://itekindia.com/chats/videos/3.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/3.gif',
    categoryCode: 2,
    subCategory: 14,
    tags: 'dhan teras, fetival, diwali',
  },
  {
    video: 'http://itekindia.com/chats/videos/4.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/4.gif',
    categoryCode: 4,
    subCategory: 8,
    tags: 'independence day, fetival, indian flag',
  },
  {
    video: 'http://itekindia.com/chats/videos/5.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/5.gif',
    categoryCode: 2,
    subCategory: 17,
    tags: 'bhai dooj, fetival',
  },
  {
    video: 'http://itekindia.com/chats/videos/6.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/6.gif',
    categoryCode: 2,
    subCategory: 9,
    tags: 'janmashthami, fetival',
  },
  {
    video: 'http://itekindia.com/chats/videos/7.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/7.gif',
    categoryCode: 4,
    subCategory: 2,
    tags: 'republic day, fetival, indian flag',
  },
  {
    video: 'http://itekindia.com/chats/videos/8.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/8.gif',
    categoryCode: 4,
    subCategory: 72,
    tags: 'indian air force day, fetival, indian flag',
  },
  {
    video: 'http://itekindia.com/chats/videos/9.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/9.gif',
    categoryCode: 5,
    subCategory: 73,
    tags: 'happy birthday, fetival',
  },
  {
    video: 'http://itekindia.com/chats/videos/10.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/10.gif',
    categoryCode: 2,
    subCategory: 15,
    tags: 'diwali, fetival',
  },
  {
    video: 'http://itekindia.com/chats/videos/11.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/11.gif',
    categoryCode: 2,
    subCategory: 15,
    tags: 'diwali, fetival',
  },
  {
    video: 'http://itekindia.com/chats/videos/12.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/12.gif',
    categoryCode: 2,
    subCategory: 15,
    tags: 'diwali, fetival',
  },
  {
    video: 'http://itekindia.com/chats/videos/13.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/13.gif',
    categoryCode: 2,
    subCategory: 15,
    tags: 'diwali, fetival',
  },
  {
    video: 'http://itekindia.com/chats/videos/14.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/14.gif',
    categoryCode: 4,
    subCategory: 27,
    tags: 'engineers day, fetival',
  },
  {
    video: 'http://itekindia.com/chats/videos/15.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/15.gif',
    categoryCode: 2,
    subCategory: 10,
    tags: 'ganesh chaturthi, fetival',
  },
  {
    video: 'http://itekindia.com/chats/videos/16.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/16.gif',
    categoryCode: 2,
    subCategory: 10,
    tags: 'ganesh chaturthi, fetival',
  },
  {
    video: 'http://itekindia.com/chats/videos/17.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/17.gif',
    categoryCode: 2,
    subCategory: 22,
    tags: 'mahavir jayanti, fetival',
  },
  {
    video: 'http://itekindia.com/chats/videos/18.mp4',
    thumbnail: 'http://itekindia.com/chats/gifs/18.gif',
    categoryCode: 2,
    subCategory: 13,
    tags: 'dussehra, fetival',
  },
];

const videos = [
  `http://itekindia.com/chats/videos/1.mp4`, //dhan teras
  `http://itekindia.com/chats/videos/2.mp4`, //engineers day
  `http://itekindia.com/chats/videos/3.mp4`, // dhan teras
  `http://itekindia.com/chats/videos/4.mp4`, // independence day
  `http://itekindia.com/chats/videos/5.mp4`, //bhai dooj
  `http://itekindia.com/chats/videos/6.mp4`, // janmashthami
  `http://itekindia.com/chats/videos/7.mp4`, // republic day
  `http://itekindia.com/chats/videos/8.mp4`, // indian air force day
  `http://itekindia.com/chats/videos/9.mp4`, // happy birthday
  `http://itekindia.com/chats/videos/10.mp4`, //diwali
  `http://itekindia.com/chats/videos/11.mp4`, //diwali
  `http://itekindia.com/chats/videos/12.mp4`, //diwali
  `http://itekindia.com/chats/videos/13.mp4`, //diwali
  `http://itekindia.com/chats/videos/14.mp4`, // engineers day
  `http://itekindia.com/chats/videos/15.mp4`, //ganesh chaturthi
  `http://itekindia.com/chats/videos/16.mp4`, //ganesh chaturthi
  `http://itekindia.com/chats/videos/17.mp4`, //mahavir jayanti
  `http://itekindia.com/chats/videos/18.mp4`, // dussehra
];
const videothumb = [
  `http://itekindia.com/chats/gifs/1.gif`,
  `http://itekindia.com/chats/gifs/2.gif`,
  `http://itekindia.com/chats/gifs/3.gif`,
  `http://itekindia.com/chats/gifs/4.gif`,
  `http://itekindia.com/chats/gifs/5.gif`,
  `http://itekindia.com/chats/gifs/6.gif`,
  `http://itekindia.com/chats/gifs/7.gif`,
  `http://itekindia.com/chats/gifs/8.gif`,
  `http://itekindia.com/chats/gifs/9.gif`,
  `http://itekindia.com/chats/gifs/10.gif`,
  `http://itekindia.com/chats/gifs/11.gif`,
  `http://itekindia.com/chats/gifs/12.gif`,
  `http://itekindia.com/chats/gifs/13.gif`,
  `http://itekindia.com/chats/gifs/14.gif`,
  `http://itekindia.com/chats/gifs/15.gif`,
  `http://itekindia.com/chats/gifs/16.gif`,
  `http://itekindia.com/chats/gifs/17.gif`,
  `http://itekindia.com/chats/gifs/18.gif`,
];
const categories = [
  {
    name: 'Start With Blank',
    image: 'http://itekindia.com/chats/mainfestivalcategory/tiles.jpg',
  },
  {
    name: 'Festival',
    image: 'http://itekindia.com/chats/mainfestivalcategory/fireworks.jpg',
  },
  {
    name: 'Business',
    image: 'http://itekindia.com/chats/mainfestivalcategory/business.jpg',
  },
  {
    name: 'Special Days',
    image: 'http://itekindia.com/chats/mainfestivalcategory/indian-flag.jpg',
  },
  {
    name: 'Greetings',
    image: 'http://itekindia.com/chats/mainfestivalcategory/cake.jpg',
  },
];
