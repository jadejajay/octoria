import * as React from 'react';

import { EditorxColorPickerViewProps } from './EditorxColorPicker.types';

export default function EditorxColorPickerView(props: EditorxColorPickerViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
