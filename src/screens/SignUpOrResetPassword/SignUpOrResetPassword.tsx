import React, { useCallback, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, TextInput, TextInputProps } from 'react-native';
import { FormattedMessage, useIntl, MessageDescriptor } from 'react-intl';
import { useBackHandler } from '@react-native-community/hooks';
import { useSafeArea } from 'react-native-safe-area-context';

import personalEmailMessages from '../PersonalEmail/PersonalEmail.messages';

import * as S from './SignUpOrResetPassword.styles';

import { isIOS, isISE } from '$global/device';
import { authActions } from '$redux/auth';
import { hideBlurView, setEmailCode, displayToast } from '$redux/common/actions';
import messages from '$i18n/shared/Auth.messages';
import { AuthScreensNames } from '$navigation/names';
import {
  AuthProgress,
  Input,
  Button,
  Progress,
  BlurView,
  Captcha,
  CodeInput,
  StatusBar,
} from '$components';
import {
  SignUpOrResetPasswordProp,
  ProfileScreenRouteProp,
} from '$navigation/auth/AuthNavigator.interface';
import { AuthChangeableField, VerifyMobileCodeEnum } from '$redux/auth/interface';
import { useKeyboardOpeningEffect } from '$hooks';
import {
  SLIDE_ANIMATION_DURATION,
  DEFAULT_TOAST_DURATION,
  REGEXES,
} from '$global/constants';
import { AppDispatch } from '$redux/store';
import { authSelector, commonSelector } from '$redux/selectors';
import ToastMessages from '$i18n/shared/Toast.messages';
import { TOAST_ANIMATION_DURATION } from '$components/Toast/constants';

type SignUpOrResetPasswordProps = {
  navigation: SignUpOrResetPasswordProp;
  route: ProfileScreenRouteProp;
};

