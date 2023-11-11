/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: 'jadeja5645',
  slug: 'octoria',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  scheme: 'octoria',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#FFFFFF',
  },
  updates: {
    url: 'https://u.expo.dev/c7642e3d-4e71-4000-83da-ef31f330ec8d',
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },

  android: {
    googleServicesFile: 'google-services.json',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: Env.PACKAGE,
    intentFilters: [
      {
        action: 'SEND',
        autoVerify: true,
        data: [
          {
            mimeType: 'image/*',
          },
          {
            mimeType: 'video/*',
          },
        ],
        category: ['DEFAULT'],
      },
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            mimeType: 'image/*',
          },
          {
            mimeType: 'video/*',
          },
        ],
        category: ['DEFAULT'],
      },
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'http',
            host: '*',
            mimeType: 'image/*',
          },
          {
            scheme: 'https',
            host: '*',
            mimeType: 'video/*',
          },
        ],
        category: ['DEFAULT', 'BROWSABLE'],
      },
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'https',
            host: 'www.octoriahardware.com',
          },
        ],
        category: ['DEFAULT', 'BROWSABLE'],
      },
      {
        action: 'SEND',
        autoVerify: true,
        data: [
          {
            scheme: 'https',
            host: 'www.octoriahardware.com',
          },
        ],
        category: ['DEFAULT', 'BROWSABLE'],
      },
    ],
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    [
      '@bacons/link-assets',
      [
        './assets/fonts/VarelaRound-Regular.ttf',
        './assets/fonts/Kalam-Regular.ttf',
        './assets/fonts/Aquire.otf',
        './assets/fonts/Gobold-Regular.otf',
        './assets/fonts/MonumentExtended-Regular.otf',
        './assets/fonts/Poppins-Regular.ttf',
        './assets/fonts/Inter.ttf',
      ],
    ],
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    'expo-localization',
    [
      'expo-build-properties',
      {
        android: {
          kotlinVersion: '1.7.22', // this is for softinput package
          minSdkVersion: 24,
          packagingOptions: {
            pickFirst: [
              'lib/x86_64/libjsc.so',
              'lib/arm64-v8a/libjsc.so',
              'lib/x86/libc++_shared.so',
              'lib/arm64-v8a/libc++_shared.so',
              'lib/x86_64/libc++_shared.so',
              'lib/armeabi-v7a/libc++_shared.so',
            ],
          },
          usesCleartextTraffic: true,
        },
      },
    ],
    [
      'expo-camera',
      {
        cameraPermission: 'Allow OCTORIA to access your camera.',
      },
    ],
    [
      'app-icon-badge',
      {
        enabled: true,
        badges: [
          {
            text: Env.APP_ENV,
            type: 'banner',
            color: 'white',
          },
          {
            text: Env.VERSION.toString(),
            type: 'ribbon',
            color: 'white',
          },
        ],
      },
    ],
  ],
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
