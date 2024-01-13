/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
/* eslint-disable react-native/no-inline-styles */
import { zodResolver } from '@hookform/resolvers/zod';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, ImageBackground } from 'react-native';
import * as z from 'zod';

import { logger, useIsSignUp } from '@/core';
import { uploadImage } from '@/core/upload-image';
import { F_USERS } from '@/types';
import {
  ActivityIndicator,
  Button,
  ControlledInput,
  ControlledSelect,
  ScrollView,
  showErrorMessage,
  showSuccessMessage,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';

const schema = z.object({
  email: z.string().email(),
  name: z.string().max(50).min(3).nonempty(),
  type: z.string().nonempty(),
  business: z.string().max(50).min(2).nonempty(),
});

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
  const user = auth().currentUser;

  useEffect(() => {
    if (user) {
      setValue('name', uname2);
      setValue('email', email2);
      setValue('business', business2);
      setValue('type', type2);
    }
  }, [business2, email2, type2, uname2, isFocused]);
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
        .collection(F_USERS)
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
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleImage = React.useCallback(async () => {
    // No permissions request is necessary for launching the image library
    setIsLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const x = await uploadImage(result.assets[0].uri.toString(), user);
      setImage(x as string);
      logger.log('Image set', x);
      setIsLoading(false);
    }
    setIsLoading(false);
  }, []);

  const onSubmit = (data: FormType) => {
    if (!image2) {
      showErrorMessage('signup.add_photo');
    } else {
      try {
        firestore()
          .collection(F_USERS)
          .doc(user?.uid)
          .set({
            business: data.business,
            type: data.type,
            email: data.email,
            name: data.name,
            photoUrl: image2,
          })
          .then(() => {
            showSuccessMessage('signup.profile_updated');
            if (canGoBack()) goBack();
            setIsSignUp(true);
          })
          .catch(() => {
            showErrorMessage('signup.error_profile');
          });
      } catch (error) {
        setIsLoading(false);
      }
    }
  };
  return (
    <View className="flex-1">
      <Image
        source={require('assets/bg-signup.png')}
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
          className="mb-8 mt-20 items-center justify-center"
          onPress={handleImage}
        >
          <ImageBackground
            source={require('assets/bg-img.png')}
            style={{ width: 100, height: 100 }}
          >
            {image2 && (
              <Image
                source={{ uri: image2 }}
                style={{ width: 100, height: 100, borderRadius: 20 }}
              />
            )}
            {isLoading && (
              <View className="absolute h-full w-full items-center justify-center">
                <ActivityIndicator color={'black'} size="large" />
              </View>
            )}
          </ImageBackground>
          <Text
            variant="xs"
            className="text-slate-400"
            tx={'signup.click_to_upload'}
          />
        </TouchableOpacity>
        <ControlledInput
          //@ts-ignore
          control={control}
          name="name"
          placeholder="Name"
          error="Please enter a valid name"
        />
        <ControlledInput
          //@ts-ignore
          control={control}
          name="email"
          placeholder="Email"
          error="Please enter a valid email"
        />
        <ControlledInput
          //@ts-ignore
          control={control}
          name="business"
          placeholder="Business Name"
          error="Please enter a valid business name"
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
          error="Please select a type"
        />

        <Button
          label="signup.submit"
          onPress={handleSubmit(onSubmit)}
          variant="outline"
        />
      </ScrollView>
    </View>
  );
};
