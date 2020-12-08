import React, { FC, useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { useBackHandler } from '@react-native-community/hooks';
import { useFocusEffect } from '@react-navigation/native';

import { KEYBOARD_MINIMUM_HEIGHT, NEXT_BUTTON_OFFSET } from './constants';
import * as S from './CurrencySend.styles';
import { CurrencySendEnterAmount } from './CurrencySendEnterAmount/CurrencySendEnterAmount';
import { CurrencySendEnterRecipient } from './CurrencySendEnterRecipient/CurrencySendEnterRecipient';
import { CurrencySendResume } from './CurrencySendResume/CurrencySendResume';

import {
  AuthProgress,
  Button,
  CodeInput,
  Progress,
  StatusBar,
  UnifiedNumber,
} from '$components';
import { ProgressStepProps } from '$components/AuthProgress/AuthProgress.interface';
import { REGEXES, SLIDE_ANIMATION_DURATION } from '$global/constants';
import { DEVICE_HEIGHT, isIOS } from '$global/device';
import { darkenStatusBar, lightenStatusBar } from '$global/statusBar';
import authMessages from '$i18n/shared/Auth.messages';
import currenciesMessages from '$i18n/shared/currencies.messages';
import toastMessage from '$i18n/shared/Toast.messages';
import { CurrencySendScreenNavigationProp } from '$navigation/main/MainNavigator.interface';
import { authActions } from '$redux/auth';
import { displayToastError, setGACode } from '$redux/common/actions';
import {
  commonSelector,
  currencySelector,
  profileSelector,
  walletsSelector,
} from '$redux/selectors';
import { AppDispatch } from '$redux/store';
import { walletsActions } from '$redux/wallets';
import { WalletOperationEnum } from '$redux/wallets/interface';

export interface CurrencySendProps {
  navigation: CurrencySendScreenNavigationProp;
}

export const CurrencySend: FC<CurrencySendProps> = ({ navigation }) => {
  const theme = useTheme();
  const { gaEnabled } = useSelector(profileSelector);
  const { gaCode, gaError } = useSelector(commonSelector);
  const {
    send: { amount, type, login, address, activeStepIndex },
    wallet: {
      currency,
      amount: currencyAmount,
      sendLimit: { min, fee },
    },
  } = useSelector(walletsSelector);
  const currencyInfo = useSelector(currencySelector(currency));
  const { bottom } = useSafeArea();
  const [gaCompleted, setGaCompleted] = useState(false);
  const [ableToRender, setAbleToRender] = useState(true);
  const [swipeForward, setSwipeForward] = useState(true);
  const [showSlide, setShowSlide] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const intl = useIntl();

  useEffect(() => {
    function addGAStep() {
      setAbleToRender(false);
      setGaCompleted(true);

      setImmediate(() => {
        setAbleToRender(true);
        dispatch(authActions.setAuthorizationActiveStepIndex(activeStepIndex + 1));
      });
    }

    if (gaEnabled && !gaCompleted) {
      addGAStep();
    }
  }, [activeStepIndex, gaEnabled, dispatch, gaCompleted]);

  useBackHandler(() => {
    handleGoBack();
    return true;
  });

  useFocusEffect(
    useCallback(() => {
      if (theme.isCurrent('light')) {
        darkenStatusBar();
      } else {
        lightenStatusBar();
      }
    }, [theme]),
  );

  const handleGoForward = () => {
    if (activeStepIndex < (gaEnabled ? stepsWithGA : steps).length - 1) {
      if (activeStepIndex === 0 && type === WalletOperationEnum.transfer) {
        if (!login) {
          dispatch(
            displayToastError(intl.formatMessage(toastMessage.sendCoinsNeedLogin)),
          );
        } else {
          dispatch(walletsActions.checkLogin());
        }
        return;
      }

      if (activeStepIndex === 0 && type === WalletOperationEnum.transaction && !address) {
        dispatch(
          displayToastError(intl.formatMessage(toastMessage.sendCoinsNeedAddress)),
        );
        return;
      }

      if (activeStepIndex === 1) {
        if (!amount) {
          dispatch(
            displayToastError(
              intl.formatMessage(toastMessage.sendCoinsNeedAmount, {
                currency: currencyInfo.name,
              }),
            ),
          );
          return;
        }

        if (+amount + fee > currencyAmount) {
          dispatch(
            displayToastError(
              intl.formatMessage(toastMessage.sendAmountTooHigh, {
                maximum: currencyAmount,
                currency: currencyInfo.abbr.toUpperCase(),
              }),
            ),
          );
          return;
        }

        if (+amount < min) {
          dispatch(
            displayToastError(
              intl.formatMessage(toastMessage.sendAmountTooLow, {
                minimum: min,
                currency: currencyInfo.abbr.toUpperCase(),
              }),
            ),
          );
          return;
        }
      }

      if (activeStepIndex === 0) {
        dispatch(
          type === WalletOperationEnum.transaction
            ? walletsActions.setSendLogin('')
            : walletsActions.setSendAddress(''),
        );
      }

      setSwipeForward(true);
      setShowSlide(false);

      setTimeout(() => {
        setShowSlide(true);
        dispatch(walletsActions.setSendActiveStepIndex(activeStepIndex + 1));
      }, SLIDE_ANIMATION_DURATION);
    } else if (type === WalletOperationEnum.transfer) {
      dispatch(walletsActions.transferSend());
    } else {
      dispatch(walletsActions.transactionSend());
    }
  };

  const handleGoBack = useCallback(() => {
    if (activeStepIndex > 0) {
      setSwipeForward(false);
      setShowSlide(false);

      setTimeout(() => {
        setShowSlide(true);
        dispatch(walletsActions.setSendActiveStepIndex(activeStepIndex - 1));
      }, SLIDE_ANIMATION_DURATION);
    } else {
      dispatch(walletsActions.clearTransferState());
      navigation.goBack();
    }
  }, [dispatch, activeStepIndex, navigation]);

  const handleSetCode = useCallback(
    (value) => {
      if (value.length <= 6 && REGEXES.gaCode.test(value)) dispatch(setGACode(value));
    },
    [dispatch],
  );

  const steps: ProgressStepProps[] = [
    {
      content: <CurrencySendEnterRecipient onNextPress={handleGoForward} />,
      footer: (
        <S.NextButtonStyled
          title={<FormattedMessage {...authMessages.next} />}
          onPress={handleGoForward}
        />
      ),
      centeredVertically: false,
    },
    {
      content: <CurrencySendEnterAmount onNextPress={handleGoForward} />,
      footer: (
        <S.NextButtonStyled
          title={<FormattedMessage {...authMessages.next} />}
          onPress={handleGoForward}
        />
      ),
      centeredVertically: false,
    },
    {
      content: <CurrencySendResume />,
      footer: (
        <S.NextButtonStyled
          title={
            <FormattedMessage
              {...currenciesMessages.sendAmountCurrency}
              values={{
                amount: <UnifiedNumber fractionDigits={8} value={+amount + fee} />,
                currency: currency.toUpperCase(),
              }}
            />
          }
          onPress={handleGoForward}
        />
      ),
      centeredVertically: false,
    },
  ];

  const stepsWithGA = gaEnabled
    ? steps.concat({
        header: (
          <S.GAStepHeadingStyled type="HeadingsSB4">
            <FormattedMessage {...authMessages.enterGACode} />
          </S.GAStepHeadingStyled>
        ),
        content: (
          <CodeInput
            error={gaError}
            icon="google-authenticator"
            value={gaCode}
            onChangeText={handleSetCode}
            onSubmitEditing={handleGoForward}
          />
        ),
      })
    : [];

  return ableToRender ? (
    <S.CurrencySendContainerStyled style={{ paddingBottom: bottom }}>
      <StatusBar backgroundColorKey="backgroundPrimary" />
      <S.CurrencySendKeyboardContainerStyled
        keyboardVerticalOffset={
          KEYBOARD_MINIMUM_HEIGHT + NEXT_BUTTON_OFFSET > DEVICE_HEIGHT * 0.4 ? -40 : 12
        }
        behavior={isIOS ? 'padding' : 'height'}
      >
        <AuthProgress
          activeStepIndex={activeStepIndex}
          showSlide={showSlide}
          swipeForward={swipeForward}
          progressHeader={
            <S.AuthProgressHeaderStyled>
              <Button onPress={handleGoBack} appearance="icon">
                <S.BackArrowIconButton name="angle-left" />
              </Button>
              <Progress
                progress={
                  ((activeStepIndex + 1) / (gaEnabled ? stepsWithGA : steps).length) * 100
                }
              />
              <S.SpaceContainerStyled />
            </S.AuthProgressHeaderStyled>
          }
          steps={gaEnabled ? stepsWithGA : steps}
        />
      </S.CurrencySendKeyboardContainerStyled>
    </S.CurrencySendContainerStyled>
  ) : (
    <></>
  );
};
