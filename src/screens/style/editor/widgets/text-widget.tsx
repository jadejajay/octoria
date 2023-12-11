/* eslint-disable max-lines-per-function */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { Stagger } from '@animatereactnative/stagger';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { useEditorX } from '@/core';
import { IconButton, IconButton2, IconButtonW, View, WIDTH } from '@/ui';

import { EditTextModal } from '../../edit-text-modal';

type Props = {
  handleRotationPress: (r: number) => void;
  handlePressMoveToCenter: () => void;
  handlePressMoveToPosition: ({ x, y }: { x: number; y: number }) => void;
  handleFontSize: (size: number) => void;
};
export const TextWidget = ({
  handlePressMoveToCenter,
  handlePressMoveToPosition,
  handleRotationPress,
}: Props) => {
  const themecolor = 'black';
  const setData = useEditorX((s) => s.setTextStyle);
  const setAlign = useEditorX((s) => s.setData);
  const state = useEditorX((s) => s.selectedItem);
  const setText = useEditorX((s) => s.setText);
  const data = useEditorX((s) => s.editorData);
  const isSpecial = useEditorX((s) => s.isSpecial);
  const { navigate } = useNavigation();
  const [textModalVisible, setTextModalVisible] = useState<boolean>(false);
  const [update, _setUpdate] = useState(1);
  const [rotationDegree, setRotationDegree] = useState(90);

  const Bold = data.elements[state]?.properties?.textProps?.style?.fontWeight;
  const Italic = data.elements[state]?.properties?.textProps?.style?.fontStyle;
  const Underline =
    data.elements[state]?.properties?.textProps?.style?.textDecorationLine;
  const LineThrough =
    data.elements[state]?.properties?.textProps?.style?.textDecorationLine;
  const Shadow =
    data.elements[state]?.properties?.textProps?.style?.textShadowOffset;
  const AlignItems =
    data.elements[state]?.properties?.viewProps?.style?.alignItems;

  const isShadow = Shadow?.width === -1;
  const isLineThrough = LineThrough === 'line-through';
  const isUnderline = Underline === 'underline';
  const isItalic = Italic === 'italic';
  const isBold = Bold === 'bold';

  const handleAlign = () => {
    switch (AlignItems) {
      case 'flex-end':
        setAlign({
          id: state,
          props: {
            viewProps: {
              style: {
                alignItems: 'flex-start',
              },
            },
          },
        });
        break;
      case 'flex-start':
        setAlign({
          id: state,
          props: {
            viewProps: {
              style: {
                alignItems: 'center',
              },
            },
          },
        });
        break;
      case 'center':
        setAlign({
          id: state,
          props: {
            viewProps: {
              style: {
                alignItems: 'flex-end',
              },
            },
          },
        });
        break;
      default:
        setAlign({
          id: state,
          props: {
            viewProps: {
              style: {
                alignItems: 'center',
              },
            },
          },
        });
        break;
    }
  };

  const rotateRight = () => {
    const newDegree = (rotationDegree + 90) % 360;
    setRotationDegree(newDegree);
    handleRotationPress(rotationDegree);
  };

  return (
    <Stagger
      key={`stagger-view-${update}`}
      stagger={50}
      duration={400}
      exitDirection={-1}
      style={{
        width: WIDTH,
      }}
    >
      <View className="flex-row flex-wrap justify-between">
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
            navigate('ColorWidget');
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
              navigate('InfoWidget');
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
            navigate('FontWidget');
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
          size={20}
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
          icon={
            <FontAwesome name="rotate-right" size={18} color={themecolor} />
          }
          onPress={rotateRight}
          title="Rotate"
          className="my-1"
        />
        <IconButton
          icon={
            <FontAwesome
              name={
                AlignItems === 'flex-end'
                  ? 'align-left'
                  : AlignItems === 'center'
                  ? 'align-right'
                  : 'align-center'
              }
              size={22}
              color={themecolor}
            />
          }
          onPress={handleAlign}
          title={
            AlignItems === 'flex-end'
              ? 'Align Left'
              : AlignItems === 'center'
              ? 'Align Right'
              : 'Align Center'
          }
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
            handlePressMoveToPosition({ x: -3, y: 0 });
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
            handlePressMoveToPosition({ x: 3, y: 0 });
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
            handlePressMoveToPosition({ x: 0, y: -3 });
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
            handlePressMoveToPosition({ x: 0, y: 3 });
          }}
          title="Move Down"
          className="my-1"
        />
      </View>
    </Stagger>
  );
};
