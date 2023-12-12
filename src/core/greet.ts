// Example usage

import { translate } from './i18n';

export function getGreetingByTimezone() {
  var hour = new Date().getHours(); //Current Hours
  let greeting = '';

  if (hour >= 5 && hour < 12) {
    greeting = translate('assistance.morning');
  } else if (hour >= 12 && hour < 18) {
    greeting = translate('assistance.afternoon');
  } else if ((hour >= 18 && hour < 23) || (hour >= 0 && hour < 5)) {
    greeting = translate('assistance.evening');
  } else {
    greeting = '';
  }

  return greeting;
}
