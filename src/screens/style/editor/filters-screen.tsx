/* eslint-disable max-lines-per-function */
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
  // const setColorImage = useImageColorPickerStore((s) => s.setImage);
  const setMainImage = useEditorX((s) => s.setImage);
  const mainimage = useEditorX(
    (s) => s.editorData.elements[state].properties.image
  );
  const isSpecial = useEditorX((s) => s.isSpecial);
  const userPhoto = useEditorX((s) => s.businessData.photo);
  const [image, setImage] = React.useState<any>('');
  const [loading, setLoading] = React.useState(false);
  const question = useBotSearchStore((s) => s.text);
  const [displayedText, setDisplayedText] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const ffmpeg = new FFmpegWrapper();

  const { goBack } = useNavigation();

  React.useEffect(() => {
    setDisplayedText('');
    let index = 0;
    let speed = 5;
    const chat = new Chat();
    const text = chat.converse(question);
    if (text.length > 0) {
      const intervalId = setInterval(() => {
        setDisplayedText((prevText) => {
          const char = text[index];
          index++;
          if (index >= text.length) {
            clearInterval(intervalId);
          }
          return prevText + char;
        });
      }, speed);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [question]);

  React.useEffect(() => {
    if (isSpecial()) {
      setImage(userPhoto);
    } else {
      setImage(mainimage);
    }
  }, [isSpecial, mainimage, userPhoto]);

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
      <ScrollView className="flex-1" nestedScrollEnabled>
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
        {/* <View className="mt-4 flex-row items-center justify-between border border-slate-300 px-4">
          <Text variant="sm" className="text-left font-sfbold text-black">
            ChromaKey
          </Text>
          <AnimatedTouchableOpacity
            activeOpacity={1}
            style={[styles.box, backgroundColorStyle]}
            onPress={() => setModalVisible(true)}
          />
          <Text
            variant="sm"
            className="rounded bg-slate-600 px-4 py-2 text-center text-white"
          >
            apply
          </Text>
        </View> */}
        <Text
          variant="sm"
          className="rounded bg-slate-600 px-4 py-2 text-center text-white"
          onPress={() => applyFilter('-vf negate')}
        >
          Line Art
        </Text>
        <Text
          variant="sm"
          className="rounded bg-slate-600 px-4 py-2 text-center text-white"
          onPress={() => {
            // setColorImage(image);
            // navigate('ImageColorPicker');
          }}
        >
          Line Art
        </Text>
        <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
          👉🏻 Brighten
        </Text>
        <HorizontalList
          Comp={SmallIconCard}
          padding={7.5}
          estimatedItemSize={SNAP}
          snapToInterval={SNAP}
          data={normalFilters}
        />
        {/* <Text variant="sm" className="mt-4 pl-4 text-left font-sfbold">
          👉🏻 Darken
        </Text>
        <HorizontalList
          Comp={SmallImageCard}
          padding={7.5}
          estimatedItemSize={SNAP}
          snapToInterval={SNAP}
          data={filterList}
        /> */}
        <View className="mx-16 my-8 border-b-2 border-slate-200" />
      </ScrollView>
      <View className="absolute bottom-10 m-4 self-center rounded-full bg-slate-700 px-16 py-4">
        <Text
          variant="sm"
          className="text-center font-sfbold text-white"
          onPress={() => {
            apply();
          }}
        >
          apply
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
            onPress={() => {
              setModalVisible(!modalVisible);
              applyFilter(`-vf chromakey=${selectedColor.value}:0.16`);
            }}
          >
            <Preview />
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
const SmallIconCard = ({ item, index }: any) => {
  return (
    <View
      key={index}
      className="overflow-hidden rounded-lg"
      style={[styles.shadow, styles.imageCard]}
    >
      <MaterialCommunityIcons
        name={item.icon}
        size={30}
        color="black"
        style={{ alignSelf: 'center' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
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
// http://itekindia.com/octoria/database/presets/space_empty.png
const normalFilters = [
  {
    name: 'original',
    command: '',
    icon: 'image',
  },
  {
    name: 'flip-x',
    command: '-vf hflip',
    icon: 'mirror-horizontal',
  },
  {
    name: 'flip-y',
    command: '-vf vflip',
    icon: 'mirror-vertical',
  },
  {
    name: 'rotate-90',
    command: '-vf transpose=1',
    icon: 'rotate-right',
  },
  {
    name: 'negate',
    command: '-vf negate',
    icon: 'invert-colors',
  },
];
