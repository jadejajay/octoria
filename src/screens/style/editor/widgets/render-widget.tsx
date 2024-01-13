/* eslint-disable max-lines-per-function */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { Env } from '@env';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { StyleSheet } from 'react-native';

import {
  FFmpegWrapper,
  handleFacebookShare,
  handleInstagramShare,
  handleTelegramShare,
  handleWhatsappShare2,
  logger,
  saveToGallery,
  sharePost,
  useEditorX,
  useRenderStore,
} from '@/core';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  showErrorMessage,
  Text,
  TouchableOpacity,
  View,
  WIDTH,
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
  const { goBack, navigate } = useNavigation();
  const ffmpeg = new FFmpegWrapper();
  React.useEffect(() => {
    captureView();
    return () => {
      ffmpeg.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [progress2, _setProgress2] = React.useState(3);
  React.useEffect(() => {
    if (renderedAsset) {
      logger.log('renderedAsset', renderedAsset);
    }
  }, [renderedAsset, progress2]);

  const captureView = React.useCallback(async () => {
    if (type === 'photo') {
    } else {
      try {
        if (dwnVideo) {
          logger.log('dwnVideo', dwnVideo);
          setRenderedAsset('');
          setRenderModalLoading(true);
          ffmpeg.Logs(setProgress);
          ffmpeg
            .combineVideoImage({
              dwnVideo,
              renderedAsset,
              resolution,
              ext: 'mp4',
            })
            .then(async (res) => {
              if (res) {
                setRenderedAsset(res);
                await ffmpeg
                  .getImageBase64(res)
                  .then((base64: string | null) => {
                    if (base64) setRenderedAssetData(base64);
                  });
              }
            })
            .finally(() => {
              setRenderModalLoading(false);
            });
        }
      } catch (error) {
        logger.error(error);
        setRenderModalLoading(false);
        showErrorMessage('render.failed_gen_video');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  const TYPE = type === 'photo' ? 'image/png' : 'video/mp4';
  const handleWP = async () => {
    if (renderedAssetData) {
      handleWhatsappShare2(renderedAssetData, sharePost({ type: type }), TYPE);
    }
  };
  const handleIG = async () => {
    if (renderedAssetData) {
      handleInstagramShare(renderedAssetData, sharePost({ type: type }), TYPE);
    }
  };
  const handleFB = async () => {
    if (renderedAssetData) {
      handleFacebookShare(renderedAssetData, sharePost({ type: type }), TYPE);
    }
  };
  const handleTG = async () => {
    if (renderedAssetData) {
      handleTelegramShare(renderedAssetData, sharePost({ type: type }), TYPE);
    }
  };
  return (
    <ScrollView>
      <View className="h-8 pl-2">
        <MaterialCommunityIcons
          name="arrow-left-bold"
          size={24}
          onPress={() => goBack()}
        />
      </View>
      {isLoading && (
        <View className="absolute z-50 h-full w-full flex-col items-center justify-start">
          <View className="mt-40 h-20 w-full flex-col items-center justify-between">
            <ActivityIndicator size={50} />
            <Text className="font-sfbold text-lg">
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
        style={[styles.mainPhoto, styles.shadow]}
      >
        {type === 'video' && renderedAsset ? (
          <Video
            style={styles.video}
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
            <TouchableOpacity
              activeOpacity={1}
              style={styles.video}
              onPress={() => navigate('ImageViewer', { url: renderedAsset })}
            >
              <Image
                src={renderedAsset}
                className="h-full w-full rounded-xl"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )
        )}
      </View>
      <View className="flex-column w-full justify-around p-4">
        <TouchableOpacity
          style={[styles.shadow, styles.button]}
          activeOpacity={1}
          onPress={handleWP}
        >
          <Image
            src={Env.SHARE_WHATSAPP}
            className="h-12 w-12"
            resizeMode="contain"
          />
          <Text
            variant="sm"
            className="ml-4 font-sfbold text-xl"
            tx={'editor.share_whatsapp'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.shadow, styles.button]}
          activeOpacity={1}
          onPress={handleIG}
        >
          <Image
            src={Env.SHARE_INSTAGRAM}
            className="h-12 w-12"
            resizeMode="contain"
          />
          <Text
            className="ml-4 font-sfbold text-xl"
            tx={'editor.share_instagram'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.shadow, styles.button]}
          activeOpacity={1}
          onPress={handleFB}
        >
          <Image
            src={Env.SHARE_FACEBOOK}
            className="h-12 w-12"
            resizeMode="cover"
          />
          <Text
            className="ml-4 font-sfbold text-xl"
            tx={'editor.share_facebook'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.shadow, styles.button]}
          activeOpacity={1}
          onPress={handleTG}
        >
          <Image
            src={Env.SHARE_TELEGRAM}
            className="h-12 w-12"
            resizeMode="cover"
          />
          <Text
            className="ml-4 font-sfbold text-xl"
            tx={'editor.share_telegram'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => saveToGallery(renderedAsset)}
          style={[styles.shadow, styles.button]}
          activeOpacity={1}
        >
          <Image
            src={Env.SHARE_DOWNLOAD}
            className="h-full w-full"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: 50,
    height: 50,
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    padding: 10,
  },
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
  mainPhoto: {
    width: WIDTH - 20,
    aspectRatio: 1,
    marginTop: 30,
    margin: 10,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: '#fff',
    overflow: 'hidden',
  },
});
