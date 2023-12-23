/* eslint-disable max-lines-per-function */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { Env } from '@env';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import * as React from 'react';
import { useRef, useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { showMessage } from 'react-native-flash-message';
import ViewShot from 'react-native-view-shot';

import type { Element } from '@/core';
import {
  EditingFeatures,
  getImageBase64,
  getItem,
  logger,
  setItem,
  shuffleArray,
  useEditorX,
  useFestivalStore,
  useFrameStore,
  usePostVideoStore,
  useRenderStore,
} from '@/core';
import {
  type BackgroundType,
  type EditingFeaturesType,
  EDITORX_DATA,
  type FrameType,
  POST_IMAGE,
  type PostVideoType,
  SUB_CATEGORY,
} from '@/types';
import {
  HorizontalList,
  IconButton,
  Image,
  showErrorMessage,
  SmallCard,
  SmallCard2,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';

import { ImageWidget, TextWidget } from './widgets';
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
  const [sFestivals, setSFestivals] = useState<any>([]);
  const [sPostVideos, setSPostVideos] = useState<any>([]);
  const editorData = useEditorX((state) => state.editorData);
  const selectedItem = useEditorX((state) => state.selectedItem);
  const widget = useEditorX((state) => state.activeWidget);
  const dwnVideo = useEditorX((state) => state.dwnVideo);
  const elementsKey = useEditorX((state) => state.elementsKey);
  const setDwnVideo = useEditorX((state) => state.setDwnVideo);
  const setSelectedItem = useEditorX((state) => state.setSelectedItem);
  const setBg = useEditorX((s) => s.setBackground);
  const setFrm = useEditorX((s) => s.setFrame);
  const _saveFrame = useEditorX((s) => s.saveFrame);
  const setDataById = useEditorX((s) => s.setDataById);
  const toggleWidget = useEditorX((s) => s.setActiveWidget);
  const setRenderedAsset = useRenderStore((s) => s.setRenderedAsset);
  const setRenderedAssetData = useRenderStore((s) => s.setRenderedAssetData);
  const [renderModalLoading, setRenderModalLoading] = useState(false);

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
  logger.log('editorData.elements', editorData.elements);

  // component specific
  const { goBack, navigate } = useNavigation();
  const navigation = useNavigation();
  const videoRef = React.useRef<{
    pauseAsync: () => Promise<void>;
    playAsync: () => Promise<void>;
  } | null>(null);
  const viewShotRef = useRef<{
    capture: () => Promise<string>;
  } | null>(null);
  const magicRef = useRef<{
    rotateToDegree: (arg0: number) => void;
    moveToCenter: () => void;
    changeFontSize: (size: number) => void;
    moveToPosition: ({ x, y }: { x: number; y: number }) => void;
  } | null>();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  // modal specific
  React.useEffect(() => {
    handleEditorx();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    editorData.bgType === 'video' &&
      editorData.backgroundPost &&
      setDwnVideo(editorData.backgroundPost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorData.backgroundPost, editorData.bgType]);

  React.useEffect(() => {
    const blurListener = navigation.addListener('blur', () => {
      logger.log('Screen is blurred');
      videoRef.current?.pauseAsync();
      const list_without_empty = editorData.elements.filter(
        (item: Element) => item.properties.width !== 0
      );
      const new_list = {
        ...editorData,
        elements: list_without_empty,
      };
      setItem(EDITORX_DATA, JSON.stringify(new_list));
      // Your code when the screen is blurred
    });
    const focusListener = navigation.addListener('focus', () => {
      logger.log('Screen is Focused');
      loadSubCat();
      videoRef.current?.playAsync();
      // Your code when the screen is blurred
    });

    // Clean up listeners when the component is unmounted
    return () => {
      blurListener();
      focusListener();
    };
  }, [editorData, editorData.elements, loadSubCat, navigation]);
  const handleEditorx = async () => {
    if (!permissionResponse?.granted) {
      const x = await requestPermission();
      if (!x.granted) {
        showMessage({
          type: 'danger',
          icon: 'danger',
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
        navigate('InfoWidget');
      } else if (item === 'Text') {
        toggleWidget('Text');
      } else if (item === 'Stickers') {
        navigate('Stickers');
      } else if (item === 'Shape') {
        navigate('Shapes');
      } else if (item === 'Products') {
        navigate('Products');
      } else if (item === 'Logos') {
        navigate('Logos');
      } else if (item === 'Image') {
        toggleWidget('Image');
      } else if (item === 'Elements') {
        navigate('Elements');
      }
    },
    [navigate, toggleWidget]
  );
  const captureView = React.useCallback(async () => {
    logger.log('capture called');
    setSelectedItem(-1);
    toggleWidgetModal('Photos');
    setRenderModalLoading(true);
    try {
      logger.log('photo rendered');
      //@ts-ignore
      const _result = await viewShotRef.current.capture().then(
        (uri: string) => {
          logger.log('do something with ', uri);
          setRenderedAsset(uri);
          setItem(POST_IMAGE, uri);
          getImageBase64(uri).then((base64: string) => {
            setRenderedAssetData(base64);
          });
          navigate('RenderWidget');
        },
        (error: any) => {
          logger.log('Oops, snapshot failed', error);
          showErrorMessage('editor.fail_image');
        }
      );
      setRenderModalLoading(false);
    } catch (error) {
      setRenderModalLoading(false);
      logger.log('Oops, snapshot failed', error);
      showErrorMessage('editor.fail_image');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            onClick={() => navigate('BackgroundModal')}
            url={Env.GIF_CAMERA}
          />
        )}
        snapToInterval={128}
        estimatedItemSize={130}
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
            onClick={() => navigate('BackgroundVideosWidget')}
            url={Env.GIF_CAMERA}
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
            }}
            // onLongPress={() => _saveFrame(item.id, dim.width)}
            url={item.image}
            // isSelected={FramePicker.imageUri === item.image} // #00f
          />
        )}
        // eslint-disable-next-line react/no-unstable-nested-components
        Header={() => (
          <SmallCard onClick={() => navigate('Frames')} url={Env.GIF_CAMERA} />
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
      <>
        <View id="header" style={styles.header}>
          <View className="flex-row items-baseline">
            <IconButton
              icon={<Feather name="arrow-left" color={'#07ab86'} size={24} />}
              onPress={() => {
                goBack();
              }}
              className="mx-2 my-1"
            />
            <Text variant="lg" className="font-sfbold opacity-25">
              EditorX
            </Text>
            <MaterialCommunityIcons
              name="information-outline"
              size={14}
              onPress={() => navigate('Tutorials')}
              style={styles.left6}
            />
          </View>
          <MaterialCommunityIcons
            name="arrange-bring-forward"
            size={24}
            onPress={() => navigate('DragList')}
            color={'#07ab86'}
          />
          <IconButton
            icon={<Feather name="upload" color={'#07ab86'} size={24} />}
            onPress={() => {
              renderModalLoading ? null : captureView();
            }}
            className="mx-2 my-1"
          />
        </View>
      </>
    );
  }, [captureView, goBack, navigate, renderModalLoading]);
  // text and image modify widget
  const PostTextWidget = React.useCallback(() => {
    return (
      <TextWidget
        handlePressMoveToPosition={handlePressMoveToPosition}
        handleRotationPress={handleRotationPress}
        handlePressMoveToCenter={handlePressMoveToCenter}
        handleFontSize={handleFontSize}
      />
    );
  }, []);
  const PostImageWidget = React.useCallback(() => {
    return (
      <ImageWidget
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
              navigate('ImageModal');
            } else if (item.name === 'Text') {
              navigate('TextModal');
            } else {
              toggleWidgetModal(item.name);
            }
          }}
          className="mx-2 my-1"
        />
      );
    },
    [navigate, toggleWidgetModal]
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
        //@ts-ignore
        ref={videoRef}
        style={styles.fullVideo}
        source={{
          uri: dwnVideo,
        }}
        onError={(error) => {
          logger.log('video error', error);
          showErrorMessage('editor.fail_video');
        }}
        isMuted={false}
        shouldPlay={true}
        volume={1}
        useNativeControls={false}
        resizeMode={ResizeMode.STRETCH}
        isLooping
      />
    ),
    [dwnVideo]
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
          resizeMode="stretch"
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
  const ListMagic = React.useCallback(() => {
    return (
      <React.Fragment
        key={`${elementsKey}-${editorData.elements.length}-${editorData.frame}`}
      >
        {editorData.elements &&
          editorData.elements.map((item: Element, index: number) => {
            return (
              <React.Fragment key={`magic-${index}`}>
                <Magic
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
              </React.Fragment>
            );
          })}
      </React.Fragment>
    );
  }, [
    editorData.elements,
    editorData.frame,
    elementsKey,
    selectedItem,
    setSelectedItem,
    toggleWidgetModal,
  ]);
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
  const handleFontSize = (size: number) => {
    // rotateToDegree 90 to magicRef
    magicRef.current?.changeFontSize(size);
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
            style={[styles.background, { width: dim.width, height: dim.width }]}
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
          //@ts-ignore
          ref={viewShotRef}
          style={[styles.canvas, { width: dim.width, height: dim.width }]}
          options={{
            format: 'png',
            fileName: `OCTORIA`,
            quality: 1,
            width: resolution,
            height: resolution,
          }}
        >
          {editorData.backgroundPost && editorData.bgType === 'photo' && (
            <PostImageComponent />
          )}
          {editorData.frame && <PostFrameComponent />}
          {ListMagic()}
          <View className="absolute -right-3 top-1/2 z-50">
            <FastImage
              source={require('assets/215.png')}
              style={styles.octoria}
              resizeMode="contain"
            />
          </View>
        </ViewShot>
      </TouchableOpacity>
      <View style={styles.widget}>
        <View className="overflow-hidden" style={styles.footerHeight}>
          {widget === ('Photos' as 'Photos') && PostBackgroundList()}
          {widget === ('Videos' as 'Videos') && PostVideoList()}
          {widget === ('Frames' as 'Frames') && PostFrameList()}
          {widget === ('Text' as 'Text') && PostTextWidget()}
          {widget === ('Image' as 'Image') && PostImageWidget()}
        </View>
      </View>
      <View id="footer" style={styles.footer}>
        <View style={styles.footerChild}>
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
    alignItems: 'baseline',
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
  left6: {
    marginLeft: 3,
    opacity: 0.25,
  },
  widget: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 160, //  Widget Height
  },
  fullVideo: {
    width: '100%',
    height: '100%',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80, //  Footer Height
  },
  footerChild: {
    height: 60,
    width: '100%',
    overflow: 'hidden',
  },
  footerHeight: {
    height: 140, //  Footer Height
  },
  octoria: {
    width: 50,
    height: 20,
    transform: [{ rotate: '-90deg' }],
  },
});
export * from './day-list';
export * from './day-list2';
export * from './filters-screen';
export * from './tutorials';
