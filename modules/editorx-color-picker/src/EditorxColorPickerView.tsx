import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { EditorxColorPickerViewProps } from './EditorxColorPicker.types';

const NativeView: React.ComponentType<EditorxColorPickerViewProps> =
  requireNativeViewManager('EditorxColorPicker');

export default function EditorxColorPickerView(props: EditorxColorPickerViewProps) {
  return <NativeView {...props} />;
}
