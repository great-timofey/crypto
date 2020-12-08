import React, { memo, useEffect, useRef, FC } from 'react';
import { Animated, Easing } from 'react-native';
import { useTheme } from 'styled-components';

import { Icon } from '../Icon/Icon';

import { LoaderProps } from './Loader.interface';
import * as S from './Loader.styles';

import { DEFAULT_TOAST_DURATION } from '$global/constants';

export const Loader: FC<LoaderProps> = memo(
  ({ fill, appearance = 'light', toastMode = false, style }) => {
    const rotate = useRef(new Animated.Value(0)).current;
    const theme = useTheme();

    useEffect(() => {
      Animated.loop(
        Animated.timing(rotate, {
          toValue: 1,
          easing: Easing.linear,
          duration: DEFAULT_TOAST_DURATION,
          useNativeDriver: true,
        }),
      ).start();
    }, [rotate]);

    const deg = rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const getSource = () => {
      if (toastMode) {
        return theme.isCurrent('light')
          ? require('$assets/images/loading-icon.png')
          : require('$assets/images/loading-icon-dark.png');
      }

      return appearance === 'light'
        ? require('$assets/images/loading-icon.png')
        : require('$assets/images/loading-icon-dark.png');
    };

    return fill ? (
      <S.LoaderViewStyled style={{ style, transform: [{ rotate: deg }] }}>
        <Icon fill={fill} name="loading" />
      </S.LoaderViewStyled>
    ) : (
      <S.LoaderImageStyled
        style={[
          style,
          {
            transform: [
              {
                rotate: deg,
              },
            ],
          },
        ]}
        source={getSource()}
      />
    );
  },
);
