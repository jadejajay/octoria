import type { ImageProps, TextProps, TextStyle, ViewStyle } from 'react-native';

export const EDITORX_DATA = 'EDITORX_DATA';
export const SUB_CATEGORY = 'SUB_CATEGORY';
export type FrameType = {
  id?: string;
  image: string;
  thumbnail: string;
  elements?: Element[];
  mainWidth?: number;
};
export type BackgroundType = {
  id?: string;
  image?: string;
};
export type FestivalType = {
  id?: string;
  image: string;
  thumbnail: string;
  categoryCode: number;
  subCategory: number;
  tags: string;
};
export type SubCategoryType = {
  id?: string;
  name: string;
  code: number;
  date: string;
};
export type ElementsType = {
  id?: string;
  image: string;
  thumbnail: string;
};
export type ShapesType = {
  id?: string;
  image: string;
  thumbnail: string;
};
export type StickerType = {
  id?: string;
  image: string;
};
export type FestivalImageType = {
  id?: string;
  image: string;
};
export type ImageListType = {
  id?: string;
  image: string;
  thumbnail: string;
};
export type LogosType = {
  id?: string;
  image: string;
  thumbnail: string;
};
export type PostMainCategoryType = {
  id?: string;
  image: string;
  name: string;
  code: number;
  subCode: number;
};
export type PostVideoType = {
  id?: string;
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

export interface ElementProperties {
  image?: string;
  resizeMode?: 'center' | 'stretch' | 'contain' | 'cover' | undefined;
  text?: string;
  textProps?: {
    style: {
      [key: string]: any;
    };
    [key: string]: any;
  };
  viewProps?: {
    style: {
      [key: string]: any;
    };
    [key: string]: any;
  };
  offset: {
    x: number;
    y: number;
  };
  scale: number;
  width: number;
  height: number;
  rotation: number;
}

export interface Element {
  id: string;
  name: string;
  component: string;
  properties: ElementProperties;
}

export interface EditorData {
  bgType: 'photo' | 'video';
  backgroundPost?: string;
  color?: string;
  frame: string;
  elements: Element[];
}

export type BusinessDataType = {
  name: string;
  photo: string;
  email: string;
  phone: string;
  website: string;
  address: string;
};
export interface EditorXState {
  editorData: EditorData;
  businessData: BusinessDataType;
  elementsKey: string;
  selectedItem: number;
  categoryCode: number;
  activeWidget: string;
  dwnVideo: string;
  past: any[];
  present: any | null;
  future: any[];
  canUndo: boolean;
  canRedo: boolean;
  saveFrame: (id: string, width: number) => void;
  setEditor: (id: any) => void;
  rearrangeElements: (elements2: Element[]) => void;
  setData: (newData: any) => void;
  setCategoryCode: (code: any) => void;
  isSpecial: () => boolean;
  setBusiness: (data: BusinessDataType) => void;
  setElementsKey: (key: string) => void;
  setDataById: (
    property: Element[] | undefined,
    mainWidth: number,
    currentWidth: number
  ) => void;
  setTextStyle: (newData: any) => void;
  setViewStyle: (newData: any) => void;
  setText: (newData: any) => void;
  setImage: (newData: any) => void;
  setImageResizeMode: (newData: any) => void;
  setSelectedItem: (index: number) => void;
  setActiveWidget: (wdg: string) => void;
  setDwnVideo: (url: string) => void;
  setBackground: (url: string, type: 'photo' | 'video') => void;
  setFrame: (url: string) => void;
  getData: (id: number) => Element;
  deleteElement: (id: number) => void;
  addElement: (data: any) => void;
  copyElement: (id: number) => void;
  undo: () => void;
  redo: () => void;
}
export interface UserType {
  id: string;
  name: string;
  email: string;
  business: string;
  photoUrl: string;
  type: string;
  info: BusinessDataType;
}
