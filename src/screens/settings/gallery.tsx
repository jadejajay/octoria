import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as React from 'react';

import { Image, List, Text, TouchableOpacity, View, WIDTH } from '@/ui';

type Props = {};
export const Gallery = ({}: Props) => {
  const [images, setImages] = React.useState<MediaLibrary.Asset[]>([]);
  const { navigate } = useNavigation();
  React.useEffect(() => {
    (async () => {
      const _ = await MediaLibrary.getAlbumAsync('Octoria').then((res) =>
        MediaLibrary.getAssetsAsync({
          album: res,
          sortBy: ['creationTime'],
        }).then((ress) => {
          setImages(ress.assets);
        })
      );
    })();
  }, []);
  return (
    <View className="flex-1">
      <Text
        variant="h3"
        className="self-center font-sfbold"
        tx="gallery.gallery"
      />
      <List
        data={images}
        renderItem={({ item, index }) => (
          <ImageComp
            key={`image-${index}`}
            item={item}
            onPress={() => {
              navigate('ImageViewer', { url: item?.uri });
            }}
          />
        )}
        numColumns={3}
        keyExtractor={(_item, index) => `image-${index}`}
        estimatedItemSize={WIDTH / 3}
      />
    </View>
  );
};

const ImageComp = ({ item, onPress }: { item: any; onPress: () => void }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      className="aspect-square w-full border border-slate-300"
    >
      <Image src={item.uri} className="h-full w-full" resizeMode="stretch" />
    </TouchableOpacity>
  );
};
