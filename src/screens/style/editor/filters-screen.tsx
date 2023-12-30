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
  const [chromakey, setChromakey] = React.useState('1');
  const ffmpeg = new FFmpegWrapper();

  const { goBack } = useNavigation();

  React.useEffect(() => {
    setDisplayedText('');
    // ffmpeg.executeFFmpegCommand('-filters');
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

  React.useEffect(() => {
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
  }, [mainimage, userPhoto]);

  const backgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: selectedColor.value,
  }));

  const onColorSelect = (color: { hex: string }) => {
    selectedColor.value = color.hex;
  };

  const applyFilter = async (filter: string) => {
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
  };
  const handleChromaPress = () => {
    setModalVisible(!modalVisible);
    if (isFinite(parseFloat(chromakey)))
      applyFilter(`-vf chromakey=${selectedColor.value}:${chromakey}/100`);
  };
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
  return (
    <>
      <View
        style={styles.shadow}
        className="mt-4 h-52 w-11/12 self-center rounded-lg border border-white shadow-lg"
      >
        {image && (
          <Image src={image} className="h-full w-full" resizeMode="contain" />
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
        <View
          className="w-full items-center justify-center"
          // style={[styles.shadow]}
        >
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
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
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
              🔍 Color Picker
            </Text>
          </View>
        </View>
        <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
          👉🏻 Quick filters
        </Text>
        <HorizontalList
          Comp={SmallImageCard}
          padding={7.5}
          estimatedItemSize={SNAP}
          snapToInterval={SNAP}
          data={brightnessFilters}
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
              className="bg-zinc-950 mt-4 rounded-full px-4 py-2 text-center text-white"
            >
              🏹 Remove
            </Text>
          </TouchableOpacity>
        </ColorPicker>
      </Modal>
    </>
  );
};

const SmallImageCard = ({ item, index }: any) => {
  return (
    <View
      key={index}
      className="overflow-hidden rounded-lg"
      style={[styles.shadow, styles.imageCard]}
    >
      <Image
        src={item.image}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
    </View>
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

const brightnessFilters = [
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/minus_one.webp',
    command: '-vf eq=brightness=-1',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/minus_half.webp',
    command: '-vf eq=brightness=-0.5',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/minus_p2.webp',
    command: '-vf eq=brightness=-1',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/p2.webp',
    command: '-vf eq=brightness=-1',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/p3.webp',
    command: '-vf eq=brightness=-1',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/p5.webp',
    command: '-vf eq=brightness=-1',
  },
  {
    image:
      'https://ibaisindia.co.in/octoria/database/filters/brightness/full.webp',
    command: '-vf eq=brightness=-1',
  },
];
