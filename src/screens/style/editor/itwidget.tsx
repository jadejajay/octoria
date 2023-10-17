/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import type { SharedValue } from 'react-native-reanimated';
import Animated2 from 'react-native-reanimated';

import { useEditorX } from '@/core';
import { Image, Text, TouchableOpacity } from '@/ui';

type Props = {
  data: any;
  index: number;
  onClick?: () => void;
  scale: SharedValue<any>;
  isDragging: boolean;
};
export const ITWidget = ({
  data,
  index,
  onClick,
  scale,
  isDragging,
}: Props) => {
  const [animationKey, setAnimationKey] = useState<number>(0);
  const savedScale = useEditorX(
    (s) => s.editorData.elements[index]?.properties.scale
  );
  const handlePress = () => {
    // Increment the key to trigger a re-render and restart the animation
    setAnimationKey(animationKey + 1);
    onClick?.();
  };
  return (
    <TouchableOpacity
      key={`anim_button_${index}`}
      onPress={handlePress}
      activeOpacity={1}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Animatable.View
        key={`ITWidget-${animationKey}-${index}`}
        animation="rubberBand"
        useNativeDriver={true}
        duration={800}
        style={{ flex: 1 }}
      >
        {data?.image && (
          <Image
            key={`image_${index}`}
            src={data?.image}
            style={{ width: '100%', height: '100%' }}
            resizeMode={data?.resizeMode ? data?.resizeMode : 'cover'}
          />
        )}
        {data?.text && (
          <Animated2.View
            key={`animated-view-text_${index}`}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ scale: isDragging ? scale : savedScale }],
            }}
          >
            <Text key={`itwidget-text_${index}`} {...data?.textProps}>
              {data?.text}
            </Text>
          </Animated2.View>
        )}
      </Animatable.View>
    </TouchableOpacity>
  );
};

// properties: {
//   image:
//     'https://images.wallpapersden.com/image/download/cute-baby-groot-in-suit-4k_bGZpaG6UmZqaraWkpJRmbmdlrWZlbWU.jpg',
//   resizeMode: 'contain',
//   text: 'Hello World!',
//   textProps: {
//     style: {
//       color: 'white',
//       fontSize: 20,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       textShadowColor: 'rgba(0, 0, 0, 0.75)',
//       textShadowOffset: { width: -1, height: 1 },
//       textShadowRadius: 10,
//     },
//   },
//   offset: {
//     x: -137.32856130599976,
//     y: -139.38782453536987,
//   },
//   start: {
//     x: -137.32856130599976,
//     y: -139.38782453536987,
//   },
//   scale: 0.1922575519401993,
//   width: 367.44515429135464,
//   height: 346.48610608147186,
//   rotation: 0.018163833782218863,
// },
