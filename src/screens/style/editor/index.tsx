/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import {
  FFmpegKit,
  FFmpegKitConfig,
  ReturnCode,
} from 'ffmpeg-kit-react-native';
import * as React from 'react';
import { useRef, useState } from 'react';
import { BackHandler, Linking, StyleSheet } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import FastImage from 'react-native-fast-image';
import { showMessage } from 'react-native-flash-message';
import ViewShot from 'react-native-view-shot';

import type { Element } from '@/core';
import {
  EditingFeatures,
  getImageBase64,
  getItem,
  setItem,
  shuffleArray,
  useEditorX,
  useFestivalStore,
  useFrameStore,
  usePostVideoStore,
} from '@/core';
import {
  type BackgroundType,
  type EditingFeaturesType,
  EDITORX_DATA,
  type FrameType,
  type PostVideoType,
  SUB_CATEGORY,
} from '@/types';
import {
  HorizontalList,
  IconButton,
  Image,
  SmallCard,
  SmallCard2,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';

import {
  BackgroundVideosWidget,
  BackgroundWidget,
  ElementsWidget,
  FrameWidget,
  ImageModal,
  ImageWidget,
  InfoWidget,
  LogosWidget,
  ProductsWidget,
  RenderWidget,
  ShapesWidget,
  StickersWidget,
  TextModal,
  TextWidget,
} from './widgets';
import Magic from './widgets/dnd';

type Props = {
  dim: {
    width: number;
    height: number;
  };
};
const resolution = 1024;
//promise classes reference
export const Editorx = ({ dim }: Props) => {
  // state management
  const [dwnVideo, setDwnVideo] = useState<string>('');
  const [sFestivals, setSFestivals] = useState<any>([]);
  const [sPostVideos, setSPostVideos] = useState<any>([]);
  // const [subCategoryCode, setSubCategoryCode] = useState<any>(1);
  const editorData = useEditorX((state) => state.editorData);
  const selectedItem = useEditorX((state) => state.selectedItem);
  const widget = useEditorX((state) => state.activeWidget);
  const setSelectedItem = useEditorX((state) => state.setSelectedItem);
  const setBg = useEditorX((s) => s.setBackground);
  const setFrm = useEditorX((s) => s.setFrame);
  // const saveFrame = useEditorX((s) => s.saveFrame);
  const setDataById = useEditorX((s) => s.setDataById);
  const toggleWidget = useEditorX((s) => s.setActiveWidget);
  const [renderedAsset, setRenderedAsset] = useState<string>('');
  const [renderedAssetData, setRenderedAssetData] = useState<string>('');

  const { navigate } = useNavigation();

  React.useEffect(
    () => () => {
      FFmpegKit.cancel();
    },
    []
  );

  const images = useFestivalStore((s) => s.festival);
  const postVideos = usePostVideoStore((s) => s.postVideos);
  const loadSubCat = React.useCallback(async () => {
    const subC = await getItem(SUB_CATEGORY);
    const tempVideos = postVideos.filter((img) => img.subCategory === subC);
    const temp = images.filter((img) => img.subCategory === subC);
    const sFestivals2 = shuffleArray(temp);
    const sPostVideos2 = shuffleArray(tempVideos);
    setSFestivals(sFestivals2);
    setSPostVideos(sPostVideos2);
  }, [images, postVideos]);

  React.useEffect(() => {
    loadSubCat();
  }, [loadSubCat]);

  // data management

  const frames = useFrameStore((s) => s.frames);
  const sFrame = shuffleArray(frames);

  // component specific
  const dirs = RNFetchBlob.fs.dirs.DocumentDir;
  const { goBack } = useNavigation();
  const viewShotRef = useRef(null);
  const magicRef = useRef<{
    rotateToDegree: (arg0: number) => void;
    moveToCenter: () => void;
    getState: () => any;
    moveToPosition: ({ x, y }: { x: number; y: number }) => void;
  } | null>();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  // const cacheManager = new VideoCacheManager();

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

  React.useEffect(() => {
    handleEditorx();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    editorData.bgType === 'video' &&
      editorData.backgroundPost &&
      downloadVideo(editorData.backgroundPost);
  }, [editorData.backgroundPost, editorData.bgType]);

  const backAction = React.useCallback(() => {
    setItem(EDITORX_DATA, JSON.stringify(editorData));
    goBack();
    return true;
  }, [editorData, goBack]);
  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }, [backAction])
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
  const toggleWidgetModal = React.useCallback(
    (item: EditingFeaturesType['name']) => {
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
    },
    [toggleWidget]
  );

  const downloadVideo = (url: string) => {
    setDwnVideo(url);
    // cacheManager.getVideo(url).then((localPath) => {
    //   if (localPath) {
    //     setDwnVideo(localPath);
    //   } else {
    //     showMessage({
    //       type: 'danger',
    //       message: `Failed to load Video`,
    //       duration: 2000,
    //     });
    //   }
    // });
  };

  const captureView = React.useCallback(async () => {
    console.log('capture called');
    setSelectedItem(-1);
    toggleWidgetModal('Photos');
    if (editorData.bgType === 'photo') {
      try {
        console.log('photo rendered');

        setRenderModalLoading(true);
        //@ts-ignore
        const _result = await viewShotRef.current.capture().then(
          (uri: string) => {
            // console.log('do something with ', uri);
            setRenderedAsset(uri);
            getImageBase64(uri).then((base64: string) => {
              setRenderedAssetData(base64);
            });
            console.log(uri, 'link of viewshot');
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
    } else {
      try {
        console.log('tried to render video');
        if (dwnVideo) {
          console.log('dwn load video available');
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
              console.log('view shot called from video');
              const out = `${dirs}/OCTORIA_${Date.now()}.mp4`;
              const cmd = `-i ${dwnVideo} -i ${uri} -filter_complex "[0:v]scale=${resolution}:${resolution} [video]; [video][1:v]overlay=0:0 [output]" -map 0:a -c:a copy -map 0:a -strict -2 -c:a aac -map "[output]"  -q:v 1 ${out}`;
              FFmpegKit.execute(cmd).then(async (session) => {
                const returnCode = await session.getReturnCode();
                if (ReturnCode.isSuccess(returnCode)) {
                  // SUCCESS
                  setRenderedAsset(`file://${out}`);
                  getImageBase64(`file://${out}`).then((base64: string) => {
                    setRenderedAssetData(base64);
                  });
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
        console.log(error, 'error occured idiota');

        setRenderModalLoading(false);
        showMessage({
          type: 'danger',
          message: `Failed to generate Video ${error}`,
          duration: 2000,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dwnVideo, editorData.bgType]);
  // horizontal list
  const PostBackgroundList = React.useCallback(() => {
    return (
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
            url="http://itekindia.com/chats/mainfestivalcategory/camera.gif"
          />
        )}
        snapToInterval={128}
        estimatedItemSize={100}
        data={sFestivals}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sFestivals]);
  const PostVideoList = React.useCallback(() => {
    return (
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
            url="http://itekindia.com/chats/mainfestivalcategory/camera.gif"
          />
        )}
        snapToInterval={128}
        estimatedItemSize={100}
        data={sPostVideos}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sPostVideos]);
  const PostFrameList = React.useCallback(() => {
    return (
      <HorizontalList
        key={'frame cards'}
        // eslint-disable-next-line react/no-unstable-nested-components
        Comp={({ item }: { item: FrameType }) => (
          <SmallCard
            key={item.id}
            onClick={() => {
              setFrm(item.image);
              if (item.mainWidth)
                setDataById(item.elements, item.mainWidth, dim.width);
              // setMagicController(!magicController);
            }}
            // onLongPress={() => saveFrame(item.id, dim.width)}
            url={item.image}
            // isSelected={FramePicker.imageUri === item.image} // #00f
          />
        )}
        // eslint-disable-next-line react/no-unstable-nested-components
        Header={() => (
          <SmallCard
            onClick={() => setFrameModalVisible(true)}
            url="http://itekindia.com/chats/mainfestivalcategory/camera.gif"
          />
        )}
        snapToInterval={128}
        estimatedItemSize={100}
        data={sFrame}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // header widget
  const PostHeaderWidget = React.useCallback(() => {
    return (
      <View id="header" style={styles.header}>
        <View className="flex-row items-baseline">
          <IconButton
            icon={<Feather name="arrow-left" color={'#07ab86'} size={24} />}
            onPress={() => {
              backAction();
            }}
            className="my-1 mx-2"
          />
          <Text variant="lg" className="font-kalam">
            EditorX
          </Text>
          <MaterialCommunityIcons
            name="information-outline"
            size={16}
            onPress={() => navigate('Tutorials')}
            style={{ marginLeft: 6 }}
          />
        </View>
        <IconButton
          icon={<Feather name="upload" color={'#07ab86'} size={24} />}
          onPress={() => {
            captureView();
            setRenderModalVisible(true);
          }}
          className="my-1 mx-2"
        />
      </View>
    );
  }, [backAction, captureView, navigate]);
  // text and image modify widget
  const PostTextWidget = React.useCallback(() => {
    return (
      <TextWidget
        onPress={() => setInfoModalVisible(true)}
        handlePressMoveToPosition={handlePressMoveToPosition}
        handleRotationPress={handleRotationPress}
        handlePressMoveToCenter={handlePressMoveToCenter}
      />
    );
  }, []);
  const PostImageWidget = React.useCallback(() => {
    return (
      <ImageWidget
        onPress={() => setInfoModalVisible(true)}
        handlePressMoveToPosition={handlePressMoveToPosition}
        handleRotationPress={handleRotationPress}
        handlePressMoveToCenter={handlePressMoveToCenter}
      />
    );
  }, []);
  // main features widget
  const FeatureComp = React.useCallback(
    ({ item }: { item: EditingFeaturesType }) => {
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
    },
    [toggleWidgetModal]
  );
  const EditingFeatureWidget = React.useCallback(() => {
    return (
      <HorizontalList
        key={'editing icons'}
        Comp={FeatureComp}
        snapToInterval={80}
        estimatedItemSize={55}
        data={EditingFeatures}
      />
    );
  }, [FeatureComp]);
  // video component
  const VideoComponent = React.useCallback(
    () => (
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
    ),
    [dwnVideo, renderModalVisible]
  );
  // magic component
  const MagicComponent = React.useCallback(
    (item: Element, index: number) => (
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
    ),
    [selectedItem, setSelectedItem, toggleWidgetModal]
  );
  // background post image and frame component
  const PostImageComponent = React.useCallback(
    () => (
      <TouchableOpacity
        style={[styles.background, { width: dim.width, height: dim.width }]}
        activeOpacity={1}
        onPress={() => {
          setSelectedItem(-1);
          toggleWidgetModal('Photos');
        }}
      >
        <Image
          style={[styles.background, { width: dim.width, height: dim.width }]}
          resizeMode="cover"
          src={editorData.backgroundPost}
        />
      </TouchableOpacity>
    ),
    [dim.width, editorData.backgroundPost, setSelectedItem, toggleWidgetModal]
  );
  const PostFrameComponent = React.useCallback(
    () => (
      <TouchableOpacity
        style={[styles.background, { width: dim.width, height: dim.width }]}
        activeOpacity={1}
        onPress={() => {
          setSelectedItem(-1);
          toggleWidgetModal('Photos');
        }}
      >
        <Image
          style={[styles.background, { width: dim.width, height: dim.width }]}
          resizeMode="stretch"
          src={editorData.frame}
        />
      </TouchableOpacity>
    ),
    [dim.width, editorData.frame, setSelectedItem, toggleWidgetModal]
  );
  // various modal list
  const RenderWidgetCallback = React.useCallback(() => {
    return (
      renderModalVisible && (
        <RenderWidget
          isVisible={renderModalVisible}
          onClose={() => {
            FFmpegKit.cancel();
            setRenderModalVisible(false);
          }}
          progress={progress}
          renderedAsset={renderedAsset}
          renderedAssetData={renderedAssetData}
          isLoading={renderModalLoading}
          renderWidth={dim.width * 0.9}
        />
      )
    );
  }, [
    dim.width,
    progress,
    renderModalLoading,
    renderModalVisible,
    renderedAssetData,
    renderedAsset,
  ]);
  const BackgroundWidgetCallback = React.useCallback(() => {
    return (
      backgroundModalVisible && (
        <BackgroundWidget //background
          isVisible={backgroundModalVisible}
          onClose={() => setBackgroundModalVisible(false)}
        />
      )
    );
  }, [backgroundModalVisible]);
  const BackgroundVideosWidgetCallback = React.useCallback(() => {
    return (
      backgroundVideoModalVisible && (
        <BackgroundVideosWidget //background Video
          isVisible={backgroundVideoModalVisible}
          onClose={() => setBackgroundVideoModalVisible(false)}
        />
      )
    );
  }, [backgroundVideoModalVisible]);
  const FrameWidgetCallback = React.useCallback(() => {
    return (
      frameModalVisible && (
        <FrameWidget //frame widget
          isVisible={frameModalVisible}
          onClose={() => setFrameModalVisible(false)}
        />
      )
    );
  }, [frameModalVisible]);
  const StickersWidgetCallback = React.useCallback(() => {
    return (
      stickersModalVisible && (
        <StickersWidget
          isVisible={stickersModalVisible}
          onClose={() => setStickersModalVisible(false)}
        />
      )
    );
  }, [stickersModalVisible]);
  const InfoWidgetCallback = React.useCallback(() => {
    if (infoModalVisible) {
      return (
        <InfoWidget
          isVisible={infoModalVisible}
          onClose={() => setInfoModalVisible(false)}
        />
      );
    } else {
      return null;
    }
  }, [infoModalVisible]);
  const ShapesWidgetCallback = React.useCallback(() => {
    return (
      shapesModalVisible && (
        <ShapesWidget
          isVisible={shapesModalVisible}
          onClose={() => setShapesModalVisible(false)}
        />
      )
    );
  }, [shapesModalVisible]);
  const ProductsWidgetCallback = React.useCallback(() => {
    return (
      productsModalVisible && (
        <ProductsWidget
          isVisible={productsModalVisible}
          onClose={() => setProductsModalVisible(false)}
        />
      )
    );
  }, [productsModalVisible]);
  const LogosWidgetCallback = React.useCallback(() => {
    return (
      logosModalVisible && (
        <LogosWidget
          isVisible={logosModalVisible}
          onClose={() => setLogosModalVisible(false)}
        />
      )
    );
  }, [logosModalVisible]);
  const ElementsWidgetCallback = React.useCallback(() => {
    return (
      elementsModalVisible && (
        <ElementsWidget
          isVisible={elementsModalVisible}
          onClose={() => setElementsModalVisible(false)}
        />
      )
    );
  }, [elementsModalVisible]);
  const TextWidgetCallback = React.useCallback(() => {
    return (
      textModalVisible && (
        <TextModal
          isModalVisible={textModalVisible}
          SetModalVisible={setTextModalVisible}
        />
      )
    );
  }, [textModalVisible]);
  const ImageWidgetCallback = React.useCallback(() => {
    return (
      imageModalVisible && (
        <ImageModal
          isVisible={imageModalVisible}
          onClose={() => setImageModalVisible(false)}
        />
      )
    );
  }, [imageModalVisible]);
  const handleRotationPress = (r: number) => {
    // rotateToDegree 90 to magicRef
    magicRef.current?.rotateToDegree(r);
  };
  const handlePressMoveToCenter = () => {
    // rotateToDegree 90 to magicRef
    magicRef.current?.moveToCenter();
  };
  const handlePressMoveToPosition = ({ x, y }: { x: number; y: number }) => {
    // rotateToDegree 90 to magicRef
    magicRef.current?.moveToPosition({ x, y });
  };
  return (
    <View className="flex-1">
      {PostHeaderWidget()}
      <TouchableOpacity
        className="flex-1 items-center justify-center"
        activeOpacity={1}
        onPress={() => {
          setSelectedItem(-1);
          toggleWidgetModal('Photos');
        }}
      >
        {editorData.bgType === 'video' && (
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
            {dwnVideo && <VideoComponent />}
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
          {editorData.backgroundPost && editorData.bgType === 'photo' && (
            <PostImageComponent />
          )}
          {editorData.frame && <PostFrameComponent />}
          {editorData.elements &&
            editorData.elements.map((item: Element, index: number) => {
              return MagicComponent(item, index);
            })}
          <View className="absolute top-1/2 -right-3 z-50">
            <FastImage
              source={require('../../../../assets/215.png')}
              style={{
                width: 50,
                height: 20,
                transform: [{ rotate: '-90deg' }],
              }}
              resizeMode="contain"
            />
          </View>
        </ViewShot>
      </TouchableOpacity>
      <View className="">
        {RenderWidgetCallback()}
        {BackgroundWidgetCallback()}
        {BackgroundVideosWidgetCallback()}
        {FrameWidgetCallback()}
        {StickersWidgetCallback()}
        {InfoWidgetCallback()}
        {ShapesWidgetCallback()}
        {ProductsWidgetCallback()}
        {LogosWidgetCallback()}
        {ElementsWidgetCallback()}
        {TextWidgetCallback()}
        {ImageWidgetCallback()}
      </View>
      <View style={styles.widget}>
        <View className="overflow-hidden" style={{ height: 140 }}>
          {widget === ('Photos' as 'Photos') &&
            sFestivals.length > 0 &&
            PostBackgroundList()}
          {widget === ('Videos' as 'Videos') &&
            sPostVideos.length > 0 &&
            PostVideoList()}
          {widget === ('Frames' as 'Frames') &&
            sFrame.length > 0 &&
            PostFrameList()}
          {widget === ('Text' as 'Text') && PostTextWidget()}
          {widget === ('Image' as 'Image') && PostImageWidget()}
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
          <EditingFeatureWidget />
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
  canvas2: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  canvas3: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    overflow: 'hidden',
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
export * from './day-list';
export * from './tutorials';
