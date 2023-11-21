import * as React from 'react';

import { Text, TouchableOpacity, View } from '@/ui/core';
import { ArrowRight } from '@/ui/icons';

type Props = {
  title: String;
  subtitle?: String;
  link?: any;
  linkText?: String;
  children?: React.ReactNode;
};
export const ChooseBrand = ({ title, subtitle, link, linkText }: Props) => {
  return (
    <View className="flex-row items-center justify-between px-2">
      <View className="flex-column">
        <Text variant="lg" className="font-varela font-bold">
          {title}
        </Text>
        {subtitle && (
          <>
            <Text variant="xs" className="font-varela leading-3 text-slate-300">
              {subtitle}
            </Text>
          </>
        )}
      </View>
      {link && (
        <TouchableOpacity
          onPress={link}
          className="flex-row items-center gap-2"
        >
          <Text variant="xs" className="font-varela text-slate-400">
            {linkText || 'See All'}
          </Text>
          <ArrowRight />
        </TouchableOpacity>
      )}
    </View>
  );
};
