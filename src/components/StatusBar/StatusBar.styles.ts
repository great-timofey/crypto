import { StatusBar as StatusBarRNComponent } from 'react-native';
import styled from 'styled-components';

import { StatusBarContainerStyledProps } from './StatusBar.interface';

import { isIOS, selectNotchedProperties } from '$global/device';

export const StatusBarContainerStyled = styled.View<StatusBarContainerStyledProps>`
  background-color: ${({ theme, backgroundColorKey }) =>
    theme.colors[backgroundColorKey]};
  height: ${({ height = 40 }) =>
    isIOS ? selectNotchedProperties(height, 20) : StatusBarRNComponent.currentHeight}px;
`;
