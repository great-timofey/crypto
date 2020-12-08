import React, { useCallback, useState, FC, useRef } from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { useTheme } from 'styled-components';

import { ButtonProps } from './Button.interface';
import * as S from './Button.styles';

import { getRippleColor, hex2rgba } from '$global/utils';
import { isAndroid } from '$global/device';
import { GRADIENTS } from '$global/gradients';

export const Button: FC<ButtonProps> = ({
  appearance = 'primary',
  disabled,
  onPress,
  style,
  title,
  children,
  touchableProps = {},
}) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const timerRef = useRef<null | number>(null);

  const theme = useTheme();

  const calculateRippleColor = () => {
    if (appearance === 'primary') {
      return TouchableNativeFeedback.Ripple(hex2rgba(theme.colors.white, 0.16), false);
    }

    return getRippleColor(theme);
  };

  const handlePressIn = () => {
    setPressed(true);
  };

  const handlePressOut = useCallback(() => {
    setPressed(false);

    if (!onPress) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(onPress, 250);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onPress]);

  if (appearance === 'icon') {
    const buttonProps = onPress
      ? {
          onPressIn: handlePressIn,
          onPressOut: handlePressOut,
          disabled,
        }
      : { as: View };
    return (
      <S.ButtonIconStyled style={style} {...buttonProps} {...touchableProps}>
        {children}
      </S.ButtonIconStyled>
    );
  }

  if (appearance !== 'primary') {
    return isAndroid ? (
      <TouchableNativeFeedback
        useForeground
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        background={calculateRippleColor()}
      >
        <S.ButtonStyled
          as={View}
          style={style}
          appearance={appearance}
          disabled={disabled}
          {...touchableProps}
        >
          <S.ButtonTextStyled appearance={appearance} type="Buttons1SB">
            {title}
          </S.ButtonTextStyled>
        </S.ButtonStyled>
      </TouchableNativeFeedback>
    ) : (
      <S.ButtonStyled
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={style}
        pressed={pressed}
        appearance={appearance}
        disabled={disabled}
        {...touchableProps}
      >
        <S.ButtonTextStyled appearance={appearance} type="Buttons1SB">
          {title}
        </S.ButtonTextStyled>
      </S.ButtonStyled>
    );
  }

  return isAndroid ? (
    <TouchableNativeFeedback
      disabled={disabled}
      onPressOut={handlePressOut}
      useForeground
      background={calculateRippleColor()}
    >
      <S.ButtonContainerStyled
        as={View}
        disabled={disabled}
        style={style}
        {...touchableProps}
      >
        <S.PrimaryButtonStyled
          disabled={disabled}
          useAngle
          angle={GRADIENTS.PrimaryBlue.angle}
          colors={GRADIENTS.PrimaryBlue.colors}
        >
          <S.ButtonTextStyled appearance={appearance} type="Buttons1SB">
            {title}
          </S.ButtonTextStyled>
        </S.PrimaryButtonStyled>
      </S.ButtonContainerStyled>
    </TouchableNativeFeedback>
  ) : (
    <S.ButtonContainerStyled
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
      {...touchableProps}
    >
      <S.PrimaryButtonStyled
        disabled={disabled}
        useAngle
        angle={GRADIENTS.PrimaryBlue.angle}
        colors={GRADIENTS.PrimaryBlue.colors}
      >
        <S.ButtonTextStyled appearance={appearance} type="Buttons1SB">
          {title}
        </S.ButtonTextStyled>
      </S.PrimaryButtonStyled>
      {pressed && (
        <S.ButtonTextStyled absolutePosition appearance={appearance} type="Buttons1SB">
          {title}
        </S.ButtonTextStyled>
      )}
      <S.PrimaryButtonPressedOverlayStyled pressed={pressed} />
    </S.ButtonContainerStyled>
  );
};
