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
  const [brightenList, setBrightenList] = React.useState<any>([]);
  const [thumbnail, setThumbnail] = React.useState('');
  const [chromakey, setChromakey] = React.useState('1');
  const [chromakey2, setChromakey2] = React.useState('1');
  const [chromaFunc, setChromaFunc] = React.useState(true);
  const ffmpeg = React.useMemo(() => new FFmpegWrapper(), []);

  const { goBack } = useNavigation();

  React.useEffect(() => {
    setDisplayedText('');
    createThumbnailAsync();
    // ffmpeg.executeFFmpegCommand('-filters');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (thumbnail) createBrightenListAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbnail]);

  const createThumbnailAsync = React.useCallback(async () => {
    const result = await ffmpeg.applyFilter({
      dwnimage: originalImage,
      filter: '-vf scale=64:-1',
      ext: 'png',
    });
    logger.log(result, '<=========result of thumbnail');
    if (result) setThumbnail(result);
  }, [ffmpeg, originalImage]);

  const createBrightenListAsync = React.useCallback(async () => {
    if (!thumbnail) return;
    brightenCommand.map(async (cmd) => {
      await ffmpeg
        .applyFilter({
          dwnimage: thumbnail,
          filter: cmd,
          ext: 'png',
        })
        .then((res) => {
          setBrightenList((prevList: any) => {
            return [...prevList, { command: cmd, image: res }];
          });
        });
    });
  }, [ffmpeg, thumbnail]);

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

  React.useEffect(() => {
    setDisplayedText('');
    if (isSpecial()) {
      setImage(userPhoto);
      setOriginalImage(userPhoto);
    } else {
      if (mainimage) {
        setImage(mainimage);
        setOriginalImage(mainimage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const handleChromaPress = React.useCallback(() => {
    setModalVisible(!modalVisible);
    // applyFilter(`-vf chromakey=${selectedColor.value}:${chromakey}/100`);
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
    if (isSpecial()) {
      setBusiness({
        photo: image,
        name: businessData.name,
        email: businessData.email,
        phone: businessData.phone,
        website: businessData.website,
        address: businessData.address,
      });
    } else {
      setMainImage({ id: state, image: image });
    }
    goBack();
  };
  const SmallImageCard = React.useCallback(
    ({ item, index }: any) => {
      return (
        <TouchableOpacity
          onPress={() => {
            applyFilter(item.command);
          }}
          key={index}
          className="overflow-hidden rounded-lg"
          style={[styles.shadow, styles.imageCard]}
        >
          <Image
            src={`file://${item.image}`}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      );
    },
    [applyFilter]
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
              const result = (await PhotoEditor.open({
                path: image,
                stickers: [
                  'https://ibaisindia.co.in/octoria/database/filters/brightness/minus_one.webp',
                  'https://ibaisindia.co.in/octoria/database/filters/brightness/minus_half.webp',
                  'https://ibaisindia.co.in/octoria/database/filters/brightness/minus_p2.webp',
                  'https://ibaisindia.co.in/octoria/database/filters/brightness/p2.webp',
                  'https://ibaisindia.co.in/octoria/database/filters/brightness/p3.webp',
                  'https://ibaisindia.co.in/octoria/database/filters/brightness/p5.webp',
                  'https://ibaisindia.co.in/octoria/database/filters/brightness/full.webp',
                ],
              })) as string;
              setImage(result);
            }}
            className="text-center"
          >
            🖌 Annotate
          </Text>
        </View>
      </View>
    );
  }, [setImage, image]);
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
          👉🏻 Quick filters
        </Text>
        <HorizontalList
          Comp={SmallImageCard}
          padding={7.5}
          estimatedItemSize={SNAP}
          snapToInterval={SNAP}
          data={brightenList}
        />
        <View className="mx-16 my-8 border-b-2 border-slate-200" />
      </ScrollView>
      <View className="m-4 self-center rounded-full bg-slate-700 px-16 py-4">
        <Text
          variant="sm"
          className="text-center font-sfbold text-white"
          onPress={() => {
            apply();
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

const brightenCommand = [
  '-vf eq=brightness=-1',
  '-vf eq=brightness=-0.7',
  '-vf eq=brightness=-0.5',
  '-vf eq=brightness=-0.2',
  '-vf eq=brightness=0.2',
  '-vf eq=brightness=0.3',
  '-vf eq=brightness=0.5',
  '-vf eq=brightness=0.7',
  '-vf eq=brightness=1',
];
const contrastCommand = [
  '-vf eq=contrast=-1',
  '-vf eq=contrast=-0.5',
  '-vf eq=contrast=-0.2',
  '-vf eq=contrast=0.2',
  '-vf eq=contrast=0.3',
  '-vf eq=contrast=0.5',
  '-vf eq=contrast=1',
];
const saturationCommand = [
  '-vf eq=saturation=-1',
  '-vf eq=saturation=-0.5',
  '-vf eq=saturation=-0.2',
  '-vf eq=saturation=0.2',
  '-vf eq=saturation=0.3',
  '-vf eq=saturation=0.5',
  '-vf eq=saturation=1',
];
const hueCommand = [
  '-vf hue=h=0',
  '-vf hue=h=45',
  '-vf hue=h=90',
  '-vf hue=h=135',
  '-vf hue=h=180',
  '-vf hue=h=225',
  '-vf hue=h=270',
  '-vf hue=h=315',
];
const blurCommand = [
  '-vf boxblur=1:1',
  '-vf boxblur=2:2',
  '-vf boxblur=3:3',
  '-vf boxblur=4:4',
  '-vf boxblur=5:5',
  '-vf boxblur=6:6',
  '-vf boxblur=7:7',
  '-vf boxblur=8:8',
  '-vf boxblur=9:9',
  '-vf boxblur=10:10',
];
const sharpenCommand = [
  '-vf unsharp=3:3:1.5:3:3:1.5',
  '-vf unsharp=4:4:2:4:4:2',
  '-vf unsharp=5:5:2.5:5:5:2.5',
  '-vf unsharp=6:6:3:6:6:3',
  '-vf unsharp=7:7:3.5:7:7:3.5',
  '-vf unsharp=8:8:4:8:8:4',
  '-vf unsharp=9:9:4.5:9:9:4.5',
  '-vf unsharp=10:10:5:10:10:5',
];
