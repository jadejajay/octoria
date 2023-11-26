import React from 'react';

import { FocusAwareStatusBar } from '@/ui';

import { LoginForm } from './login-form';

export const Login = () => {
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm />
    </>
  );
};

export * from './login-form';
export * from './signup';
