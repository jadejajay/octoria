import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { logger, shadow, useEditorX } from '@/core';
import { FirestoreData } from '@/core/fire-util';
import { F_LOGOS_LIST, type LogosType } from '@/types';
import { Image, TouchableOpacity, Vertical2CompList, View } from '@/ui';

const theme = '#07ab86';
export const LogosWidget = () => {
  const imagesHandler = new FirestoreData<LogosType>(F_LOGOS_LIST);
  const [logos, setLogos] = React.useState<LogosType[] | []>([]);
  const addElement = useEditorX((s) => s.addElement);
  const { goBack } = useNavigation();

  const getLogos = useCallback(async () => {
    const data = await imagesHandler.getData(20);
    if (data) setLogos(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    getLogos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleEndReached = useCallback(async () => {
    logger.log('handleEndReached');
    const data = await imagesHandler.loadMore(20);
    if (data)
      setLogos((p) => {
        if (p) return [...p, ...data];
        return data;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CardComp = useCallback((item: any, index: number) => {
    return (
      <Card
        item={item.item}
        index={index}
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
        data={logos}
        onEndReached={handleEndReached}
        estimatedItemSize={100}
        numColumn={5}
      />
    </View>
  );
};

type Props = {
  item: LogosType;
  index: number;
  setElement: (element: any) => void;
  onClose: () => void;
};
const Card = ({ item, index, setElement, onClose }: Props) => {
  const element = {
    component: 'image',
    properties: {
      height: 60,
      width: 60,
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
        className="aspect-square w-full overflow-hidden rounded-lg"
        style={[styles.shadow, shadow.medium]}
        activeOpacity={1}
        onPress={() => {
          setElement(element);
          onClose();
        }}
      >
        {item?.thumbnail && (
          <Image src={item.thumbnail} style={styles.image} resizeMode="cover" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { width: '100%', height: '100%' },
  image2: { width: '100%', height: '100%', opacity: 1 },
  color1: { color: theme },
  shadow: {
    backgroundColor: '#fff',
    elevation: 5,
  },
});
