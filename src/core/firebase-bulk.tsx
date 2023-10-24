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
    const collection = firestore().collection('postVideos');
    for (let i = 0; i < videos.length; i++) {
      try {
        await collection.add({
          video: [`${videos[i]}`],
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

const _images2 = [
  `01-Utrayan.png`,
  `02-Republic Day.png`,
  `03-Valentine Day.png`,
  `04-Holi.png`,
  `05-Dhuleti.png`,
  `06-Mahashivratri.png`,
  `07-Raksha Bandhan.png`,
  `08-Independent Day.png`,
  `09-Janmashatmi.png`,
  `10-Ganesh Chaturthi.png`,
  `11-Navratri.png`,
  `12-Ramnavmi.png`,
  `13-Dusshera.png`,
  `14-Dhan Teras.png`,
  `15-Diwali.png`,
  `16-New Year.png`,
  `17-Bhai Duj.png`,
  `18-Xmas.png`,
  `19-Ghandhi Jayanti.png`,
  `20-Hanuman Jayanti.png`,
  `21-Vivekanand Jayanti.png`,
  `22-Mahavir Jayanti.png`,
  `23-Gurunanak Jayanti.png`,
  `24-Vasant Panchami.png`,
  `25-Pongal.png`,
  `26-Gudi Padvo.png`,
  `28-Good Friday.png`,
  `29-Rath Yatra.png`,
  `30-Mothers Day.png`,
  `31-Fathers Day.png`,
  `32-World Heart Day.png`,
  `33-Friendship Day.png`,
  `34-Daughters Day.png`,
  `35-Eid Mubarak.png`,
  `36-Yoga Day.png`,
  `37-Onam.png`,
  `38-Teahers Day.png`,
  `39-Guru Purnima.png`,
  `40-Earth Day.png`,
  `41-Children Day.png`,
  `42-Womens Day.png`,
  `43-Shivaji Maharaj Jayanti.png`,
  `44-New Year 2021.png`,
  `45-National Youth Day.png`,
  `46-Doctors Day.png`,
  `47-Army Day.png`,
  `48-Rishi Panchami.png`,
  `49- Sardar Patel Jayanti.png`,
  `50- Sharad Purnima.png`,
  `51- Karva Chowth.png`,
  `52- Labhpacham.png`,
  `53- Jalaram Jayanti.png`,
  `54- Dew Diwali.png`,
  `55- World Bicycle Day.png`,
  `56- World environment day.png`,
  `57- World ocean day.png`,
  `58- Anti Child Labour Day.png`,
  `59- World Blood Donor Day.png`,
  `60 - Music Day.png`,
  `61 - World Senior Sitizen Day.png`,
  `62 - World Photography Day.png`,
  `63 - Sports Day.png`,
  `64 - World Television Day.png`,
  `65 - World Aids Day.png`,
  `66 - Indian Navy Day.png`,
  `67 - Human Rights Day.png`,
  `68 - Kisan Diwas.png`,
  `69 - Gujarat & Mharastra Stphtana Day.png`,
  `70 - World Handicapped Day.png`,
  `71 - World Labour Day.png`,
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

const videos = [
  `http://itekindia.com/chats/videos/1.mp4`,
  `http://itekindia.com/chats/videos/2.mp4`,
  `http://itekindia.com/chats/videos/3.mp4`,
  `http://itekindia.com/chats/videos/4.mp4`,
  `http://itekindia.com/chats/videos/5.mp4`,
  `http://itekindia.com/chats/videos/6.mp4`,
  `http://itekindia.com/chats/videos/7.mp4`,
  `http://itekindia.com/chats/videos/8.mp4`,
  `http://itekindia.com/chats/videos/9.mp4`,
  `http://itekindia.com/chats/videos/10.mp4`,
  `http://itekindia.com/chats/videos/11.mp4`,
  `http://itekindia.com/chats/videos/12.mp4`,
  `http://itekindia.com/chats/videos/13.mp4`,
  `http://itekindia.com/chats/videos/14.mp4`,
  `http://itekindia.com/chats/videos/15.mp4`,
  `http://itekindia.com/chats/videos/16.mp4`,
  `http://itekindia.com/chats/videos/17.mp4`,
  `http://itekindia.com/chats/videos/18.mp4`,
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
