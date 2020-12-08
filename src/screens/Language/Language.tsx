import React, { FC } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { SettingsNavbar } from '../Settings/SettingsNavbar/SettingsNavbar';

import * as S from './Language.styles';

import { ListItem, RadioButton, StatusBar } from '$components';
import { LANGUAGES } from '$global/languages';
import { profileActions } from '$redux/profile';
import { Locale } from '$i18n';
import settingsMessages from '$i18n/shared/Settings.messages';

export const Language: FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const handleChangeLocale = (locale: string) => {
    dispatch(profileActions.changeLocale(locale as Locale));
  };

  return (
    <S.LanguageScreenStyled>
      <StatusBar />
      <SettingsNavbar>
        <FormattedMessage {...settingsMessages.language} />
      </SettingsNavbar>
      <S.LanguageScreenScrollViewStyled>
        {Object.keys(LANGUAGES).map((key: string) => (
          <ListItem
            key={key}
            type="list-3"
            label={LANGUAGES[key].name}
            description={LANGUAGES[key].description}
            onPress={() => handleChangeLocale(key)}
            control={<RadioButton hiddenNotChecked value={intl.locale === key} />}
          />
        ))}
      </S.LanguageScreenScrollViewStyled>
    </S.LanguageScreenStyled>
  );
};
