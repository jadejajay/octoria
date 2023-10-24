/* eslint-disable max-lines-per-function */
import { produce } from 'immer';
import { create } from 'zustand';

import { createSelectors } from '../utils';
const DATA: EditorData = {
  backgroundPost: 'http://itekindia.com/chats/bgimages/imageedit.png',
  bgType: 'photo',
  frame: 'http://itekindia.com/chats/frames/format20.png',
  elements: [],
};

export interface ElementProperties {
  image?: string;
  resizeMode?: string;
  text?: string;
  textProps?: {
    style: {
      [key: string]: any;
    };
    [key: string]: any;
  };
  viewProps?: {
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

export interface EditorXState {
  editorData: EditorData;
  selectedItem: number;
  activeWidget: string;
  past: any[];
  present: any | null;
  future: any[];
  canUndo: boolean;
  canRedo: boolean;
  setData: (newData: any) => void;
  setTextStyle: (newData: any) => void;
  setText: (newData: any) => void;
  setImage: (newData: any) => void;
  setSelectedItem: (index: number) => void;
  setActiveWidget: (wdg: string) => void;
  setBackground: (url: string, type: 'photo' | 'video') => void;
  setFrame: (url: string) => void;
  getData: (id: number) => Element;
  deleteElement: (id: number) => void;
  addElement: (data: any) => void;
  copyElement: (id: number) => void;
  undo: () => void;
  redo: () => void;
}

const _useEditorX = create<EditorXState>((set, get) => ({
  editorData: DATA,
  selectedItem: -1,
  activeWidget: 'Photos',
  past: [],
  present: null,
  future: [],
  canUndo: false,
  canRedo: false,
  setData: (newData) => {
    set(
      produce((state: EditorXState) => {
        const index = newData.id;
        if (index > -1) {
          // state.past = [
          //   ...state.past,
          //   {
          //     ...state.editorData,
          //   },
          // ];
          // state.present = {
          //   ...state.editorData,
          // };
          // state.future = [];
          // state.canUndo = true;
          // state.canRedo = false;
          state.editorData.elements[index].properties = {
            ...state.editorData.elements[index].properties,
            ...newData.props,
          };
        }

        return state;
      })
    );
  },
  setTextStyle: (newData) => {
    set(
      produce((state: EditorXState) => {
        const index = newData.id;
        if (index > -1) {
          const textProps =
            state.editorData.elements[index].properties?.textProps;
          if (textProps !== undefined) {
            textProps.style = {
              ...textProps.style,
              ...newData.props,
            };
          }
        }
        return state;
      })
    );
  },
  setText: (newData) => {
    set(
      produce((state: EditorXState) => {
        const index = newData.id;
        if (index > -1) {
          state.editorData.elements[index].properties.text = newData.text;
        }
        return state;
      })
    );
  },
  setImage: (newData) => {
    set(
      produce((state: EditorXState) => {
        const index = newData.id;
        if (index > -1) {
          state.editorData.elements[index].properties.image = newData.text;
        }
        return state;
      })
    );
  },
  setSelectedItem: (index) => {
    set(
      produce((state: EditorXState) => {
        state.selectedItem = index;
        return state;
      })
    );
  },
  setActiveWidget: (wdg) => {
    set(
      produce((state: EditorXState) => {
        state.activeWidget = wdg;
        return state;
      })
    );
  },
  setBackground: (url, type) => {
    set(
      produce((state: EditorXState) => {
        // state.past = [
        //   ...state.past,
        //   {
        //     ...state.editorData,
        //   },
        // ];
        // state.present = {
        //   ...state.editorData,
        // };
        // state.future = [];
        // state.canUndo = true;
        // state.canRedo = false;
        state.editorData.backgroundPost = url;
        state.editorData.bgType = type;
        return state;
      })
    );
  },
  setFrame: (url) => {
    set(
      produce((state: EditorXState) => {
        // state.past = [
        //   ...state.past,
        //   {
        //     ...state.editorData,
        //   },
        // ];
        // state.present = {
        //   ...state.editorData,
        // };
        // state.future = [];
        // state.canUndo = true;
        // state.canRedo = false;
        state.editorData.frame = url;
        return state;
      })
    );
  },
  getData: (id) => {
    return get().editorData.elements[id];
  },
  deleteElement: (id) => {
    set(
      produce((state: EditorXState) => {
        // state.past = [
        //   ...state.past,
        //   {
        //     ...state.editorData,
        //   },
        // ];
        // state.present = {
        //   ...state.editorData,
        // };
        // state.future = [];
        // state.canUndo = true;
        // state.canRedo = false;
        state.editorData.elements[id].properties.height = 0;
        state.editorData.elements[id].properties.width = 0;
        return state;
      })
    );
  },
  addElement: (data) => {
    set(
      produce((state: EditorXState) => {
        const num = state.editorData.elements.length + 1;
        // state.past = [
        //   ...state.past,
        //   {
        //     ...state.editorData,
        //   },
        // ];
        // state.present = {
        //   ...state.editorData,
        // };
        // state.future = [];
        // state.canUndo = true;
        // state.canRedo = false;
        const element = {
          id: num,
          name: `elements${num}`,
          component: 'image',
          properties: {
            image: '',
            resizeMode: 'cover',
            text: '',
            viewProps: {
              style: {
                overflow: 'hidden',
              },
            },
            textProps: {
              style: {
                textAlign: 'center',
              },
            },
            offset: {
              x: 0,
              y: 0,
            },
            scale: 1,
            width: 200,
            height: 200,
            rotation: 0,
          },
        };
        state.editorData.elements.push({ ...element, ...data });
        state.selectedItem = num;
        return state;
      })
    );
  },
  copyElement: (id) => {
    set(
      produce((state: EditorXState) => {
        const elementToCopy = state.editorData.elements[id];
        const property = elementToCopy.properties;
        const newProp = {
          ...elementToCopy.properties,
          offset: {
            x: property.offset.x + 20,
            y: property.offset.y + 20,
          },
        };

        const num: any = state.editorData.elements.length + 1;
        const newElement = {
          ...elementToCopy,
          id: num,
          properties: newProp,
        };

        state.editorData.elements.push(newElement);
        return state;
      })
    );
  },
  undo: () => {
    set(
      produce((state) => {
        if (state.past.length === 0) return state;
        if (state.past.length > 0) {
          const lastPast = state.past[state.past.length - 1];
          state.past.pop();
          state.present = lastPast;
          state.future.push(state.editorData);
          state.canUndo = state.past.length > 1;
          state.canRedo = true;
        }
        return state;
      })
    );
  },
  redo: () => {
    set(
      produce((state) => {
        if (state.future.length === 0) return state;
        if (state.future.length > 0) {
          const lastFuture = state.future[state.future.length - 1];
          state.future.pop();
          state.present = lastFuture;
          state.past.push(state.editorData);
          state.canUndo = true;
          state.canRedo = state.future.length > 1;
        }
        return state;
      })
    );
  },
}));

export const useEditorX = createSelectors(_useEditorX);
