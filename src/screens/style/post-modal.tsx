/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
import { MaterialIcons } from '@expo/vector-icons';
// import { ReactToJson } from '@/core/react-to-json';
import { LinearGradient } from 'expo-linear-gradient';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import React, { useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { captureRef } from 'react-native-view-shot';

import { logger, saveToGallery, shareImageWithTitle } from '@/core';
import { sharePost } from '@/core/share-strings';
import { ActivityIndicator, Text, TouchableOpacity, View } from '@/ui';

type Props = {
  data: any;
  modalVisible: any;
  setModalVisible: any;
  User: any;
};
export const PostModal = ({
  data,
  setModalVisible,
  modalVisible,
  User,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();

  const onShare = async () => {
    try {
      setLoading(true);
      const localUri = await captureRef(imageRef, {
        quality: 1,
      });
      shareImageWithTitle(localUri, sharePost({ type: 'Post' }));
      setLoading(false);
    } catch (e) {
      logger.error(e);
      setLoading(false);
    }
  };
  const onSaveImageAsync = async () => {
    try {
      setLoading(true);
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        // await MediaLibrary.saveToLibraryAsync(localUri);
        await saveToGallery(localUri);
        ToastAndroid.show('Photo Saved to Gallery !', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          'Permission denied go to setting and give permission !',
          ToastAndroid.SHORT
        );
      }

      setLoading(false);
    } catch (e) {
      logger.log(e);
      ToastAndroid.show('Permission denied !', ToastAndroid.SHORT);
      setLoading(false);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      {loading && (
        <View className="absolute z-50 h-full w-full items-center justify-center">
          <ActivityIndicator color={'black'} size="large" />
        </View>
      )}
      <View className="absolute h-full w-full items-center justify-center">
        <ActivityIndicator color={'red'} size="large" />
      </View>
      {modalVisible && (
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={styles.centeredView2}
            onPress={() => setModalVisible(!modalVisible)}
          />
          <TouchableWithoutFeedback style={styles.modalView}>
            <View
              ref={imageRef}
              collapsable={false}
              style={{
                width: '95%',
                height: 450,
                borderColor: '#fff',
                backgroundColor: '#fff',
                borderWidth: 4,
                elevation: 5,
              }}
            >
              <Post data={data} name={User.name} photo={User.photoUrl} />
            </View>
          </TouchableWithoutFeedback>
          <View className="w-48 flex-row justify-between px-4">
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => onSaveImageAsync()}
            >
              <MaterialIcons name="file-download" size={20} color="green" />
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <MaterialIcons name="close" size={20} color="red" />
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => onShare()}
            >
              <MaterialIcons name="share" size={20} color="blue" />
            </Pressable>
          </View>
        </View>
      )}
    </Modal>
  );
};

const Post = ({
  data,
  name,
  photo,
}: {
  data: any;
  name: string;
  photo: string;
}) => {
  const image = data[0]?.image;

  return (
    <View className="flex-1 overflow-hidden bg-white">
      <View className="elevation-4 absolute -right-10 top-3 z-50 scale-75 flex-row items-center rounded-full bg-white p-2 pr-10">
        <FastImage
          source={require('assets/logo.png')}
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        />
        <Text className="ml-2 font-sfbold text-xs">IBAIS MEDIA</Text>
      </View>
      <View className="flex-1">
        <View className="h-5/6">
          {image ? (
            <FastImage
              source={{ uri: image }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="stretch"
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text>All Izz Well🤗</Text>
            </View>
          )}
        </View>
        <View className="h-1/6">
          <LinearGradient
            colors={['#000', '#727272']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          />
          <LinearGradient
            colors={['#635a6c', '#463e4e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: 'absolute',
              bottom: -40,
              left: -35,
              width: 350,
              height: 70,
              borderRadius: 35,
            }}
          />
          <View className="elevation-4 absolute -top-12 left-2 h-24 w-24 overflow-hidden rounded-full border-2 border-white">
            {photo ? (
              <FastImage
                source={{
                  uri: photo,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="stretch"
              />
            ) : null}
          </View>
          <View className="elevation-4 absolute left-36 right-0 top-1 grow overflow-hidden">
            <Text className="self-start font-sfregular text-base text-white">
              {name ? name : 'Guest'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalView: {
    width: 354,
    height: 404,
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalImage: {
    width: 350,
    height: 350,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 3,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
