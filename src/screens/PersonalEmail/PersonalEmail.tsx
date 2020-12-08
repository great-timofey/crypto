import React, { useCallback, useState, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, TextInput, TextInputProps } from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSafeArea } from 'react-native-safe-area-context';

import * as S from './PersonalEmail.styles';
import messages from './PersonalEmail.messages';

import { displayToastError, setEmailCode, setGACode } from '$redux/common/actions';
import { isIOS, isISE } from '$global/device';
import { AppDispatch, AppState } from '$redux/store';
import { AuthProgress, Input, Button, Progress, CodeInput, StatusBar } from '$components';
import { REGEXES, SLIDE_ANIMATION_DURATION } from '$global/constants';
import { ProgressStepProps } from '$components/AuthProgress/AuthProgress.interface';
import { profileSelector } from '$redux/selectors';
import { profileActions } from '$redux/profile';
import { useKeyboardOpeningEffect } from '$hooks/useKeyboardOpeningEffect';
import { PersonalEmailScreenNavigationProp } from '$navigation/main/MainNavigator.interface';

type SignInProps = {
  navigation: PersonalEmailScreenNavigationProp;
};

export const PersonalEmail: FC<SignInProps> = ({ navigation }) => {
  const [swipeForward, setSwipeForward] = useState(true);
  const [showSlide, setShowSlide] = useState(true);
  const { bottom } = useSafeArea();
  const dispatch = useDispatch<AppDispatch>();
  const intl = useIntl();
  const [currentRef, setCurrentRef] = useState<TextInput | null>(null);

  const {
    gaEnabled,
    settings: { email, editEmailStep, resendTimeout },
  } = useSelector(profileSelector);

  const {
    common: { emailError, emailCode, gaError, gaCode, toastShown },
  } = useSelector((state: AppState) => state);

  const onChangeEmail = (value: string) => {
    dispatch(profileActions.setSettingsEmail(value));
  };

  const handlePressResendEmail = () => {
    if (gaEnabled) {
      setSwipeForward(false);
      setShowSlide(false);
      dispatch(setEmailCode(''));
      dispatch(setGACode(''));
      setTimeout(() => {
        setShowSlide(true);
        dispatch(profileActions.setEditEmailStep(1));
      }, SLIDE_ANIMATION_DURATION);
    } else {
      dispatch(setEmailCode(''));
      dispatch(profileActions.sendEmailCode());
    }
  };

  const handleGoBack = useCallback(() => {
    if (editEmailStep > 0) {
      setSwipeForward(false);
      setShowSlide(false);

      dispatch(setGACode(''));

      setTimeout(() => {
        setShowSlide(true);
        dispatch(profileActions.setEditEmailStep(0));
        dispatch(setEmailCode(''));
        dispatch(setGACode(''));
      }, SLIDE_ANIMATION_DURATION);
    } else {
      navigation.goBack();
      dispatch(profileActions.clearSettings());
    }
  }, [editEmailStep, dispatch, navigation]);

  const handleClose = () => {
    navigation.goBack();
    dispatch(profileActions.clearSettings());
  };

  const handleSetGaCode = useCallback(
    (value) => {
      if (value.length <= 6 && REGEXES.gaCode.test(value)) dispatch(setGACode(value));
    },
    [dispatch],
  );

  const handleSetEmailCode = useCallback(
    (value) => {
      if (value.length <= 6) dispatch(setEmailCode(value));
    },
    [dispatch],
  );

  const handleSubmitGaCode = useCallback(() => {
    // Keyboard.dismiss();
    dispatch(profileActions.sendEmailCode());
  }, [dispatch]);

  const handleSubmitEmailCode = () => {
    dispatch(profileActions.confirmEmail());
  };

  const handleGoForward = () => {
    if (!REGEXES.email.test(email)) {
      dispatch(displayToastError(intl.formatMessage(messages.invalidEmail)));
    } else if (editEmailStep === 0 && gaEnabled) {
      setSwipeForward(true);
      setShowSlide(false);

      setTimeout(() => {
        setShowSlide(true);
        dispatch(profileActions.setEditEmailStep(editEmailStep + 1));
      }, SLIDE_ANIMATION_DURATION);
    } else {
      Keyboard.dismiss();
      dispatch(profileActions.sendEmailCode());
    }
  };

  const inputProps: TextInputProps = {
    returnKeyType: 'next',
    autoFocus: true,
    onSubmitEditing: handleGoForward,
  };

  useEffect(() => {
    if (!toastShown) {
      currentRef?.focus();
    }
  }, [toastShown, currentRef]);

  useKeyboardOpeningEffect(() => {
    currentRef?.focus();
  }, [currentRef]);

  const steps: ProgressStepProps[] = [
    {
      header: (
        <S.PersonalEmailStepTitleStyled type="HeadingsSB4">
          <FormattedMessage {...messages.enterNewEmail} />
        </S.PersonalEmailStepTitleStyled>
      ),
      content: (
        <Input
          ref={setCurrentRef}
          appearance="invisible"
          value={email}
          onChangeText={onChangeEmail}
          inputProps={{
            ...inputProps,
            ...(isISE
              ? {
                  autoCorrect: false,
                  textContentType: 'emailAddress',
                  keyboardType: 'email-address',
                }
              : {
                  autoCorrect: true,
                  textContentType: 'emailAddress',
                  keyboardType: 'email-address',
                }),
          }}
        />
      ),
      footer: (
        <S.NextButtonStyled
          title={<FormattedMessage {...messages.next} />}
          onPress={handleGoForward}
        />
      ),
    },
    gaEnabled
      ? {
          header: (
            <S.PersonalEmailStepTitleStyled type="HeadingsSB4">
              <FormattedMessage {...messages.enterGACode} />
            </S.PersonalEmailStepTitleStyled>
          ),
          content: (
            <CodeInput
              ref={setCurrentRef}
              error={gaError}
              icon="google-authenticator"
              value={gaCode}
              onChangeText={handleSetGaCode}
              onSubmitEditing={handleSubmitGaCode}
            />
          ),
        }
      : false,
    {
      header: (
        <S.PersonalEmailStepTitleStyled type="HeadingsSB4">
          <FormattedMessage {...messages.enterEmailCode} />
        </S.PersonalEmailStepTitleStyled>
      ),
      content: (
        <CodeInput
          ref={setCurrentRef}
          error={emailError}
          icon="mail-code"
          value={emailCode}
          onChangeText={handleSetEmailCode}
          onSubmitEditing={handleSubmitEmailCode}
        />
      ),
      footer: (
        <S.PersonalEmailResendEmailButtonStyled
          disabled={!!resendTimeout}
          title={
            <>
              <FormattedMessage {...messages.resendEmail} />
              {!!resendTimeout &&
                ` 0:${resendTimeout < 10 ? `0${resendTimeout}` : resendTimeout}`}
            </>
          }
          appearance="ghost"
          onPress={handlePressResendEmail}
        />
      ),
    },
  ].filter(Boolean) as ProgressStepProps[];

  return (
    <S.PersonalEmailContainerStyled style={{ marginBottom: bottom }}>
      <StatusBar />
      <S.KeyboardAvoidingViewStyledStyled behavior={isIOS ? 'padding' : 'height'}>
        <AuthProgress
          useHeight100={false}
          activeStepIndex={editEmailStep}
          showSlide={showSlide}
          swipeForward={swipeForward}
          progressHeader={
            <S.PersonalEmailHeaderStyled>
              <Button onPress={handleGoBack} appearance="icon">
                <S.BackArrowIconButton name="angle-left" />
              </Button>
              <Progress progress={((editEmailStep + 1) / steps.length) * 100} />
              <Button onPress={handleClose} appearance="icon">
                <S.BackArrowIconButton name="close-large" />
              </Button>
            </S.PersonalEmailHeaderStyled>
          }
          steps={steps}
        />
      </S.KeyboardAvoidingViewStyledStyled>
    </S.PersonalEmailContainerStyled>
  );
};
