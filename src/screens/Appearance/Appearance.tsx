import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './Appearance.styles';
import { THEMES } from './constants';

import { isIOS } from '$global/device';
import { ListItem, RadioButton, StatusBar, Switch } from '$components';
import { SettingsNavbar } from '$screens/Settings/SettingsNavbar/SettingsNavbar';
import settingsMessages from '$i18n/shared/Settings.messages';
import { profileSelector } from '$redux/selectors';
import { profileActions } from '$redux/profile';
import { ThemesEnum } from '$global/theme';

export const Appearance: FC = () => {
  const dispatch = useDispatch();

  const { themeAuto, theme: currentTheme } = useSelector(profileSelector);

  const handleChangeThemeAuto = (value: boolean) => {
    dispatch(profileActions.changeThemeAuto(value));
  };

  const handleChangeTheme = (value: ThemesEnum) => {
    dispatch(profileActions.changeTheme(value));
  };

  return (
    <S.AppearanceScreenStyled>
      <StatusBar />
      <SettingsNavbar>
        <FormattedMessage {...settingsMessages.appearance} />
      </SettingsNavbar>
      <S.AppearanceScreenScrollViewStyled>
        <ListItem
          type="list-3"
          label={<FormattedMessage {...settingsMessages.useSystemTheme} />}
          control={<Switch onChange={handleChangeThemeAuto} value={themeAuto} />}
        />
        <S.AppearanceScreenDescStyled type="Caption1M">
          <FormattedMessage
            {...settingsMessages.useSystemThemeDescription}
            values={{ system: isIOS ? 'iOS' : 'Android' }}
          />
        </S.AppearanceScreenDescStyled>

        {!themeAuto && (
          <>
            <S.AppearanceScreenTitleStyled type="HeadingsSB6">
              <FormattedMessage {...settingsMessages.themes} />
            </S.AppearanceScreenTitleStyled>
            {THEMES.map((theme) => (
              <ListItem
                key={theme.name}
                onPress={() => handleChangeTheme(theme.name)}
                type="list-3"
                label={<FormattedMessage {...theme.message} />}
                control={
                  <RadioButton hiddenNotChecked value={theme.name === currentTheme} />
                }
              />
            ))}
          </>
        )}
      </S.AppearanceScreenScrollViewStyled>
    </S.AppearanceScreenStyled>
  );
};
