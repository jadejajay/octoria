import type { ImageProps, TextProps, TextStyle, ViewStyle } from 'react-native';

export type FrameType = {
  id: string;
  image: string;
};
export type BackgroundType = {
  id: string;
  image: string;
};
export type resolutionParams = {
  width: number;
  height: number;
  style: any;
};
export type ResolutionKey =
  | 'portrait'
  | 'landscape'
  | 'square'
  | 'insta_portrait'
  | 'insta_landscape';
export type resolutionTypes = Record<ResolutionKey, resolutionParams>;
export type EditingFeaturesType = {
  name:
    | 'background'
    | 'info'
    | 'frames'
    | 'text'
    | 'image'
    | 'logos'
    | 'products'
    | 'stickers'
    | 'audio'
    | 'shape'
    | 'elements';
  icon: any;
};

export type TextComponentType = {
  name: string;
  component: 'text';
  properties: {
    text: string;
  } & TextProps['style'] &
    TextProps &
    TextStyle;
};
export type ImageComponentType = {
  name: string;
  component: 'image';
  properties: {
    image: string;
  } & ImageProps['style'] &
    ImageProps &
    ViewStyle;
};