export const SignUpOrResetPassword: FC<SignUpOrResetPasswordProps> = ({
  navigation,
  route,
}) => {
  const signUp = route.params?.signUp || false;
  const dispatch = useDispatch<AppDispatch>();
  const { bottom } = useSafeArea();
  const [currentRef, setCurrentRef] = useState<TextInput | null>(null);

  const [showSlide, setShowSlide] = useState(true);
  const [swipeForward, setSwipeForward] = useState(true);
  const [repeatedNewPassword, setRepeatedNewPassword] = useState('');

  const intl = useIntl();
  const STEP_COUNT = signUp ? 7 : 4;

  const {
    email,
    login,
    password,
    firstName,
    lastName,
    activeStepIndex,
    timer,
  } = useSelector(authSelector);

  const { blurViewShown, toastShown, emailCode, emailError } = useSelector(
    commonSelector,
  );

  const [touched, setTouched] = useState(true);

  useKeyboardOpeningEffect(() => {
    if (blurViewShown || toastShown) return;
    currentRef?.focus();
  }, [blurViewShown, email, activeStepIndex, toastShown, currentRef, STEP_COUNT]);

  const handleChangeAuthField = useCallback(
    (key: AuthChangeableField) => (value: string) => {
      dispatch(authActions.setAuthField({ key, value }));
    },
    [dispatch],
  );

  const handleGoBack = useCallback(() => {
    if (activeStepIndex > 0) {
      setSwipeForward(false);
      setShowSlide(false);

      setTimeout(() => {
        setShowSlide(true);
        dispatch(authActions.setAuthorizationActiveStepIndex(activeStepIndex - 1));
      }, SLIDE_ANIMATION_DURATION);
    } else {
      dispatch(authActions.clearAuthData());
      navigation.navigate(AuthScreensNames.Start);
    }
  }, [activeStepIndex, dispatch, navigation]);

  useBackHandler(() => {
    handleGoBack();
    return true;
  });

  const handleCreatePasswordFinish = useCallback(() => {
    if (touched) setTouched(false);
    currentRef?.focus();
  }, [currentRef, touched]);

  const showToastErrorMessage = useCallback(
    (message: MessageDescriptor) => {
      Keyboard.dismiss();

      dispatch(
        displayToast({
          text: intl.formatMessage(message),
          icon: 'attention',
          iconFill: 'error',
        }),
      );

      setTimeout(() => {
        currentRef?.focus();
      }, DEFAULT_TOAST_DURATION + TOAST_ANIMATION_DURATION);
    },
    [currentRef, dispatch, intl],
  );

  const handleGoForward = useCallback(() => {
    setTouched(true);

    if (activeStepIndex < STEP_COUNT - 1) {
      setSwipeForward(true);
      setShowSlide(false);

      setTimeout(() => {
        setShowSlide(true);
        dispatch(authActions.setAuthorizationActiveStepIndex(activeStepIndex + 1));
      }, SLIDE_ANIMATION_DURATION);
    } else {
      if (!repeatedNewPassword) return;

      if (repeatedNewPassword !== password) {
        showToastErrorMessage(messages.passwordsDontMatch);
        return;
      }
      if (signUp) {
        dispatch(authActions.signUpRequest());
      } else {
        dispatch(authActions.resetPasswordRequest());
      }
    }
  }, [
    signUp,
    activeStepIndex,
    STEP_COUNT,
    dispatch,
    repeatedNewPassword,
    password,
    showToastErrorMessage,
  ]);

  const handleCreatePasswordInput = useCallback(
    (value) => {
      if (!touched) setTouched(true);
      dispatch(authActions.setAuthField({ key: 'password', value }));
    },
    [touched, dispatch],
  );

  const handleRepeatPasswordSubmit = useCallback(() => {
    if (!repeatedNewPassword) return;
    Keyboard.dismiss();
    handleGoForward();
  }, [handleGoForward, repeatedNewPassword]);

  const handleSubmitEmail = useCallback(() => {
    if (!REGEXES.email.test(email)) {
      showToastErrorMessage(personalEmailMessages.invalidEmail);
      return;
    }

    if (signUp) {
      dispatch(authActions.sendEmailForSignUpRequest());
    } else {
      dispatch(authActions.sendEmailForResetPasswordRequest());
    }
  }, [dispatch, signUp, email, showToastErrorMessage]);

  const handleCheckEmailCode = useCallback(() => {
    dispatch(
      authActions.checkEmailCodeRequest(
        signUp ? VerifyMobileCodeEnum.signUp : VerifyMobileCodeEnum.resetPassword,
      ),
    );
  }, [dispatch, signUp]);

  const handleEnterLoginFinish = useCallback(() => {
    if (REGEXES.login.test(login)) {
      dispatch(authActions.checkLoginRequest());
    } else {
      showToastErrorMessage(ToastMessages.authorizationLoginIncorrect);
    }
  }, [login, dispatch, showToastErrorMessage]);

  const handleEnterName = useCallback(
    (nameType: 'firstName' | 'lastName') => () => {
      REGEXES.name.test(nameType === 'firstName' ? firstName : lastName)
        ? handleGoForward()
        : showToastErrorMessage(ToastMessages.authorizationNameIncorrect);
    },
    [firstName, lastName, handleGoForward, showToastErrorMessage],
  );

  const handleSetCode = useCallback(
    (value) => {
      if (value.length <= 6 && REGEXES.emailCode.test(value))
        dispatch(setEmailCode(value));
    },
    [dispatch],
  );

  const handleCaptchaSuccess = useCallback(
    (recaptchaCode: string) => {
      dispatch(authActions.setRecaptcha(recaptchaCode));
      dispatch(hideBlurView());
      handleSubmitEmail();
    },
    [dispatch, handleSubmitEmail],
  );

  const handleCaptchaFail = useCallback(() => {
    dispatch(authActions.setRecaptcha());
    dispatch(hideBlurView());
  }, [dispatch]);

  const inputProps: TextInputProps = {
    returnKeyType: 'next',
    blurOnSubmit: false,
    onSubmitEditing: handleGoForward,
  };

  const timeLeft = timer > 0 ? `0:${timer >= 10 ? timer : `0${timer}`}` : '';

  return (
    <>
      <S.SignUpContainerStyled style={{ paddingBottom: bottom }}>
        <StatusBar />
        <S.KeyboardAvoidingViewStyledStyled behavior={isIOS ? 'padding' : 'height'}>
          <AuthProgress
            useHeight100={false}
            showSlide={showSlide}
            swipeForward={swipeForward}
            activeStepIndex={activeStepIndex}
            progressHeader={
              <S.AuthProgressHeaderStyled>
                <Button onPress={handleGoBack} appearance="icon">
                  <S.BackArrowIconButton name="angle-left" />
                </Button>
                <Progress progress={((activeStepIndex + 1) / STEP_COUNT) * 100} />
                {/*<Button*/}
                {/*  onPress={() => Alert.alert('Here goes help message')}*/}
                {/*  appearance="icon"*/}
                {/*>*/}
                {/*  <S.QuestionIconButton name="help-alt" />*/}
                {/*</Button>*/}
                <S.SpaceContainerStyled />
              </S.AuthProgressHeaderStyled>
            }
            steps={[
              {
                header: (
                  <S.AuthProgressStepTitleStyled type="HeadingsSB4">
                    <FormattedMessage {...messages.enterYourEmail} />
                  </S.AuthProgressStepTitleStyled>
                ),
                content: (
                  <Input
                    appearance="invisible"
                    value={email}
                    onChangeText={handleChangeAuthField('email')}
                    ref={(node) => setCurrentRef(node)}
                    inputProps={{
                      ...{ onSubmitEditing: handleSubmitEmail, returnKeyType: 'next' },
                      ...(isISE
                        ? {
                            autoCorrect: false,
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
                    disabled={timer > 0}
                    title={
                      <FormattedMessage
                        {...messages.sendEmail}
                        values={{
                          timeLeft,
                        }}
                      />
                    }
                    onPress={handleSubmitEmail}
                  />
                ),
              },
              {
                header: (
                  <S.AuthProgressStepTitleStyled type="HeadingsSB4">
                    <FormattedMessage {...messages.enterMailCode} />
                  </S.AuthProgressStepTitleStyled>
                ),
                content: (
                  <CodeInput
                    icon="mail-code"
                    value={emailCode}
                    error={emailError}
                    onChangeText={handleSetCode}
                    onSubmitEditing={handleCheckEmailCode}
                    inputProps={{
                      onSubmitEditing: handleCheckEmailCode,
                      blurOnSubmit: false,
                    }}
                  />
                ),
                footer: (
                  <S.NextButtonStyled
                    title={
                      <FormattedMessage {...messages.sendAgain} values={{ timeLeft }} />
                    }
                    appearance="ghost"
                    disabled={timer > 0}
                    onPress={handleSubmitEmail}
                  />
                ),
              },
              ...(signUp
                ? [
                    {
                      header: (
                        <>
                          <S.AuthProgressStepTitleStyled type="HeadingsSB4">
                            <FormattedMessage {...messages.enterUsername} />
                          </S.AuthProgressStepTitleStyled>
                          <S.AuthProgressStepSubtitleStyled type="BodyAccent">
                            <FormattedMessage {...messages.usernameMayContain} />
                          </S.AuthProgressStepSubtitleStyled>
                        </>
                      ),
                      content: (
                        <Input
                          appearance="invisible"
                          value={login}
                          ref={(node) => setCurrentRef(node)}
                          onChangeText={handleChangeAuthField('login')}
                          inputProps={{
                            ...inputProps,
                            ...{ onSubmitEditing: handleEnterLoginFinish },
                            ...(isISE
                              ? {
                                  autoCorrect: false,
                                }
                              : {
                                  autoCorrect: true,
                                  textContentType: 'nickname',
                                  keyboardType: 'ascii-capable',
                                }),
                          }}
                        />
                      ),
                      footer: (
                        <>
                          <S.NextButtonStyled
                            title={<FormattedMessage {...messages.next} />}
                            onPress={handleEnterLoginFinish}
                          />
                        </>
                      ),
                    },
                    {
                      header: (
                        <>
                          <S.AuthProgressStepTitleStyled type="HeadingsSB4">
                            <FormattedMessage {...messages.enterFirstName} />
                          </S.AuthProgressStepTitleStyled>
                        </>
                      ),
                      content: (
                        <Input
                          appearance="invisible"
                          value={firstName}
                          ref={(node) => setCurrentRef(node)}
                          onChangeText={handleChangeAuthField('firstName')}
                          inputProps={{
                            ...inputProps,
                            ...{ onSubmitEditing: handleEnterName('firstName') },
                            ...(isISE
                              ? {
                                  autoCorrect: false,
                                }
                              : {
                                  autoCorrect: true,
                                  textContentType: 'nickname',
                                  keyboardType: 'ascii-capable',
                                }),
                          }}
                        />
                      ),
                      footer: (
                        <>
                          <S.NextButtonStyled
                            title={<FormattedMessage {...messages.next} />}
                            onPress={handleEnterName('firstName')}
                          />
                        </>
                      ),
                    },
                    {
                      header: (
                        <>
                          <S.AuthProgressStepTitleStyled type="HeadingsSB4">
                            <FormattedMessage {...messages.enterLastName} />
                          </S.AuthProgressStepTitleStyled>
                        </>
                      ),
                      content: (
                        <Input
                          appearance="invisible"
                          value={lastName}
                          ref={(node) => setCurrentRef(node)}
                          onChangeText={handleChangeAuthField('lastName')}
                          inputProps={{
                            ...inputProps,
                            ...{ onSubmitEditing: handleEnterName('lastName') },
                            ...(isISE
                              ? {
                                  autoCorrect: false,
                                }
                              : {
                                  autoCorrect: true,
                                  textContentType: 'nickname',
                                  keyboardType: 'ascii-capable',
                                }),
                          }}
                        />
                      ),
                      footer: (
                        <>
                          <S.NextButtonStyled
                            title={<FormattedMessage {...messages.next} />}
                            onPress={handleEnterName('lastName')}
                          />
                        </>
                      ),
                    },
                  ]
                : []),
              {
                header: (
                  <S.AuthProgressStepTitleStyled type="HeadingsSB4">
                    <FormattedMessage {...messages.createPassword} />
                  </S.AuthProgressStepTitleStyled>
                ),
                content: (
                  <>
                    <S.RequirementsStyled
                      requirementMap={[
                        {
                          title: <FormattedMessage {...messages.lowercaseLetters} />,
                          validator: REGEXES.createPassword.lowercase,
                        },
                        {
                          title: <FormattedMessage {...messages.uppercaseLetters} />,
                          validator: REGEXES.createPassword.uppercase,
                        },
                        {
                          title: <FormattedMessage {...messages.digits} />,
                          validator: REGEXES.createPassword.digits,
                        },
                        {
                          title: <FormattedMessage {...messages.atLess8Symbols} />,
                          validator: REGEXES.createPassword.length,
                        },
                      ]}
                      onSuccess={handleGoForward}
                      touched={touched}
                      currentInputValue={password}
                    />
                    <S.InputStyled
                      appearance="invisible"
                      value={password}
                      onChangeText={handleCreatePasswordInput}
                      password
                      inputProps={{
                        ...inputProps,
                        ...{ onSubmitEditing: handleCreatePasswordFinish },
                        ...(isISE
                          ? {
                              autoCorrect: false,
                            }
                          : {
                              autoCorrect: true,
                              textContentType: 'password',
                              keyboardType: 'ascii-capable',
                            }),
                      }}
                    />
                  </>
                ),
                footer: (
                  <S.NextButtonStyled
                    title={<FormattedMessage {...messages.next} />}
                    onPress={handleCreatePasswordFinish}
                  />
                ),
              },
              {
                header: (
                  <S.AuthProgressStepTitleStyled type="HeadingsSB4">
                    <FormattedMessage {...messages.repeatPassword} />
                  </S.AuthProgressStepTitleStyled>
                ),
                content: (
                  <Input
                    appearance="invisible"
                    value={repeatedNewPassword}
                    onChangeText={(value: string) => setRepeatedNewPassword(value)}
                    password
                    ref={(node) => setCurrentRef(node)}
                    inputProps={{
                      ...inputProps,
                      ...{ onSubmitEditing: handleRepeatPasswordSubmit },
                      ...(isISE
                        ? {
                            autoCorrect: false,
                          }
                        : {
                            autoCorrect: true,
                            textContentType: 'password',
                            keyboardType: 'ascii-capable',
                          }),
                    }}
                  />
                ),
                footer: (
                  <S.NextButtonStyled
                    title={<FormattedMessage {...messages.next} />}
                    onPress={handleRepeatPasswordSubmit}
                  />
                ),
              },
            ]}
          />
        </S.KeyboardAvoidingViewStyledStyled>
      </S.SignUpContainerStyled>
      {blurViewShown && (
        <BlurView>
          <Captcha onSuccess={handleCaptchaSuccess} onFailure={handleCaptchaFail} />
        </BlurView>
      )}
    </>
  );
};
