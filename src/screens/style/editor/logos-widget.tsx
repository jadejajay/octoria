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
import { useLogoStore } from '@/core/editorx/logos';
import type { LogosType } from '@/types';
import { Image, TouchableOpacity, View } from '@/ui';
import { Vertical2CompList } from '@/ui/core/list/vertical-2comp';
type Props9 = {
  isVisible: boolean;
  onClose: () => void;
};
const theme = '#07ab86';
export const LogosWidget = ({ isVisible, onClose }: Props9) => {
  const { logos } = useLogoStore();
  const addElement = useEditorX((s) => s.addElement);

  const CardComp = useCallback((item: any, index: number) => {
    return (
      <Card
        item={item.item}
        index={index}
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
          data={logos}
          estimatedItemSize={100}
          numColumn={5}
        />
      </View>
    </Modal>
  );
};

type Props = {
  item: LogosType;
  index: number;
  setElement: (element: any) => void;
  onClose: () => void;
};
export const Card = ({ item, index, setElement, onClose }: Props) => {
  const element = {
    component: 'image',
    properties: {
      height: 30,
      width: 30,
      image: item.image,
      viewProps: {
        style: {
          overflow: 'hidden',
        },
      },
      resizeMode: 'stretch',
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
    <View className="flex-1 p-2">
      <TouchableOpacity
        key={`festival-card-${index}`}
        className="aspect-square w-full overflow-hidden rounded-lg bg-green-400"
        activeOpacity={1}
        onPress={() => {
          setElement(element);
          onClose();
        }}
      >
        <Image src={item.image} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { width: '100%', height: '100%' },
  image2: { width: '100%', height: '100%', opacity: 1 },
  color1: { color: theme },
});
