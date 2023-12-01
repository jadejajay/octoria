import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ScrollView, Text, View } from '@/ui/core';

interface ButtonRowProps {
  titles: string[];
  title?: string;
  onButtonPress: (index: number, title: string) => void;
}

export const TextAlignRow: React.FC<ButtonRowProps> = ({
  titles,
  onButtonPress,
  title = '',
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleButtonPress = (index: number, title2: string) => {
    setActiveIndex(index);
    onButtonPress(index, title2);
  };

  return (
    <>
      <Text variant="md" className="pl-2 font-sfbold">
        {title}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {titles.map((title2, index) => (
          <View className="flex-column">
            <TouchableOpacity
              key={`alignment-${index}`}
              style={[
                styles.button,
                activeIndex === index && styles.activeButton,
              ]}
              onPress={() => handleButtonPress(index, title2)}
            >
              <Feather
                name={`align-${title2}` as any}
                size={20}
                color={activeIndex === index ? 'white' : 'black'}
              />
            </TouchableOpacity>
            <Text className="text-center font-poppins text-[5px] leading-4">
              {title2}
            </Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    marginTop: 5,
    marginHorizontal: 5,
  },
  activeButton: {
    marginHorizontal: 15,
    borderRadius: 5,
    backgroundColor: 'black',
    transform: [{ scale: 1.26 }],
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
