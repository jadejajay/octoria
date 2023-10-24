/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */

import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { ToastAndroid } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import type { ShareSingleOptions, Social } from 'react-native-share';
import Share from 'react-native-share';

import useFavorites from '@/core/hooks/use-favorite';
import useFirestoreDocLiveQuery from '@/core/hooks/use-firestore-doc';
import type { Product } from '@/types';
// import { addToCart } from '@/core';
import { Text, TouchableOpacity, View } from '@/ui';

import ButtonRow from './button-row';
import HorizontalLine from './horizontal-line';

export const ProductDetails = ({ item }: { item: Product }) => {
  const navigation = useNavigation();
  const { addFavorite, deleteFavorite, isFavorite } = useFavorites();
  const isItemInFavorites = isFavorite(item.id);
  const [Size, setSize] = React.useState('');
  const [Finishing, setFinishing] = React.useState('');
  const server = useFirestoreDocLiveQuery('links', 'server');
  const share = useFirestoreDocLiveQuery('links', 'share');
  const handleButtonPress1 = (_: any, item2: any) => {
    setSize(item2);
  };
  const handleButtonPress2 = (_: any, item2: any) => {
    setFinishing(item2);
  };
  // const handleEnquiry = () => {
  //   const LINK = `https://api.whatsapp.com/send?phone=918734845201&text=Hello, I have an inquiry for Octoria Product ${
  //     item.name
  //   } ${Size ? ' with' : Finishing ? ' with' : ''} ${
  //     Size ? Size + ' Size' : ''
  //   } ${
  //     Finishing
  //       ? Size
  //         ? ' and ' + Finishing + ' Finishing'
  //         : Finishing + ' Finishing'
  //       : ''
  //   }  from mobile application. http://itekindia.com/octoria/products-image/demo.htm`;
  //   openLinkInBrowser(LINK);
  //   showMessage({
  //     message: 'Enquiry sent successfully',
  //     type: 'success',
  //   });
  // };

  const handleEnquiry = async () => {
    //https://api.whatsapp.com/send?phone=918734845201&text=
    const LINK = `Hello, I have an inquiry for Octoria Product ${item.name} ${
      Size ? ' with' : Finishing ? ' with' : ''
    } ${Size ? Size + ' Size' : ''} ${
      Finishing
        ? Size
          ? ' and ' + Finishing + ' Finishing'
          : Finishing + ' Finishing'
        : ''
    }  from mobile application. ${
      server.data?.url
    }octoria/products-image/product.php?imageUrl=${item.image3d}`;
    // openLinkInBrowser(LINK);
    try {
      const options: ShareSingleOptions = {
        title: 'Share via WhatsApp',
        message: LINK,
        // type: 'image/*',
        // url: item.image3d, // The URI of the image you want to share
        // image: item.image3d,
        // filename: item.image3d,
        social: Share.Social.WHATSAPP as Social,
        //@ts-ignore
        whatsAppNumber: share?.data?.phone,
        appId: 'com.whatsapp',
      };

      await Share.shareSingle(options);
    } catch (error) {
      console.error(error);
      ToastAndroid.show('Some Error', ToastAndroid.SHORT);
    }
  };

  return (
    <View className="px-2">
      <View className="w-full ">
        <View
          className="mt-6 flex-row items-center justify-around rounded-xl p-2"
          style={{ backgroundColor: 'white', elevation: 8 }}
        >
          {item?.catalogue && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Catalogue', {
                  url: item.catalogue as string,
                });
              }}
              className="flex-row items-center"
            >
              <Entypo name="info-with-circle" size={18} />
              <Text className="px-2 font-varela text-sm">Catalogue</Text>
            </TouchableOpacity>
          )}
          {item?.image3d && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ShareCam', {
                  url: item.image3d as string,
                })
              }
              className="flex-row items-center"
            >
              <Entypo name="camera" size={22} />
              <View className="">
                <Text className="px-2 font-varela text-sm">Try Now</Text>
                <Text
                  className="px-2 font-varela leading-3 text-slate-400"
                  style={{ fontSize: 8 }}
                >
                  Use Your Own Background
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {item?.material && (
        <View className="mt-4">
          <Text variant="lg" className="pl-2 font-varela font-bold">
            Material
          </Text>
          <Text variant="md" className="pl-2 font-varela">
            {item.material}
          </Text>
        </View>
      )}

      <HorizontalLine style="mt-2" color="#56a8" />
      <ButtonRow
        title={'Sizes'}
        titles={item.sizes as string[]}
        onButtonPress={handleButtonPress1}
      />
      <HorizontalLine style="mt-2" color="#56a8" />
      <ButtonRow
        title={'Finishing'}
        titles={item.finishing as string[]}
        onButtonPress={handleButtonPress2}
      />
      <HorizontalLine style="mt-2" color="#56a8" />
      {isItemInFavorites ? (
        <TouchableOpacity
          className="m-2 flex-row items-center justify-center rounded-lg py-3"
          style={{ backgroundColor: 'white', elevation: 8 }}
          onPress={() => {
            showMessage({
              message: 'removed from favorite',
              type: 'success',
              icon: 'success',
            });
            deleteFavorite(item.id);
          }}
        >
          <Entypo name="heart" size={18} color="black" />
          <Text
            className="px-2 font-varela text-xl  text-black"
            numberOfLines={1}
          >
            Remove From Favorite
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="m-2 flex-row items-center justify-center rounded-lg py-3"
          style={{ backgroundColor: 'white', elevation: 4 }}
          onPress={() => {
            showMessage({
              message: 'Added to cart',
              type: 'success',
              icon: 'success',
            });
            addFavorite(item.id, item.name, item.category, item.images[0]);
          }}
        >
          <Entypo name="heart-outlined" size={18} color="black" />
          <Text
            className="px-2 font-varela text-xl text-black"
            numberOfLines={1}
          >
            Add to Favorite
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        className="m-2 flex-row items-center justify-center rounded-lg bg-black py-3 "
        style={{ elevation: 4 }}
        onPress={handleEnquiry}
      >
        <Entypo name="mail-with-circle" size={18} color="white" />
        <Text
          className="px-2 font-varela text-xl  text-white  dark:text-black"
          numberOfLines={1}
        >
          Enquiry Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};
