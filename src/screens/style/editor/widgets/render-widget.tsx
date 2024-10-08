/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { ResizeMode, Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import {
  FFmpegKit,
  FFmpegKitConfig,
  ReturnCode,
} from 'ffmpeg-kit-react-native';
import React from 'react';
import { ToastAndroid } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import { showMessage } from 'react-native-flash-message';

import {
  getImageBase64,
  handleFacebookShare,
  handleInstagramShare,
  handleTelegramShare,
  handleWhatsappShare2,
  useEditorX,
  useRenderStore,
} from '@/core';
// import { handleWhatsappShare } from '@/core';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';

const resolution = 1024;
export const RenderWidget = () => {
  const type = useEditorX((state) => state.editorData.bgType);
  const dwnVideo = useEditorX((state) => state.dwnVideo);
  const renderedAsset = useRenderStore((s) => s.renderedAsset);
  const renderedAssetData = useRenderStore((s) => s.renderedAssetData);
  const setRenderedAsset = useRenderStore((s) => s.setRenderedAsset);
  const setRenderedAssetData = useRenderStore((s) => s.setRenderedAssetData);
  const [progress, setProgress] = React.useState(0);
  const [isLoading, setRenderModalLoading] = React.useState(false);
  const dirs = RNFetchBlob.fs.dirs.DocumentDir;
  React.useEffect(() => {
    captureView();
    return () => {
      FFmpegKit.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const captureView = React.useCallback(async () => {
    console.log('capture called');
    if (type === 'photo') {
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
          const out = `${dirs}/OCTORIA_${Date.now()}.mp4`;
          const cmd = `-i ${dwnVideo} -i ${renderedAsset} -filter_complex "[0:v]scale=${resolution}:${resolution} [video]; [video][1:v]overlay=0:0 [output]" -map 0:a -c:a copy -map 0:a -strict -2 -c:a aac -map "[output]"  -q:v 1 ${out}`;
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
  }, [type]);

  const saveToGallery = async () => {
    if (renderedAsset) {
      const albumName = await MediaLibrary.getAlbumAsync('Octoria');
      if (albumName) {
        const asset = await MediaLibrary.createAssetAsync(renderedAsset);
        const album = await MediaLibrary.addAssetsToAlbumAsync(
          asset,
          albumName.id,
          true
        );
        if (album) {
          ToastAndroid.show(
            `Post saved successfully to Octoria album in your gallery.`,
            ToastAndroid.LONG
          );
        } else {
          ToastAndroid.show(
            `Error Creating assets give permissions`,
            ToastAndroid.LONG
          );
        }
      } else {
        const asset = await MediaLibrary.createAssetAsync(renderedAsset);
        const album = await MediaLibrary.createAlbumAsync(
          'Octoria',
          asset,
          true
        );
        if (album) {
          ToastAndroid.show(
            `Post saved successfully to Octoria album in your gallery.`,
            ToastAndroid.LONG
          );
        } else {
          ToastAndroid.show(
            `Error Creating assets give permissions`,
            ToastAndroid.LONG
          );
        }
      }
    }
  };
  const TYPE = type === 'photo' ? 'image/png' : 'video/mp4';
  const handleWP = async () => {
    if (renderedAssetData) {
      handleWhatsappShare2(
        renderedAssetData,
        'Hi, This Post is generated using Octoria Post maker application',
        TYPE
      );
    }
  };
  const handleIG = async () => {
    if (renderedAssetData) {
      handleInstagramShare(
        renderedAssetData,
        'Hi, This Post is generated using Octoria Post maker application',
        TYPE
      );
    }
  };
  const handleFB = async () => {
    if (renderedAssetData) {
      handleFacebookShare(
        renderedAssetData,
        'Hi, This Post is generated using Octoria Post maker application',
        TYPE
      );
    }
  };
  const handleTG = async () => {
    if (renderedAssetData) {
      handleTelegramShare(
        renderedAssetData,
        'Hi, This Post is generated using Octoria Post maker application',
        TYPE
      );
    }
  };
  return (
    <ScrollView>
      {isLoading && (
        <View className="absolute z-50 h-full w-full flex-col items-center justify-start">
          <View className="mt-40 h-20 w-full flex-col items-center justify-between">
            <ActivityIndicator size={50} />
            <Text className="font-varela text-lg">
              Generating Your {type === 'video' ? 'Video' : 'Image'}
              {progress % 2 === 0
                ? progress % 3 === 0
                  ? progress % 5 === 0
                    ? ' 😍'
                    : ' 😋'
                  : ' 😊'
                : ' 😑'}
            </Text>
          </View>
        </View>
      )}
      <View
        className="overflow-hidden"
        style={{ width: '100%', aspectRatio: 1 }}
      >
        {type === 'video' && renderedAsset ? (
          <Video
            style={{ flex: 1 }}
            source={{
              uri: renderedAsset,
            }}
            isMuted={false}
            volume={1}
            shouldPlay={true}
            useNativeControls={true}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
        ) : (
          type === 'photo' &&
          renderedAsset && (
            <Image
              src={renderedAsset}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="contain"
            />
          )
        )}
      </View>
      <View className="flex-column w-full justify-around p-4">
        <TouchableOpacity
          className="m-2 w-full flex-row items-center"
          activeOpacity={1}
          onPress={handleWP}
        >
          <Image
            src={
              'http://itekindia.com/chats/bgimages/whatsapp-1623579_1280.webp'
            }
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
          <Text variant="sm" className="ml-4 font-varela text-xl">
            Share on Whatsapp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="m-2 w-full flex-row items-center"
          activeOpacity={1}
          onPress={handleIG}
        >
          <Image
            src={
              'http://itekindia.com/chats/bgimages/instagram-1675670_1280.webp'
            }
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
          <Text className="ml-4 font-varela text-xl">Share on Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="m-2 w-full flex-row items-center"
          activeOpacity={1}
          onPress={handleFB}
        >
          <Image
            src={
              'http://itekindia.com/chats/bgimages/3D_Square_with_Facebook_Logo.webp'
            }
            style={{ width: 50, height: 50 }}
            resizeMode="cover"
          />
          <Text className="ml-4 font-varela text-xl">Share on Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="m-2 w-full flex-row items-center"
          activeOpacity={1}
          onPress={handleTG}
        >
          <Image
            src={
              'http://itekindia.com/chats/bgimages/realistic_3d_square_with_telegram_logo.webp'
            }
            style={{ width: 50, height: 50 }}
            resizeMode="cover"
          />
          <Text className="ml-4 font-varela text-xl">Share on Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={saveToGallery}
          className="h-16 w-full"
          activeOpacity={1}
        >
          <Image
            src={
              'http://itekindia.com/chats/bgimages/download-155424_1280.webp'
            }
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
