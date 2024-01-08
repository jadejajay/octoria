/* eslint-disable max-lines-per-function */
import PhotoEditor from '@baronha/react-native-photo-editor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Modal, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ColorPicker, {
  HueSlider,
  Panel1,
  Preview,
} from 'reanimated-color-picker';

import {
  FFmpegWrapper,
  logger,
  useBotSearchStore,
  useEditorX,
  useImageColorPickerStore,
} from '@/core';
import { Chat } from '@/core/bot';
import { FileManagement } from '@/core/file-management';
import { FirestoreData } from '@/core/fire-util';
import type { StickerType } from '@/types';
import { CACHE_DIR, F_STICKERS } from '@/types';
import {
  ActivityIndicator,
  HorizontalList,
  Image,
  Input,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  WIDTH,
} from '@/ui';

import { BotSearchBar } from './components/bot-searchbar';
const SNAP = WIDTH / 3;
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
export const FilterScreen = () => {
  const selectedColor = useSharedValue('#4e7a27');
  const state = useEditorX((s) => s.selectedItem);
  const setBusiness = useEditorX((s) => s.setBusiness);
  const businessData = useEditorX((s) => s.businessData);
  const setImage = useImageColorPickerStore((s) => s.setFinalImage);
  const setOriginalImage = useImageColorPickerStore((s) => s.setImage);
  const image = useImageColorPickerStore((s) => s.finalImage);
  const originalImage = useImageColorPickerStore((s) => s.image);
  const setMainImage = useEditorX((s) => s.setImage);
  const mainimage = useEditorX(
    (s) => s.editorData.elements[state].properties.image
  );
  const isSpecial = useEditorX((s) => s.isSpecial);
  const userPhoto = useEditorX((s) => s.businessData.photo);
  const [loading, setLoading] = React.useState(false);
  const question = useBotSearchStore((s) => s.text);
  const [displayedText, setDisplayedText] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [chromakey, setChromakey] = React.useState('5');
  const [chromakey2, setChromakey2] = React.useState('10');
  const [chromaFunc, setChromaFunc] = React.useState(true);
  const ffmpeg = React.useMemo(() => new FFmpegWrapper(), []);
  ///////////////////////////////////////////////
  const elementsHandler = new FirestoreData<StickerType>(F_STICKERS);
  const [stickers, setStickers] = React.useState<
    StickerType[] | undefined | null
  >([]);
  //////////////////////////////////////////////
  const filemanagement = new FileManagement();
  React.useEffect(() => {
    setDisplayedText('');
    createThumbnailAsync();
    getStickers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { goBack } = useNavigation();
  React.useEffect(
    () => () => {
      cleanUp();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const cleanUp = async () => {
    setDisplayedText('');
    await filemanagement.deleteThumbnails();
    await ffmpeg.cancel();
  };
  const getStickers = React.useCallback(async () => {
    const data = await elementsHandler.getData(40);
    if (data) setStickers(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const stickerImages = stickers?.map((item) => item.image);
  logger.log(stickerImages, '<=========stickerImages');

  const createThumbnailAsync = React.useCallback(async () => {
    setDisplayedText('');
    let selectedImage = isSpecial() ? userPhoto : mainimage;
    if (selectedImage) {
      setOriginalImage(selectedImage);
      setImage(selectedImage);
    }
    if (!selectedImage) return;

    // try {
    //   const result = await ffmpeg.applyFilter({
    //     dwnimage: selectedImage,
    //     filter: '-vf scale=256:-1',
    //     ext: 'png',
    //   });
    //   logger.log(result, '<=========result of thumbnail');
    //   if (result) setThumbnail(result);
    // } catch (error) {
    //   logger.error(error, '<=========error creating thumbnail');
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setDisplayedText('');
    let index = 0;
    let speed = 5;
    const chat = new Chat();
    const answerCommands = chat.converse(question);
    if (answerCommands) {
      const { cmd, resp } = answerCommands;
      logger.log(cmd, '<=========cmd');
      if (cmd) {
        applyFilter(cmd);
      }
      if (resp.length > 0) {
        const intervalId = setInterval(() => {
          setDisplayedText((prevText) => {
            const char = resp[index];
            index++;
            if (index >= resp.length) {
              clearInterval(intervalId);
            }
            return prevText + char;
          });
        }, speed);

        return () => {
          clearInterval(intervalId);
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  const backgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: selectedColor.value,
  }));

  const onColorSelect = React.useCallback(
    (color: { hex: string }) => {
      selectedColor.value = color.hex;
    },
    [selectedColor]
  );
  const urlDecode = React.useCallback(() => {
    const net = image.startsWith('http://') || image.startsWith('https://');
    if (net) return image;
    return `file://${image}`;
  }, [image]);

  const applyFilter = React.useCallback(
    async (filter: string) => {
      if (!image) return;
      setLoading(true);
      const result = await ffmpeg.applyFilter({
        dwnimage: image,
        filter,
        ext: 'png',
      });
      logger.log(result, '<=========result of filter');
      if (result) setImage(result);
      setLoading(false);
    },
    [ffmpeg, image, setImage]
  );
  const handleCardPress = React.useCallback(
    async (item: any) => {
      if (item?.command) {
        applyFilter(item.command);
      } else {
        setLoading(true);
        const result = await ffmpeg.applyFilter({
          dwnimage: image,
          filter: `-i ${item.image} -filter_complex "[0:v]scale=600:600[resized_main];[1:v]scale=600:600[resized_cutter];[resized_cutter]format=rgba,alphaextract[alpha];[resized_main][alpha]alphamerge[outv]" -map "[outv]"`,
          ext: 'png',
        });
        setLoading(false);
        if (result) setImage(result);
      }
    },
    [applyFilter, ffmpeg, image, setImage]
  );
  const handleChromaPress = React.useCallback(() => {
    setModalVisible(!modalVisible);
    if (chromaFunc) {
      if (isFinite(parseFloat(chromakey)))
        applyFilter(`-vf chromakey=${selectedColor.value}:${chromakey}/100`);
    } else {
      if (isFinite(parseFloat(chromakey)))
        applyFilter(`-vf chromahold=${selectedColor.value}:${chromakey2}/100`);
    }
  }, [
    chromaFunc,
    chromakey,
    chromakey2,
    modalVisible,
    selectedColor.value,
    applyFilter,
  ]);
  const apply = async () => {
    let dest = `${CACHE_DIR}/${Date.now()}.png`;
    await filemanagement
      .copyFile(image, dest)
      .then((res) => {
        logger.log(res, '<=========res of coping image');
        filemanagement
          .checkExistFile(dest)
          .then((res2) => {
            logger.log(res2, '<=========res');
            if (res2) {
              dest = `file://${dest}`;
              if (isSpecial()) {
                setBusiness({
                  photo: dest,
                  name: businessData.name,
                  email: businessData.email,
                  phone: businessData.phone,
                  website: businessData.website,
                  address: businessData.address,
                });
              } else {
                setMainImage({ id: state, image: dest });
              }
            }
          })
          .catch((err) => {
            logger.error(err, '<=========error copying image');
          });
      })
      .catch((err) => {
        logger.error(err, '<=========error copying image');
      });

    goBack();
  };
  const SmallImageCard = React.useCallback(
    ({ item, index }: any) => {
      let imageT = item?.image ? item.image : item;
      logger.log(imageT, '<=========imageT');
      return (
        <TouchableOpacity
          onPress={() => handleCardPress(item)}
          key={index}
          activeOpacity={0.9}
          className="overflow-hidden rounded-lg"
          style={[styles.shadow, styles.imageCard]}
        >
          {item?.image && (
            <Image
              src={imageT}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: '100%', height: '100%' }}
              resizeMode="stretch"
            />
          )}
        </TouchableOpacity>
      );
    },
    [handleCardPress]
  );
  const ColorModal = React.useCallback(() => {
    return (
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ColorPicker
          value={selectedColor.value}
          style={styles.colorPicker}
          sliderThickness={20}
          thumbSize={24}
          onChange={onColorSelect}
          boundedThumb
        >
          <HueSlider style={styles.hueSlider} />
          <Panel1 style={styles.panelStyle} />
          <TouchableOpacity
            activeOpacity={1}
            style={styles.previewTxtContainer}
            onPress={handleChromaPress}
          >
            <Preview />
            <Text
              variant="sm"
              className="mt-4 rounded-full bg-black px-4 py-2 text-center text-white"
            >
              ✨Remove Color
            </Text>
          </TouchableOpacity>
        </ColorPicker>
      </Modal>
    );
  }, [modalVisible, selectedColor.value, onColorSelect, handleChromaPress]);
  const QuickTools = React.useCallback(() => {
    return (
      <>
        <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
          👉🏻 Quick Tools
        </Text>
        <View key={'1234'} style={[styles.shadow, styles.tools]}>
          <SmallIconCard
            index={1}
            item={{
              name: 'original',
              command: '',
              icon: 'circle-off-outline',
            }}
            onClick={() => {
              setImage(originalImage);
            }}
          />
          <SmallIconCard
            index={2}
            item={{
              name: 'flip-x',
              command: '-vf hflip',
              icon: 'flip-horizontal',
            }}
            onClick={() => {
              applyFilter('-vf hflip');
            }}
          />
          <SmallIconCard
            index={3}
            item={{
              name: 'flip-y',
              command: '-vf vflip',
              icon: 'flip-vertical',
            }}
            onClick={() => {
              applyFilter('-vf vflip');
            }}
          />
          <SmallIconCard
            index={4}
            item={{
              name: 'rotate-90',
              command: '-vf transpose=1',
              icon: 'rotate-right',
            }}
            onClick={() => {
              applyFilter('-vf transpose=1');
            }}
          />
          <SmallIconCard
            index={5}
            item={{
              name: 'negate',
              command: '-vf negate',
              icon: 'invert-colors',
            }}
            onClick={() => {
              applyFilter('-vf negate');
            }}
          />
        </View>
      </>
    );
  }, [setImage, originalImage, applyFilter]);
  const Annotate = React.useCallback(() => {
    return (
      <View style={[styles.shadow, styles.chromaCol]}>
        <View style={[styles.chroma]}>
          <Text
            variant="sm"
            onPress={async () => {
              const imagesList = stickerImages ?? [];
              try {
                const result = (await PhotoEditor.open({
                  path: image,
                  stickers: imagesList,
                })) as string;
                if (result) setImage(result);
              } catch (error) {
                logger.error(error, '<=========error in annotate');
              }
            }}
            className="text-center"
          >
            🖌 Annotate
          </Text>
        </View>
      </View>
    );
  }, [stickerImages, image, setImage]);
  const ChromaTools = React.useCallback(() => {
    return (
      <>
        <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
          👉🏻 Chroma Tools
        </Text>
        <View style={[styles.shadow, styles.chromaCol]}>
          <View style={[styles.chroma]}>
            <Text variant="sm" className="text-left font-sfbold text-black">
              🔑 Chroma Key
            </Text>
            <Input
              className="mt-4 font-sfbold"
              value={chromakey.toString()}
              onChangeText={(text) => {
                setChromakey(text);
              }}
              keyboardType="numeric"
            />
            <AnimatedTouchableOpacity
              activeOpacity={1}
              style={[styles.box, backgroundColorStyle]}
              onPress={() => {
                setModalVisible(true);
                setChromaFunc(true);
              }}
            />
          </View>
        </View>
        <View style={[styles.shadow, styles.chromaCol]}>
          <View style={[styles.chroma]}>
            <Text variant="sm" className="text-left font-sfbold text-black">
              🔒 Chroma Hold
            </Text>
            <Input
              className="mt-4 font-sfbold"
              value={chromakey2.toString()}
              onChangeText={(text) => {
                setChromakey2(text);
              }}
              keyboardType="numeric"
            />
            <AnimatedTouchableOpacity
              activeOpacity={1}
              style={[styles.box, backgroundColorStyle]}
              onPress={() => {
                setModalVisible(true);
                setChromaFunc(false);
              }}
            />
          </View>
        </View>
      </>
    );
  }, [backgroundColorStyle, chromakey, chromakey2]);
  return (
    <>
      <View
        style={styles.shadow}
        className="mt-4 h-52 w-11/12 self-center rounded-lg border border-white shadow-lg"
      >
        {image && (
          <Image
            src={urlDecode()}
            className="h-full w-full"
            resizeMode="contain"
          />
        )}
        <View className="absolute h-full w-full items-center justify-center">
          {loading && <ActivityIndicator size="large" color="#fff" />}
        </View>
      </View>
      <ScrollView
        className="flex-1"
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full items-center justify-center">
          <BotSearchBar />
          {displayedText && (
            <Text
              variant="sm"
              className="w-11/12 rounded p-2"
              style={styles.shadow}
            >
              {displayedText}
            </Text>
          )}
        </View>
        <QuickTools />
        <ColorModal />
        <ChromaTools />
        <Annotate />
        <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
          👉🏻 Cut Image In a Shape
        </Text>
        <View className="h-36">
          <HorizontalList
            Comp={SmallImageCard}
            padding={7.5}
            estimatedItemSize={SNAP}
            snapToInterval={SNAP}
            data={cutOutImages()}
          />
        </View>
        <>
          <Text variant="sm" className="mt-4 pl-4 text-center font-sfbold">
            👉🏻 Quick filters👈🏻
          </Text>
          <View className="flex-row items-baseline justify-around">
            <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
              Brightness
            </Text>
          </View>
          <View className="h-36">
            <HorizontalList
              Comp={SmallImageCard}
              padding={7.5}
              estimatedItemSize={SNAP}
              snapToInterval={SNAP}
              data={brightenList}
            />
          </View>
          <View className="flex-row items-baseline justify-around">
            <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
              Contrast
            </Text>
          </View>
          <View className="h-36">
            <HorizontalList
              Comp={SmallImageCard}
              padding={7.5}
              estimatedItemSize={SNAP}
              snapToInterval={SNAP}
              data={contrastList}
            />
          </View>
          <View className="flex-row items-baseline justify-around">
            <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
              Saturation
            </Text>
          </View>
          <View className="h-36">
            <HorizontalList
              Comp={SmallImageCard}
              padding={7.5}
              estimatedItemSize={SNAP}
              snapToInterval={SNAP}
              data={saturationList}
            />
          </View>
          <View className="flex-row items-baseline justify-around">
            <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
              Gamma
            </Text>
          </View>
          <View className="h-36">
            <HorizontalList
              Comp={SmallImageCard}
              padding={7.5}
              estimatedItemSize={SNAP}
              snapToInterval={SNAP}
              data={gammaList}
            />
          </View>
          <View className="flex-row items-baseline justify-around">
            <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
              Hue
            </Text>
          </View>
          <View className="h-36">
            <HorizontalList
              Comp={SmallImageCard}
              padding={7.5}
              estimatedItemSize={SNAP}
              snapToInterval={SNAP}
              data={hueList}
            />
          </View>
          <View className="flex-row items-baseline justify-around">
            <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
              Blur
            </Text>
          </View>
          <View className="h-36">
            <HorizontalList
              Comp={SmallImageCard}
              padding={7.5}
              estimatedItemSize={SNAP}
              snapToInterval={SNAP}
              data={blurList}
            />
          </View>
          <View className="flex-row items-baseline justify-around">
            <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
              Sharpen
            </Text>
          </View>
          <View className="h-36">
            <HorizontalList
              Comp={SmallImageCard}
              padding={7.5}
              estimatedItemSize={SNAP}
              snapToInterval={SNAP}
              data={sharpenList}
            />
          </View>
          <View className="flex-row items-baseline justify-around">
            <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
              Tint
            </Text>
          </View>
          <View className="h-36">
            <HorizontalList
              Comp={SmallImageCard}
              padding={7.5}
              estimatedItemSize={SNAP}
              snapToInterval={SNAP}
              data={tintList}
            />
          </View>
          <View className="flex-row items-baseline justify-around">
            <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
              Sepia Tones
            </Text>
          </View>
          <View className="h-36">
            <HorizontalList
              Comp={SmallImageCard}
              padding={7.5}
              estimatedItemSize={SNAP}
              snapToInterval={SNAP}
              data={sepiaList}
            />
          </View>
        </>
        <View className="mx-16 my-8 border-b-2 border-slate-200" />
      </ScrollView>
      <View className="m-4 self-center rounded-full bg-slate-700 px-16 py-4">
        <Text
          variant="sm"
          className="text-center font-sfbold text-white"
          onPress={async () => {
            await apply();
          }}
        >
          🎨 apply
        </Text>
      </View>
    </>
  );
};

const SmallIconCard = ({ item, index, onClick }: any) => {
  return (
    <TouchableOpacity
      key={index}
      activeOpacity={1}
      onPress={() => {
        onClick();
      }}
      className="overflow-hidden rounded-lg"
      style={[styles.imageCard2]}
    >
      <MaterialCommunityIcons
        name={item.icon}
        size={30}
        color="black"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ alignSelf: 'center' }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  hueSlider: {
    height: 40,
    width: WIDTH - 120,
    borderRadius: 10,
    marginBottom: 20,
  },
  modal: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tools: {
    alignSelf: 'center',
    width: WIDTH - 30,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  chroma: {
    width: WIDTH - 30,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  chromaCol: {
    alignSelf: 'center',
    width: WIDTH - 30,
    flexDirection: 'column',
  },
  box: {
    height: 40,
    width: 40,
    margin: 2,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#fff',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
  },
  imageCard: {
    width: SNAP - 15,
    margin: 5,
    aspectRatio: 1,
  },
  imageCard2: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  colorPicker: {
    marginTop: 160,
    padding: 20,
    width: WIDTH - 80,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 40,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 8,
  },
  panelStyle: {
    borderRadius: 20,
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderWidth: 2,
    overflow: 'hidden',
  },
  swatchesContainerMain: {
    marginTop: 20,
    width: WIDTH - 100,
    height: 60,
  },
  previewTxtContainer: {
    paddingTop: 20,
    marginTop: 20,
  },
});

const brightenList = [
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/brightness_0.webp',
    command: '-vf eq=brightness=-1',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/brightness_1.webp',
    command: '-vf eq=brightness=-0.7',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/brightness_2.webp',
    command: '-vf eq=brightness=-0.5',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/brightness_3.webp',
    command: '-vf eq=brightness=-0.2',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/brightness_4.webp',
    command: '-vf eq=brightness=0.2',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/brightness_5.webp',
    command: '-vf eq=brightness=0.3',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/brightness_6.webp',
    command: '-vf eq=brightness=0.5',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/brightness_7.webp',
    command: '-vf eq=brightness=0.7',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/brightness_8.webp',
    command: '-vf eq=brightness=1',
  },
];

const contrastList = [
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/contrast/contrast_0.webp',
    command: '-vf eq=contrast=-50',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/contrast/contrast_1.webp',
    command: '-vf eq=contrast=-25',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/contrast/contrast_2.webp',
    command: '-vf eq=contrast=-10',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/contrast/contrast_3.webp',
    command: '-vf eq=contrast=-3',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/contrast/contrast_4.webp',
    command: '-vf eq=contrast=-2',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/contrast/contrast_5.webp',
    command: '-vf eq=contrast=3',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/contrast/contrast_6.webp',
    command: '-vf eq=contrast=5',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/contrast/contrast_7.webp',
    command: '-vf eq=contrast=8',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/contrast/contrast_8.webp',
    command: '-vf eq=contrast=10',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/contrast/contrast_9.webp',
    command: '-vf eq=contrast=20',
  },
];
const saturationList = [
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/saturate/saturate_0.webp',
    command: '-vf eq=saturation=0',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/saturate/saturate_1.webp',
    command: '-vf eq=saturation=0.2',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/saturate/saturate_2.webp',
    command: '-vf eq=saturation=0.6',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/saturate/saturate_3.webp',
    command: '-vf eq=saturation=1.2',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/saturate/saturate_4.webp',
    command: '-vf eq=saturation=1.7',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/saturate/saturate_5.webp',
    command: '-vf eq=saturation=2.5',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/saturate/saturate_6.webp',
    command: '-vf eq=saturation=3',
  },
];

const gammaList = [
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/gamma/gamma_0.webp',
    command: '-vf eq=gamma=0.1',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/gamma/gamma_1.webp',
    command: '-vf eq=gamma=0.3',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/gamma/gamma_2.webp',
    command: '-vf eq=gamma=0.5',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/gamma/gamma_3.webp',
    command: '-vf eq=gamma=1.4',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/gamma/gamma_4.webp',
    command: '-vf eq=gamma=2.7',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/gamma/gamma_5.webp',
    command: '-vf eq=gamma=4.5',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/gamma/gamma_6.webp',
    command: '-vf eq=gamma=6',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/gamma/gamma_7.webp',
    command: '-vf eq=gamma=8',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/gamma/gamma_8.webp',
    command: '-vf eq=gamma=10',
  },
];

const hueList = [
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/hue/hue_0.webp',
    command: '-vf hue=h=0',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/hue/hue_1.webp',
    command: '-vf hue=h=45',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/hue/hue_2.webp',
    command: '-vf hue=h=90',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/hue/hue_3.webp',
    command: '-vf hue=h=135',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/hue/hue_4.webp',
    command: '-vf hue=h=180',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/hue/hue_5.webp',
    command: '-vf hue=h=225',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/hue/hue_6.webp',
    command: '-vf hue=h=270',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/hue/hue_7.webp',
    command: '-vf hue=h=315',
  },
];

const blurList = [
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/blur/blur_0.webp',
    command: '-vf boxblur=2:2',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/blur/blur_1.webp',
    command: '-vf boxblur=3:3',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/blur/blur_2.webp',
    command: '-vf boxblur=4:4',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/blur/blur_3.webp',
    command: '-vf boxblur=5:5',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/blur/blur_4.webp',
    command: '-vf boxblur=6:6',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/blur/blur_5.webp',
    command: '-vf boxblur=8:8',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/blur/blur_6.webp',
    command: '-vf boxblur=10:10',
  },
];

const sharpenList = [
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/sharp/sharp_0.webp',
    command: '-vf unsharp=3:3:1.5:3:3:1.5',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/sharp/sharp_1.webp',
    command: '-vf unsharp=5:5:2.5:5:5:2.5',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/sharp/sharp_2.webp',
    command: '-vf unsharp=7:7:3.5:7:7:3.5',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/sharp/sharp_3.webp',
    command: '-vf unsharp=9:9:4.5:9:9:4.5',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/sharp/sharp_4.webp',
    command: '-vf unsharp=11:11:5:11:11:5',
  },
];

const tintList = [
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/tint/tint_0.webp',
    command: '-vf colorbalance=rs=1',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/tint/tint_1.webp',
    command: '-vf colorbalance=bs=1',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/tint/tint_2.webp',
    command: '-vf colorbalance=gs=1',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/tint/tint_3.webp',
    command: '-vf colorbalance=rs=1:bs=1',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/tint/tint_4.webp',
    command: '-vf colorbalance=rs=1:gs=1',
  },
  {
    image: 'https://ibaisindia.co.in/octoria/database/filters/tint/tint_5.webp',
    command: '-vf colorbalance=bs=1:gs=1',
  },
];

const sepiaList = [
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/sepia/sepia_0.webp',
    command:
      '-vf colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/sepia/sepia_1.webp',
    command: '-vf colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/sepia/sepia_2.webp',
    command: '-vf edgedetect=low=0.1:high=0.4',
  },
];
const cutOutImages = () => {
  let temp = [];
  for (let i = 1; i <= 94; i++) {
    temp.push({
      image: `https://ibaisindia.co.in/octoria/database/cutout-shapes/elements%20%28${i}%29.png`,
    });
  }
  return temp;
};
