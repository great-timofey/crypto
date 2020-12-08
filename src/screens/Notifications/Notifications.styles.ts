import styled from 'styled-components';

import { Typography } from '$components';
import { BOTTOM_TAB_BAR_HEIGHT } from '$global/constants';

export const NotificationsContainerStyled = styled.View`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const NotificationsBarLabelStyled = styled(Typography)<{ focused: boolean }>`
  color: ${({ focused, theme }) =>
    focused ? theme.colors.foregroundPrimary : theme.colors.foregroundTertiary};
`;

export const NotificationsBarIndicatorStyled = styled.View`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.foregroundBlue};
  position: absolute;
  bottom: -10px;
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
`;

export const NotificationsEmptyViewStyled = styled.View<{ top: number }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: ${({ top }) => -48 - BOTTOM_TAB_BAR_HEIGHT - top}px;
`;
