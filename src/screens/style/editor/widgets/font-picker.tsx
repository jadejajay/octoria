/* eslint-disable react-native/no-inline-styles */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import React from 'react';
import { FlatList, Modal, StyleSheet } from 'react-native';

import { useEditorX } from '@/core';
import { Text, TouchableOpacity, View } from '@/ui';

type Props5 = {
  isVisible: boolean;
  state: any;
  onClose: () => void;
};
export const FontWidget = ({ isVisible, onClose, state }: Props5) => {
  const setData = useEditorX((s) => s.setTextStyle);
  const fontSize = 18;
  const handleFontPress = (font: string) => {
    setData({
      id: state,
      props: {
        fontFamily: font,
      },
    });
    onClose();
  };

  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center p-5">
        <Text className="font-sfbold text-base" tx={'editor.select_font'} />
        <FlatList
          data={fonts}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleFontPress(item)}
              className="m-1 rounded-lg border p-1"
              style={styles.cardContainer}
            >
              <Text
                style={{
                  fontFamily: item,
                  fontSize: fontSize,
                  alignSelf: 'center',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

const fonts = [
  'normal',
  'Kalam-Regular',
  'Roboto',
  'notoserif',
  'sans-serif',
  'Inter',
  'SF-Pro-Rounded-Regular',
  'SF-ProSemibold',
  'sans-serif-light',
  'Poppins-Regular',
  'sans-serif-thin',
  'Aquire',
  'sans-serif-condensed',
  'Gobold-Regular',
  'MonumentExtended-Regular',
  'sans-serif-medium',
  'VarelaRound-Regular',
  'serif',
  'monospace',
];
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    margin: 8,
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
