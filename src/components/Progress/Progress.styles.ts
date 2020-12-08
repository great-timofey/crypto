import { Animated } from 'react-native';
import styled from 'styled-components';

import { mrIX } from '$global/device';

export const ProgressContainerStyled = styled.View`
  height: 2px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundQuaternary};
  margin: 0 ${mrIX ? 40 : 20}px;
`;

export const ProgressStyled = styled(Animated.View)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.primaryBlue};
`;
