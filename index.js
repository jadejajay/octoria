import { registerRootComponent } from 'expo';
import { enableFreeze, enableScreens } from 'react-native-screens';

import App from './src';
enableScreens();
enableFreeze(true);
console.log('App entry Point', Date.now());
registerRootComponent(App);
