/* eslint-disable max-lines-per-function */
/* eslint-disable react-native/no-inline-styles */
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';

import { useBotSearchStore } from '@/core';
import { Image, TouchableOpacity, View } from '@/ui/core';
import { Input } from '@/ui/input';
import colors from '@/ui/theme/colors';
export const BotSearchBar = () => {
  const setSearch = useBotSearchStore((s) => s.setSearch);
  const [searchText, setSearchText] = useState('');
  const placeholderArray = [
    'crop',
    'filter black and white',
    'filter sepia',
    'resize 200 200',
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const searchPlaceholder = 'Ask me Ex. ' + placeholderArray[placeholderIndex];

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
      setSearch(``);
    } else {
      setSearch(`${searchText}`);
    }
  };

  const handleClearSearch = () => {
    // Clear search text and search results
    setSearchText('');
  };

  return (
    <View
      className="m-3 h-12 w-11/12 rounded-xl"
      style={{ backgroundColor: colors.white, elevation: 20 }}
    >
      <Image
        source={require('assets/cute_bot.png')}
        resizeMode="contain"
        className="absolute left-1 top-1 h-10 w-10"
      />
      <Input
        placeholder={searchPlaceholder}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        className="h-12 rounded-xl px-12"
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
