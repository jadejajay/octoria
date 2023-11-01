/* eslint-disable max-lines-per-function */
import firestore from '@react-native-firebase/firestore';
import { produce } from 'immer';
import { showMessage } from 'react-native-flash-message';
import { create } from 'zustand';

import { EDITORX_DATA } from '@/types';

import { getItem } from '../storage';
import { createSelectors, newValue } from '../utils';
const DATA: EditorData = {
  backgroundPost: '',
  bgType: 'photo',
  frame: '',
  elements: [
    {
      id: 'user_photo',
      name: 'user_photo',
      component: 'image',
      properties: {
        height: 200,
        width: 200,
        image: 'http://itekindia.com/chats/festival/40-Earth Day.png',
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
        height: 200,
        width: 200,
        text: 'userName',
        textProps: {
          style: {
            color: 'white',
            fontSize: 6,
            textAlign: 'center',
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
        height: 200,
        width: 200,
        text: 'usePhone',
        textProps: {
          style: {
            color: 'white',
            fontSize: 6,
            textAlign: 'center',
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
        height: 200,
        width: 200,
        text: 'userEmail',
        textProps: {
          style: {
            color: 'white',
            fontSize: 6,
            textAlign: 'center',
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
        height: 200,
        width: 200,
        text: 'userWEbsite',
        textProps: {
          style: {
            color: 'white',
            fontSize: 6,
            textAlign: 'center',
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
        height: 200,
        width: 200,
        text: 'user addresssss',
        textProps: {
          style: {
            color: 'white',
            fontSize: 6,
            textAlign: 'center',
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
  ],
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
  selectedItem: number;
  categoryCode: number;
  activeWidget: string;
  past: any[];
  present: any | null;
  future: any[];
  canUndo: boolean;
  canRedo: boolean;
  saveFrame: (id: string, width: number) => void;
  setEditor: (id: any) => void;
  setData: (newData: any) => void;
  setCategoryCode: (code: any) => void;
  isSpecial: () => boolean;
  setBusiness: (data: BusinessDataType) => void;
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
  setBackground: (url: string, type: 'photo' | 'video') => void;
  setFrame: (url: string) => void;
  getData: (id: number) => Element;
  deleteElement: (id: number) => void;
  addElement: (data: any) => void;
  copyElement: (id: number) => void;
  undo: () => void;
  redo: () => void;
}
// const id = auth().currentUser?.uid;
const _useEditorX = create<EditorXState>((set, get) => ({
  editorData: DATA,
  businessData: {
    name: '',
    photo: '',
    email: '',
    phone: '',
    instagram: '',
    facebook: '',
    website: '',
    address: '',
  },
  selectedItem: -1,
  categoryCode: 1,
  activeWidget: 'Photos',
  past: [],
  present: null,
  future: [],
  canUndo: false,
  canRedo: false,
  saveFrame: async (id, width) => {
    const elements = get().editorData.elements;
    try {
      if (id) {
        showMessage({
          type: 'success',
          message: 'Updating Data...',
          duration: 4000,
        });
        await firestore().collection('frames').doc(id).set(
          { elements: elements, mainWidth: width },
          {
            merge: true,
          }
        );
        showMessage({
          type: 'success',
          message: 'Updated Data.',
          duration: 4000,
        });
      }
    } catch (error) {
      showMessage({
        type: 'danger',
        message: 'Error Updating Data.',
        duration: 4000,
      });
    }
  },
  setEditor: async (id) => {
    const Data: string = await getItem(EDITORX_DATA);
    const newData: EditorData = JSON.parse(Data);
    if (newData?.bgType) {
      set(
        produce((state: EditorXState) => {
          state.editorData = newData;
          return state;
        })
      );
    } else {
      try {
        const userDoc = await firestore().collection('Users').doc(id).get();
        const data: EditorData = userDoc.data()?.editorData;
        if (data) {
          set(
            produce((state: EditorXState) => {
              state.editorData = data;
              return state;
            })
          );
        }
      } catch (error) {}
    }
  },
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
  setCategoryCode: (code) => {
    set(
      produce((state: EditorXState) => {
        state.categoryCode = code;
        return state;
      })
    );
  },
  setBusiness: (data) => {
    set(
      produce((state: EditorXState) => {
        state.businessData = data;
        return state;
      })
    );
  },
  isSpecial: () => {
    const id = get().editorData.elements[get().selectedItem].id.toString();
    if (id?.includes('user_')) {
      return true;
    }
    return false;
  },
  setDataById: (elements, mainWidth, currentWidth) => {
    if (elements) {
      const property2: Element[] = elements.map((element: Element, _) => {
        return {
          component: element.component,
          id: element.id,
          name: element.name,
          properties: {
            ...element.properties,
            offset: {
              x: newValue({
                oldValue: element.properties.offset.x,
                oldWidth: mainWidth,
                newWidth: currentWidth,
              }),
              y: newValue({
                oldValue: element.properties.offset.y,
                oldWidth: mainWidth,
                newWidth: currentWidth,
              }),
            },
            scale: newValue({
              oldValue: element.properties.scale,
              oldWidth: mainWidth,
              newWidth: currentWidth,
            }),
            width: newValue({
              oldValue: element.properties.width,
              oldWidth: mainWidth,
              newWidth: currentWidth,
            }),
            height: newValue({
              oldValue: element.properties.height,
              oldWidth: mainWidth,
              newWidth: currentWidth,
            }),
            rotation: newValue({
              oldValue: element.properties.rotation,
              oldWidth: mainWidth,
              newWidth: currentWidth,
            }),
          },
        };
      });
      set(
        produce((state: EditorXState) => {
          elements.map((element: Element, _) => {
            const id = element.id;
            const index = state.editorData.elements.findIndex(
              (item) => item.id === id
            );
            console.log(id, index, '<============from set produce');

            if (index > -1) {
              state.editorData.elements[index] = {
                ...state.editorData.elements[index],
                ...property2[index],
              };
            }
          });
          return state;
        })
      );
    }
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
  setViewStyle: (newData) => {
    set(
      produce((state: EditorXState) => {
        const index = newData.id;
        if (index > -1) {
          const viewProps =
            state.editorData.elements[index].properties?.viewProps;
          if (viewProps !== undefined) {
            viewProps.style = {
              ...viewProps.style,
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
          state.editorData.elements[index].properties.image = newData.image;
        }
        return state;
      })
    );
  },
  setImageResizeMode: (newData) => {
    set(
      produce((state: EditorXState) => {
        const index = newData.id;
        if (index > -1) {
          state.editorData.elements[index].properties.resizeMode =
            newData.resizeMode;
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
