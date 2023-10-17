/* eslint-disable react/react-in-jsx-scope */
import type { SetStateAction } from 'react';
import { Modal, StyleSheet } from 'react-native';

import { invertColor } from '@/core';
import { Button, View } from '@/ui';

import ColorPicker from './colorpicker';

interface Props {
  Color?: string;
  setColor: (color: SetStateAction<string>) => void;
  isModalVisible: boolean;
  SetModalVisible: (visible: boolean) => void;
  onPress?: (color: string) => void;
}
export const ColorPickerModal = ({
  Color = '#000000',
  setColor,
  isModalVisible,
  SetModalVisible,
  onPress = () => {},
}: Props) => {
  const handlePress = () => {
    SetModalVisible(false);
    onPress(Color);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => SetModalVisible(false)}
    >
      <View className="flex-1 items-center justify-center">
        <View
          className="h-5/6 w-11/12"
          style={[styles.container, { backgroundColor: Color }]}
        >
          <ColorPicker
            thumbSize={40}
            sliderSize={40}
            noSnap={true}
            row={false}
            // discrete
            onColorChange={(color: SetStateAction<string>) => setColor(color)}
            onColorChangeComplete={(color: SetStateAction<string>) =>
              setColor(color)
            }
          />
          <Button
            label="Use This Color 🤩"
            textColor={Color}
            style={[
              styles.button,
              { backgroundColor: `${invertColor(Color)}` },
            ]}
            onPress={handlePress}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    marginTop: 20,
  },
});
