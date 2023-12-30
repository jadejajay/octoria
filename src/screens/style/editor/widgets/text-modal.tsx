/* eslint-disable max-lines-per-function */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

import { useEditorX } from '@/core';
import { Text, View } from '@/ui';
import { ColorsRow } from '@/ui/widgets/editorx/colors';
import { TextAlignRow } from '@/ui/widgets/editorx/text-align';

export const TextModal = () => {
  const [twh, setTwh] = useState({ width: 10, height: 10 });
  const [clr, setClr] = useState('black');
  const [textAlign, setAlign] = useState('center');
  const addElement = useEditorX((s) => s.addElement);
  const { goBack } = useNavigation();

  const [t, setT] = useState('');
  const element = (props: any) => ({
    component: 'text',
    properties: {
      height: props.height,
      width: props.width,
      text: props.text,
      textProps: {
        style: {
          color: props.color || 'black',
          fontSize: 20,
          textAlign: props.textAlign || 'center',
        },
      },
      offset: {
        x: 0,
        y: 0,
      },
      scale: 1,
      rotation: 0,
    },
  });
  const handlePress = () => {
    if (t.length > 0)
      addElement(
        element({
          text: t,
          width: twh.width * 1.35,
          height: twh.height * 1.35,
          color: clr,
          textAlign: textAlign,
        })
      );
    goBack();
  };
  return (
    <View className="flex-1 items-center justify-center">
      <View
        style={[styles.container]}
        className="h-5/6 w-11/12 items-center justify-center"
      >
        <TextInput
          style={[styles.textFont, { color: clr }]}
          value={t}
          autoFocus={true}
          // numberOfLines={1}
          multiline={true}
          autoCorrect={true}
          cursorColor={'red'}
          returnKeyType={'send'}
          selectTextOnFocus={true}
          autoComplete={'username-new'}
          clearButtonMode={'unless-editing'}
          onChangeText={setT}
          onContentSizeChange={(e) => setTwh(e.nativeEvent.contentSize)}
        />
        <View className="h-24 items-center justify-center">
          <TextAlignRow
            titles={['left', 'center', 'right']}
            onButtonPress={(_index, title) => setAlign(title)}
            title="Text Align"
          />
        </View>
        <View className="h-24 items-center justify-center">
          <ColorsRow
            titles={colors}
            onButtonPress={(_index, title) => setClr(title)}
            title="Text Color"
          />
        </View>
        <Text
          variant="sm"
          className="rounded-full bg-black p-4 text-center font-varela text-white"
          onPress={handlePress}
        >
          DONE 🥳
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#0008',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    marginTop: 20,
  },
  textFont: {
    fontSize: 20,
  },
  slider: {
    top: 0,
    width: '100%',
  },
});
const colors = [
  'black',
  'white',
  'red',
  'blue',
  'green',
  'yellow',
  '#303e2b',
  '#4b5c77',
  '#0eb360',
  '#ff5252',
  '#ff793f',
  '#ffb142',
  '#ffda77',
  '#54a0ff',
  '#5f27cd',
  '#c8d6e5',
  '#576574',
  '#222f3e',
  '#2e86de',
  '#341f97',
  '#b71540',
  '#079992',
  '#fbc531',
  '#e84118',
  '#e1b12c',
  '#6a89cc',
  '#e58e26',
];
