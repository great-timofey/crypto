import React, { useCallback, useEffect, useRef, FC } from 'react';
import { Animated } from 'react-native';

import { AuthProgressStepProps } from './AuthProgressStep.interface';
import * as S from './AuthProgressStep.styles';

import { SLIDE_ANIMATION_DURATION } from '$global/constants';
import { DEVICE_WIDTH } from '$global/device';

export const AuthProgressStep: FC<AuthProgressStepProps> = ({
  showSlide,
  swipeForward,
  header,
  children,
  footer,
  centeredVertically = true,
}) => {
  const left = useRef(new Animated.Value(swipeForward ? DEVICE_WIDTH : -DEVICE_WIDTH))
    .current;

  const animate = useCallback(
    ({ out, swipeForwardDirection }) => {
      if (out) {
        Animated.timing(left, {
          duration: SLIDE_ANIMATION_DURATION,
          toValue: swipeForwardDirection ? -DEVICE_WIDTH : DEVICE_WIDTH,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(left, {
          duration: SLIDE_ANIMATION_DURATION,
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
    [left],
  );

  useEffect(() => {
    animate({ swipeForwardDirection: swipeForward, out: false });
  }, [animate, swipeForward]);

  useEffect(() => {
    if (!showSlide) {
      animate({ swipeForwardDirection: swipeForward, out: true });
    }
  }, [animate, showSlide, swipeForward]);

  return (
    <S.AuthProgressStepStyled>
      <S.AuthProgressStepTitleContainerStyled
        style={[
          {
            transform: [{ translateX: left }],
          },
        ]}
      >
        {header}
      </S.AuthProgressStepTitleContainerStyled>
      <S.AuthProgressStepContentStyled
        centeredVertically={centeredVertically}
        style={[{ transform: [{ translateX: left }] }]}
      >
        {children}
      </S.AuthProgressStepContentStyled>
      <S.AuthProgressFooterContainerStyled>{footer}</S.AuthProgressFooterContainerStyled>
    </S.AuthProgressStepStyled>
  );
};
