// npm install react-router-dom localforage match-sorter sort-by
import React from 'react';
import { WebView } from 'react-native-webview';

// ...
export const ARView = () => {
  return (
    <WebView
      source={{ uri: 'http://itekindia.com/octoria/xrservice/' }}
      style={{ flex: 1 }}
    />
  );
};
// C:\Users\aa\Desktop\meteor\octoria-admin\threeserver
