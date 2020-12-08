import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import * as S from './Personal.styles';

import { ListItem, StatusBar } from '$components';
import { SettingsNavbar } from '$screens/Settings/SettingsNavbar/SettingsNavbar';
import settingsMessages from '$i18n/shared/Settings.messages';
import { userSelector } from '$redux/selectors';
import { PersonalScreenNavigationProp } from '$navigation/main/MainNavigator.interface';
import { MainScreensNames } from '$navigation/names';

export const Personal: FC<{ navigation: PersonalScreenNavigationProp }> = ({
  navigation,
}) => {
  const { login, firstName, lastName, email } = useSelector(userSelector);

  return (
    <S.PersonalScreenStyled>
      <StatusBar />
      <SettingsNavbar>
        <FormattedMessage {...settingsMessages.personal} />
      </SettingsNavbar>
      <S.PersonalScreenScrollViewStyled>
        {firstName && (
          <ListItem
            type="list-2"
            label={<FormattedMessage {...settingsMessages.name} />}
            info={[firstName, lastName].join(' ')}
          />
        )}
        <ListItem
          type="list-2"
          label={<FormattedMessage {...settingsMessages.login} />}
          info={login}
          onPress={() => navigation.navigate(MainScreensNames.PersonalLogin)}
          angle
        />
        <ListItem
          type="list-2"
          label={<FormattedMessage {...settingsMessages.email} />}
          info={email}
          onPress={() => navigation.navigate(MainScreensNames.PersonalEmail)}
          angle
        />
      </S.PersonalScreenScrollViewStyled>
    </S.PersonalScreenStyled>
  );
};
