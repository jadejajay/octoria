/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as React from 'react';
import { useRef, useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import ViewShot from 'react-native-view-shot';

import { BACKGROUNDS, FRAMES } from '@/api';
import { useEditorX } from '@/core';
import { EditingFeatures } from '@/core/editing-features.';
import type { BackgroundType, EditingFeaturesType, FrameType } from '@/types';
import { Image, Text, TouchableOpacity, View } from '@/ui';
import { IconButton } from '@/ui/core/bounce';
import { HorizontalList } from '@/ui/core/list/horizontal-list';
import { SmallCard } from '@/ui/widgets/editorx/small-card';

import { BackgroundWidget } from './background-widget';
import Magic from './dnd';
import { ElementsWidget } from './elements-widget';
import { FrameWidget } from './frame-widget';
import { ImageWidget } from './image-widget';
import { InfoWidget } from './info-widget';
import { LogosWidget } from './logos-widget';
import { ProductsWidget } from './products-widget';
import { RenderWidget } from './render-widget';
import { ShapesWidget } from './shape-widget';
import { StickersWidget } from './stickers';
import { TextWidget } from './text-widget';
type Props = {
  dim: {
    width: number;
    height: number;
  };
};
export const Editorx = ({ dim }: Props) => {
  // state management
  const bgImage = useEditorX((state) => state.editorData.backgroundImage);
  const bgFrame = useEditorX((state) => state.editorData.frame);
  const elements = useEditorX((state) => state.editorData.elements);
  const selectedItem = useEditorX((state) => state.selectedItem);
  const widget = useEditorX((state) => state.activeWidget);
  const setSelectedItem = useEditorX((state) => state.setSelectedItem);
  const setBg = useEditorX((s) => s.setBackground);
  const setFrm = useEditorX((s) => s.setFrame);
  const toggleWidget = useEditorX((s) => s.setActiveWidget);
  const [renderedImage, setRenderedImage] = useState<string>('');

  // component specific
  const { goBack } = useNavigation();
  const viewShotRef = useRef(null);
  const magicRef = useRef<{
    rotateToDegree: (arg0: number) => void;
    getState: () => any;
  } | null>();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  // modal specific
  const [backgroundModalVisible, setBackgroundModalVisible] =
    useState<boolean>(false);
  const [frameModalVisible, setFrameModalVisible] = useState<boolean>(false);
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const [stickersModalVisible, setStickersModalVisible] =
    useState<boolean>(false);
  const [shapesModalVisible, setShapesModalVisible] = useState<boolean>(false);
  const [productsModalVisible, setProductsModalVisible] =
    useState<boolean>(false);
  const [logosModalVisible, setLogosModalVisible] = useState<boolean>(false);
  const [elementsModalVisible, setElementsModalVisible] =
    useState<boolean>(false);
  const [renderedImageExtension, setRenderedImageExtension] = useState<
    'jpg' | 'png' | 'webm'
  >('png');
  const [renderModalVisible, setRenderModalVisible] = useState(false);

  React.useEffect(
    () => {
      handleEditorx();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleEditorx = async () => {
    if (!permissionResponse?.granted) {
      const x = await requestPermission();
      if (!x.granted) {
        showMessage({
          type: 'danger',
          message:
            'Give Permissions to Access Editor. Click Here to Give Permissions.',
          duration: 4000,
          onPress: () => {
            Linking.openSettings();
          },
        });
        goBack();
      }
    }
  };
  const toggleWidgetModal = (item: string) => {
    if (item === 'background') {
      toggleWidget('background');
    } else if (item === 'frames') {
      toggleWidget('frames');
    } else if (item === 'info') {
      setInfoModalVisible(true);
    } else if (item === 'text') {
      toggleWidget('text');
    } else if (item === 'stickers') {
      setStickersModalVisible(true);
    } else if (item === 'shape') {
      setShapesModalVisible(true);
    } else if (item === 'products') {
      setProductsModalVisible(true);
    } else if (item === 'logos') {
      setLogosModalVisible(true);
    } else if (item === 'image') {
      toggleWidget('image');
    } else if (item === 'elements') {
      setElementsModalVisible(true);
    }
  };

  const captureView = async () => {
    setSelectedItem(-1);
    if (viewShotRef.current) {
      //@ts-ignore
      const _result = await viewShotRef.current.capture().then(
        (uri: string) => {
          // console.log('do something with ', uri);
          setRenderedImage(uri);
        },
        (error: any) => {
          showMessage({
            type: 'danger',
            message: `Failed to generate image ${error}`,
            duration: 2000,
          });
        }
      );
      // `result` will contain the captured image in PNG format
      // console.log('captured', JSON.stringify({ result }));
    }
  };

  const handlePress = () => {
    // rotateToDegree 90 to magicRef
    magicRef.current?.rotateToDegree(0);
    console.log(JSON.stringify(magicRef.current?.getState(), null, 2));
  };
  return (
    <View className="flex-1">
      <View id="header" style={styles.header}>
        <View className="flex-row items-baseline">
          <IconButton
            icon={<Feather name="arrow-left" color={'#07ab86'} size={24} />}
            onPress={() => {
              goBack();
            }}
            className="my-1 mx-2"
          />
          <Text variant="lg" className="font-kalam">
            EditorX
          </Text>
        </View>
        <IconButton
          icon={<Feather name="upload" color={'#07ab86'} size={24} />}
          onPress={() => setRenderModalVisible(true)}
          className="my-1 mx-2"
        />
      </View>
      <View className="flex-1 justify-center">
        <ViewShot
          ref={viewShotRef}
          style={[styles.canvas, { width: dim.width, height: dim.width }]}
          options={{
            format: renderedImageExtension,
            fileName: `OCTORIA_${Date.now()}`,
            quality: 1,
            width: 1024,
            height: 1024,
          }}
        >
          {bgImage && (
            <TouchableOpacity
              style={[
                styles.background,
                { width: dim.width, height: dim.width },
              ]}
              activeOpacity={1}
              onPress={() => setSelectedItem(-1)}
            >
              <Image
                style={[
                  styles.background,
                  { width: dim.width, height: dim.width },
                ]}
                resizeMode="cover"
                src={bgImage}
              />
            </TouchableOpacity>
          )}
          {bgFrame && (
            <TouchableOpacity
              style={[
                styles.background,
                { width: dim.width, height: dim.width },
              ]}
              activeOpacity={1}
              onPress={() => setSelectedItem(-1)}
            >
              <Image
                style={[
                  styles.background,
                  { width: dim.width, height: dim.width },
                ]}
                resizeMode="stretch"
                src={bgFrame}
              />
            </TouchableOpacity>
          )}
          {elements &&
            elements.map((_item: any, index: number) => {
              return (
                <Magic
                  key={`Magic_${index}`}
                  ref={selectedItem === index ? magicRef : null}
                  isFocused={selectedItem === index ? true : false}
                  index={index}
                  onClick={() => {
                    if (selectedItem === index) {
                      setSelectedItem(-1);
                    } else {
                      setSelectedItem(index);
                    }
                  }}
                />
              );
            })}
        </ViewShot>
      </View>
      <View className="">
        <RenderWidget
          isVisible={renderModalVisible}
          onClose={() => setRenderModalVisible(false)}
          render={captureView}
          renderedImage={renderedImage}
          setRenderedImageExtension={setRenderedImageExtension}
          renderWidth={dim.width * 0.9}
        />
        <BackgroundWidget //background
          isVisible={backgroundModalVisible}
          onClose={() => setBackgroundModalVisible(false)}
        />
        <FrameWidget //background
          isVisible={frameModalVisible}
          onClose={() => setFrameModalVisible(false)}
        />
        <StickersWidget
          isVisible={stickersModalVisible}
          onClose={() => setStickersModalVisible(false)}
        />
        <InfoWidget
          isVisible={infoModalVisible}
          onClose={() => setInfoModalVisible(false)}
        />
        <ShapesWidget
          isVisible={shapesModalVisible}
          onClose={() => setShapesModalVisible(false)}
        />
        <ProductsWidget
          isVisible={productsModalVisible}
          onClose={() => setProductsModalVisible(false)}
        />
        <LogosWidget
          isVisible={logosModalVisible}
          onClose={() => setLogosModalVisible(false)}
        />
        <ElementsWidget
          isVisible={elementsModalVisible}
          onClose={() => setElementsModalVisible(false)}
        />
      </View>
      <View style={styles.widget}>
        <View className="overflow-hidden" style={{ height: 140 }}>
          {/* //background/////////////////////////////////////////////////////// */}
          {/* //background/////////////////////////////////////////////////////// */}
          {/* //background/////////////////////////////////////////////////////// */}
          {/* //background/////////////////////////////////////////////////////// */}
          {widget === 'background' && BACKGROUNDS.length > 0 && (
            <HorizontalList
              key={'background cards'}
              // eslint-disable-next-line react/no-unstable-nested-components
              Comp={({ item }: { item: BackgroundType }) => (
                <SmallCard
                  key={item.id}
                  onClick={() => {
                    setBg(item.image);
                  }}
                  url={item.image}
                  // isSelected={BackGroundPicker.imageUri === item.image}
                />
              )}
              // eslint-disable-next-line react/no-unstable-nested-components
              Header={() => (
                <SmallCard
                  onClick={() => setBackgroundModalVisible(true)}
                  url="http://itekindia.com/chats/upload.png"
                />
              )}
              snapToInterval={128}
              data={BACKGROUNDS}
            />
          )}
          {/* //frames////////////////////////////////////////////////////// */}
          {/* //frames////////////////////////////////////////////////////// */}
          {/* //frames////////////////////////////////////////////////////// */}
          {/* //frames////////////////////////////////////////////////////// */}
          {widget === 'frames' && FRAMES.length > 0 && (
            <HorizontalList
              key={'frame cards'}
              // eslint-disable-next-line react/no-unstable-nested-components
              Comp={({ item }: { item: FrameType }) => (
                <SmallCard
                  key={item.id}
                  onClick={() => {
                    setFrm(item.image);
                  }}
                  url={item.image}
                  // isSelected={FramePicker.imageUri === item.image}
                />
              )}
              // eslint-disable-next-line react/no-unstable-nested-components
              Header={() => (
                <SmallCard
                  onClick={() => setFrameModalVisible(true)}
                  url="http://itekindia.com/chats/upload.png"
                />
              )}
              snapToInterval={128}
              data={FRAMES}
            />
          )}
          {/* //Text//////////////////////////////////////////////////////////// */}
          {/* //Text//////////////////////////////////////////////////////////// */}
          {/* //Text//////////////////////////////////////////////////////////// */}
          {/* //Text//////////////////////////////////////////////////////////// */}
          {widget === 'text' && (
            <TextWidget add={() => {}} element={''} set={''} state={''} />
          )}
          {/* //image//////////////////////////////////////////////////////////// */}
          {/* //image//////////////////////////////////////////////////////////// */}
          {/* //image//////////////////////////////////////////////////////////// */}
          {/* //image//////////////////////////////////////////////////////////// */}
          {widget === 'image' && (
            <ImageWidget add={() => {}} element={''} set={''} state={''} />
          )}
        </View>
      </View>
      <View id="footer" style={styles.footer}>
        <View
          style={{
            height: 60,
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <HorizontalList
            key={'editing icons'}
            // eslint-disable-next-line react/no-unstable-nested-components
            Comp={({ item }: { item: EditingFeaturesType }) => (
              <IconButton
                key={item.name}
                icon={
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={20}
                    color={'black'}
                  />
                }
                title={item.name}
                onPress={() => toggleWidgetModal(item.name)}
                className="my-1 mx-2"
              />
            )}
            snapToInterval={80}
            data={EditingFeatures}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50, //  Header Height
  },
  canvas: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 4,
  },
  background: {
    position: 'absolute',
  },
  widget: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 160, //  Widget Height
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80, //  Footer Height
  },
});
