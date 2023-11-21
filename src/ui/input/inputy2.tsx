import { styled, useColorScheme } from 'nativewind';
import * as React from 'react';
import type { InputOutline } from 'react-native-input-outline';
// import { TextInput as NTextInput } from 'react-native';
import { InputOutline as NTextInput } from 'react-native-input-outline';

// import { isRTL } from '@/core';
import colors from '../theme/colors';
import { View } from '../core/view';

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

    // const bgColor = isDark
    //   ? 'bg-charcoal-800'
    //   : error
    //   ? 'bg-danger-50'
    //   : 'bg-neutral-200';
    // const textDirection = isRTL ? 'text-right' : 'text-left';
    return (
      <View className="mb-4">
        <STextInput
          testID="STextInput"
          ref={ref}
          placeholderTextColor={colors.neutral[400]}
          className={`mt-0 border-[1px] ${borderColor} rounded-md  text-[16px] `}
          onBlur={onBlur}
          onFocus={onFocus}
          {...inputProps}
          // style={StyleSheet.flatten([
          //   { writingDirection: isRTL ? 'rtl' : 'ltr' },
          // ])}
        />
      </View>
    );
  }
);
// {/* {error && <Text variant="error">{error}</Text>} */}
//  {/* {label && (
//           <Text
//             variant="md"
//             className={
//               error
//                 ? 'text-danger-600'
//                 : isDark
//                 ? 'text-charcoal-100'
//                 : 'text-black'
//             }
//           >
//             {label}
//           </Text> */}
//         {/* )} */}
