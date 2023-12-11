/* eslint-disable max-lines-per-function */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import type { ColorPickerRef } from 'reanimated-color-picker';
import ColorPicker, {
  colorKit,
  HueCircular,
  Panel1,
  Preview,
  Swatches,
} from 'reanimated-color-picker';

import { useEditorX } from '@/core';
import { ScrollView, TouchableOpacity } from '@/ui/core';

export default function ColorWidget() {
  const pickerRef = useRef<ColorPickerRef>(null);
  // const [showInput, setShowInput] = React.useState(false);
  // const data = useEditorX((s) => s.editorData);
  const state = useEditorX((s) => s.selectedItem);
  const setData = useEditorX((s) => s.setTextStyle);
  const { goBack } = useNavigation();

  // const Color = data.elements[state]?.properties?.textProps?.style?.color;
  // const setNewColorHandle = (color: string) => {
  //   if (pickerRef.current) {
  //     pickerRef.current.setColor(color);
  //   }
  // };
  const handleClose = (color: string) => {
    setData({
      id: state,
      props: {
        color: color,
      },
    });
    goBack();
  };

  const customSwatches = new Array(12)
    .fill('#fff')
    .map(() => colorKit.randomRgbColor().hex());

  const selectedColor = useSharedValue(customSwatches[0]);
  const backgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: selectedColor.value,
  }));

  const onColorSelect = (color: { hex: string }) => {
    selectedColor.value = color.hex;
  };

  return (
    <>
      <Animated.View style={[styles.container]}>
        <Animated.View style={[styles.roundedBox, backgroundColorStyle]} />
        <View style={styles.pickerContainer}>
          <ColorPicker
            ref={pickerRef}
            value={selectedColor.value}
            sliderThickness={20}
            thumbSize={24}
            onChange={onColorSelect}
            boundedThumb
          >
            <HueCircular
              containerStyle={styles.hueContainer}
              thumbShape="doubleTriangle"
            >
              <Panel1 style={styles.panelStyle} />
            </HueCircular>
            <ScrollView
              horizontal={true}
              style={styles.swatchesContainerMain}
              showsHorizontalScrollIndicator={false}
            >
              <Swatches
                style={styles.swatchesContainer}
                swatchStyle={styles.swatchStyle}
                colors={customSwatches}
              />
            </ScrollView>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.previewTxtContainer}
              // onPress={() => setShowInput(true)}
            >
              <Preview />
            </TouchableOpacity>
          </ColorPicker>
        </View>
        <Pressable
          style={styles.closeButton}
          onPress={() => handleClose(selectedColor.value)}
        >
          <Text style={{ color: '#707070', fontWeight: 'bold' }}>
            Use This Color 🤩
          </Text>
        </Pressable>
      </Animated.View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignContent: 'center',
    backgroundColor: 'transparent',
  },
  roundedBox: {
    width: '20%',
    height: 40,
    margin: 20,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 4,
  },
  pickerContainer: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 4,
  },
  hueContainer: {
    justifyContent: 'center',
  },
  panelStyle: {
    width: '70%',
    height: '70%',
    alignSelf: 'center',
    borderRadius: 16,
  },
  previewTxtContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bebdbe',
  },
  swatchesContainerMain: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#fff',
    height: 60,
  },
  swatchesContainer: {
    padding: 5,
    overflow: 'hidden',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    height: 30,
    aspectRatio: 1,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 4,
  },
  openButton: {
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
