import React, { FC } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { displayToastError } from '$redux/common/actions';
import {
  BiometryEnum,
  getBiometryAvailability,
  validateBiometrics,
} from '$global/security';
import { isIOS, platformSelect } from '$global/device';
import { ListItem, StatusBar, Switch } from '$components';
import settingsMessages from '$i18n/shared/Settings.messages';
import { BiometricsPincodeSettingsNavigationProp } from '$navigation/main/MainNavigator.interface';
import { MainScreensNames } from '$navigation/names';
import { profileActions } from '$redux/profile';
import { commonSelector, profileSelector } from '$redux/selectors';
import { SettingsNavbar } from '$screens/Settings/SettingsNavbar/SettingsNavbar';

export interface BiometricsPincodeSettings {
  navigation: BiometricsPincodeSettingsNavigationProp;
}

export const BiometricsPincodeSettings: FC<BiometricsPincodeSettings> = ({
  navigation,
}) => {
  const { bottom } = useSafeArea();
  const { pincode, biometrics } = useSelector(profileSelector);
  const { faceIdAvailable } = useSelector(commonSelector);
  const dispatch = useDispatch();
  const intl = useIntl();

  const handleChangeBiometryLogging = async () => {
    if (biometrics) {
      if (await validateBiometrics()) {
        dispatch(profileActions.setBiometrics(null));
        return;
      }
    }

    if (faceIdAvailable) {
      dispatch(profileActions.requestFaceIdUsage());
    } else {
      const biometryAvailable = await getBiometryAvailability();

      dispatch(
        biometryAvailable
          ? profileActions.setBiometrics(
              isIOS ? BiometryEnum.touchID : BiometryEnum.android,
            )
          : displayToastError(
              intl.formatMessage(settingsMessages.fingerprintNotAvailable),
            ),
      );
    }
  };

  const handleChangePincodeLogging = () => {
    if (pincode) {
      //  @ts-ignore
      navigation.push(MainScreensNames.SecureGateNavigator, {
        screen: MainScreensNames.PincodeValidate,
        params: {
          disableConfirmation: true,
        },
      });
    } else {
      navigation.navigate(MainScreensNames.SetPincode);
    }
  };

  return (
    <BiometricsPincodeSettingsContainerStyled style={{ paddingBottom: bottom }}>
      <StatusBar />
      <SettingsNavbar>
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
      </SettingsNavbar>
      <>
        <ListItem
          type="list-3"
          label={
            <FormattedMessage
              {...settingsMessages.biometryLogging}
              values={{
                biometry: faceIdAvailable
                  ? BiometryEnum.faceID
                  : platformSelect(
                      BiometryEnum.touchID,
                      <FormattedMessage {...settingsMessages.byFingerprint} />,
                    ),
              }}
            />
          }
          control={<Switch onChange={handleChangeBiometryLogging} value={!!biometrics} />}
        />
        <ListItem
          type="list-3"
          label={
            <FormattedMessage
              {...settingsMessages.biometryLogging}
              values={{
                biometry: <FormattedMessage {...settingsMessages.byPincode} />,
              }}
            />
          }
          control={<Switch onChange={handleChangePincodeLogging} value={!!pincode} />}
        />
      </>
    </BiometricsPincodeSettingsContainerStyled>
  );
};

export const BiometricsPincodeSettingsContainerStyled = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;
