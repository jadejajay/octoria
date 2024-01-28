import { showMessage } from 'react-native-flash-message';

import { translate, type TxKeyPath } from './i18n';

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
