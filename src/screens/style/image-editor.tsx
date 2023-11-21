/* eslint-disable react/react-in-jsx-scope */
import { useObjectState } from '@uidotdev/usehooks';

import { View } from '@/ui';

import { Editorx } from './editor';
export const ImageEditor = () => {
  const [dim, setDim] = useObjectState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  return (
    <View
      className="flex-1"
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setDim({
          width: width,
          height: height,
        });
      }}
    >
      {dim.width > 0 && <Editorx dim={dim} />}
    </View>
  );
};
