import styled from 'styled-components';
import { Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  SWITCH_CIRCLE_SIZE,
  SWITCH_BORDER_RADIUS,
  SWITCH_HEIGHT,
  SWITCH_PADDING,
  SWITCH_WIDTH,
} from './Switch.constants';

export const LinearGradientStyled = styled(LinearGradient)`
  overflow: hidden;
  width: ${SWITCH_WIDTH}px;
  height: ${SWITCH_HEIGHT}px;
  border-radius: ${SWITCH_BORDER_RADIUS}px;
  padding: ${SWITCH_PADDING}px;
`;

export const SwitchBackgroundStyled = styled(Animated.View)`
  position: absolute;
  width: ${SWITCH_WIDTH}px;
  height: ${SWITCH_HEIGHT}px;
  background: ${({ theme }) => theme.colors.backgroundQuaternary};
`;

export const CircleStyled = styled(Animated.View)`
  background: ${({ theme }) => theme.colors.white}
  width: ${SWITCH_CIRCLE_SIZE}px;
  height: ${SWITCH_CIRCLE_SIZE}px;
  border-radius: ${SWITCH_CIRCLE_SIZE / 2}px;
`;
