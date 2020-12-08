import React, { useCallback, useState, useEffect, useRef, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, TextInput, TextInputProps } from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFocusEffect } from '@react-navigation/native';
import { useBackHandler } from '@react-native-community/hooks';
import { useSafeArea } from 'react-native-safe-area-context';

import * as S from './SignIn.styles';

import { isIOS, isISE } from '$global/device';
import messages from '$i18n/shared/Auth.messages';
import { AppDispatch, AppState } from '$redux/store';
import {
  AuthProgress,
  Input,
  Button,
  Progress,
  CodeInput,
  BlurView,
  StatusBar,
} from '$components';
import { authActions } from '$redux/auth/';
import { AuthChangeableField } from '$redux/auth/interface';
import { AuthScreensNames } from '$navigation/names';
import {
  KEYBOARD_OPENING_DURATION,
  REGEXES,
  SLIDE_ANIMATION_DURATION,
} from '$global/constants';
import { ProgressStepProps } from '$components/AuthProgress/AuthProgress.interface';
import { Captcha } from '$components/Captcha/Captcha';
import { displayToastError, hideBlurView, setGACode } from '$redux/common/actions';
import { SignInScreenNavigationProp } from '$navigation/auth/AuthNavigator.interface';

type SignInProps = {
  navigation: SignInScreenNavigationProp;
};

