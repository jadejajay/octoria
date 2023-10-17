/* eslint-disable max-lines-per-function */
import { produce } from 'immer';
import { create } from 'zustand';

import { createSelectors } from '../utils';
const DATA = {
  backgroundImage: 'http://itekindia.com/chats/bgimages/imageedit.png',
  frame: 'http://itekindia.com/chats/frames/format20.png',
  elements: [
    {
      id: '1',
      name: 'elements',
      component: 'image',
      properties: {
        image:
          'https://images.wallpapersden.com/image/download/cute-baby-groot-in-suit-4k_bGZpaG6UmZqaraWkpJRmbmdlrWZlbWU.jpg',
        resizeMode: 'contain',
        offset: {
          x: -137.32856130599976,
          y: -139.38782453536987,
        },
        start: {
          x: -137.32856130599976,
          y: -139.38782453536987,
        },
        scale: 0.1922575519401993,
        width: 367.44515429135464,
        height: 346.48610608147186,
        rotation: 0.018163833782218863,
      },
    },
    {
      id: '3',
      name: 'elements3',
      component: 'text',
      properties: {
        text: 'this is demo text',
        textProps: {
          style: {
            color: 'green',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10,
          },
        },
        offset: {
          x: -137.32856130599976,
          y: -139.38782453536987,
        },
        start: {
          x: -137.32856130599976,
          y: -139.38782453536987,
        },
        scale: 1,
        width: 367.44515429135464,
        height: 346.48610608147186,
        rotation: 0.018163833782218863,
      },
    },
    {
      id: '2',
      name: 'elements2',
      component: 'image',
      properties: {
        image:
          'https://img.freepik.com/free-photo/autumn-leaf-falling-revealing-intricate-leaf-vein-generated-by-ai_188544-9869.jpg',
        resizeMode: 'stretch',
        text: 'Hello World!',
        textProps: {
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10,
          },
        },
        offset: {
          x: -30.491697788238525,
          y: -17.398582458496094,
        },
        start: {
          x: -30.491697788238525,
          y: -17.398582458496094,
        },
        scale: 0.3842920031518914,
        width: 570.7199909687042,
        height: 593.7907910346985,
        rotation: 0,
      },
    },
  ],
};

interface ElementProperties {
  image?: string;
  resizeMode?: string;
  text?: string;
  textProps?: {
    style: any;
  };
  offset: {
    x: number;
    y: number;
  };
  start: {
    x: number;
    y: number;
  };
  scale: number;
  width: number;
  height: number;
  rotation: number;
}

interface Element {
  id: string;
  name: string;
  component: string;
  properties: ElementProperties;
}

interface EditorData {
  backgroundImage: string;
  frame: string;
  elements: Element[];
}

interface EditorXState {
  editorData: EditorData;
  selectedItem: number;
  activeWidget: string;
  past: any[];
  present: any | null;
  future: any[];
  canUndo: boolean;
  canRedo: boolean;
  setData: (newData: any) => void;
  setSelectedItem: (index: number) => void;
  setActiveWidget: (wdg: string) => void;
  setBackground: (url: string) => void;
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
  activeWidget: 'background',
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
  setBackground: (url) => {
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
        state.editorData.backgroundImage = url;
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
        const num = state.editorData.elements.length + 1;
        const element = {
          id: num,
          name: `elements${num}`,
          component: 'image',
          properties: {
            image: '',
            resizeMode: 'cover',
            text: '',
            textProps: {
              style: {
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
              },
            },
            offset: {
              x: 0,
              y: 0,
            },
            start: {
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
