import firestore from '@react-native-firebase/firestore';

import { F_STICKERS, type StickerType } from '@/types';

import { logger } from '../logger';

export const stickers: StickerType[] = [
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_95.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_174.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_167.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_105.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_117.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_136.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_101.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_181.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_110.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_185.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_114.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_189.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_46.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_177.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_21.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_121.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_72.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_2.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_194.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_24.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_158.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_10.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_62.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_137.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_52.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_182.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_195.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_188.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_78.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_163.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_141.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_54.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_186.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_63.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_49.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_37.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_30.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_196.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_134.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_20.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_68.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_70.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_130.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_0.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_15.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_127.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_147.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_109.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_85.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_129.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_1.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_92.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_144.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_168.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_124.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_17.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_53.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_94.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_39.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_41.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_133.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_128.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_71.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_75.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_179.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_77.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_176.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_38.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_166.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_146.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_88.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_190.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_74.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_155.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_135.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_125.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_6.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_139.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_13.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_106.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_93.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_180.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_83.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_131.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_100.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_162.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_173.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_116.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_14.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_58.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_12.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_76.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_73.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_32.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_103.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_99.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_80.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_178.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_96.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_48.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_191.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_143.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_120.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_153.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_81.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_119.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_64.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_36.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_187.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_123.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_16.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_97.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_86.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_28.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_111.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_43.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_25.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_22.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_60.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_175.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_69.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_161.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_3.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_108.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_23.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_82.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_192.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_50.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_8.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_118.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_4.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_65.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_145.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_154.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_61.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_90.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_45.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_172.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_44.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_151.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_197.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_199.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_5.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_148.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_160.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_115.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_126.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_183.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_33.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_56.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_149.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_164.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_169.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_132.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_67.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_18.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_11.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_9.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_150.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_89.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_198.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_55.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_19.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_91.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_57.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_104.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_27.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_159.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_170.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_122.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_152.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_34.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_157.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_138.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_142.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_26.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_112.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_42.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_79.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_47.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_31.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_7.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_87.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_35.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_84.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_40.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_29.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_51.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_102.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_59.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_171.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_184.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_165.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_98.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_107.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_113.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_193.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_66.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_140.png',
  },
  {
    image: 'https://ibaisindia.co.in/chats/emojis/0_156.png',
  },
];
export const addStickers = async () => {
  const batch = firestore().batch();
  for (let i = 0; i < stickers.length; i++) {
    const ref = firestore().collection(F_STICKERS).doc();
    batch.set(ref, stickers[i]);
    logger.log(`Added document ${i}`);
  }
  batch.commit();
  logger.log(`All Stickers Added Successfully.`);
};