export const SignIn: FC<SignInProps> = ({ navigation }) => {
  const [swipeForward, setSwipeForward] = useState(true);
  const [ableToRender, setAbleToRender] = useState(true);
  const [gaCompleted, setgaCompleted] = useState(false);
  const [showSlide, setShowSlide] = useState(true);
  const intl = useIntl();

  const { bottom } = useSafeArea();
  const dispatch = useDispatch<AppDispatch>();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setAbleToRender(false);
      };
    }, []),
  );

  const {
    auth: { login, password, activeStepIndex },
    common: { blurViewShown, toastShown, gaError, needGA, gaCode },
  } = useSelector((state: AppState) => state);

  const focusTimer = useRef<number | null>(null);
  const [currentRef, setcurrentRef] = useState<TextInput | null>(null);

  useEffect(() => {
    if (toastShown || blurViewShown) return;

    if (focusTimer.current !== null) {
      clearTimeout(focusTimer.current);
    }

    focusTimer.current = setTimeout(() => {
      currentRef?.focus();
    }, KEYBOARD_OPENING_DURATION);

    return () => {
      if (focusTimer.current) {
        clearTimeout(focusTimer.current);
      }
    };
  }, [blurViewShown, activeStepIndex, toastShown, currentRef]);

  const handleCannotSignIn = useCallback(() => {
    dispatch(authActions.clearAuthData());
    navigation.navigate(AuthScreensNames.SignUpOrResetPassword);
  }, [dispatch, navigation]);

  const onChangeAuthField = useCallback(
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
      dispatch(setGACode(''));
      navigation.navigate(AuthScreensNames.Start);
    }
  }, [activeStepIndex, dispatch, navigation]);

  useBackHandler(() => {
    handleGoBack();
    return true;
  });

  const handleSetCode = useCallback(
    (value) => {
      if (value.length <= 6 && REGEXES.gaCode.test(value)) dispatch(setGACode(value));
    },
    [dispatch],
  );

  const handleSubmitEditingCode = useCallback(() => {
    dispatch(authActions.signInTwoStepRequest());
  }, [dispatch]);

  const handleGoForward = () => {
    if (activeStepIndex === 0 && !login) {
      dispatch(displayToastError(intl.formatMessage(messages.enterYourLoginOrEmail)));
      return;
    }

    if (activeStepIndex < (needGA ? stepsWithGA : steps).length - 1) {
      setSwipeForward(true);
      setShowSlide(false);

      setTimeout(() => {
        setShowSlide(true);
        dispatch(authActions.setAuthorizationActiveStepIndex(activeStepIndex + 1));
      }, SLIDE_ANIMATION_DURATION);
    } else {
      Keyboard.dismiss();
      dispatch(authActions.signInRequest());
    }
  };

  useEffect(() => {
    function addGAStep() {
      setAbleToRender(false);
      setgaCompleted(true);

      setImmediate(() => {
        setAbleToRender(true);
        dispatch(authActions.setAuthorizationActiveStepIndex(activeStepIndex + 1));
      });
    }

    if (activeStepIndex !== 0 && needGA && !gaCompleted) {
      addGAStep();
    }
  }, [activeStepIndex, needGA, dispatch, gaCompleted]);

  const inputProps: TextInputProps = {
    returnKeyType: 'next',
    autoFocus: true,
    onSubmitEditing: handleGoForward,
  };

  const steps: ProgressStepProps[] = [
    {
      header: (
        <S.AuthProgressStepTitleStyled type="HeadingsSB4">
          <FormattedMessage {...messages.enterYourLoginOrEmail} />
        </S.AuthProgressStepTitleStyled>
      ),
      content: (
        <Input
          appearance="invisible"
          ref={setcurrentRef}
          value={login}
          onChangeText={onChangeAuthField('login')}
          inputProps={{
            ...inputProps,
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
        <>
          <S.NextButtonStyled
            title={<FormattedMessage {...messages.cannotSignIn} />}
            appearance="ghost"
            onPress={handleCannotSignIn}
          />
          <S.NextButtonStyled
            title={<FormattedMessage {...messages.next} />}
            onPress={handleGoForward}
          />
        </>
      ),
    },
    {
      header: (
        <S.AuthProgressStepTitleStyled type="HeadingsSB4">
          <FormattedMessage {...messages.enterYourPassword} />
        </S.AuthProgressStepTitleStyled>
      ),
      content: (
        <Input
          ref={setcurrentRef}
          appearance="invisible"
          value={password}
          onChangeText={onChangeAuthField('password')}
          password
          inputProps={{
            ...inputProps,
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
        <>
          <S.NextButtonStyled
            title={<FormattedMessage {...messages.cannotSignIn} />}
            appearance="ghost"
            onPress={handleCannotSignIn}
          />
          <S.NextButtonStyled
            title={<FormattedMessage {...messages.next} />}
            onPress={handleGoForward}
          />
        </>
      ),
    },
  ];

  const handleCaptchaSuccess = useCallback(
    (recaptchaCode: string) => {
      dispatch(authActions.setRecaptcha(recaptchaCode));
      dispatch(hideBlurView());
      Keyboard.dismiss();
      dispatch(authActions.signInRequest());
    },
    [dispatch],
  );

  const handleCaptchaFail = useCallback(() => {
    dispatch(authActions.setRecaptcha());
    dispatch(hideBlurView());
    currentRef?.focus();
  }, [dispatch, currentRef]);

  const stepsWithGA = needGA
    ? steps.concat({
        header: (
          <S.AuthProgressStepTitleStyled type="HeadingsSB4">
            <FormattedMessage {...messages.enterGACode} />
          </S.AuthProgressStepTitleStyled>
        ),
        content: (
          <CodeInput
            error={gaError}
            icon="google-authenticator"
            value={gaCode}
            onChangeText={handleSetCode}
            onSubmitEditing={handleSubmitEditingCode}
          />
        ),
      })
    : [];

  return ableToRender ? (
    <>
      <S.SignInContainerStyled style={{ paddingBottom: bottom }}>
        <StatusBar />
        <S.KeyboardAvoidingViewStyledStyled behavior={isIOS ? 'padding' : 'height'}>
          <AuthProgress
            useHeight100={false}
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
                    ((activeStepIndex + 1) / (needGA ? stepsWithGA : steps).length) * 100
                  }
                />
                <S.SpaceContainerStyled />
              </S.AuthProgressHeaderStyled>
            }
            steps={needGA ? stepsWithGA : steps}
          />
        </S.KeyboardAvoidingViewStyledStyled>
      </S.SignInContainerStyled>
      {blurViewShown && (
        <BlurView>
          <Captcha onSuccess={handleCaptchaSuccess} onFailure={handleCaptchaFail} />
        </BlurView>
      )}
    </>
  ) : (
    <></>
  );
};
