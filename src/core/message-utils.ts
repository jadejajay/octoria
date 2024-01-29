import { ToastAndroid } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { IS_ANDROID } from '@/ui/theme';

import { translate, type TxKeyPath } from './i18n';

export const showErrorMessage = (message: TxKeyPath) => {
  if (IS_ANDROID) {
    ToastAndroid.show(translate(message), ToastAndroid.SHORT);
  }
  showMessage({
    message: translate(message),
    type: 'danger',
    icon: 'danger',
    duration: 4000,
  });
};
export const showSuccessMessage = (message: TxKeyPath) => {
  if (IS_ANDROID) {
    ToastAndroid.show(translate(message), ToastAndroid.SHORT);
  }
  showMessage({
    message: translate(message),
    type: 'success',
    icon: 'success',
    duration: 4000,
  });
};
