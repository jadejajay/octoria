import { useMMKVBoolean } from 'react-native-mmkv';

import { ASSISTANCE } from '@/types';

import { storage } from '../storage';

export const useAssistance = () => {
  const [Assistance, setAssistance] = useMMKVBoolean(ASSISTANCE, storage);
  if (Assistance === undefined) {
    return [true, setAssistance] as const;
  }
  return [Assistance, setAssistance] as const;
};
