import * as React from 'react';

import { Text, View } from '@/ui';

type Props = {
  title?: string;
  subtitle: string;
};
export const PostCardHeader = ({ title, subtitle }: Props) => {
  const [isTextColorRed, setIsTextColorRed] = React.useState(true);
  React.useEffect(() => {
    // Set up an interval to toggle the text color every second
    const intervalId = setInterval(() => {
      setIsTextColorRed((prev) => !prev);
    }, 800);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);
  const textColorStyle = isTextColorRed ? 'text-red-600' : 'text-red-300';
  return (
    <View className="mx-5 h-8 flex-row items-center justify-between">
      <Text variant="md" className="w-44 font-sfbold" numberOfLines={1}>
        <Text className={textColorStyle}>●</Text> {title}
      </Text>
      <Text
        variant="sm"
        className="rounded-md bg-red-500 px-2 py-1 text-center font-sfregular text-white"
      >
        {subtitle}
      </Text>
    </View>
  );
};
