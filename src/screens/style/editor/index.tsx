/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import {
  FFmpegKit,
  FFmpegKitConfig,
  ReturnCode,
} from 'ffmpeg-kit-react-native';
import * as React from 'react';
import { useRef, useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import { showMessage } from 'react-native-flash-message';
import ViewShot from 'react-native-view-shot';

import type { Element } from '@/core';
import { useEditorX } from '@/core';
import VideoCacheManager from '@/core/cache-util';
import { EditingFeatures } from '@/core/editing-features.';
import { useFestivalStore } from '@/core/editorx/festival';
import { useFrameStore } from '@/core/editorx/frames';
import { usePostVideoStore } from '@/core/editorx/post-video';
import type {
  BackgroundType,
  EditingFeaturesType,
  FrameType,
  PostVideoType,
} from '@/types';
import { Image, Text, TouchableOpacity, View } from '@/ui';
import { IconButton } from '@/ui/core/bounce';
import { HorizontalList } from '@/ui/core/list/horizontal-list';
import { SmallCard } from '@/ui/widgets/editorx/small-card';
import { SmallCard2 } from '@/ui/widgets/editorx/small-card2';

import { BackgroundWidget } from './background-widget';
import { BackgroundVideosWidget } from './bg-videos';
import Magic from './dnd';
import { ElementsWidget } from './elements-widget';
import { FrameWidget } from './frame-widget';
import { ImageModal } from './image-modal';
import { ImageWidget } from './image-widget';
import { InfoWidget } from './info-widget';
import { LogosWidget } from './logos-widget';
import { ProductsWidget } from './products-widget';
import { RenderWidget } from './render-widget';
import { ShapesWidget } from './shape-widget';
import { StickersWidget } from './stickers';
import { TextModal } from './text-modal';
import { TextWidget } from './text-widget';
type Props = {
  dim: {
    width: number;
    height: number;
  };
};
const resolution = 1024;
export const Editorx = ({ dim }: Props) => {
  // state management
  const bgType = useEditorX((state) => state.editorData.bgType);
  const bgPost = useEditorX((state) => state.editorData.backgroundPost);
  const [dwnVideo, setDwnVideo] = useState<string>('');
  const bgFrame = useEditorX((state) => state.editorData.frame);
  const elements = useEditorX((state) => state.editorData.elements);
  const selectedItem = useEditorX((state) => state.selectedItem);
  const widget = useEditorX((state) => state.activeWidget);
  const setSelectedItem = useEditorX((state) => state.setSelectedItem);
  const setBg = useEditorX((s) => s.setBackground);
  const setFrm = useEditorX((s) => s.setFrame);
  const toggleWidget = useEditorX((s) => s.setActiveWidget);
  const [renderedAsset, setRenderedAsset] = useState<string>('');
  const festivals = useFestivalStore((s) => s.festival);
  const frames = useFrameStore((s) => s.frames);
  const postVideos = usePostVideoStore((s) => s.postVideos);

  // component specific
  const dirs = RNFetchBlob.fs.dirs.DocumentDir;
  const { goBack } = useNavigation();
  const viewShotRef = useRef(null);
  const magicRef = useRef<{
    rotateToDegree: (arg0: number) => void;
    moveToCenter: () => void;
    getState: () => any;
  } | null>();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const cacheManager = new VideoCacheManager();

  // modal specific
  const [backgroundModalVisible, setBackgroundModalVisible] =
    useState<boolean>(false);
  const [backgroundVideoModalVisible, setBackgroundVideoModalVisible] =
    useState<boolean>(false);
  const [frameModalVisible, setFrameModalVisible] = useState<boolean>(false);
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const [textModalVisible, setTextModalVisible] = useState<boolean>(false);
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);
  const [stickersModalVisible, setStickersModalVisible] =
    useState<boolean>(false);
  const [shapesModalVisible, setShapesModalVisible] = useState<boolean>(false);
  const [productsModalVisible, setProductsModalVisible] =
    useState<boolean>(false);
  const [logosModalVisible, setLogosModalVisible] = useState<boolean>(false);
  const [elementsModalVisible, setElementsModalVisible] =
    useState<boolean>(false);
  const [renderModalVisible, setRenderModalVisible] = useState(false);
  const [renderModalLoading, setRenderModalLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  React.useEffect(
    () => {
      handleEditorx();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  React.useEffect(
    () => {
      bgType === 'video' && bgPost && downloadVideo(bgPost);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bgPost]
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
  const toggleWidgetModal = (item: EditingFeaturesType['name']) => {
    if (item === 'Photos') {
      toggleWidget('Photos');
    } else if (item === 'Videos') {
      toggleWidget('Videos');
    } else if (item === 'Frames') {
      toggleWidget('Frames');
    } else if (item === 'Info') {
      setInfoModalVisible(true);
    } else if (item === 'Text') {
      toggleWidget('Text');
    } else if (item === 'Stickers') {
      setStickersModalVisible(true);
    } else if (item === 'Shape') {
      setShapesModalVisible(true);
    } else if (item === 'Products') {
      setProductsModalVisible(true);
    } else if (item === 'Logos') {
      setLogosModalVisible(true);
    } else if (item === 'Image') {
      toggleWidget('Image');
    } else if (item === 'Elements') {
      setElementsModalVisible(true);
    }
  };

  const downloadVideo = (url: string) => {
    cacheManager.getVideo(url).then((localPath) => {
      if (localPath) {
        setDwnVideo(localPath);
      } else {
        showMessage({
          type: 'danger',
          message: `Failed to load Video`,
          duration: 2000,
        });
      }
    });
  };

  const captureView = async () => {
    setSelectedItem(-1);
    toggleWidgetModal('Photos');
    if (bgPost && bgType === 'photo') {
      try {
        setRenderModalLoading(true);
        //@ts-ignore
        const _result = await viewShotRef.current.capture().then(
          (uri: string) => {
            // console.log('do something with ', uri);
            setRenderedAsset(uri);
          },
          (error: any) => {
            showMessage({
              type: 'danger',
              message: `Failed to generate image ${error}`,
              duration: 2000,
            });
          }
        );
        setRenderModalLoading(false);
      } catch (error) {
        setRenderModalLoading(false);
        showMessage({
          type: 'danger',
          message: `Failed to generate image ${error}`,
          duration: 2000,
        });
      }
      // `result` will contain the captured image in PNG format
      // console.log('captured', JSON.stringify({ result }));
    } else {
      try {
        if (dwnVideo) {
          setRenderedAsset('');
          setRenderModalLoading(true);
          let totalFrames = 0;
          FFmpegKitConfig.enableLogCallback((log) => {
            const message = log.getMessage();
            if (message.startsWith('frame=')) {
              // This log message contains progress information
              const progressMatch = /frame=(\s*\d+)\s+fps=/.exec(
                message as string
              );
              if (progressMatch && progressMatch.length >= 2) {
                const frame = parseInt(progressMatch[1], 10);
                if (!isNaN(frame)) {
                  if (totalFrames === 0) {
                    // Determine the total number of frames (first frame message)
                    totalFrames = frame;
                  } else {
                    // Calculate and update the progress state variable
                    const completionPercentage = Math.round(
                      (frame / totalFrames) * 100
                    );
                    setProgress(completionPercentage);
                  }
                }
              }
            }
          });
          //@ts-ignore
          const _result = await viewShotRef.current.capture().then(
            (uri: string) => {
              const out = `${dirs}/OCTORIA_${Date.now()}.mp4`;
              // const cmd2 = `-i ${uri} -update 1 "${out2}"`;
              const cmd = `-i ${dwnVideo} -i ${uri} -filter_complex "[0:v]scale=${resolution}:${resolution} [video]; [video][1:v]overlay=0:0 [output]" -map 0:a -c:a copy -map 0:a -strict -2 -c:a aac -map "[output]"  -q:v 1 ${out}`;
              FFmpegKit.execute(cmd).then(async (session) => {
                const returnCode = await session.getReturnCode();
                if (ReturnCode.isSuccess(returnCode)) {
                  // SUCCESS
                  setRenderedAsset(out);
                  showMessage({
                    type: 'success',
                    icon: 'success',
                    message: `Video generated successfully`,
                    duration: 2000,
                  });
                } else if (ReturnCode.isCancel(returnCode)) {
                  showMessage({
                    type: 'danger',
                    message: `Failed to generate Video. Process Canceled`,
                    duration: 2000,
                  });
                } else {
                  showMessage({
                    type: 'danger',
                    message: `Failed to generate Video. Internal Error`,
                    duration: 2000,
                  });
                }
                setRenderModalLoading(false);
              });
            },
            (error: any) => {
              setRenderModalLoading(false);
              showMessage({
                type: 'danger',
                message: `Failed to generate Video ${error}`,
                duration: 2000,
              });
            }
          );
        }
      } catch (error) {
        setRenderModalLoading(false);
        showMessage({
          type: 'danger',
          message: `Failed to generate Video ${error}`,
          duration: 2000,
        });
      }
    }
  };

  const handleRotationPress = (r: number) => {
    // rotateToDegree 90 to magicRef
    magicRef.current?.rotateToDegree(r);
  };
  const handlePressMoveToCenter = () => {
    // rotateToDegree 90 to magicRef
    magicRef.current?.moveToCenter();
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
          onPress={() => {
            setRenderModalVisible(true);
            captureView();
          }}
          className="my-1 mx-2"
        />
      </View>
      <View className="flex-1 justify-center">
        {bgType === 'video' && (
          <TouchableOpacity
            style={[
              { width: dim.width, height: dim.width, position: 'absolute' },
            ]}
            activeOpacity={1}
            onPress={() => {
              setSelectedItem(-1);
              toggleWidgetModal('Videos');
            }}
          >
            {dwnVideo && (
              <Video
                style={{ width: '100%', height: '100%' }}
                source={{
                  uri: dwnVideo,
                }}
                onError={(error) => {
                  showMessage({
                    type: 'danger',
                    message: `Failed to Load Video ${error}`,
                    duration: 2000,
                  });
                }}
                shouldPlay={true}
                isMuted={renderModalVisible}
                volume={1}
                useNativeControls={false}
                resizeMode={ResizeMode.STRETCH}
                isLooping
              />
            )}
          </TouchableOpacity>
        )}
        <ViewShot
          ref={viewShotRef}
          style={[styles.canvas, { width: dim.width, height: dim.width }]}
          options={{
            format: 'png',
            fileName: `OCTORIA_${Date.now()}`,
            quality: 1,
            width: resolution,
            height: resolution,
          }}
        >
          {bgPost && bgType === 'photo' && (
            <TouchableOpacity
              style={[
                styles.background,
                { width: dim.width, height: dim.width },
              ]}
              activeOpacity={1}
              onPress={() => {
                setSelectedItem(-1);
                toggleWidgetModal('Photos');
              }}
            >
              <Image
                style={[
                  styles.background,
                  { width: dim.width, height: dim.width },
                ]}
                resizeMode="cover"
                src={bgPost}
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
              onPress={() => {
                setSelectedItem(-1);
                toggleWidgetModal('Photos');
              }}
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
            elements.map((item: Element, index: number) => {
              console.log(item);

              return (
                <Magic
                  key={`Magic_${index}`}
                  ref={selectedItem === index ? magicRef : null}
                  isFocused={selectedItem === index ? true : false}
                  index={index}
                  onClick={() => {
                    if (selectedItem === index) {
                      setSelectedItem(-1);
                      toggleWidgetModal('Photos');
                    } else {
                      setSelectedItem(index);
                      if (item.component === 'text') {
                        toggleWidgetModal('Text');
                      } else {
                        toggleWidgetModal('Image');
                      }
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
          onClose={() => {
            FFmpegKit.cancel();
            setRenderModalVisible(false);
          }}
          progress={progress}
          render={captureView}
          type={bgType}
          renderedAsset={renderedAsset}
          isLoading={renderModalLoading}
          renderWidth={dim.width * 0.9}
        />
        <BackgroundWidget //background
          isVisible={backgroundModalVisible}
          onClose={() => setBackgroundModalVisible(false)}
        />
        <BackgroundVideosWidget //background Video
          isVisible={backgroundVideoModalVisible}
          onClose={() => setBackgroundVideoModalVisible(false)}
        />
        <FrameWidget //frame widget
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
        <TextModal
          isModalVisible={textModalVisible}
          SetModalVisible={setTextModalVisible}
        />
        <ImageModal
          isVisible={imageModalVisible}
          onClose={() => setImageModalVisible(false)}
        />
      </View>
      <View style={styles.widget}>
        <View className="overflow-hidden" style={{ height: 140 }}>
          {/* //background/////////////////////////////////////////////////////// */}
          {/* //background/////////////////////////////////////////////////////// */}
          {/* //background/////////////////////////////////////////////////////// */}
          {/* //background/////////////////////////////////////////////////////// */}
          {widget === ('Photos' as 'Photos') && festivals.length > 0 && (
            <HorizontalList
              key={'background cards'}
              // eslint-disable-next-line react/no-unstable-nested-components
              Comp={({ item }: { item: BackgroundType }) => (
                <SmallCard
                  key={item.id}
                  onClick={() => {
                    setBg(item.image, 'photo');
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
              estimatedItemSize={100}
              data={festivals}
            />
          )}
          {widget === ('Videos' as 'Videos') && postVideos.length > 0 && (
            <HorizontalList
              key={'background Video cards'}
              // eslint-disable-next-line react/no-unstable-nested-components
              Comp={({ item }: { item: PostVideoType }) => (
                <SmallCard2
                  key={item.id}
                  onClick={() => {
                    setBg(item.video, 'video');
                  }}
                  url={item.thumbnail}
                  // isSelected={BackGroundPicker.imageUri === item.image}
                />
              )}
              // eslint-disable-next-line react/no-unstable-nested-components
              Header={() => (
                <SmallCard
                  onClick={() => setBackgroundVideoModalVisible(true)}
                  url="http://itekindia.com/chats/upload.png"
                />
              )}
              snapToInterval={128}
              estimatedItemSize={100}
              data={postVideos}
            />
          )}
          {/* //frames////////////////////////////////////////////////////// */}
          {/* //frames////////////////////////////////////////////////////// */}
          {/* //frames////////////////////////////////////////////////////// */}
          {/* //frames////////////////////////////////////////////////////// */}
          {widget === ('Frames' as 'Frames') && frames.length > 0 && (
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
              estimatedItemSize={100}
              data={frames}
            />
          )}
          {/* //Text//////////////////////////////////////////////////////////// */}
          {/* //Text//////////////////////////////////////////////////////////// */}
          {/* //Text//////////////////////////////////////////////////////////// */}
          {/* //Text//////////////////////////////////////////////////////////// */}
          {widget === ('Text' as 'Text') && (
            <TextWidget
              state={selectedItem}
              handleRotationPress={handleRotationPress}
              handlePressMoveToCenter={handlePressMoveToCenter}
            />
          )}
          {/* //image//////////////////////////////////////////////////////////// */}
          {/* //image//////////////////////////////////////////////////////////// */}
          {/* //image//////////////////////////////////////////////////////////// */}
          {/* //image//////////////////////////////////////////////////////////// */}
          {widget === ('Image' as 'Image') && (
            <ImageWidget
              handleRotationPress={handleRotationPress}
              handlePressMoveToCenter={handlePressMoveToCenter}
            />
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
            Comp={({ item }: { item: EditingFeaturesType }) => {
              return (
                <IconButton
                  key={item.name}
                  icon={
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={20}
                      color={'#07ab86'}
                    />
                  }
                  title={item.name}
                  onPress={() => {
                    if (item.name === 'Image') {
                      setImageModalVisible(true);
                    } else if (item.name === 'Text') {
                      setTextModalVisible(true);
                    } else {
                      toggleWidgetModal(item.name);
                    }
                  }}
                  className="my-1 mx-2"
                />
              );
            }}
            snapToInterval={80}
            estimatedItemSize={55}
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
    backgroundColor: 'transparent',
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
