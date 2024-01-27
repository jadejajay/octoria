import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { logger, shadow, useEditorX } from '@/core';
import { FirestoreData } from '@/core/fire-util';
import { F_STICKERS, type StickerType } from '@/types';
import { Image, TouchableOpacity, Vertical2CompList, View, WIDTH } from '@/ui';

const theme = '#07ab86';
export const StickersWidget = () => {
  const addElement = useEditorX((s) => s.addElement);
  const { goBack } = useNavigation();
  const elementsHandler = new FirestoreData<StickerType>(F_STICKERS);
  const [stickers, setStickers] = React.useState<
    StickerType[] | undefined | null
  >([]);
  logger.log('stickers', stickers);

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
    logger.log('handleEndReached');
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
      className="m-1 aspect-square w-full rounded p-1"
      activeOpacity={1}
      onPress={() => {
        setElement(element);
        onClose();
      }}
    >
      {item?.image && (
        <Image
          src={item.image}
          style={[styles.image, styles.shadow, shadow.medium]}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: { width: '100%', height: '100%' },
  image2: { width: '100%', height: '100%', opacity: 1 },
  color1: { color: theme },
  shadow: {
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
});
