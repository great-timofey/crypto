import styled from 'styled-components';
import { TextInput } from 'react-native';

import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';

import { CodeItemStyledProps } from './CodeInput.interface';

import { NarfexTheme } from '$global/theme';
import { DEVICE_WIDTH } from '$global/device';

export const CodeContainerStyled = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const CodeIconStyled = styled(Icon)`
  width: 48px;
  height: 48px;
  align-self: center;
  margin-bottom: 40px;
  margin-top: 20px;
`;

export const CodeContainer = styled.View`
  width: 216px;
  flex-direction: row;
`;

function getCharColor({
  theme,
  colorless,
  active,
  error,
}: {
  theme: NarfexTheme;
  colorless: boolean;
  active: boolean;
  error?: boolean;
}) {
  if (error) {
    return theme.colors.error2;
  }

  if (colorless) {
    return theme.colors.backgroundQuaternary;
  }

  if (active) {
    return theme.colors.primaryBlue;
  }

  return theme.colors.foregroundSecondary;
}

export const CodeItemStyled = styled(Typography)<CodeItemStyledProps>`
  width: 36px;
  text-align: center;
  color: ${({ theme, colorless, active, error }) =>
    getCharColor({ theme, error, colorless, active })};
`;

export const TextInputInvisibleStyled = styled(TextInput)`
  position: absolute;
  width: ${DEVICE_WIDTH}px;
  top: 0;
  left: 0;
  opacity: 0;
`;
