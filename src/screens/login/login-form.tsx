/* eslint-disable max-lines-per-function */
import auth from '@react-native-firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import PhoneInput from 'react-native-phone-number-input';
import SmsRetriever from 'react-native-sms-retriever';

import { logger, showErrorMessage, showSuccessMessage } from '@/core';
import {
  ActivityIndicator,
  NoData,
  ReversibleCountdownButton,
  VerifCode,
  View,
} from '@/ui';

export const LoginForm = () => {
  const [confirm, setConfirm] = useState<any>();
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    const onPhoneListener = async () => {
      try {
        const text = await SmsRetriever.requestPhoneNumber();
        const checkValid = phoneInput.current?.isValidNumber(text);
        logger.log(checkValid);
        if (checkValid) {
          logger.log(text, 'text phone');
          setPhoneNumber(text);
          signInWithPhoneNumber(text);
        }
      } catch (error) {
        logger.log(JSON.stringify(error));
      }
    };

    onPhoneListener();
  }, []); // Empty dependency array to run the effect only once

  async function signInWithPhoneNumber(phoneNum: any) {
    try {
      setIsLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(phoneNum);

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
          <ActivityIndicator
            className="absolute inset-0 self-center"
            color={'black'}
            size="large"
          />
        )}
        <View className="mt-20 items-center justify-center">
          <NoData width={100} height={100} />
        </View>
        <View className="mt-20 items-center justify-center">
          {isLoading ? null : (
            <>
              {true && (
                //@ts-ignore
                <PhoneInput
                  ref={phoneInput}
                  defaultCode="IN"
                  layout="first"
                  onChangeFormattedText={(text) => {
                    const checkValid = phoneInput.current?.isValidNumber(text);
                    if (checkValid) {
                      logger.log(text);
                      setPhoneNumber(text);
                      signInWithPhoneNumber(text);
                    }
                  }}
                  withShadow
                  autoFocus
                />
              )}
            </>
          )}
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
        <ReversibleCountdownButton
          onPress={() => signInWithPhoneNumber(phoneNumber)}
        />
      </View>
    </View>
  );
};
