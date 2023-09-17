import { useMMKVBoolean } from 'react-native-mmkv';

import { storage } from '../storage';

const IS_SIGN_UP = 'IS_SIGN_UP';

export const useIsSignUp = () => {
  const [isSignUp, setIsSignUp] = useMMKVBoolean(IS_SIGN_UP, storage);
  if (isSignUp === undefined) {
    return [false, setIsSignUp] as const;
  }
  return [isSignUp, setIsSignUp] as const;
};
