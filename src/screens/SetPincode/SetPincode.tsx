import React, { FC, useCallback, useState } from 'react';
import { useBackHandler } from '@react-native-community/hooks';
import { FormattedMessage, useIntl } from 'react-intl';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './SetPincode.styles';

import { NOTCHED_PADDING_BOTTOM, PROGRESS_HEIGHT } from '$screens/SetPincode/constants';
import { selectNotchedProperties } from '$global/device';
import {
  AuthProgress,
  Button,
  CodeInput,
  CustomKeyboard,
  Progress,
  StatusBar,
} from '$components';
import { ProgressStepProps } from '$components/AuthProgress/AuthProgress.interface';
import {
  CODE_INPUT_ERROR_DURATION,
  DEFAULT_TOAST_DURATION,
  SLIDE_ANIMATION_DURATION,
} from '$global/constants';
import { SetPincodeNavigationProp } from '$navigation/main/MainNavigator.interface';
import { displayToastError, displayToastSuccess } from '$redux/common/actions';
import { profileActions } from '$redux/profile';
import { profileSelector } from '$redux/selectors';
import messages from '$i18n/shared/Settings.messages';

export interface SetPincodeProps {
  navigation: SetPincodeNavigationProp;
}

export const SetPincode: FC<SetPincodeProps> = ({ navigation }) => {
  const { bottom } = useSafeArea();
  const { pincode, activeStepIndex } = useSelector(profileSelector);
  const [repeatedPincode, setRepeatedPincode] = useState('');
  const [swipeForward, setSwipeForward] = useState(true);
  const [showSlide, setShowSlide] = useState(true);
  const intl = useIntl();
  const dispatch = useDispatch();

  const handleGoBack = (resetToTop = false) => {
    if (activeStepIndex > 0 && !resetToTop) {
      dispatch(profileActions.setPincode(null));
      setSwipeForward(false);
      setShowSlide(false);

      setTimeout(() => {
        setShowSlide(true);
        dispatch(profileActions.setActiveStepIndex(activeStepIndex - 1));
      }, SLIDE_ANIMATION_DURATION);
    } else {
      if (pincode) {
        dispatch(profileActions.setPincode(null));
      }
      navigation.pop();
      dispatch(profileActions.setActiveStepIndex(0));
    }
  };

  useBackHandler(() => {
    handleGoBack();
    return true;
  });

  const handleGoForward = useCallback(() => {
    if (activeStepIndex === 0) {
      setSwipeForward(true);
      setShowSlide(false);

      setTimeout(() => {
        setShowSlide(true);
        dispatch(profileActions.setActiveStepIndex(activeStepIndex + 1));
      }, SLIDE_ANIMATION_DURATION);
    } else {
      if (repeatedPincode === pincode) {
        dispatch(displayToastSuccess(intl.formatMessage(messages.pincodeSet)));
        navigation?.pop();

        setTimeout(() => {
          dispatch(profileActions.setActiveStepIndex(0));
        }, DEFAULT_TOAST_DURATION);

        return;
      }

      dispatch(displayToastError(intl.formatMessage(messages.pincodesDontMatch)));
      setTimeout(() => {
        setRepeatedPincode('');
      }, CODE_INPUT_ERROR_DURATION);
    }
  }, [activeStepIndex, dispatch, intl, navigation, pincode, repeatedPincode]);

  const handleInput = (stepIndex: number) => (value: string) => {
    if (stepIndex === 0) {
      const currentPincode = pincode ?? '';
      if (currentPincode.length === 6) return;
      dispatch(profileActions.setPincode(currentPincode.concat(value)));
    } else {
      setRepeatedPincode(repeatedPincode.concat(value));
    }
  };

  const handleErase = (stepIndex: number) => () => {
    if (!stepIndex) {
      const currentPincode = pincode ?? '';
      const erasedPincode = currentPincode.slice(0, -1) || null;
      dispatch(profileActions.setPincode(erasedPincode));
      return;
    }

    setRepeatedPincode(repeatedPincode.slice(0, -1));
  };

  const steps: ProgressStepProps[] = [
    {
      header: (
        <S.StepHeaderStyled type="HeadingsSB4">
          <FormattedMessage {...messages.createPincode} />
        </S.StepHeaderStyled>
      ),
      content: (
        <S.PincodeStepContainerStyled>
          <S.InputContainerStyled>
            <CodeInput
              secureTextEntry
              renderInvisibleInput={false}
              onSubmitEditing={handleGoForward}
              icon="lock"
              value={pincode ?? ''}
            />
          </S.InputContainerStyled>
          <CustomKeyboard
            type="code"
            onInput={handleInput(activeStepIndex)}
            onErase={handleErase(activeStepIndex)}
          />
        </S.PincodeStepContainerStyled>
      ),
    },
    {
      header: (
        <S.StepHeaderStyled type="HeadingsSB4">
          <FormattedMessage {...messages.repeatPincode} />
        </S.StepHeaderStyled>
      ),
      content: (
        <S.PincodeStepContainerStyled>
          <S.InputContainerStyled>
            <CodeInput
              secureTextEntry
              renderInvisibleInput={false}
              onSubmitEditing={handleGoForward}
              icon="lock"
              value={repeatedPincode}
            />
          </S.InputContainerStyled>
          <CustomKeyboard
            type="code"
            onInput={handleInput(activeStepIndex)}
            onErase={handleErase(activeStepIndex)}
          />
        </S.PincodeStepContainerStyled>
      ),
    },
  ];

  return (
    <View
      style={{
        paddingBottom:
          bottom + PROGRESS_HEIGHT + selectNotchedProperties(NOTCHED_PADDING_BOTTOM, 0),
      }}
    >
      <StatusBar />
      <AuthProgress
        activeStepIndex={activeStepIndex}
        showSlide={showSlide}
        swipeForward={swipeForward}
        progressHeader={
          <S.AuthProgressHeaderStyled>
            <Button onPress={handleGoBack} appearance="icon">
              <S.BackArrowIconButton name="angle-left" />
            </Button>
            <Progress progress={((activeStepIndex + 1) / steps.length) * 100} />
            <Button onPress={() => handleGoBack(true)} appearance="icon">
              <S.BackArrowIconButton name="close-large" />
            </Button>
          </S.AuthProgressHeaderStyled>
        }
        steps={steps}
      />
    </View>
  );
};
