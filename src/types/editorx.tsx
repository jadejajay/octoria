import type { ImageProps, TextProps, TextStyle, ViewStyle } from 'react-native';

import type { Element } from '@/core';

export const EDITORX_DATA = 'EDITORX_DATA';
export const SUB_CATEGORY = 'SUB_CATEGORY';
export type FrameType = {
  id: string;
  image: string;
  elements?: Element[];
  mainWidth?: number;
};
export type BackgroundType = {
  id: string;
  image: string;
};
export type FestivalType = {
  id: string;
  image: string;
  thumbnail?: string;
  categoryCode: number;
  subCategory: number;
  tags?: string;
};
export type SubCategoryType = {
  id: string;
  name: string;
  code: number;
  date: string;
};
export type ElementsType = {
  id: string;
  image: string;
};
export type ShapesType = {
  id: string;
  image: string;
};
export type StickerType = {
  id: string;
  image: string;
};
export type ImageListType = {
  id: string;
  image: string;
};
export type LogosType = {
  id: string;
  image: string;
};
export type PostMainCategoryType = {
  id: string;
  image: string;
  name: string;
  code: number;
  subCode: number;
};
export type PostVideoType = {
  id: string;
  video: string;
  thumbnail: string;
  categoryCode: number;
  subCategory: number;
  tags?: string;
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
    | 'Photos'
    | 'Videos'
    | 'Info'
    | 'Frames'
    | 'Text'
    | 'Image'
    | 'Logos'
    | 'Products'
    | 'Stickers'
    | 'Audio'
    | 'Shape'
    | 'Elements';
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
