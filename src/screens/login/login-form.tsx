/* eslint-disable max-lines-per-function */
import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import IntlPhoneField from 'react-native-intl-phone-field';

import {
  ActivityIndicator,
  Button,
  NoData,
  ReversibleCountdownButton,
  showErrorMessage,
  showSuccessMessage,
  VerifCode,
  View,
} from '@/ui';
export const LoginForm = () => {
  const [confirm, setConfirm] = useState<any>();
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [error2, setError2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function signInWithPhoneNumber() {
    try {
      setIsLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

      setConfirm(confirmation);
      setIsLoading(false);
      showSuccessMessage('login.otp_sent');
    } catch (error) {
      setIsLoading(false);
      showErrorMessage('login.network_error');
    }
  }
  async function onOtpConfirm(code: any) {
    try {
      setIsLoading(true);
      await confirm.confirm(code);
      setIsLoading(false);

      showSuccessMessage('login.login_success');
    } catch (error) {
      setIsLoading(false);
      showErrorMessage('login.otp_failed');
    }
  }
  if (!confirm) {
    return (
      <View className="flex-1 p-4">
        {isLoading && (
          <View className="absolute z-50 h-full w-full items-center justify-center">
            <ActivityIndicator color={'black'} size="large" />
          </View>
        )}
        <View className="mt-20 items-center justify-center">
          <NoData width={100} height={100} />
        </View>
        <View className="mt-20 items-center justify-center">
          {isLoading ? null : (
            <IntlPhoneField
              onValidation={(isValid: any) => setError2(!isValid)}
              defaultCountry="IN"
              defaultPrefix="+91"
              onValueUpdate={setPhoneNumber}
            />
          )}
        </View>
        <View className="mt-20 ">
          <Button
            testID="login-button"
            label="Login"
            onPress={() => signInWithPhoneNumber()}
            variant="primary"
            disabled={error2}
          />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      {isLoading && (
        <View className="absolute z-50 h-full w-full items-center justify-center">
          <ActivityIndicator color={'black'} size="large" />
        </View>
      )}
      <View className="mt-20 items-center  justify-center">
        <NoData width={100} height={100} />
      </View>
      <View className="mt-20 items-center justify-center">
        <VerifCode onFulfill={(code) => onOtpConfirm(code)} />
        <ReversibleCountdownButton onPress={() => signInWithPhoneNumber()} />
      </View>
    </View>
  );
};
