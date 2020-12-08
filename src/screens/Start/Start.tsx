import React, { useCallback, FC, useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';

import * as S from './Start.styles';
import messages from './Start.messages';

import { commonSelector } from '$redux/selectors';
import shortMessages from '$i18n/shared/short.messages';
import settingsMessages from '$i18n/shared/Settings.messages';
import { showAlert } from '$global/utils';
import { openExternalUrl, setDevMode } from '$redux/common/actions';
import { PRIVACY_URL, TERMS_URL } from '$global/siteUrls';
import { StartScreenNavigationProp } from '$navigation/auth/AuthNavigator.interface';
import { AuthScreensNames } from '$navigation/names';
import { Button, StatusBar, Typography } from '$components';
import { lightenStatusBar, darkenStatusBar } from '$global/statusBar';

type StartProps = {
  navigation: StartScreenNavigationProp;
};

export const Start: FC<StartProps> = ({ navigation }) => {
  const [logoPressedTimes, setLogoPressedTimes] = useState(0);
  const intl = useIntl();
  const theme = useTheme();
  const { devMode } = useSelector(commonSelector);

  const handleSignIn = () => navigation.navigate(AuthScreensNames.SignIn);

  const handleSignUp = () =>
    navigation.navigate(AuthScreensNames.SignUpOrResetPassword, { signUp: true });

  const dispatch = useDispatch();

  const handleTermsPress = () => dispatch(openExternalUrl(TERMS_URL));
  const handlePoliciesPress = () => dispatch(openExternalUrl(PRIVACY_URL));

  //  check if i18n is supported (Android issue)
  console.log(
    intl.formatDate(Date.now(), {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }),
  );

  useFocusEffect(
    useCallback(() => {
      if (theme.isCurrent('light')) {
        darkenStatusBar();
        return;
      }

      lightenStatusBar();
    }, [theme]),
  );

  useEffect(() => {
    if (logoPressedTimes !== 10) return;

    showAlert({
      title: intl.formatMessage(
        devMode ? settingsMessages.devModeDeactivate : settingsMessages.devModeActivate,
      ),
      rightText: intl.formatMessage(shortMessages.yes),
      rightOnPress: () => dispatch(setDevMode(!devMode)),
      leftText: intl.formatMessage(shortMessages.no),
    });

    setLogoPressedTimes(0);
  }, [logoPressedTimes, devMode, dispatch, intl]);

  const handlePressLogo = () => {
    setLogoPressedTimes(logoPressedTimes + 1);
  };

  return (
    <S.Container>
      <StatusBar />
      <S.LogoContainer activeOpacity={1} onPress={handlePressLogo}>
        <S.Logo source={require('$assets/images/narfex-logo-v.png')} />
        {devMode && (
          <Typography style={{ color: 'red' }} type="HeadingsSB6">
            dev mode
          </Typography>
        )}
      </S.LogoContainer>

      <S.AuthButtonContainer>
        <Button
          title={<FormattedMessage {...messages.signIn} />}
          onPress={handleSignIn}
          appearance="ghost"
          style={{ marginBottom: 16 }}
        />
        <Button
          title={<FormattedMessage {...messages.signUp} />}
          onPress={handleSignUp}
        />
      </S.AuthButtonContainer>
      <S.Caption type="Caption1M">
        <FormattedMessage {...messages.creatingAccount} />
        {'\n'}
        <S.CaptionBold onPress={handleTermsPress}>
          <FormattedMessage {...messages.userAgreement} />
          {'\n'}
        </S.CaptionBold>
        {<FormattedMessage {...messages.and} />}{' '}
        <S.CaptionBold onPress={handlePoliciesPress}>
          <FormattedMessage
            {...messages.privacyPolicy}
            values={{ privacyDeclension: 0 }}
          />
        </S.CaptionBold>
      </S.Caption>
    </S.Container>
  );
};
