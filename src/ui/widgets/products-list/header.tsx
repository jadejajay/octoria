import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { View } from '@/ui/core';

import { SearchBar2 } from './searchbar';

type Props = {
  globalSearch: string;
  setGlobalSearch: (value: string) => void;
  handle: () => void;
};

export const Header = ({ globalSearch, setGlobalSearch, handle }: Props) => {
  const navigation = useNavigation();
  return (
    <View className="mx-5 mt-5 flex-row items-center justify-start">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="keyboard-arrow-left" size={28} />
      </TouchableOpacity>
      <View className="flex-1">
        <SearchBar2
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
          handle={handle}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Saved')}>
        <Ionicons name="heart" color={'#56af'} size={24} />
      </TouchableOpacity>
    </View>
  );
};
