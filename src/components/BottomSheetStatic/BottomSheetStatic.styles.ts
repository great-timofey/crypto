import styled from 'styled-components';
import Animated from 'react-native-reanimated';

import { Typography } from '../Typography/Typography';

import { DEVICE_WIDTH } from '$global/device';

export const BottomSheetContainerStyled = styled.View.attrs(() => ({
  pointerEvents: 'box-none',
}))`
  position: absolute;
  top: 0;
  bottom: 0;
  width: ${DEVICE_WIDTH}px;
`;

export const BottomSheetBackgroundStyled = styled(Animated.View).attrs(() => ({
  pointerEvents: 'none',
}))`
  background: ${({ theme }) => theme.colors.foregroundBlue};
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;
`;

export const BottomSheetHeaderStyled = styled(Typography)`
  padding: 16px;
`;

export const BottomSheetHandlerStyled = styled(Animated.View)`
  position: absolute;
  z-index: 1;
  top: 12px;
  height: 2px;
  left: 50%;
  margin-left: -20px;
  border-radius: 2px;
  width: 40px;
  background: ${({ theme }) => theme.colors.foregroundQuaternary};
`;

export const BottomSheetWrapperStyled = styled(Animated.View)`
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export const BottomSheetBodyStyled = styled(Animated.View)`
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  height: 100%;
  width: 100%;
`;
