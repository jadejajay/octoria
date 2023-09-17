/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import { Image } from 'react-native';
// TODO: should be updated to simple images
export const Cover = () => (
  <Image
    source={require('../../../assets/bg-signup.png')}
    style={{ width: '100%', height: '100%' }}
  />
);
