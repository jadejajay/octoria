import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { logger } from '@/core';
import { Login } from '@/screens';

export type AuthStackParamList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  logger.log('auth navigator loaded', Date.now());
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
