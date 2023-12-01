import { styled } from 'nativewind';
import React from 'react';
import type { FastImageProps } from 'react-native-fast-image';
import FastImage from 'react-native-fast-image';

export type ImgProps = FastImageProps & {
  src?: string | undefined;
  style?: object;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  className?: string;
  placeholder?: string;
};
const SFastImage = styled(FastImage);

export const Image = ({
  style,
  resizeMode,
  src,
  className = '',
  ...props
}: ImgProps) => {
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
    <SFastImage
      style={style}
      className={className}
      source={{ uri: src }}
      resizeMode={RM}
      {...props}
    />
  );
};

export const preloadImages = (sources: object[]) => {
  FastImage.preload(sources);
};
