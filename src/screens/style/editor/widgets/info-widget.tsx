/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */

/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { zodResolver } from '@hookform/resolvers/zod';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import type { BusinessDataType } from '@/core';
import { useEditorX } from '@/core';
import {
  Image,
  Input,
  ScrollView,
  showErrorMessage,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';

const schema = z.object({
  name: z.string().max(200),
  photo: z.string().max(2048),
  email: z.string().max(200).email(),
  phone: z
    .string()
    .min(6)
    .max(20)
    .regex(
      /^\+(?:\d{1,3})?(?:[\\-\s]?)?[0]?(?:\d{1,15})$/i,
      'Enter a valid phone number'
    ),
  website: z.string().max(50),
  address: z.string().max(200),
});
type FormType = z.infer<typeof schema>;

export const InfoWidget = () => {
  const { control, handleSubmit, setValue } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const id = auth().currentUser?.uid;
  const setBusiness = useEditorX((s) => s.setBusiness);
  const { goBack } = useNavigation();
  const [data, setData] = useState({
    name: '',
    photo: '',
    email: '',
    phone: '',
    website: '',
    address: '',
  });
  useEffect(() => {
    // Reference to the Firestore collection
    const collectionRef = firestore().collection('Users').doc(id);
    // Subscribe to real-time updates
    const unsubscribe = collectionRef.onSnapshot((querySnapshot) => {
      const user: any = querySnapshot?.data();
      // console.log(user?.business);

      const info: any = querySnapshot.get('info');
      if (info) {
        const getValue = (key: string | number, fallbackKey: string | number) =>
          info[key] || user[fallbackKey] || '';
        const businessData = {
          name: getValue('name', 'business'),
          photo: getValue('photo', 'photoUrl'),
          email: getValue('email', 'email'),
          phone: info.phone || '',
          website: info.website || '',
          address: info.address || '',
        };
        setData(businessData);
        setValue('name', businessData.name);
        setValue('photo', businessData.photo);
        setValue('email', businessData.email);
        setValue('phone', businessData.phone);
        setValue('website', businessData.website);
        setValue('address', businessData.address);
        setBusiness(businessData);
      } else {
        const getValue = (key: string | number, fallbackKey: string | number) =>
          user[fallbackKey] || '';
        const businessData = {
          name: getValue('name', 'business'),
          photo: getValue('photo', 'photoUrl'),
          email: getValue('email', 'email'),
          phone: '+91 1234567890',
          website: 'www.octoriahardware.com',
          address: 'example address',
        };
        setData(businessData);
        setValue('name', businessData.name);
        setValue('photo', businessData.photo);
        setValue('email', businessData.email);
        setValue('phone', businessData.phone);
        setValue('website', businessData.website);
        setValue('address', businessData.address);
        setBusiness(businessData);
      }
    });
    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [setValue, id, setBusiness]);
  useEffect(
    () => () => {
      setValue('name', data.name);
      setValue('photo', data.photo);
      setValue('email', data.email);
      setValue('phone', data.phone);
      setValue('website', data.website);
      setValue('address', data.address);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const x = await uploadImage(result.assets[0].uri.toString());
      setData((s) => ({
        ...s,
        photo: x,
      }));
      setValue('photo', x as string);
    }
  };
  async function uploadImage(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref().child(`images/${id}/business_avatar.png`);
    await ref.put(blob);
    let x = await ref.getDownloadURL();
    return x;
  }
  const wh = '100%';
  const addFavorite = async (data3: BusinessDataType) => {
    try {
      if (data3) {
        setBusiness(data3);
        await firestore().collection('Users').doc(id).set(
          { info: data3 },
          {
            merge: true,
          }
        );
      }
    } catch (error) {
      showErrorMessage('info.error_data');
    }
  };
  const onSubmit = (data2: FormType) => {
    addFavorite(data2);
    goBack();
  };
  return (
    <ScrollView>
      <View className="flex-1 flex-col p-5">
        <TouchableOpacity
          onPress={handleImage}
          activeOpacity={1}
          className="w-full items-center justify-center"
        >
          <View className="m-4 h-20 w-20 overflow-hidden rounded-md bg-slate-400">
            {data?.photo && (
              <Image src={data.photo} style={{ width: wh, height: wh }} />
            )}
          </View>
          <Text
            className="text-center"
            style={{ fontSize: 6 }}
            tx={'editor.click_change_image'}
          />
        </TouchableOpacity>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <View>
              <Input
                className="h-10 w-full rounded-lg border-b-2 bg-slate-50 pl-2"
                placeholder="First Name"
                onChangeText={(text) => field.onChange(text)}
                value={field.value}
              />
              <Text className="text-xs text-red-600">
                {fieldState.error ? fieldState.error.message : null}
              </Text>
            </View>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <View>
              <Input
                className="h-10 w-full rounded-lg border-b-2 bg-slate-50 pl-2"
                placeholder="Email"
                onChangeText={(text) => field.onChange(text)}
                value={field.value}
              />
              <Text className="text-xs text-red-600">
                {fieldState.error ? fieldState.error.message : null}
              </Text>
            </View>
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <View>
              <Input
                className="h-10 w-full rounded-lg border-b-2 bg-slate-50 pl-2"
                placeholder="Phone Number"
                onChangeText={(text) => field.onChange(text)}
                value={field.value}
              />
              <Text className="text-xs text-red-600">
                {fieldState.error ? fieldState.error.message : null}
              </Text>
            </View>
          )}
        />
        <Controller
          name="website"
          control={control}
          render={({ field, fieldState }) => (
            <View>
              <Input
                className="h-10 w-full rounded-lg border-b-2 bg-slate-50 pl-2"
                placeholder="Website"
                onChangeText={(text) => field.onChange(text)}
                value={field.value}
              />
              <Text className="text-xs text-red-600">
                {fieldState.error ? fieldState.error.message : null}
              </Text>
            </View>
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <View>
              <Input
                className="h-10 w-full rounded-lg border-b-2 bg-slate-50 pl-2"
                placeholder="Address"
                numberOfLines={2}
                onChangeText={(text) => field.onChange(text)}
                value={field.value}
              />
              <Text className="text-xs text-red-600">
                {fieldState.error ? fieldState.error.message : null}
              </Text>
            </View>
          )}
        />
        <View className="mt-4">
          <TouchableOpacity
            className="rounded-lg border bg-white shadow-xl"
            onPress={handleSubmit(onSubmit)}
          >
            <Text variant="xl" className="text-center" tx={'editor.update'} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
