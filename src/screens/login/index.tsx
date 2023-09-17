import React from 'react';

import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

import { LoginForm } from './login-form';

export const Login = () => {
  useSoftKeyboardEffect();

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm />
    </>
  );
};
