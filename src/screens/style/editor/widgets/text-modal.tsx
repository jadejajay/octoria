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

export const TextModal = () => {
  const [twh, setTwh] = useState({ width: 10, height: 10 });
  const addElement = useEditorX((s) => s.addElement);
  const { goBack } = useNavigation();

  const [t, setT] = useState('');
  const element = (text: string, width: number, height: number) => ({
    component: 'text',
    properties: {
      height: height + 20,
      width: width + 40,
      text: text,
      textProps: {
        style: {
          color: 'black',
          fontSize: 10,
          textAlign: 'center',
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
    if (t.length > 0) addElement(element(t, twh.width, twh.height));
    goBack();
  };
  return (
    <View className="flex-1 items-center justify-center">
      <View
        style={[styles.container]}
        className="h-5/6 w-11/12 items-center justify-center"
      >
        <TextInput
          style={styles.textFont}
          value={t}
          autoFocus={true}
          multiline={true}
          numberOfLines={5}
          autoCorrect={true}
          cursorColor={'red'}
          returnKeyType={'send'}
          selectTextOnFocus={true}
          autoComplete={'username-new'}
          clearButtonMode={'unless-editing'}
          onChangeText={setT}
          onContentSizeChange={(e) => setTwh(e.nativeEvent.contentSize)}
        />
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
