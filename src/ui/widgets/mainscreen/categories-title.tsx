import * as React from 'react';

import type { TxKeyPath } from '@/core';
import { Text, TouchableOpacity, View } from '@/ui/core';
import { ArrowRight } from '@/ui/icons';

type Props = {
  title: TxKeyPath;
  subtitle?: TxKeyPath;
  link?: any;
  linkText?: TxKeyPath;
  children?: React.ReactNode;
};
export const ChooseBrand = ({ title, subtitle, link, linkText }: Props) => {
  return (
    <View className="flex-row items-center justify-between px-2">
      <View className="flex-column">
        <Text variant="lg" className="font-varela font-bold" tx={title} />
        {subtitle && (
          <>
            <Text
              variant="xs"
              className="font-varela leading-3 text-slate-300"
              tx={subtitle}
            />
          </>
        )}
      </View>
      {link && (
        <TouchableOpacity
          onPress={link}
          className="flex-row items-center gap-2"
        >
          <Text
            variant="xs"
            className="font-varela text-slate-400"
            tx={linkText || 'mainscreen.see_all'}
          />
          <ArrowRight />
        </TouchableOpacity>
      )}
    </View>
  );
};
