import ar from '@/translations/ar.json';
import en from '@/translations/en.json';
import gu from '@/translations/gu.json';
import hi from '@/translations/hi.json';
import ta from '@/translations/ta.json';
import zh from '@/translations/zh.json';

export const resources = {
  en: {
    translation: en,
  },
  gu: {
    translation: gu,
  },
  hi: {
    translation: hi,
  },
  zh: {
    translation: zh,
  },
  ta: {
    translation: ta,
  },
  ar: {
    translation: ar,
  },
};

export type Language = keyof typeof resources;
