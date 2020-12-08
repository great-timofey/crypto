import styled, { css } from 'styled-components';

import { Typography } from '../Typography/Typography';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';

import {
  InputContainerStyledProps,
  InputIconStyledProps,
  InputStyledProps,
} from './Input.interface';

import { isAndroid } from '$global/device';
import { FONTS } from '$global/fonts';

const disabledInputContainerStyles = css`
  background-color: ${({ theme }) => theme.colors.transparent};
  border: 1.5px solid ${({ theme }) => theme.colors.backgroundQuaternary};
`;

const focusedInputContainerStyles = css`
  border: 1.5px solid ${({ theme }) => theme.colors.primaryBlue};
`;

const inputContainerStyles = {
  invisible: '',
  default: css<InputContainerStyledProps>`
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    border: 1.5px solid ${({ theme }) => theme.colors.transparent};
    ${({ disabled }) => disabled && disabledInputContainerStyles};
    ${({ focused }) => focused && focusedInputContainerStyles};
  `,
};

const inputStyles = {
  invisible: css<InputStyledProps>`
    height: 40px;
    padding-vertical: 4px;
    font-size: 22px;
    font-family: ${FONTS.Montserrat['600']};
    text-align: center;
    letter-spacing: -${40 * 0.02}px;
    padding-left: ${({ extraPaddingLeft }) => (extraPaddingLeft ? 40 : 10)}px;
    padding-right: ${({ extraPaddingRight }) => (extraPaddingRight ? 40 : 10)}px;
    color: ${({ theme }) => theme.colors.foregroundPrimary};
  `,
  code: css<InputStyledProps>`
    height: 40px;
    letter-spacing: 40px;
    font-family: ${FONTS.Montserrat['600']};
    font-size: 34px;
    line-height: 40px;
  `,
  default: css<InputStyledProps>`
    height: 48px;
    font-size: 17px;
    font-family: ${FONTS.Montserrat['500']};
    line-height: 22px;
    padding-vertical: 12px;
    padding-left: ${({ extraPaddingLeft }) => (extraPaddingLeft ? 48 : 16)}px;
    padding-right: ${({ extraPaddingRight }) => (extraPaddingRight ? 56 : 16)}px;
    color: ${({ theme }) => theme.colors.foregroundPrimary};
    ${({ disabled, theme }) => disabled && `color: ${theme.colors.foregroundQuaternary}`};
  `,
};

export const InputContainerStyled = styled.View<InputContainerStyledProps>`
  ${({ appearance }) => inputContainerStyles[appearance]};
`;

export const InputWithAttributesWrapperStyled = styled.View``;

export const InputStyled = styled.TextInput.attrs(({ theme }) => ({
  selectionColor: theme.colors.primaryBlue,
  placeholderTextColor: theme.colors.foregroundQuaternary,
}))<InputStyledProps>`
  ${({ appearance, haveCustomStyles }) => !haveCustomStyles && inputStyles[appearance]};
  ${isAndroid && 'font-weight: normal'};
`;

const IconStyled = styled(Icon).attrs<InputIconStyledProps>(
  ({ focused, disabled, theme }) => ({
    fill:
      focused && !disabled
        ? theme.colors.foregroundPrimary
        : theme.colors.foregroundQuaternary,
  }),
)<InputIconStyledProps>`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  transform: translateY(-12px);
`;

export const IconLeftStyled = styled(IconStyled)`
  left: 16px;
`;

export const IconRightStyled = styled(IconStyled)`
  right: 16px;
`;

export const LabelRightStyled = styled(Typography)`
  position: absolute;
  top: 50%;
  transform: translateY(-12px);
  right: 16px;
  color: ${({ theme }) => theme.colors.foregroundTertiary};
`;

export const SetShowPasswordButtonStyled = styled(Button)`
  right: 0;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  transform: translateY(-20px);
`;

export const InputLabelStyled = styled(Typography)<Pick<InputStyledProps, 'disabled'>>`
  margin-bottom: 8px;
  ${({ disabled, theme }) => disabled && `color: ${theme.colors.foregroundQuaternary}`}
`;
export const InputDescriptionStyled = styled(InputLabelStyled)`
  margin-bottom: 0;
  margin-top: 8px;
  ${({ disabled, theme }) => disabled && `color: ${theme.colors.foregroundQuaternary}`}
`;
