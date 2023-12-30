import React from 'react';
import { Modal, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/ui';

interface Props {
  text: string;
  setText: ({
    text,
    width,
    height,
  }: {
    text: string;
    width: number;
    height: number;
  }) => void;
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
  const [layout, setLayout] = React.useState({ width: 10, height: 10 });
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
            style={styles.textFont}
            value={text}
            autoFocus={true}
            // numberOfLines={5}
            multiline={true}
            autoCorrect={true}
            cursorColor={'red'}
            returnKeyType={'send'}
            selectTextOnFocus={true}
            autoComplete={'username-new'}
            clearButtonMode={'unless-editing'}
            onChangeText={(text2) =>
              setText({
                text: text2,
                width: layout.width * 1.35,
                height: layout.height * 1.35,
              })
            }
            onContentSizeChange={(e) => setLayout(e.nativeEvent.contentSize)}
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
  textFont: {
    fontSize: 20,
  },
  slider: {
    top: 0,
    width: '100%',
  },
});
