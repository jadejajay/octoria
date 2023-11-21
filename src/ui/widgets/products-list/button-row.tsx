import { ScrollView, Text } from '@/ui/core';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface ButtonRowProps {
  titles: string[];
  title?: string;
  onButtonPress: (index: number, title: string) => void;
}

export const ButtonRow: React.FC<ButtonRowProps> = ({
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
      <Text variant="lg" className="pl-2 font-varela font-bold">
        {title}
      </Text>
      <ScrollView
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {titles.map((title2, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              activeIndex === index && styles.activeButton,
            ]}
            onPress={() => handleButtonPress(index, title2)}
          >
            <Text style={styles.buttonText}>{title2}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#56af',
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: 'blue', // Change this to your desired active button color
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
