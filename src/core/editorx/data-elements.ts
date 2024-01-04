import type { EditorData, Element } from '@/types';

const elements: Element[] = [
  {
    id: 'user_photo',
    name: 'user_photo',
    component: 'image',
    properties: {
      height: 0,
      width: 0,
      image: '',
      viewProps: {
        style: {
          overflow: 'hidden',
          borderRadius: 0,
        },
      },
      resizeMode: 'stretch',
      offset: {
        x: 0,
        y: 0,
      },
      scale: 1,
      rotation: 0,
    },
  },
  {
    id: 'user_name',
    name: 'user_name',
    component: 'text',
    properties: {
      height: 0,
      width: 0,
      text: 'octoria',
      textProps: {
        style: {
          color: 'white',
          fontSize: 20,
        },
      },
      offset: {
        x: 0,
        y: 0,
      },
      scale: 1,
      rotation: 0,
    },
  },
  {
    id: 'user_phone',
    name: 'user_phone',
    component: 'text',
    properties: {
      height: 0,
      width: 0,
      text: '+91 1234567890',
      textProps: {
        style: {
          color: 'white',
          fontSize: 20,
        },
      },
      offset: {
        x: 0,
        y: 0,
      },
      scale: 1,
      rotation: 0,
    },
  },
  {
    id: 'user_email',
    name: 'user_email',
    component: 'text',
    properties: {
      height: 0,
      width: 0,
      text: 'abcd@gmail.com',
      textProps: {
        style: {
          color: 'white',
          fontSize: 20,
        },
      },
      offset: {
        x: 0,
        y: 0,
      },
      scale: 1,
      rotation: 0,
    },
  },
  {
    id: 'user_website',
    name: 'user_website',
    component: 'text',
    properties: {
      height: 0,
      width: 0,
      text: 'www.abc.com',
      textProps: {
        style: {
          color: 'white',
          fontSize: 20,
        },
      },
      offset: {
        x: 0,
        y: 0,
      },
      scale: 1,
      rotation: 0,
    },
  },
  {
    id: 'user_address',
    name: 'user_address',
    component: 'text',
    properties: {
      height: 0,
      width: 0,
      text: 'Ground Floor, 123, XYZ city, India',
      textProps: {
        style: {
          color: 'white',
          fontSize: 20,
        },
      },
      offset: {
        x: 0,
        y: 0,
      },
      scale: 1,
      rotation: 0,
    },
  },
];

export const DATA: EditorData = {
  backgroundPost: '',
  bgType: 'photo',
  frame: '',
  elements: elements,
};
