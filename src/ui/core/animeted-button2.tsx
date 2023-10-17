import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface BounceInWrapperProps {
  children: React.ReactNode;
  onClick?: () => void;
  anim?: string;
  duration?: number;
}

export const AnimatedButton2: React.FC<BounceInWrapperProps> = ({
  children,
  onClick,
  anim = 'zoomIn',
  duration = 1000,
}) => {
  const [animationKey, setAnimationKey] = useState<number>(0);
  const handlePress = () => {
    // Increment the key to trigger a re-render and restart the animation
    setAnimationKey(animationKey + 1);
    onClick?.();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={1}>
      <Animatable.View
        animation={anim}
        duration={duration} // Adjust the duration as needed
        // useNativeDriver={true} // Important for certain animations
        key={animationKey} // Change the key to re-render on each press
      >
        {children}
      </Animatable.View>
    </TouchableOpacity>
  );
};
