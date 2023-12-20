import { registerRootComponent } from 'expo';
import { enableFreeze, enableScreens } from 'react-native-screens';

import { logger } from '@/core';

import App from './src';
enableScreens();
enableFreeze(true);
logger.log('App entry Point', Date.now());
registerRootComponent(App);
