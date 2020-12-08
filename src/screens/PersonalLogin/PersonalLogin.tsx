import React, { useCallback, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, TextInput, TextInputProps } from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSafeArea } from 'react-native-safe-area-context';

import * as S from './PersonalLogin.styles';
import messages from './PersonalLogin.messages';

import { displayToastError, setGACode } from '$redux/common/actions';
import { isIOS, isISE } from '$global/device';
import { AppDispatch, AppState } from '$redux/store';
import { AuthProgress, Input, Button, Progress, CodeInput, StatusBar } from '$components';
import { REGEXES, SLIDE_ANIMATION_DURATION } from '$global/constants';
import { ProgressStepProps } from '$components/AuthProgress/AuthProgress.interface';
import { profileSelector } from '$redux/selectors';
import { profileActions } from '$redux/profile';
import { useKeyboardOpeningEffect } from '$hooks/useKeyboardOpeningEffect';
import { PersonalLoginScreenNavigationProp } from '$navigation/main/MainNavigator.interface';

type SignInProps = {
  navigation: PersonalLoginScreenNavigationProp;
};

export const PersonalLogin: FC<SignInProps> = ({ navigation }) => {
  const [swipeForward, setSwipeForward] = useState(true);
  const [showSlide, setShowSlide] = useState(true);
  const { bottom } = useSafeArea();
  const dispatch = useDispatch<AppDispatch>();
  const intl = useIntl();
  const [currentRef, setCurrentRef] = useState<TextInput | null>(null);

  const {
    gaEnabled,
    settings: { login, editLoginStep },
  } = useSelector(profileSelector);

  const {
    common: { gaError, gaCode },
  } = useSelector((state: AppState) => state);

  const onChangeLogin = (value: string) => {
    dispatch(profileActions.setSettingsLogin(value));
  };

  const handleGoBack = useCallback(() => {
    if (editLoginStep > 0) {
      setSwipeForward(false);
      setShowSlide(false);

      dispatch(setGACode(''));

      setTimeout(() => {
        setShowSlide(true);
        dispatch(profileActions.setEditLoginStep(editLoginStep - 1));
      }, SLIDE_ANIMATION_DURATION);
    } else {
      navigation.goBack();
      dispatch(profileActions.clearSettings());
    }
  }, [editLoginStep, dispatch, navigation]);

  const handleSetCode = useCallback(
    (value) => {
      if (value.length <= 6 && REGEXES.gaCode.test(value)) dispatch(setGACode(value));
    },
    [dispatch],
  );

  const handleSubmitGaCode = useCallback(() => {
    dispatch(profileActions.requestUpdateLogin());
  }, [dispatch]);

  const handleGoForward = () => {
    if (!REGEXES.login.test(login)) {
      dispatch(displayToastError(intl.formatMessage(messages.invalidLogin)));
    } else if (editLoginStep < steps.length - 1) {
      setSwipeForward(true);
      setShowSlide(false);

      setTimeout(() => {
        setShowSlide(true);
        dispatch(profileActions.setEditLoginStep(editLoginStep + 1));
      }, SLIDE_ANIMATION_DURATION);
    } else {
      Keyboard.dismiss();
      dispatch(profileActions.requestUpdateLogin());
    }
  };

  const inputProps: TextInputProps = {
    returnKeyType: 'next',
    autoFocus: true,
    onSubmitEditing: handleGoForward,
  };

  useKeyboardOpeningEffect(() => {
    currentRef?.focus();
  }, [currentRef]);

  const steps: ProgressStepProps[] = [
    {
      header: (
        <>
          <S.PersonalLoginStepTitleStyled type="HeadingsSB4">
            <FormattedMessage {...messages.enterNewLogin} />
          </S.PersonalLoginStepTitleStyled>
          <S.PersonalLoginStepDescriptionStyled type="BodyAccent">
            <FormattedMessage
              {...messages.loginMayConsist}
              values={{ value: 'A-z, 0-9, -, _' }}
            />
          </S.PersonalLoginStepDescriptionStyled>
        </>
      ),
      content: (
        <Input
          ref={setCurrentRef}
          appearance="invisible"
          value={login}
          onChangeText={onChangeLogin}
          inputProps={{
            ...inputProps,
            ...(isISE
              ? {
                  autoCorrect: false,
                }
              : {
                  autoCorrect: true,
                }),
          }}
        />
      ),
      footer: (
        <>
          <S.NextButtonStyled
            title={<FormattedMessage {...messages.change} />}
            onPress={handleGoForward}
          />
        </>
      ),
    },
    {
      header: (
        <S.PersonalLoginStepTitleStyled type="HeadingsSB4">
          <FormattedMessage {...messages.enterGACode} />
        </S.PersonalLoginStepTitleStyled>
      ),
      content: (
        <CodeInput
          ref={setCurrentRef}
          error={gaError}
          icon="google-authenticator"
          value={gaCode}
          onChangeText={handleSetCode}
          onSubmitEditing={handleSubmitGaCode}
        />
      ),
    },
  ].slice(...(gaEnabled ? [0] : [0, -1]));

  return (
    <S.PersonalLoginContainerStyled style={{ paddingBottom: bottom }}>
      <StatusBar />
      <S.KeyboardAvoidingViewStyledStyled behavior={isIOS ? 'padding' : 'height'}>
        <AuthProgress
          useHeight100={false}
          activeStepIndex={editLoginStep}
          showSlide={showSlide}
          swipeForward={swipeForward}
          progressHeader={
            <S.PersonalLoginHeaderStyled>
              <Button onPress={handleGoBack} appearance="icon">
                <S.BackArrowIconButton name="angle-left" />
              </Button>
              <Progress progress={((editLoginStep + 1) / steps.length) * 100} />
              <S.SpaceContainerStyled />
            </S.PersonalLoginHeaderStyled>
          }
          steps={steps}
        />
      </S.KeyboardAvoidingViewStyledStyled>
    </S.PersonalLoginContainerStyled>
  );
};
