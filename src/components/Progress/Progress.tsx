import React, { memo, useEffect, useRef, FC } from 'react';
import { Animated } from 'react-native';

import { ProgressProps } from './Progress.interface';
import * as S from './Progress.styles';

import { SLIDE_ANIMATION_DURATION } from '$global/constants';

export const Progress: FC<ProgressProps> = memo(({ progress }) => {
  const progressWidth = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(progressWidth, {
      toValue: progress,
      duration: SLIDE_ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  }, [progressWidth, progress]);

  return (
    <S.ProgressContainerStyled>
      <S.ProgressStyled
        style={{
          width: progressWidth.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '1%'],
          }),
        }}
      />
    </S.ProgressContainerStyled>
  );
});
