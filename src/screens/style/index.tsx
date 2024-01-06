/* eslint-disable max-lines-per-function */
import { Stagger } from '@animatereactnative/stagger';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import { BounceInUp } from 'react-native-reanimated';

import {
  FFmpegWrapper,
  getGreetingByTimezone,
  logger,
  speak,
  translate,
  useAssistance,
  useFirestoreLiveQuery,
  useProductsStore,
  useSearchStore,
  useUserStore,
} from '@/core';
import type { FestivalImageType, MainCategory } from '@/types';
import { F_FESTIVAL_IMAGE, F_MAIN_CAROUSEL, F_MAIN_CATEGORY } from '@/types';
import {
  CategoriesList,
  ChooseBrand,
  FocusAwareStatusBar,
  Greeting,
  Image,
  MainCarousel,
  NewProductList,
  ScrollView,
  SearchBar,
  Text,
  View,
  WIDTH,
} from '@/ui';

import { PostCard } from './post-maker';
import { PostModal } from './post-modal';

const dirs = RNFetchBlob.fs.dirs.DocumentDir;
const outputFile = `${dirs}/OCTORIA_${Date.now()}.png`;
// const dirs = RNFetchBlob.fs.dirs.CacheDir;
export const Style = () => {
  logger.log('Style screen loaded', Date.now());

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [update, setUpdate] = useState(1);
  const { navigate } = useNavigation();
  const ffmpeg = React.useMemo(() => new FFmpegWrapper(), []);

  const MainCategories = useFirestoreLiveQuery<MainCategory>(F_MAIN_CATEGORY);
  const User = useUserStore((s) => s.user);
  const setSearch = useSearchStore((s) => s.setSearch);
  const FestivalImage =
    useFirestoreLiveQuery<FestivalImageType>(F_FESTIVAL_IMAGE);

  const { productLoading, products } = useProductsStore();
  const [assist, _] = useAssistance();
  const data = useCallback(
    () => products.filter((product) => product.featured).slice(0, 6),
    [products]
  );
  //use effects start//////////////////////////////
  useEffect(() => {
    // listFiles();
    // testFFmpeg();
    if (User.name) {
      setModalVisible((prev) => {
        if (prev) return prev;
        return true;
      });
    }
  }, [User.name]);
  React.useEffect(() => {
    if (User.name) {
      const greet = getGreetingByTimezone();
      const hello = translate('mainscreen.hello');
      const vars = `${hello} ${User.name}. ${greet}`;

      // Subscribe to real-time updates
      if (assist) speak('assistance.welcome_back', vars);
    }
  }, [User.name, assist]);

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  });
  const backAction = () => {
    Alert.alert('Exit App', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        // onPress: () => ff(),
        style: 'cancel',
      },
      {
        text: 'Exit',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };
  const testFFmpeg = async () => {
    await ffmpeg
      .executeFFmpegCommand(
        `-i https://ibaisindia.co.in/chats/logos/avatar.png -i https://ibaisindia.co.in/chats/logos/bot.png  -filter_complex "[0:v]scale=1600:1600[resized_main];[1:v]scale=1600:1600[resized_cutter];[resized_cutter]format=rgba,alphaextract[alpha];[resized_main][alpha]alphamerge[outv]" -map "[outv]" ${outputFile}`
      )
      .then((res) => {
        console.log(res, '<=========result of filter');
        setImage(`file://${outputFile}`);
      });
  };
  const listFiles = useCallback(async () => {
    // const files = await RNFetchBlob.fs.ls(dirs);
    // collect all files named starting with 'OCTORIA_'
    await RNFetchBlob.fs
      .ls(dirs)
      .then((files) => {
        files
          // .filter((file) => file.startsWith('OCTORIA_'))
          .map(async (file) => {
            console.log(file, '<=====file');
            // do something with the file
            // if (file) {
            //   const path = `${dirs}/${file}`;
            //   // check if file exists
            //   await RNFetchBlob.fs.exists(path).then(async (exist) => {
            //     if (!exist) {
            //       console.log(file, '<=====file from map to does not exists');
            //       return `file does not exist====> ${file}`;
            //     }
            //     await RNFetchBlob.fs.unlink(path);
            //     console.log(file, '<=====file from map to unlink');
            //     return `cache deleted====> ${file.toString()}`;
            //   });
            // }
          });
      })
      .catch((err) => console.log(err));
  }, []);
  const PostcardCategory = React.useCallback(() => {
    return (
      <>
        <PostCard />
        <ChooseBrand
          title={'mainscreen.new_prod'}
          subtitle={'mainscreen.subtitle_new_prod'}
          link={() => {
            setSearch('Hardware');
            //@ts-ignore
            navigate('FeedNavigator', {
              screen: 'Feed',
            });
          }}
        />
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const PostCategoryList = React.useCallback(() => {
    return (
      <>
        <Greeting />
        <View className="py-2 pt-4 ">
          <MainCarousel name={F_MAIN_CAROUSEL} />
        </View>
        <ChooseBrand title={'mainscreen.categories'} />
      </>
    );
  }, []);
  const FestivalImageModal = React.useCallback(() => {
    return (
      <>
        {productLoading ? null : FestivalImage.isLoading ? null : (
          <PostModal
            data={FestivalImage.data}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            User={User}
          />
        )}
      </>
    );
  }, [FestivalImage, User, modalVisible, productLoading]);

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y < 0) {
            setUpdate((prev) => prev + 1);
          }
        }}
        className="flex-1"
      >
        <View className="pt-4">
          <SearchBar />
        </View>
        {PostCategoryList()}
        <Stagger
          key={`stagger-view-${update}`}
          stagger={50}
          entering={() => BounceInUp}
          duration={600}
          exitDirection={-1}
          style={{
            width: WIDTH,
          }}
        >
          <View className="w-full">
            {MainCategories.isLoading ? null : (
              <CategoriesList data={MainCategories.data} />
            )}
          </View>
          {PostcardCategory()}
        </Stagger>
        <View className="h-full w-full">
          {data().length > 0 && (
            <NewProductList data={data()} isLoading={productLoading} />
          )}
        </View>
        {FestivalImageModal()}
      </ScrollView>
      {/* developer screen */}
      <Text
        variant="sm"
        className="absolute bottom-6 right-6 rounded-lg bg-blue-600 p-4 font-sfbold text-white"
        onPress={() => {
          navigate('DeveloperScreen');
        }}
      >
        {'</>'}
      </Text>
    </>
  );
};

export * from './editor';
export * from './image-editor';
export * from './webview';
