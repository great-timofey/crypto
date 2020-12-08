import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

import { Icon } from '../Icon/Icon';

import { GRADIENTS } from '$global/gradients';

export const RadioButtonStyled = styled(LinearGradient).attrs(() => ({
  useAngle: true,
  angle: GRADIENTS.PrimaryBlue.angle,
  colors: GRADIENTS.PrimaryBlue.colors,
}))`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;

export const CheckStyled = styled(Icon).attrs(({ theme }) => ({
  name: 'check-small',
  fill: theme.colors.white,
}))`
  margin: auto;
`;

export const CircleStyled = styled.View`
  margin: auto;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.backgroundPrimary};
`;
