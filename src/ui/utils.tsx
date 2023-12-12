import { showMessage } from 'react-native-flash-message';

import type { TxKeyPath } from '@/core';
import { translate } from '@/core';

export const showErrorMessage = (message: TxKeyPath) => {
  showMessage({
    message: translate(message),
    type: 'danger',
    icon: 'danger',
    duration: 4000,
  });
};
export const showSuccessMessage = (message: TxKeyPath) => {
  showMessage({
    message: translate(message),
    type: 'success',
    icon: 'success',
    duration: 4000,
  });
};
