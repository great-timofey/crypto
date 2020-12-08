import React, { FC, useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSafeArea } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';

import * as S from './PincodeValidate.styles';

import { addHitSlop } from '$global/utils';
import { displayToastSuccess } from '$redux/common/actions';
import {
  CodeInput,
  CustomKeyboard,
  StatusBar,
  CustomKeyboardButton,
  Button,
  Navbar,
  Icon,
} from '$components';
import { CODE_INPUT_ERROR_DURATION } from '$global/constants';
import { BiometryEnum, getBiometryIcon, validateBiometrics } from '$global/security';
import {
  PincodeValidateNavigationProp,
  PincodeValidateScreenRouteProp,
} from '$navigation/main/MainNavigator.interface';
import { MainScreensNames } from '$navigation/names';
import { profileActions } from '$redux/profile';
import { profileSelector } from '$redux/selectors';
import messages from '$i18n/shared/security.messages';
import settingsMessages from '$i18n/shared/Settings.messages';

export interface PincodeValidateProps {
  navigation: PincodeValidateNavigationProp;
  route: PincodeValidateScreenRouteProp;
}

export const PincodeValidate: FC<PincodeValidateProps> = ({ navigation, route }) => {
  const { bottom } = useSafeArea();
  const { pincode, biometrics } = useSelector(profileSelector);
  const [enteredPincode, setEnteredPincode] = useState('');
  const [error, setError] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const disableConfirmation = route?.params?.disableConfirmation;
  const intl = useIntl();

  useFocusEffect(
    useCallback(() => {
      return () => setEnteredPincode('');
    }, []),
  );

  const handleBackToSettings = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const handleSubmitPincode = useCallback(() => {
    if (enteredPincode === pincode) {
      if (disableConfirmation) {
        dispatch(
          displayToastSuccess(intl.formatMessage(settingsMessages.pincodeTurnedOff)),
        );
        dispatch(profileActions.setPincode(null));
        handleBackToSettings();
        return;
      }

      navigation?.navigate(MainScreensNames.MainNavigator);
      return;
    }

    setError(true);
    setTimeout(() => {
      setError(false);
      setEnteredPincode('');
    }, CODE_INPUT_ERROR_DURATION);
  }, [
    intl,
    dispatch,
    disableConfirmation,
    enteredPincode,
    pincode,
    navigation,
    handleBackToSettings,
  ]);

  const handleValidateBiometrics = useCallback(async () => {
    const biometricsSuccess = await validateBiometrics();

    if (biometricsSuccess) {
      dispatch(profileActions.setIdentified(true));
      navigation.navigate(MainScreensNames.MainNavigator);
      return;
    }

    if (biometrics === BiometryEnum.faceID) {
      dispatch(profileActions.requestFaceIdUsage());
    }
  }, [dispatch, navigation, biometrics]);

  const handleCannotLoginPress = () => {
    dispatch(profileActions.requestSignOut());
  };

  return (
    <S.PincodeContainerStyled style={{ paddingBottom: bottom }}>
      <StatusBar />
      {disableConfirmation ? (
        <Navbar
          leftContent={
            <Button
              appearance="icon"
              onPress={handleBackToSettings}
              touchableProps={{ ...addHitSlop([20]) }}
            >
              <Icon name="angle-left" fill={theme.colors.primaryBlue} />
            </Button>
          }
        >
          <FormattedMessage {...messages.enterPincode} />
        </Navbar>
      ) : (
        <S.PincodeValidateHeaderStyled type="HeadingsSB4">
          <FormattedMessage {...messages.enterPincode} />
        </S.PincodeValidateHeaderStyled>
      )}
      <S.InputContainerStyled>
        <CodeInput
          secureTextEntry
          renderInvisibleInput={false}
          onSubmitEditing={handleSubmitPincode}
          icon="lock"
          value={enteredPincode}
          error={error}
        />
      </S.InputContainerStyled>
      <CustomKeyboard
        type="code"
        error={error}
        onInput={(e) => setEnteredPincode(enteredPincode.concat(e))}
        onErase={() => setEnteredPincode(enteredPincode.slice(0, -1))}
        style={{ marginBottom: 8 }}
        actionButton={
          !disableConfirmation &&
          biometrics && (
            <CustomKeyboardButton onPress={handleValidateBiometrics}>
              <S.CustomKeyboardIconStyled
                name={getBiometryIcon(biometrics)}
                fill={theme.colors.foregroundPrimary}
              />
            </CustomKeyboardButton>
          )
        }
      />
      {!disableConfirmation && (
        <S.ButtonContainerStyled>
          <Button
            title={<FormattedMessage {...messages.cannotLogin} />}
            onPress={handleCannotLoginPress}
            appearance="ghost"
          />
        </S.ButtonContainerStyled>
      )}
    </S.PincodeContainerStyled>
  );
};
