/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useColorScheme } from 'nativewind';
import type { ComponentType } from 'react';
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';

import { colors, Feed as FeedIcon, Home } from '@/ui';
import Person from '@/ui/icons/person';

import { FeedNavigator } from './feed-navigator';
import { HomeNavigator } from './home-navigator';
import { SettingNavigator } from './settings-navigator';

export type TabParamList = {
  HomeNavigator: undefined;
  FeedNavigator: undefined;
  SettingNavigator: undefined;
};

type TabType = {
  name: keyof TabParamList;
  component: ComponentType<any>;
  label: string;
};

type TabIconsType = {
  [key in keyof TabParamList]: (props: SvgProps) => JSX.Element;
};

const Tab = createBottomTabNavigator<TabParamList>();

const tabsIcons: TabIconsType = {
  HomeNavigator: (props: SvgProps) => <Home {...props} />,
  FeedNavigator: (props: SvgProps) => <FeedIcon {...props} />,
  SettingNavigator: (props: SvgProps) => <Person {...props} />,
};

export type TabList<T extends keyof TabParamList> = {
  navigation: NativeStackNavigationProp<TabParamList, T>;
  route: RouteProp<TabParamList, T>;
};

const tabs: TabType[] = [
  {
    name: 'HomeNavigator',
    component: HomeNavigator,
    label: 'Home',
  },
  {
    name: 'FeedNavigator',
    component: FeedNavigator,
    label: 'Products',
  },
  {
    name: 'SettingNavigator',
    component: SettingNavigator,
    label: 'Profile',
  },
];

type BarIconType = {
  name: keyof TabParamList;
  color: string;
};

const BarIcon = ({ color, name, ...reset }: BarIconType) => {
  const Icon = tabsIcons[name];
  return <Icon color={color} {...reset} />;
};

export const TabNavigator = () => {
  console.log('Tab navigator started', Date.now());

  const { colorScheme } = useColorScheme();
  return (
    <Tab.Navigator
      backBehavior="order"
      detachInactiveScreens
      key={'tabbar'}
      id="tabbar"
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor:
          colorScheme === 'dark' ? colors.charcoal[400] : colors.neutral[400],
        tabBarIcon: ({ color }) => <BarIcon name={route.name} color={color} />,
      })}
    >
      <Tab.Group
        screenOptions={{
          headerShown: false,
          lazy: true,
        }}
      >
        {tabs.map(({ name, component, label }) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                title: label,
                tabBarTestID: `${name}-tab`,
              }}
            />
          );
        })}
      </Tab.Group>
    </Tab.Navigator>
  );
};
