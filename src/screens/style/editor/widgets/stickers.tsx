/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { useEditorX, useStickerStore } from '@/core';
import type { StickerType } from '@/types';
import { Image, TouchableOpacity, Vertical2CompList, View, WIDTH } from '@/ui';

const theme = '#07ab86';
export const StickersWidget = () => {
  const addElement = useEditorX((s) => s.addElement);
  const [state, setState] = React.useState(50);
  const { goBack } = useNavigation();
  const { stickers } = useStickerStore();
  const finalArray = stickers.slice(0, state);
  const CardComp = useCallback((item: any, index: number) => {
    return (
      <Card
        key={`sticker-${index}`}
        item={item.item}
        setElement={addElement}
        onClose={() => {
          goBack();
        }}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View className="flex-1">
      <Vertical2CompList
        Comp={CardComp}
        data={finalArray}
        estimatedItemSize={WIDTH / 6}
        numColumn={6}
        onEndReached={() => {
          setState((s) => s + 50);
        }}
      />
    </View>
  );
};

type Props = {
  item: StickerType;
  setElement: (element: any) => void;
  onClose: () => void;
};
const Card = ({ item, setElement, onClose }: Props) => {
  const element = {
    component: 'image',
    properties: {
      height: 120,
      width: 90,
      image: item.image,
      viewProps: {
        style: {
          overflow: 'hidden',
        },
      },
      resizeMode: 'contain',
      offset: {
        x: 0,
        y: 0,
      },
      start: {
        x: 0,
        y: 0,
      },
      scale: 1,
      rotation: 0,
    },
  };
  return (
    <TouchableOpacity
      className="m-2 aspect-square w-full"
      activeOpacity={1}
      onPress={() => {
        setElement(element);
        onClose();
      }}
    >
      <Image src={item.image} style={styles.image} resizeMode="contain" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: { width: '100%', height: '100%' },
  image2: { width: '100%', height: '100%', opacity: 1 },
  color1: { color: theme },
});
