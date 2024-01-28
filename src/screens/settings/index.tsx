/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
import { Stagger } from '@animatereactnative/stagger';
import { Env } from '@env';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Switch } from 'react-native';
import { FadeOutDown, FlipInXDown } from 'react-native-reanimated';

import {
  getImageBase64,
  handleWhatsappShare2,
  openLinkInBrowser,
  useAssistance,
  useFirestoreDocLiveQuery,
} from '@/core';
import { F_LINKS, F_LINKS_SETTINGS, F_USERS } from '@/types';
import {
  Button,
  colors,
  FocusAwareStatusBar,
  Image,
  IS_IOS,
  ScrollView,
  Text,
  View,
  WIDTH,
} from '@/ui';
import { QR, Rate, Share, Support, Website } from '@/ui/icons';

import { Item } from './item';
import { ItemsContainer } from './items-container';
import { LanguageItem } from './language-item';
export const Settings = () => {
  const { navigate } = useNavigation();
  const [update, setUpdate] = React.useState(1);
  const [image, setImage] = React.useState('');
  const [isEnabled, setIsEnable] = useAssistance();
  const user = auth().currentUser;
  const fdata = useFirestoreDocLiveQuery(F_LINKS, F_LINKS_SETTINGS);
  const data = fdata?.data as {
    shareimage: string;
    share: string;
    feedback: string;
    rate: string;
    rateios: string;
    support: string;
    privacy: string;
    terms: string;
    website: string;
  };
  const letImage = data?.shareimage || false;
  const User = useFirestoreDocLiveQuery(F_USERS, user?.uid as string);
  const iconColor = colors.neutral[400];

  React.useEffect(() => {
    if (letImage) {
      getImageBase64(letImage).then((res) => {
        setImage(res);
      });
    }
  }, [letImage]);
  const signOut = () => {
    auth().signOut();
  };
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y < 0) {
            setUpdate((prev) => prev + 1);
          }
        }}
      >
        <Stagger
          key={`stagger-${update}-${user?.displayName}`}
          stagger={50}
          duration={300}
          exitDirection={-1}
          entering={() => FlipInXDown.springify()}
          exiting={() => FadeOutDown.springify()}
          style={{
            width: WIDTH,
          }}
        >
          <ItemsContainer>
            <View className="flex-row p-2 pt-16">
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
                  label="settings.edit"
                  variant="outline"
                  onPress={() => {
                    //@ts-ignore
                    navigate('SignUp');
                  }}
                />
              </View>
            </View>
          </ItemsContainer>
          <View className="h-full w-full px-4 pt-4">
            <ItemsContainer title="settings.utility">
              <Item
                text="settings.gallery"
                onPress={() => {
                  navigate('Gallery');
                }}
              />
              <Item
                text="settings.gst"
                onPress={() => {
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
              <LanguageItem />
              <View className="flex-row items-center justify-between px-4">
                <Text
                  variant="md"
                  className="text-center font-varela"
                  tx={'setting.assistance'}
                />
                <Switch
                  trackColor={{ false: '#0004', true: '#07ab86' }}
                  thumbColor="#fff"
                  ios_backgroundColor="#0005"
                  onValueChange={(value) => {
                    setIsEnable(value);
                  }}
                  value={isEnabled}
                />
              </View>
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
                  data?.share &&
                    image &&
                    handleWhatsappShare2(image, data?.share, 'image/png');
                }}
              />
              <Item
                text="settings.feedback"
                icon={
                  <MaterialCommunityIcons
                    name="message-text-outline"
                    size={20}
                    color={iconColor}
                  />
                }
                onPress={() => {
                  data?.feedback && openLinkInBrowser(data?.feedback);
                }}
              />
              <Item
                text="settings.rate"
                icon={<Rate color={iconColor} />}
                onPress={() => {
                  IS_IOS
                    ? data?.rateios && openLinkInBrowser(data?.rateios)
                    : data?.rate && openLinkInBrowser(data?.rate);
                }}
              />
              <Item
                text="settings.support"
                icon={<Support color={iconColor} />}
                onPress={() => {
                  data?.support && openLinkInBrowser(data?.support);
                }}
              />
            </ItemsContainer>
            <ItemsContainer title="settings.links">
              <Item
                text="settings.privacy"
                onPress={() => {
                  data?.privacy && openLinkInBrowser(data?.privacy);
                }}
              />
              <Item
                text="settings.terms"
                onPress={() => {
                  data?.terms && openLinkInBrowser(data?.terms);
                }}
              />
              <Item
                text="settings.website"
                icon={<Website color={iconColor} />}
                onPress={() => {
                  data?.website && openLinkInBrowser(data?.website);
                }}
              />
              <Item text="settings.logout" onPress={signOut} />
            </ItemsContainer>
            <View className="mx-16 my-8 border-b-2 border-slate-200" />
          </View>
        </Stagger>
      </ScrollView>
    </>
  );
};

export * from './gallery';
export * from './gstscreen';
export * from './image-viewer';
export * from './scanandgo';
