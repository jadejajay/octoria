import type { Subscription } from 'expo-modules-core';
import { EventEmitter, NativeModulesProxy } from 'expo-modules-core';

import {
  ChangeEventPayload,
  EditorxColorPickerViewProps,
} from './src/EditorxColorPicker.types';
// Import the native module. On web, it will be resolved to EditorxColorPicker.web.ts
// and on native platforms to EditorxColorPicker.ts
import EditorxColorPickerModule from './src/EditorxColorPickerModule';
import EditorxColorPickerView from './src/EditorxColorPickerView';

// Get the native constant value.
export const PI = EditorxColorPickerModule.PI;

export function hello(): string {
  return EditorxColorPickerModule.hello();
}

export async function setValueAsync(value: string) {
  return await EditorxColorPickerModule.setValueAsync(value);
}

const emitter = new EventEmitter(
  EditorxColorPickerModule ?? NativeModulesProxy.EditorxColorPicker
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void
): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export {
  ChangeEventPayload,
  EditorxColorPickerView,
  EditorxColorPickerViewProps,
};
