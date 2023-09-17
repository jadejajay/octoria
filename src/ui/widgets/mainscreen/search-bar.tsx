/* eslint-disable max-lines-per-function */
/* eslint-disable react-native/no-inline-styles */
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { setItem } from '@/core/storage';
import { colors, Input, TouchableOpacity, View } from '@/ui';
export const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const placeholderArray = [
    'Tower bolt',
    'Khuti',
    'Conceal Handle',
    'Cabinet Handle',
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const searchPlaceholder = 'Search Ex. ' + placeholderArray[placeholderIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex(
        (prevIndex) => (prevIndex + 1) % placeholderArray.length
      );
    }, 1900);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    // Perform search logic here
    // Set isLoading to true while fetching search results
    // setIsLoading(true);
    if (!searchText) {
      setItem('search', `${placeholderArray[placeholderIndex]}`);
      //@ts-ignore
      navigation.navigate('FeedNavigator', {
        screen: 'Feed',
      });
      // search: placeholderArray[placeholderIndex],
    } else {
      setItem('search', `${searchText}`);
      //@ts-ignore
      navigation.navigate('FeedNavigator', {
        screen: 'Feed',
      });
    }
  };

  const handleClearSearch = () => {
    // Clear search text and search results
    setSearchText('');
  };

  return (
    <View
      className="m-3 h-12 rounded-xl"
      style={{ backgroundColor: colors.white, elevation: 20 }}
    >
      <Input
        placeholder={searchPlaceholder}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        className="h-12 rounded-xl pr-12 pl-3"
        style={{ elevation: 10, borderRadius: 8 }}
        onEndEditing={handleSearch}
      />
      <View className="absolute  inset-y-0  right-0">
        <View className="flex-1 flex-row items-center justify-end px-2 ">
          {searchText && (
            <TouchableOpacity onPress={handleClearSearch} className="mx-2">
              <MaterialIcons
                name="close"
                size={20}
                color={colors.charcoal[400]}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleSearch}>
            <MaterialIcons
              name="search"
              size={24}
              color={colors.charcoal[400]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
