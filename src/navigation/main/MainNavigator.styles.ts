import styled, { css } from 'styled-components';

import { CircleIcon, Typography } from '$components';
import { BOTTOM_TAB_BAR_HEIGHT } from '$global/constants';

export const TabBarContainerStyled = styled.View<{ bottom: number }>(
  ({ theme, bottom }) => css`
    flex: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: row;
    align-items: flex-start;
    height: ${bottom + BOTTOM_TAB_BAR_HEIGHT}px;
    border-top-width: 0.5px;
    border-top-color: ${theme.colors.foregroundQuaternary};
    background-color: ${theme.colors.tabBar};
  `,
);

export const TabBarButtonStyled = styled.TouchableOpacity<{ bottom: number }>(
  ({ bottom }) => `
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  height: ${BOTTOM_TAB_BAR_HEIGHT}px;
  margin-bottom: ${bottom}px;
`,
);

export const CircleIconStyled = styled(CircleIcon)`
  margin-top: -8px;
`;

export const TabBarCircleButtonStyled = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  height: ${BOTTOM_TAB_BAR_HEIGHT}px;
`;

export const TabBarLabelStyled = styled(Typography)<{ isFocused: boolean }>(
  ({ isFocused, theme }) => css`
    margin-top: 5px;
    text-align: center;
    margin-horizontal: 8px;
    color: ${isFocused ? theme.colors.foregroundBlue : theme.colors.foregroundTertiary};
    margin-bottom: 4px;
    font-size: 9px;
  `,
);
