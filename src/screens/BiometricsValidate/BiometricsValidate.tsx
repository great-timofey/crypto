import React, { FC, useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import * as S from './BiometricsValidate.styles';

import { isIOS } from '$global/device';
import { BiometricsValidateNavigationProp } from '$navigation/main/MainNavigator.interface';
import { StatusBar, Button, Typography } from '$components';
import { BiometryEnum, getBiometryIcon, validateBiometrics } from '$global/security';
import { hex2rgba } from '$global/utils';
import { MainScreensNames } from '$navigation/names';
import { profileSelector } from '$redux/selectors';
import { profileActions } from '$redux/profile';
import messages from '$i18n/shared/security.messages';

export interface BiometricsValidateProps {
  navigation: BiometricsValidateNavigationProp;
}

export const BiometricsValidate: FC<BiometricsValidateProps> = ({ navigation }) => {
  const { bottom } = useSafeArea();
  const { biometrics } = useSelector(profileSelector);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [verificationCancelledByUser, setVerificationCancelledByUser] = useState(false);

  const handleValidateBiometrics = useCallback(async () => {
    const biometricsSuccess = await validateBiometrics();

    if (biometricsSuccess) {
      dispatch(profileActions.setIdentified(true));
      navigation.navigate(MainScreensNames.MainNavigator);
      return;
    }

    setVerificationCancelledByUser(true);
    if (biometrics === BiometryEnum.faceID) {
      dispatch(profileActions.requestFaceIdUsage());
    }
  }, [dispatch, navigation, biometrics]);

  useEffect(() => {
    handleValidateBiometrics();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCannotLoginPress = () => {
    dispatch(profileActions.requestSignOut());
  };

  return (
    <S.BiometricsContainerStyled style={{ paddingBottom: bottom }}>
      <StatusBar />
      <S.IconContainerStyled onPress={handleValidateBiometrics}>
        <S.BiometryIconStyled
          name={getBiometryIcon(biometrics!)}
          fill={hex2rgba(theme.colors.primaryBlue, verificationCancelledByUser ? 1 : 0.2)}
        />
        <Typography type="HeadingsSB6">
          {verificationCancelledByUser && (
            <FormattedMessage
              {...(isIOS ? messages.runIosBiometry : messages.scanFingerprint)}
              values={{
                iosBiometryType: biometrics!,
              }}
            />
          )}
        </Typography>
      </S.IconContainerStyled>
      <S.ButtonContainerStyled>
        <Button
          title={<FormattedMessage {...messages.cannotLogin} />}
          onPress={handleCannotLoginPress}
          appearance="ghost"
        />
      </S.ButtonContainerStyled>
    </S.BiometricsContainerStyled>
  );
};
