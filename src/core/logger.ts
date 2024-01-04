import { setLog } from './mainscreen';

class MyLogger {
  _log = (...args: any[]) => {
    // combine all args to a string
    const str = args.reduce((acc, curr) => {
      return acc + ' ' + curr;
    }, '');
    setLog(str);
    console.log(`LOGGER :=>`, ...args);
  };

  _error = (...args: any[]) => {
    // combine all args to a string
    const str = args.reduce((acc, curr) => {
      return acc + ' ' + curr;
    }, '');
    setLog(str);
    console.error(`LOGGER :=>`, ...args);
  };
  log = (...args: any[]) => {
    if (__DEV__) {
      this._log(...args);
    }
  };
  error = (...args: any[]) => {
    if (__DEV__) {
      this._error(...args);
    }
  };
}
export const logger = new MyLogger();
