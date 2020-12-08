import styled from 'styled-components';
import { Animated } from 'react-native';
import Reanimated from 'react-native-reanimated';

import { BOTTOM_TAB_BAR_HEIGHT } from '$global/constants';

export const BottomSheetOverlayStyled = styled(Reanimated.View)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  background-color: ${({ theme }) => theme.colors.scrim};
`;

export const BottomSheetOverlayContainerStyled = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
`;

export const FakeTabBarStyled = styled(Animated.View)<{ bottom: number }>`
  height: ${({ bottom }) => bottom + BOTTOM_TAB_BAR_HEIGHT}px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-width: 0.5px;
  z-index: 1;
  border-top-color: ${({ theme }) => theme.colors.foregroundQuaternary};
  background-color: ${({ theme }) => theme.colors.tabBar};
`;

export const FakeLayoutContainerStyled = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: -1;
  opacity: 0;
`;
