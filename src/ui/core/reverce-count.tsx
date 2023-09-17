/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
}

const ReversibleCountdownButton: React.FC<Props> = ({ onPress }) => {
  const [isDisabled, setIsDisabled] = useState(true); // Set to true initially
  const [countdown, setCountdown] = useState(60);

  const startCountdown = () => {
    setIsDisabled(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setIsDisabled(false);
    }, 60000);
  };

  useEffect(() => {
    if (countdown > 0 && isDisabled) {
      const timer = setTimeout(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, isDisabled]);

  useEffect(() => {
    // Start the countdown when the component mounts
    startCountdown();
  }, []); // Empty dependency array to run this effect only once

  return (
    <TouchableOpacity
      onPress={() => {
        if (!isDisabled) {
          onPress();
          startCountdown();
        }
      }}
      disabled={isDisabled}
      style={{
        backgroundColor: isDisabled ? 'gray' : 'blue',
        padding: 10,
        borderRadius: 5,
      }}
    >
      <Text style={{ color: 'white' }}>
        {isDisabled ? `Retry in ${countdown}s` : 'Resend code'}
      </Text>
    </TouchableOpacity>
  );
};

export default ReversibleCountdownButton;
