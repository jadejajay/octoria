/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
///////////////////////////////////////////////////////////////////////////////////////////////////////////
import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import IntlPhoneField from 'react-native-intl-phone-field';

// import SmsRetriever from 'react-native-sms-retriever';
import { ActivityIndicator, Button, View } from '@/ui';
import VerifCode from '@/ui/core/input/rnverifcode';
import ReversibleCountdownButton from '@/ui/core/reverce-count';
export const LoginForm = () => {
  // const inputRef = useRef<InputOutline>(null);
  const [confirm, setConfirm] = useState<any>();
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [error2, setError2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   onPhoneNumberPressed();
  //   setIsLoading(false);
  // }, []);

  // const onPhoneNumberPressed = async () => {
  //   try {
  //     const phoneNumber2 = await SmsRetriever.requestPhoneNumber();
  //     setPhoneNumber(phoneNumber2);
  //   } catch (error) {
  //     console.log(JSON.stringify(error));
  //   }
  // };
  // Handle the button press
  async function signInWithPhoneNumber() {
    try {
      setIsLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

      setConfirm(confirmation);
      setIsLoading(false);
      showMessage({
        icon: 'success',
        message: `Otp send to phone number successfully`,
        duration: 2000,
      });
    } catch (error) {
      showMessage({
        icon: 'danger',
        message: `Invalid credentials,${error}`,
        duration: 2000,
      });
    }
  }
  async function onOtpConfirm(code: any) {
    try {
      setIsLoading(true);
      await confirm.confirm(code);
      setIsLoading(false);

      showMessage({
        icon: 'success',
        message: 'Login Successful',
        duration: 1000,
      });
    } catch (error) {
      showMessage({
        icon: 'danger',
        message: `Invalid credentials,${error}`,
        duration: 2000,
      });
    }
  }
  if (!confirm) {
    return (
      <View className="flex-1 p-4">
        {isLoading && (
          <View className="absolute inset-0 z-50 items-center justify-center">
            <ActivityIndicator color={'black'} size="large" />
          </View>
        )}
        <View className="mt-20 items-center justify-center">
          <Image
            source={require('../../../assets/logo_big.png')}
            style={{ width: 100, height: 100 }}
          />
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
        <View className="absolute inset-0 z-50 items-center justify-center">
          <ActivityIndicator color={'black'} size="large" />
        </View>
      )}
      <View className="mt-20 items-center  justify-center">
        <Image
          source={require('../../../assets/logo_big.png')}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <View className="mt-20 items-center justify-center">
        <VerifCode onFulfill={(code) => onOtpConfirm(code)} />
        <ReversibleCountdownButton onPress={() => signInWithPhoneNumber()} />
      </View>
    </View>
  );
};
