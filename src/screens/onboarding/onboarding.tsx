import React, { useEffect } from 'react';

import { speak, useIsFirstTime } from '@/core';
import { Button, FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';

import { Cover } from './cover';
export const Onboarding = () => {
  const [_, setIsFirstTime] = useIsFirstTime();
  useEffect(() => {
    speak('hello sir, octoria mobile application me aapka swagat he');
  }, []);
  return (
    <View className="flex h-full items-center justify-center">
      <FocusAwareStatusBar />
      <View className="w-full flex-1">
        <Cover />
      </View>
      <View className="justify-end ">
        <Text className="my-3 text-center text-5xl font-bold">
          Welcome To Octoria
        </Text>

        <Text className="my-1 pt-6 text-left font-varela text-lg">
          👋 We are bringing a new generation to judge whats the difference
          between design and elegance.{'✨✨✨'}
        </Text>

        <Text className="my-1 text-left font-varela text-lg">
          "Any home🏡 can be castle🏯 when king🤴 and queen👸 select Octoria."
          -peace
        </Text>
      </View>
      <SafeAreaView className="mt-6">
        <Button
          label="Let's Get Started "
          onPress={() => {
            setIsFirstTime(false);
          }}
        />
      </SafeAreaView>
    </View>
  );
};
