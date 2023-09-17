/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
import { Env } from '@env';
// import { useColorScheme } from 'nativewind';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
// import jwtDecode from 'jwt-decode';
import * as React from 'react';
import { Image } from 'react-native';

// import { useAuth } from '@/core';
import { Button, FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';
import { Github, Rate, Share, Support, Website } from '@/ui/icons';
import QR from '@/ui/icons/qr';
import colors from '@/ui/theme/colors';

import { Item } from './item';
import { ItemsContainer } from './items-container';
// import { ThemeItem } from './theme-item';
const user = auth().currentUser;
export const Settings = () => {
  const { navigate } = useNavigation();
  // const isFocused = useIsFocused();
  const [type, setType] = React.useState('');
  const [type2, setType2] = React.useState('');
  const [image, setImage] = React.useState('');
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    const sub = firestore()
      .collection('Users')
      .doc(user?.uid)
      .onSnapshot((documentSnapshot) => {
        const x = documentSnapshot?.data()?.type.toString();
        const x2 = documentSnapshot?.data()?.business.toString();
        const x3 = documentSnapshot?.data()?.name.toString();
        const x4 = documentSnapshot?.data()?.photoUrl.toString();
        setType(x);
        setType2(x2);
        setName(x3);
        setImage(x4);
      });
    return () => sub();
  }, []);
  // React.useEffect(() => {
  //   user?.reload().then(() => {
  //     setImage(user?.photoURL || '');
  //     setName(user?.displayName || '');
  //   });
  // }, [isFocused]);

  // const signOut = () => {
  //   auth().signOut();
  // };

  const iconColor = colors.neutral[400];
  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ItemsContainer>
          <View className=" flex-row p-2 pt-16 ">
            <View
              className="h-32 w-32 rounded-xl p-1"
              style={{ backgroundColor: 'white', elevation: 4 }}
            >
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ flex: 1, borderRadius: 8 }}
                />
              )}
            </View>
            <View className=" p-2 pl-8">
              <Text
                variant="lg"
                numberOfLines={1}
                className="font-varela font-bold"
              >
                {name}
              </Text>
              <Text
                variant="sm"
                numberOfLines={1}
                className="font-varela text-slate-400"
              >
                {type2}
              </Text>
              <Text
                variant="sm"
                numberOfLines={1}
                className="font-varela text-slate-400"
              >
                {type}
              </Text>
              <Button
                label="Edit"
                variant="outline"
                onPress={() => {
                  //@ts-ignore
                  navigate('SignUp');
                }}
              />
            </View>
          </View>
        </ItemsContainer>
        <View className="flex-1 px-4 pt-4">
          {/* <Text variant="lg" className="font-bold">
            {translate('settings.title')}
          </Text> */}
          {/* <ItemsContainer title="settings.generale">
            <LanguageItem />
             <ThemeItem /> 
          </ItemsContainer> */}

          <ItemsContainer title="settings.utility">
            <Item
              text="settings.gst"
              onPress={() => {
                //@ts-ignore
                //09AAAAD2579G1ZP
                navigate('Gst');
              }}
            />
            <Item
              text="settings.scanqr"
              icon={<QR color={iconColor} />}
              onPress={() => {
                //@ts-ignore
                navigate('ScanNGo');
              }}
            />
          </ItemsContainer>
          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          <ItemsContainer title="settings.support_us">
            <Item
              text="settings.share"
              icon={<Share color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.rate"
              icon={<Rate color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.support"
              icon={<Support color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item text="settings.privacy" onPress={() => {}} />
            <Item text="settings.terms" onPress={() => {}} />
            <Item
              text="settings.github"
              icon={<Github color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.website"
              icon={<Website color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          {/* <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={signOut} />
            </ItemsContainer>
          </View> */}
        </View>
      </ScrollView>
    </>
  );
};
