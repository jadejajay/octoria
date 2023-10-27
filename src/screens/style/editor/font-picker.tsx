/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import React from 'react';
import { FlatList, Modal } from 'react-native';

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
        <Text className="font-aquire text-base">Select Font</Text>
        <FlatList
          data={fonts}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleFontPress(item)}
              className="m-1 rounded-lg border p-1"
            >
              <Text style={{ fontFamily: item, fontSize: fontSize }}>
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
