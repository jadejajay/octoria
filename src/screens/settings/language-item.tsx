import * as React from 'react';

import { logger, useSelectedLanguage } from '@/core';
import { translate } from '@/core';
import type { Language } from '@/core/i18n/resources';
import type { Option } from '@/ui';
import { Options, useModalRef } from '@/ui';

import { Item } from './item';

export const LanguageItem = () => {
  const { language, setLanguage } = useSelectedLanguage();
  const optionsRef = useModalRef();
  const open = React.useCallback(() => {
    optionsRef.current?.present();
    logger.log('open');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSelect = React.useCallback(
    (option: Option) => {
      setLanguage(option.value as Language);
      optionsRef.current?.dismiss();
      logger.log('onSelect close');
    },
    [setLanguage, optionsRef]
  );

  const langs = React.useMemo(
    () => [
      { label: translate('settings.english'), value: 'en' },
      { label: translate('settings.hindi'), value: 'hi' },
      { label: translate('settings.gujrati'), value: 'gu' },
      { label: translate('settings.tamil'), value: 'ta' },
      { label: translate('settings.chinese'), value: 'zh' },
      { label: translate('settings.arabic'), value: 'ar' },
    ],
    []
  );

  const selectedLanguage = React.useMemo(
    () => langs.find((lang) => lang.value === language),
    [language, langs]
  );

  return (
    <>
      <Item
        text="settings.language"
        value={selectedLanguage?.label}
        onPress={open}
      />
      <Options
        ref={optionsRef}
        options={langs}
        onSelect={onSelect}
        value={selectedLanguage?.value}
      />
    </>
  );
};
