import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import styled, { css } from 'styled-components';

import { Typography } from '../Typography/Typography';

import {
  ButtonStyledProps,
  ButtonTextStyledProps,
  ButtonStyledWithoutButtonProps,
} from './Button.interface';

const buttonStyles = {
  common: css`
    border-radius: 16px;
    padding: 12px 0;
    height: 48px;
    overflow: hidden;
    width: 100%;
    align-items: center;
    justify-content: center;
  `,
  ghost: {
    normal: css`
      background-color: ${({ theme }) => theme.colors.transparent};
    `,
    pressed: css`
      background-color: ${({ theme }) => theme.colors.backgroundTertiary};
    `,
  },
  outline: {
    normal: css`
      background-color: ${({ theme }) => theme.colors.transparent};
      border: 1.5px solid ${({ theme }) => theme.colors.primaryBlue};
    `,
    pressed: css`
      background-color: ${({ theme }) => theme.colors.backgroundTertiary};
      border: 1.5px solid ${({ theme }) => theme.colors.transparent};
    `,
  },
};

export const ButtonStyled = styled.TouchableOpacity.attrs<ButtonStyledProps>({
  activeOpacity: 1,
})<ButtonStyledProps>`
  ${buttonStyles.common};
  ${({ appearance, pressed }) =>
    buttonStyles[appearance][pressed ? 'pressed' : 'normal']};
  ${({ disabled }) => disabled && 'opacity: 0.5'};
`;

export const ButtonIconStyled = styled.TouchableOpacity.attrs<
  ButtonStyledWithoutButtonProps
>({
  activeOpacity: 0.5,
})<ButtonStyledWithoutButtonProps>`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const ButtonContainerStyled = styled.TouchableOpacity.attrs<
  ButtonStyledWithoutButtonProps
>({
  activeOpacity: 1,
})<ButtonStyledWithoutButtonProps>`
  justify-content: center;
  align-items: center;
`;

export const PrimaryButtonPressedOverlayStyled = styled.View<
  Pick<ButtonStyledProps, 'pressed'>
>`
  ${buttonStyles.common};
  position: absolute;
  z-index: -1;
  opacity: 0;
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  ${({ pressed }) =>
    pressed &&
    css`
      z-index: 1;
      opacity: 1;
    `}
`;

export const PrimaryButtonStyled = styled(LinearGradient)<
  LinearGradientProps & Pick<ButtonStyledProps, 'disabled'>
>`
  ${buttonStyles.common};
  ${({ disabled }) => disabled && 'opacity: 0.5'};
`;

export const ButtonTextStyled = styled(Typography)<ButtonTextStyledProps>`
  ${({ appearance, theme }) =>
    `color: ${
      appearance === 'primary' ? theme.colors.white : theme.colors.foregroundBlue
    };`};
  ${({ absolutePosition }) =>
    absolutePosition &&
    css`
      position: absolute;
      z-index: 2;
    `};
`;
