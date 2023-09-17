// import type { ImageProps } from 'expo-image';
// import { Image as NImage } from 'expo-image';
// import { styled } from 'nativewind';
// import * as React from 'react';

// const SImage = styled(NImage);
// export type ImgProps = ImageProps & {
//   className?: string;
// };

// export const Image = ({
//   style,
//   className,
//   placeholder = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4',
//   ...props
// }: ImgProps) => {
//   return (
//     <SImage
//       className={className}
//       placeholder={placeholder}
//       style={style}
//       {...props}
//     />
//   );
// };

// export const preloadImages = (sources: string[]) => {
//   NImage.prefetch(sources);
// };
import React from 'react';
import type { FastImageProps } from 'react-native-fast-image';
import FastImage from 'react-native-fast-image';
export type ImgProps = FastImageProps & {
  src?: string | undefined;
  style?: object;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  placeholder?: string;
};

export const Image = ({ style, resizeMode, src, ...props }: ImgProps) => {
  let RM;
  switch (resizeMode) {
    case 'cover':
      RM = FastImage.resizeMode.cover;
      break;
    case 'contain':
      RM = FastImage.resizeMode.contain;
      break;
    case 'stretch':
      RM = FastImage.resizeMode.stretch;
      break;
    case 'center':
      RM = FastImage.resizeMode.center;
      break;
    default:
      RM = FastImage.resizeMode.contain;
      break;
  }
  return (
    <FastImage style={style} {...props} source={{ uri: src }} resizeMode={RM} />
  );
};

export const preloadImages = (sources: object[]) => {
  FastImage.preload(sources);
};
