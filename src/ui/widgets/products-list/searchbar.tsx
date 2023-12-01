import { MaterialIcons } from '@expo/vector-icons';
import type { Ref } from 'react';
import React, { useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import { Modal } from 'react-native';

import { ActivityIndicator, TouchableOpacity, View } from '@/ui/core';
import { Input } from '@/ui/input';
import colors from '@/ui/theme/colors';

type Props = {
  globalSearch: string;
  setGlobalSearch: (value: string) => void;
  handle: () => void;
};

export const SearchBar2 = ({
  globalSearch,
  setGlobalSearch,
  handle,
}: Props) => {
  const inputRef = useRef(
    null as unknown as {
      focus: () => void;
    }
  );

  const [isLoading, _setIsLoading] = useState(false);
  const handleClearSearch = () => {
    inputRef.current?.focus();
    setGlobalSearch('');
  };

  return (
    <View className="m-3 h-10" style={{}}>
      <Input
        ref={inputRef as Ref<TextInput> as unknown as undefined}
        placeholder={'Search'}
        onChangeText={(text) => setGlobalSearch(text)}
        value={globalSearch}
        onEndEditing={() => handle()}
        className="h-10 pr-12 pl-3 font-varela text-lg"
      />
      <View className="absolute  inset-y-0  right-0">
        <View className="flex-1 flex-row items-center justify-end px-2 ">
          {globalSearch && (
            <TouchableOpacity onPress={handleClearSearch} className="mx-2">
              <MaterialIcons
                name="close"
                size={20}
                color={colors.charcoal[400]}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => handle()}>
            <MaterialIcons
              name="search"
              size={24}
              color={colors.charcoal[400]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={isLoading} transparent={true}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </Modal>
    </View>
  );
};
