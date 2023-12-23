import { styled, useColorScheme } from 'nativewind';
import * as React from 'react';
import type { InputOutline } from 'react-native-input-outline';
// import { TextInput as NTextInput } from 'react-native';
import { InputOutline as NTextInput } from 'react-native-input-outline';

import { Text } from '../core';
import { View } from '../core/view';
// import { isRTL } from '@/core';
import colors from '../theme/colors';

const STextInput = styled(NTextInput);

export interface NInputProps extends InputOutline {
  disabled?: boolean;
  error?: string;
}

export const Input2 = React.forwardRef<InputOutline, NInputProps>(
  (props, ref) => {
    const { error, ...inputProps } = props;
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [isFocussed, setIsFocussed] = React.useState(false);
    const onBlur = React.useCallback(() => setIsFocussed(false), []);
    const onFocus = React.useCallback(() => setIsFocussed(true), []);

    const borderColor = error
      ? 'border-danger-600'
      : isFocussed
      ? isDark
        ? 'border-white'
        : 'border-neutral-600'
      : isDark
      ? 'border-charcoal-700'
      : 'border-neutral-400';

    return (
      <View className="mb-4">
        <STextInput
          testID="STextInput"
          ref={ref}
          placeholderTextColor={colors.neutral[400]}
          className={`mt-0 border-[1px] ${borderColor} rounded-md text-[16px]`}
          onBlur={onBlur}
          onFocus={onFocus}
          {...inputProps}
        />
        {error && (
          <Text variant="xs" className="text-red-600">
            {error}
          </Text>
        )}
      </View>
    );
  }
);
