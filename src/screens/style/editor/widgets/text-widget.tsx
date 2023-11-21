/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { useEditorX } from '@/core';
import { IconButton, IconButton2, IconButtonW, View } from '@/ui';

import { ColorPickerModal } from '../../color-picker-view';
import { EditTextModal } from '../../edit-text-modal';
import { FontWidget } from './font-picker';

type Props = {
  handleRotationPress: (r: number) => void;
  handlePressMoveToCenter: () => void;
  onPress: () => void;
  handlePressMoveToPosition: ({ x, y }: { x: number; y: number }) => void;
};
// eslint-disable-next-line max-lines-per-function
export const TextWidget = ({
  handlePressMoveToCenter,
  onPress,
  handlePressMoveToPosition,
  handleRotationPress,
}: Props) => {
  const themecolor = 'black';
  // color: 'green',
  // fontSize: 20,
  // fontWeight: 'bold',
  // textAlign: 'center',
  // textShadowColor: 'rgba(0, 0, 0, 0.75)',
  // textShadowOffset: { width: -1, height: 1 },
  // textShadowRadius: 10,
  const setData = useEditorX((s) => s.setTextStyle);
  const state = useEditorX((s) => s.selectedItem);
  const setText = useEditorX((s) => s.setText);
  const data = useEditorX((s) => s.editorData);
  const isSpecial = useEditorX((s) => s.isSpecial);
  const [colorModalVisible, setColorModalVisible] = useState<boolean>(false);
  const [textModalVisible, setTextModalVisible] = useState<boolean>(false);
  const [fontModalVisible, setfontModalVisible] = useState<boolean>(false);
  const [sizeModalVisible, setSizeModalVisible] = useState<boolean>(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const Color = data.elements[state]?.properties?.textProps?.style?.color;
  const Bold = data.elements[state]?.properties?.textProps?.style?.fontWeight;
  const Italic = data.elements[state]?.properties?.textProps?.style?.fontStyle;
  const Underline =
    data.elements[state]?.properties?.textProps?.style?.textDecorationLine;
  const LineThrough =
    data.elements[state]?.properties?.textProps?.style?.textDecorationLine;
  const Shadow =
    data.elements[state]?.properties?.textProps?.style?.textShadowOffset;

  const isShadow = Shadow?.width === -1;
  const isLineThrough = LineThrough === 'line-through';
  const isUnderline = Underline === 'underline';
  const isItalic = Italic === 'italic';
  const isBold = Bold === 'bold';

  const rotateRight = () => {
    const newDegree = (rotationDegree + 90) % 360;
    setRotationDegree(newDegree);
    handleRotationPress(rotationDegree);
  };

  return (
    <View className="flex-row flex-wrap justify-between">
      <ColorPickerModal
        onPress={(color) => {
          setData({
            id: state,
            props: {
              color: color,
            },
          });
        }}
        Color={Color}
        isModalVisible={colorModalVisible}
        SetModalVisible={setColorModalVisible}
      />
      <FontWidget
        isVisible={fontModalVisible}
        state={state}
        onClose={() => setfontModalVisible(false)}
      />
      <EditTextModal
        text={data.elements[state]?.properties?.text!}
        setText={(text) => {
          setText({
            id: state,
            text: text,
          });
        }}
        isModalVisible={textModalVisible}
        SetModalVisible={setTextModalVisible}
      />
      <IconButtonW
        icon={<Ionicons name="eyedrop" size={20} color={themecolor} />}
        onPress={() => {
          setColorModalVisible(true);
        }}
        title="Color"
        className="my-1"
      />
      <IconButtonW
        icon={<Ionicons name="pencil-outline" size={20} color={themecolor} />}
        onPress={() => {
          if (!isSpecial()) {
            setTextModalVisible(true);
          } else {
            onPress();
          }
        }}
        title="Edit"
        className="my-1"
      />
      <IconButtonW
        icon={
          <MaterialCommunityIcons
            name={'alpha-a-box-outline'}
            size={24}
            color={themecolor}
          />
        }
        onPress={() => {
          setfontModalVisible(true);
        }}
        title="Fonts"
        className="my-1"
      />
      <IconButton2
        icon={'text-shadow'}
        onPress={() => {
          setData({
            id: state,
            props: {
              textShadowOffset: isShadow
                ? { width: 0, height: 0 }
                : { width: -1, height: 1 },
              textShadowRadius: isShadow ? 0 : 10,
            },
          });
        }}
        title="Shadow"
        className="my-1"
        active={isShadow ? true : false}
      />
      <IconButton2
        icon={'alpha-b-box-outline'}
        onPress={() => {
          setData({
            id: state,
            props: {
              fontWeight: isBold ? 'normal' : 'bold',
            },
          });
        }}
        title="Bold"
        className="my-1"
        active={isBold ? true : false}
      />
      <IconButton2
        icon={'format-underline'}
        onPress={() => {
          setData({
            id: state,
            props: {
              textDecorationLine: isUnderline ? 'none' : 'underline',
            },
          });
        }}
        title="Underline"
        className="my-1"
        active={isUnderline ? true : false}
      />
      <IconButton2
        icon={'format-italic'}
        onPress={() => {
          setData({
            id: state,
            props: {
              fontStyle: isItalic ? 'normal' : 'italic',
            },
          });
        }}
        title="Italic"
        className="my-1"
        active={isItalic ? true : false}
      />
      <IconButton2
        icon={'format-strikethrough-variant'}
        onPress={() => {
          setData({
            id: state,
            props: {
              textDecorationLine: isLineThrough ? 'none' : 'line-through',
            },
          });
        }}
        title="line-through"
        className="my-1"
        active={isLineThrough ? true : false}
      />
      <IconButtonW
        icon={
          <MaterialCommunityIcons
            name="image-filter-center-focus-strong"
            size={16}
            color={themecolor}
          />
        }
        onPress={handlePressMoveToCenter}
        title="Text-center"
        className="my-1"
      />
      <IconButton
        icon={<FontAwesome name="rotate-right" size={18} color={themecolor} />}
        onPress={rotateRight}
        title="Rotate"
        className="my-1"
      />
      <IconButtonW
        icon={
          <MaterialCommunityIcons
            name="chevron-left-circle-outline"
            size={24}
            color={themecolor}
          />
        }
        onPress={() => {
          handlePressMoveToPosition({ x: -5, y: 0 });
        }}
        title="Move Left"
        className="my-1"
      />
      <IconButtonW
        icon={
          <MaterialCommunityIcons
            name="chevron-right-circle-outline"
            size={24}
            color={themecolor}
          />
        }
        onPress={() => {
          handlePressMoveToPosition({ x: 5, y: 0 });
        }}
        title="Move Right"
        className="my-1"
      />
      <IconButtonW
        icon={
          <MaterialCommunityIcons
            name="chevron-up-circle-outline"
            size={24}
            color={themecolor}
          />
        }
        onPress={() => {
          handlePressMoveToPosition({ x: 0, y: -5 });
        }}
        title="Move Up"
        className="my-1"
      />
      <IconButtonW
        icon={
          <MaterialCommunityIcons
            name="chevron-down-circle-outline"
            size={24}
            color={themecolor}
          />
        }
        onPress={() => {
          handlePressMoveToPosition({ x: 0, y: 5 });
        }}
        title="Move Down"
        className="my-1"
      />
      <IconButtonW
        icon={
          <MaterialCommunityIcons
            name="format-size"
            size={24}
            color={themecolor}
          />
        }
        onPress={() => {
          setSizeModalVisible((s) => !s);
        }}
        title="Text Size"
        className="my-1"
      />
      {sizeModalVisible ? (
        <View className="absolute h-20 w-full items-center justify-center bg-white">
          <Slider
            style={styles.container}
            minimumValue={8}
            value={
              data.elements[state]?.properties?.textProps?.style?.fontSize
                ? data.elements[state]?.properties?.textProps?.style?.fontSize
                : 20
            }
            maximumValue={80}
            onValueChange={(value) => {
              setData({
                id: state,
                props: {
                  fontSize: value,
                },
              });
            }}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 20,
  },
});
