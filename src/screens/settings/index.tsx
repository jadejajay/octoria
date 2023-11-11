/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
import { Env } from '@env';
// import { useColorScheme } from 'nativewind';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
// import jwtDecode from 'jwt-decode';
import * as React from 'react';

import { openLinkInBrowser } from '@/core';
import useFirestoreDocLiveQuery from '@/core/hooks/use-firestore-doc';
// import { useAuth } from '@/core';
import {
  Button,
  FocusAwareStatusBar,
  Image,
  ScrollView,
  Text,
  View,
} from '@/ui';
import { Github, Rate, Share, Support, Website } from '@/ui/icons';
import QR from '@/ui/icons/qr';
import colors from '@/ui/theme/colors';

import { Item } from './item';
import { ItemsContainer } from './items-container';
// import { ThemeItem } from './theme-item';
export const Settings = () => {
  const { navigate } = useNavigation();
  const user = auth().currentUser;
  // const isFocused = useIsFocused();
  const { data } = useFirestoreDocLiveQuery('links', 'settings');
  const User = useFirestoreDocLiveQuery('Users', user?.uid as string);

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
              {User?.data?.photoUrl && (
                <Image
                  src={User?.data?.photoUrl}
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
                {User?.data?.name}
              </Text>
              <Text
                variant="sm"
                numberOfLines={1}
                className="font-varela text-slate-400"
              >
                {User?.data?.type}
              </Text>
              <Text
                variant="sm"
                numberOfLines={1}
                className="font-varela text-slate-400"
              >
                {User?.data?.business}
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
              onPress={() => {
                data?.share ? openLinkInBrowser(data?.share) : {};
              }}
            />
            <Item
              text="settings.rate"
              icon={<Rate color={iconColor} />}
              onPress={() => {
                data?.rate ? openLinkInBrowser(data?.rate) : {};
              }}
            />
            <Item
              text="settings.support"
              icon={<Support color={iconColor} />}
              onPress={() => {
                data?.support ? openLinkInBrowser(data?.support) : {};
              }}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item
              text="settings.privacy"
              onPress={() => {
                data?.privacy ? openLinkInBrowser(data?.privacy) : {};
              }}
            />
            <Item
              text="settings.terms"
              onPress={() => {
                data?.terms ? openLinkInBrowser(data?.terms) : {};
              }}
            />
            <Item
              text="settings.github"
              icon={<Github color={iconColor} />}
              onPress={() => {
                data?.github ? openLinkInBrowser(data?.github) : {};
              }}
            />
            <Item
              text="settings.website"
              icon={<Website color={iconColor} />}
              onPress={() => {
                data?.website ? openLinkInBrowser(data?.website) : {};
              }}
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
