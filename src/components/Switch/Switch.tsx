import React, { useEffect, useRef, FC, useState } from 'react';
import { TouchableWithoutFeedback, Animated } from 'react-native';

import * as S from './Switch.styles';
import { SwitchProps } from './Switch.interface';
import {
  SWITCH_ACTIVE_CIRCLE_WIDTH,
  SWITCH_ANIMATION_DURATION,
  SWITCH_CIRCLE_OFFSET,
  SWITCH_CIRCLE_SIZE,
  SWITCH_CIRCLE_WIDTH_DIFF,
} from './Switch.constants';

import { GRADIENTS } from '$global/gradients';
import { addHitSlop } from '$global/utils';

export const Switch: FC<SwitchProps> = ({ onChange, value }) => {
  const [active, setActive] = useState<boolean>(false);
  const opacityAnim = useRef(new Animated.Value(value ? 0 : 1)).current;
  const translateX = useRef(new Animated.Value(value ? SWITCH_CIRCLE_OFFSET : 0)).current;
  const circleWidth = useRef(new Animated.Value(SWITCH_CIRCLE_SIZE)).current;

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: value ? 0 : 1,
      duration: SWITCH_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateX, {
      toValue: value ? SWITCH_CIRCLE_OFFSET - (active ? SWITCH_CIRCLE_WIDTH_DIFF : 0) : 0,
      duration: SWITCH_ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();

    Animated.timing(circleWidth, {
      toValue: active ? SWITCH_ACTIVE_CIRCLE_WIDTH : SWITCH_CIRCLE_SIZE,
      duration: SWITCH_ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  }, [value, active, opacityAnim, translateX, circleWidth]);

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        setActive(true);
      }}
      {...addHitSlop([15, 50])}
      onPressOut={() => {
        setActive(false);
        // TODO: Added vibration
        onChange(!value);
      }}
    >
      <S.LinearGradientStyled
        useAngle
        angle={GRADIENTS.PrimaryBlue.angle}
        colors={GRADIENTS.PrimaryBlue.colors}
      >
        <S.SwitchBackgroundStyled
          style={{
            opacity: opacityAnim,
          }}
        />
        <S.CircleStyled
          style={{
            width: circleWidth,
            transform: [{ translateX }],
          }}
        />
      </S.LinearGradientStyled>
    </TouchableWithoutFeedback>
  );
};
