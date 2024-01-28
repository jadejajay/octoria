import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import type { RenderItemParams } from 'react-native-draggable-flatlist';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Animated, { SlideInRight, SlideInUp } from 'react-native-reanimated';

import { shadow, useEditorX } from '@/core';
import type { Element } from '@/types';
import { AbsoluteButton, Image, Text, TouchableOpacity, View } from '@/ui';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
export const DragList = () => {
  const elements = useEditorX((state) => state.editorData.elements);
  const rearrangeElements = useEditorX((state) => state.rearrangeElements);
  const setElementsKey = useEditorX((state) => state.setElementsKey);
  const { goBack } = useNavigation();
  return (
    <>
      <View className="flex-1">
        <Text variant="sm" className="text-center font-sfbold">
          Drag and drop to rearrange
        </Text>
        <DraggableFlatList
          data={elements}
          renderItem={({ item, drag }: RenderItemParams<Element>) => (
            <AnimatedTouchableOpacity
              className="my-2 h-28 w-11/12 flex-row items-center justify-between self-center rounded-md p-2"
              onLongPress={drag}
              style={[styles.shadow, shadow.medium]}
              entering={SlideInUp.duration(1500)}
              exiting={SlideInRight.duration(1500)}
            >
              {item.properties.text ? (
                <Text className="text-base" numberOfLines={1}>
                  {item.properties.text}
                </Text>
              ) : (
                item.properties.image && (
                  <Image
                    src={item.properties.image}
                    className="aspect-square h-full"
                  />
                )
              )}
              <Text
                variant="sm"
                className="rounded-full bg-red-500 p-4 text-center text-white"
                onPress={() => {
                  rearrangeElements(elements.filter((el) => el.id !== item.id));
                }}
              >
                Delete
              </Text>
            </AnimatedTouchableOpacity>
          )}
          keyExtractor={(_, index) => `draggable-item-${index}`}
          onDragEnd={(data2) => {
            setElementsKey(`${Date.now()}`);
            rearrangeElements(data2.data);
          }}
        />
      </View>
      <AbsoluteButton
        iconName="arrow-back"
        onPress={() => {
          goBack();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: '#fff',
    elevation: 5,
  },
});
