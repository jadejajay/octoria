/* eslint-disable react/react-in-jsx-scope */
import Slider from '@react-native-community/slider';
import { type SetStateAction, useState } from 'react';
import { Modal, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/ui';

interface Props {
  text: string;
  setText: (text: SetStateAction<string>) => void;
  isModalVisible: boolean;
  SetModalVisible: (visible: boolean) => void;
  onPress?: (text: string) => void;
}
export const EditTextModal = ({
  text,
  setText,
  isModalVisible,
  SetModalVisible,
  onPress = () => {},
}: Props) => {
  const [fontSize, setFontSize] = useState(20);
  const handlePress = () => {
    SetModalVisible(false);
    onPress(text);
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
          style={[styles.container]}
          className="h-5/6 w-11/12 items-center justify-center"
        >
          <TextInput
            style={{
              fontSize: fontSize,
            }}
            value={text}
            autoFocus={true}
            multiline={true}
            numberOfLines={5}
            autoCorrect={true}
            cursorColor={'red'}
            returnKeyType={'send'}
            selectTextOnFocus={true}
            autoComplete={'username-new'}
            clearButtonMode={'unless-editing'}
            onChangeText={(text2) => setText(text2)}
            onContentSizeChange={(e) => console.log(e.nativeEvent.contentSize)}
          />
          <Slider
            vertical={true}
            value={fontSize}
            tapToSeek={true}
            maximumValue={30}
            minimumValue={10}
            style={styles.slider}
            onValueChange={setFontSize}
            minimumTrackTintColor="#0f0"
            maximumTrackTintColor="#000000"
            trackImage={require('./FONT-SIZE.png')}
            thumbTintColor="transparent"
          />
          <Text variant="sm" className="text-center" onPress={handlePress}>
            Set Text
          </Text>
        </View>
      </View>
    </Modal>
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
  slider: {
    top: 0,
    width: '100%',
  },
});
