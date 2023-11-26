/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Switch } from 'react-native';

import { openLinkInBrowser, useFirestoreDocLiveQuery } from '@/core';
import { useAssistance } from '@/core/hooks/use-assistance';
import {
  Button,
  colors,
  FocusAwareStatusBar,
  Image,
  ScrollView,
  Text,
  View,
} from '@/ui';
import { Github, QR, Rate, Share, Support, Website } from '@/ui/icons';

import { Item } from './item';
import { ItemsContainer } from './items-container';
export const Settings = () => {
  const { navigate } = useNavigation();
  const [isEnabled, setIsEnable] = useAssistance();
  const user = auth().currentUser;
  const { data } = useFirestoreDocLiveQuery('links', 'settings');
  const User = useFirestoreDocLiveQuery('Users', user?.uid as string);
  const iconColor = colors.neutral[400];
  const signOut = () => {
    auth().signOut();
  };
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
          <ItemsContainer title="settings.utility">
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
            <View className="flex-row items-center justify-between px-4">
              <Text variant="md" className="text-center font-varela">
                Assistance
              </Text>
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
          <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={signOut} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export * from './gstscreen';
export * from './scanandgo';
