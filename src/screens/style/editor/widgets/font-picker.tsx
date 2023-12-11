/* eslint-disable react-native/no-inline-styles */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useEditorX } from '@/core';
import { Text, TouchableOpacity, View } from '@/ui';

export const FontWidget = () => {
  const state = useEditorX((s) => s.selectedItem);
  const setData = useEditorX((s) => s.setTextStyle);
  const { goBack } = useNavigation();
  const fontSize = 18;
  const handleFontPress = (font: string) => {
    setData({
      id: state,
      props: {
        fontFamily: font,
      },
    });
    goBack();
  };
  return (
    <View className="flex-1 p-5">
      <Text
        variant="lg"
        className="p-2 text-start font-sfbold"
        tx={'editor.select_font'}
      />
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
