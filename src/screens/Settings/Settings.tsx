import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSafeArea } from 'react-native-safe-area-context';

import * as S from './Settings.styles';

import { showAlert } from '$global/utils';
import { BiometryEnum } from '$global/security';
import { platformSelect } from '$global/device';
import { ListItem, StatusBar } from '$components';
import { commonSelector, userSelector } from '$redux/selectors';
import { MainScreensNames } from '$navigation/names';
import { LANGUAGES } from '$global/languages';
import settingsMessages from '$i18n/shared/Settings.messages';
import shortMessages from '$i18n/shared/short.messages';
import { Locale } from '$i18n';
import { BOTTOM_TAB_BAR_HEIGHT } from '$global/constants';
import { profileActions } from '$redux/profile';
import { SettingsScreenNavigationProp } from '$navigation/main/MainNavigator.interface';
import { openExternalUrl } from '$redux/common/actions';
import { PRIVACY_URL, TERMS_URL } from '$global/siteUrls';

export const Settings: FC<{ navigation: SettingsScreenNavigationProp }> = ({
  navigation,
}) => {
  const user = useSelector(userSelector);
  const { faceIdAvailable, devMode } = useSelector(commonSelector);
  const intl = useIntl();
  const dispatch = useDispatch();
  const language = LANGUAGES[intl.locale as Locale];
  const { bottom } = useSafeArea();

  const handleExitPress = () => {
    showAlert({
      title: intl.formatMessage(settingsMessages.exitConfirm),
      rightText: intl.formatMessage(shortMessages.yes),
      rightOnPress: () => dispatch(profileActions.requestSignOut()),
      leftText: intl.formatMessage(shortMessages.no),
    });
  };

  const handleTermsPress = () => dispatch(openExternalUrl(TERMS_URL));
  const handlePoliciesPress = () => dispatch(openExternalUrl(PRIVACY_URL));

  return (
    <S.SettingsScreenWrapper>
      <StatusBar />
      <S.SettingsScreenStyled type="HeadingsSB4">{user.login}</S.SettingsScreenStyled>
      <S.SettingsScreenScrollViewStyled
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: bottom + BOTTOM_TAB_BAR_HEIGHT }}
      >
        <ListItem
          type="list-menu"
          icon={language.icon}
          label={<FormattedMessage {...settingsMessages.language} />}
          suffix={language.description}
          angle
          onPress={() => navigation.navigate(MainScreensNames.Language)}
        />
        <ListItem
          type="list-menu"
          icon="layout"
          label={<FormattedMessage {...settingsMessages.appearance} />}
          angle
          onPress={() => navigation.navigate(MainScreensNames.Appearance)}
        />
        <S.TitleStyled>
          <FormattedMessage {...settingsMessages.settings} />
        </S.TitleStyled>
        <ListItem
          type="list-menu"
          icon="enter"
          label={
            <FormattedMessage
              {...settingsMessages.biometryAndPincode}
              values={{
                biometry: faceIdAvailable
                  ? BiometryEnum.faceID
                  : platformSelect(
                      BiometryEnum.touchID,
                      <FormattedMessage {...settingsMessages.fingerprint} />,
                    ),
              }}
            />
          }
          angle
          onPress={() => navigation.navigate(MainScreensNames.BiometricsPincodeSettings)}
        />
        <ListItem
          type="list-menu"
          icon="user"
          label={<FormattedMessage {...settingsMessages.personal} />}
          angle
          onPress={() => navigation.navigate(MainScreensNames.Personal)}
        />
        {/*<ListItem*/}
        {/*  type="list-menu"*/}
        {/*  icon="shield"*/}
        {/*  label={<FormattedMessage {...settingsMessages.safety} />}*/}
        {/*  angle*/}
        {/*  onPress={console.log}*/}
        {/*/>*/}

        <S.TitleStyled>
          <FormattedMessage {...settingsMessages.support} />
        </S.TitleStyled>
        <ListItem
          type="list-menu"
          icon="help-alt"
          label={<FormattedMessage {...settingsMessages.userAgreement} />}
          angle
          onPress={handleTermsPress}
        />
        <ListItem
          type="list-menu"
          icon="lock2"
          label={
            <FormattedMessage
              {...settingsMessages.privacyPolicy}
              values={{ privacyDeclension: 1 }}
            />
          }
          angle
          onPress={handlePoliciesPress}
        />
        {/*<ListItem*/}
        {/*  type="list-menu"*/}
        {/*  icon="help-alt"*/}
        {/*  label={<FormattedMessage {...settingsMessages.faq} />}*/}
        {/*  angle*/}
        {/*  onPress={console.log}*/}
        {/*/>*/}
        {/*<ListItem*/}
        {/*  type="list-menu"*/}
        {/*  icon="bubble-chat"*/}
        {/*  label={<FormattedMessage {...settingsMessages.contactWithSpecialist} />}*/}
        {/*  angle*/}
        {/*  onPress={console.log}*/}
        {/*/>*/}
        {devMode && (
          <>
            <S.TitleStyled>
              <FormattedMessage {...settingsMessages.development} />
            </S.TitleStyled>
            <ListItem
              type="list-menu"
              icon="panel"
              label="UI kit"
              angle
              onPress={() => navigation.navigate(MainScreensNames.UIKit)}
            />
          </>
        )}
        <S.SettingsScreenExitItemStyled
          type="list-menu"
          label={
            <S.SettingsScreenExitTextStyled>
              <FormattedMessage {...settingsMessages.exit} />
            </S.SettingsScreenExitTextStyled>
          }
          onPress={handleExitPress}
        />
      </S.SettingsScreenScrollViewStyled>
    </S.SettingsScreenWrapper>
  );
};
