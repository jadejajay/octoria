class MyLogger {
  _log = (...args: any[]) => {
    console.log(`LOGGER :=>`, ...args);
  };

  _error = (...args: any[]) => {
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
