import firestore from '@react-native-firebase/firestore';

import { F_SUB_CATEGORY, type SubCategoryType } from '@/types';

import { logger } from '../logger';

export const subCategoryCode: SubCategoryType[] = [
  {
    name: 'Utrayan',
    code: 1,
    date: '14/01/2024',
  },
  {
    name: 'Republic Day',
    code: 2,
    date: '26/01/2024',
  },
  {
    name: 'Valentine Day',
    code: 3,
    date: '14/02/2024',
  },
  {
    name: 'Holi', //8 march
    code: 4,
    date: '08/03/2024',
  },
  {
    name: 'Dhuleti', //9 march
    code: 5,
    date: '09/03/2024',
  },
  {
    name: 'Mahashivratri', //18 feb
    code: 6,
    date: '18/02/2024',
  },
  {
    name: 'Raksha Bandhan', //30 aug
    code: 7,
    date: '30/08/2024',
  },
  {
    name: 'Independent Day',
    code: 8,
    date: '15/08/2024',
  },
  {
    name: 'Janmashatmi', //6 sept
    code: 9,
    date: '06/09/2024',
  },
  {
    name: 'Ganesh Chaturthi', //19 sept
    code: 10,
    date: '19/09/2024',
  },
  {
    name: 'Navratri', //15 oct
    code: 11,
    date: '15/10/2024',
  },
  {
    name: 'Ramnavmi', //17 april
    code: 12,
    date: '17/04/2024',
  },
  {
    name: 'Dusshera', //24 oct
    code: 13,
    date: '24/10/2024',
  },
  {
    name: 'Dhan Teras', //10 nov
    code: 14,
    date: '10/11/2024',
  },
  {
    name: 'Diwali', //12 nov
    code: 15,
    date: '12/11/2024',
  },
  {
    name: 'New Year', //1 jan
    code: 16,
    date: '01/01/2024',
  },
  {
    name: 'Bhai Duj', //15 nov
    code: 17,
    date: '15/11/2024',
  },
  {
    name: 'Xmas', //25 dec
    code: 18,
    date: '25/12/2024',
  },
  {
    name: 'Ghandhi Jayanti', //2 oct
    code: 19,
    date: '02/10/2024',
  },
  {
    name: 'Hanuman Jayanti', //6 april
    code: 20,
    date: '06/04/2024',
  },
  {
    name: 'Vivekanand Jayanti', //12 jan
    code: 21,
    date: '12/01/2024',
  },
  {
    name: 'Mahavir Jayanti', //4 april
    code: 22,
    date: '04/04/2024',
  },
  {
    name: 'Gurunanak Jayanti', //27 nov
    code: 23,
    date: '27/11/2024',
  },
  {
    name: 'Vasant Panchami', //26 jan
    code: 24,
    date: '26/01/2024',
  },
  {
    name: 'Pongal', //15 jan
    code: 25,
    date: '15/01/2024',
  },
  {
    name: 'Gudi Padvo', //22 march
    code: 26,
    date: '22/03/2024',
  },
  {
    name: 'Engineer Day', //15 sept
    code: 27,
    date: '15/09/2024',
  },
  {
    name: 'Good Friday', //15 april
    code: 28,
    date: '15/04/2024',
  },
  {
    name: 'Rath Yatra', //20 june
    code: 29,
    date: '20/06/2024',
  },
  {
    name: 'Mothers Day', //9 may
    code: 30,
    date: '09/05/2024',
  },
  {
    name: 'Fathers Day', //20 june
    code: 31,
    date: '20/06/2024',
  },
  {
    name: 'World Heart Day', //29 sept
    code: 32,
    date: '29/09/2024',
  },
  {
    name: 'Friendship Day', //1 aug
    code: 33,
    date: '01/08/2024',
  },
  {
    name: 'Daughters Day', //26 sept
    code: 34,
    date: '26/09/2024',
  },
  {
    name: 'Eid Mubarak', //21 april
    code: 35,
    date: '21/04/2024',
  },
  {
    name: 'Yoga Day', //21 june
    code: 36,
    date: '21/06/2024',
  },
  {
    name: 'Onam', //29 aug
    code: 37,
    date: '29/08/2024',
  },
  {
    name: 'Teahers Day', //5 sept
    code: 38,
    date: '05/09/2024',
  },
  {
    name: 'Guru Purnima', //3 july
    code: 39,
    date: '03/07/2024',
  },
  {
    name: 'Earth Day', //22 april
    code: 40,
    date: '22/04/2024',
  },
  {
    name: 'Children Day', //14 nov
    code: 41,
    date: '14/11/2024',
  },
  {
    name: 'Womens Day', //8 march
    code: 42,
    date: '08/03/2024',
  },
  {
    name: 'Shivaji Maharaj Jayanti', //19 feb
    code: 43,
    date: '19/02/2024',
  },
  {
    name: 'New Year 2024', //1 jan
    code: 44,
    date: '01/01/2024',
  },
  {
    name: 'National Youth Day', //12 jan
    code: 45,
    date: '12/01/2024',
  },
  {
    name: 'Doctors Day', //1 july
    code: 46,
    date: '01/07/2024',
  },
  {
    name: 'Army Day', //15 jan
    code: 47,
    date: '15/01/2024',
  },
  {
    name: 'Rishi Panchami', //10 sept
    code: 48,
    date: '10/09/2024',
  },
  {
    name: 'Sardar Patel Jayanti', //31 oct
    code: 49,
    date: '31/10/2024',
  },
  {
    name: 'Sharad Purnima', //28 oct
    code: 50,
    date: '28/10/2024',
  },
  {
    name: 'Karva Chowth', //1 nov
    code: 51,
    date: '01/11/2024',
  },
  {
    name: 'Labhpacham', //18 nov
    code: 52,
    date: '18/11/2024',
  },
  {
    name: 'Jalaram Jayanti', //19 nov
    code: 53,
    date: '19/11/2024',
  },
  {
    name: 'Dew Diwali', //26 nov
    code: 54,
    date: '26/11/2024',
  },
  {
    name: 'World Bicycle Day', //3 june
    code: 55,
    date: '03/06/2024',
  },
  {
    name: 'World environment day', //5 june
    code: 56,
    date: '05/06/2024',
  },
  {
    name: 'World ocean day', //8 june
    code: 57,
    date: '08/06/2024',
  },
  {
    name: 'Anti Child Labour Day', //12 june
    code: 58,
    date: '12/06/2024',
  },
  {
    name: 'World Blood Donor Day', //14 june
    code: 59,
    date: '14/06/2024',
  },
  {
    name: 'Music Day', //21 june
    code: 60,
    date: '21/06/2024',
  },
  {
    name: 'World Senior Citizen Day', //21 june
    code: 61,
    date: '21/06/2024',
  },
  {
    name: 'World Photography Day', //19 aug
    code: 62,
    date: '19/08/2024',
  },
  {
    name: 'Sports Day', //29 aug
    code: 63,
    date: '29/08/2024',
  },
  {
    name: 'World Television Day', //21 nov
    code: 64,
    date: '21/11/2024',
  },
  {
    name: 'World Aids Day', //1 dec
    code: 65,
    date: '01/12/2024',
  },
  {
    name: 'Indian Navy Day', //4 dec
    code: 66,
    date: '04/12/2024',
  },
  {
    name: 'Human Rights Day', //10 dec
    code: 67,
    date: '10/12/2024',
  },
  {
    name: 'Kisan Diwas', //23 dec
    code: 68,
    date: '23/12/2024',
  },
  {
    name: 'Gujarat & Mharastra Stphtana Day', //1 may
    code: 69,
    date: '01/05/2024',
  },
  {
    name: 'World Handicapped Day', //3 dec
    code: 70,
    date: '03/12/2024',
  },
  {
    name: 'World Labour Day', //1 may
    code: 71,
    date: '01/05/2024',
  },
  {
    name: 'AirForce Day', //8 oct
    code: 72,
    date: '08/10/2024',
  },
  {
    name: 'Birth Day', //1 may
    code: 73,
    date: 'every',
  },
];
export const addSubCategory = async () => {
  const batch = firestore().batch();
  for (let i = 0; i < subCategoryCode.length; i++) {
    const ref = firestore().collection(F_SUB_CATEGORY).doc();
    batch.set(ref, subCategoryCode[i]);
    logger.log(`Added document ${i}`);
  }
  batch.commit();
  logger.log(`All Sub Category Added Successfully.`);
};
