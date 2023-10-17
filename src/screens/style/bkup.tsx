/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { useObjectState } from '@uidotdev/usehooks';
import { useState } from 'react';
import { Svg } from 'react-native-svg';

import { Button, Text, View } from '@/ui';

import { MagicImage } from './animation/image-comp';
import { ColorPickerModal } from './color-picker-view';
import { EditTextModal } from './edit-text-modal';
import { SvgText } from './svg/text';

const initialState = {
  fill: 'blue',
  fontSize: '20',
  fontWeight: 'bold',
  textAnchor: 'middle',
};

export const ImageEditor456 = () => {
  const [stats, setStats] = useObjectState<any>(initialState);
  const [Color, setColor] = useState('#000000');
  const [text, setText] = useState('welcome to octoria');
  const [colorPickerModal, setColorPickerModal] = useState(false);
  const [editTextModal, setEditTextModal] = useState(false);

  return (
    <View className="flex-1 items-center justify-center">
      <ColorPickerModal
        setColor={setColor}
        Color={Color}
        SetModalVisible={setColorPickerModal}
        isModalVisible={colorPickerModal}
        onPress={(color) => console.log(color)}
      />
      <EditTextModal
        SetModalVisible={setEditTextModal}
        isModalVisible={editTextModal}
        setText={setText}
        text={text}
        onPress={(text1) => console.log(text1)}
      />
      <Text
        variant="sm"
        className="text-center"
        style={{ color: Color, fontFamily: 'Poppins-Regular' }}
        onPress={() => setColorPickerModal(true)}
      >
        open color picker
      </Text>
      <MagicImage />
      <Text
        variant="sm"
        className="text-center"
        style={{ color: Color, fontFamily: 'MonumentExtended-Regular' }}
        onPress={() => setEditTextModal(true)}
      >
        open Text modal
      </Text>
      <Svg width={200} height={200} style={{ backgroundColor: 'red' }}>
        <SvgText text={'hello world'} x={'100'} y={'20'} props={stats} />
      </Svg>
      <View className="flex-row">
        <Button
          label="change font"
          onPress={() => {
            setStats((s: any) => ({
              ...s,
              fontFamily: 'Poppins-Regular',
            }));
            console.log(JSON.stringify(stats, null, 2));
          }}
        />
      </View>
    </View>
  );
};
