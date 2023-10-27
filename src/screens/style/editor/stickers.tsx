/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import React, { useCallback } from 'react';
import { Modal } from 'react-native';
import { StyleSheet } from 'react-native';

import { useEditorX } from '@/core';
import { useStickerStore } from '@/core/editorx/stickers';
import type { StickerType } from '@/types';
import { Image, TouchableOpacity, View } from '@/ui';
import { Vertical2CompList } from '@/ui/core/list/vertical-2comp';
type Props10 = {
  isVisible: boolean;
  onClose: () => void;
};
const theme = '#07ab86';
export const StickersWidget = ({ isVisible, onClose }: Props10) => {
  const addElement = useEditorX((s) => s.addElement);
  const { stickers } = useStickerStore();
  const CardComp = useCallback((item: any, index: number) => {
    return (
      <Card
        key={`sticker-${index}`}
        item={item.item}
        setElement={addElement}
        onClose={onClose}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <View className="flex-1">
        <Vertical2CompList
          Comp={CardComp}
          data={stickers}
          estimatedItemSize={100}
          numColumn={6}
        />
      </View>
    </Modal>
  );
};

type Props = {
  item: StickerType;
  setElement: (element: any) => void;
  onClose: () => void;
};
export const Card = ({ item, setElement, onClose }: Props) => {
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
