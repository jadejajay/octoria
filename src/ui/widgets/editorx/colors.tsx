import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ScrollView, Text } from '@/ui/core';

interface ButtonRowProps {
  titles: string[];
  title?: string;
  onButtonPress: (index: number, title: string) => void;
}

export const ColorsRow: React.FC<ButtonRowProps> = ({
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
          <TouchableOpacity
            key={`colors-${index}`}
            style={[
              styles.button,
              activeIndex === index && styles.activeButton,
              { backgroundColor: title2 },
            ]}
            onPress={() => handleButtonPress(index, title2)}
          />
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
    width: 30,
    height: 30,
    borderColor: 'white',
    margin: 5,
    borderWidth: 3,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeButton: {
    borderColor: 'black', // Change this to your desired active button color
    marginHorizontal: 15,
    transform: [{ scale: 1.26 }],
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
