/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
/* eslint-disable react-native/no-inline-styles */
import { zodResolver } from '@hookform/resolvers/zod';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, ImageBackground } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import * as z from 'zod';

import { useIsSignUp } from '@/core';
import {
  ActivityIndicator,
  Button,
  ControlledInput,
  ControlledSelect,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';

const schema = z.object({
  email: z.string().email(),
  name: z.string().max(50),
  type: z.string(),
  business: z.string().max(50),
});
const user = auth().currentUser;

type FormType = z.infer<typeof schema>;

export const SignUpForm = () => {
  const { handleSubmit, control, setValue } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const isFocused = useIsFocused();
  const [_, setIsSignUp] = useIsSignUp();

  const [image2, setImage] = useState('');
  const [uname2, setUname] = useState('');
  const [email2, setEmail] = useState('');
  const [business2, setBusiness] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [type2, setType] = useState('');
  const { canGoBack, goBack } = useNavigation();

  useEffect(() => {
    // firestore().collection('Test').doc(user?.uid).set({
    //   business: 'this is tets',
    // });
    if (user) {
      setValue('name', uname2);
      setValue('email', email2);
      setValue('business', business2);
      setValue('type', type2);
    }
  }, [business2, email2, type2, uname2, image2, isFocused]);
  useEffect(() => {
    if (user) {
      SetUserType();
      setValue('name', uname2);
      setValue('email', email2);
      setValue('business', business2);
      setValue('type', type2);
    }
  }, []);

  const SetUserType = async () => {
    try {
      setIsLoading(true);
      const userDoc = await firestore()
        .collection('Users')
        .doc(user?.uid)
        .get();

      if (userDoc.exists) {
        const documentSnapshot = userDoc;
        setBusiness(documentSnapshot.data()?.business);
        setType(documentSnapshot.data()?.type);
        setEmail(documentSnapshot.data()?.email);
        setImage(documentSnapshot.data()?.photoUrl);
        setUname(documentSnapshot.data()?.name);
        const isUserSignedUp = !!documentSnapshot.data()?.email;
        setIsSignUp(isUserSignedUp);
      } else {
        setIsSignUp(false);
      }
      setIsLoading(false);
    } catch (error) {}
  };

  const handleImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setIsLoading(true);
      const x = await uploadImage(result.assets[0].uri.toString());
      setIsLoading(false);
      if (x) setImage(x);
    }
  };
  async function uploadImage(uri: string) {
    if (user) {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = storage().ref().child(`images/${user.uid}/avatar.png`);
      await ref.put(blob);
      let x = await ref.getDownloadURL();
      // const update = {
      //   photoURL: x,
      // };

      // await user.updateProfile(update);
      return x;
    }
  }

  const onSubmit = (data: FormType) => {
    try {
      firestore()
        .collection('Users')
        .doc(user?.uid)
        .set({
          business: data.business,
          type: data.type,
          email: data.email,
          name: data.name,
          photoUrl: image2,
        })
        .then(() => {
          showMessage({
            message: 'Profile updated successfully',
            type: 'success',
          });
          if (canGoBack()) goBack();
          setIsSignUp(true);
        })
        .catch(() => {
          showMessage({
            message: 'Error updating profile',
            type: 'danger',
          });
        });
    } catch (error) {}
    // user?.updateProfile({
    //   displayName: data.name,
    // });
  };
  return (
    <View className="flex-1">
      <Image
        source={require('../../../assets/bg-signup.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.1,
        }}
      />
      <ScrollView className="flex-1 p-4">
        <TouchableOpacity
          className="mt-20 mb-8 items-center justify-center"
          onPress={handleImage}
        >
          <ImageBackground
            source={require('../../../assets/bg-img.png')}
            style={{ width: 100, height: 100 }}
          >
            {image2 && (
              <Image
                source={{ uri: image2 }}
                style={{ width: 100, height: 100, borderRadius: 100 }}
              />
            )}
            {isLoading && (
              <View className="absolute inset-0 items-center justify-center">
                <ActivityIndicator color={'black'} size="large" />
              </View>
            )}
          </ImageBackground>
          <Text variant="xs" className="text-slate-400">
            click to upload image
          </Text>
        </TouchableOpacity>
        <ControlledInput
          //@ts-ignore
          control={control}
          // className="bg-transparent"
          name="name"
          placeholder="Name"
        />
        <ControlledInput
          //@ts-ignore
          control={control}
          // className="bg-transparent"
          name="email"
          placeholder="Email"
        />
        <ControlledInput
          //@ts-ignore
          control={control}
          name="business"
          // className="bg-transparent"
          placeholder="Business Name"
        />
        <ControlledSelect
          //@ts-ignore
          control={control}
          name="type"
          options={[
            { label: 'Seller', value: 'Seller' },
            { label: 'Manufacturer', value: 'Manufacturer' },
            { label: 'Marketer', value: 'Marketer' },
          ]}
        />

        <Button
          label="Submit"
          onPress={handleSubmit(onSubmit)}
          variant="outline"
          disabled={image2 ? false : true}
        />
      </ScrollView>
    </View>
  );
};
