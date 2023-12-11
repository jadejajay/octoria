/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { useEditorX } from '@/core';
import { FirestoreData } from '@/core/fire-util';
import type { StickerType } from '@/types';
import { Image, TouchableOpacity, Vertical2CompList, View, WIDTH } from '@/ui';

const theme = '#07ab86';
export const StickersWidget = () => {
  const addElement = useEditorX((s) => s.addElement);
  const { goBack } = useNavigation();
  const elementsHandler = new FirestoreData<StickerType>('stickers');
  const [stickers, setStickers] = React.useState<
    StickerType[] | undefined | null
  >([]);
  console.log('stickers', stickers);

  const getStickers = useCallback(async () => {
    const data = await elementsHandler.getData(30);
    if (data) setStickers(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    getStickers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleEndReached = useCallback(async () => {
    console.log('handleEndReached');
    const data = await elementsHandler.loadMore(30);
    if (data)
      setStickers((p) => {
        if (p) return [...p, ...data];
        return data;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        data={stickers}
        estimatedItemSize={WIDTH / 6}
        numColumn={6}
        onEndReached={handleEndReached}
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
