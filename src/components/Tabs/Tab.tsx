import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import { Typography } from '../Typography/Typography';

import { TAB_MARGIN } from './constants';
import { TabProps } from './Tabs.interface';

import { DEFAULT_SCREEN_PADDING } from '$global/constants';
import { DEVICE_WIDTH } from '$global/device';

export const Tab: FC<TabProps> = ({ children, active, onPress }) => {
  return (
    <TabStyled onPress={onPress} active={active}>
      <Typography type="BodyAccent">{children}</Typography>
    </TabStyled>
  );
};

const activeStyles = css`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  box-shadow: 0 2px 2px rgba(28, 33, 46, 0.08);
`;

export const TabStyled = styled.TouchableOpacity.attrs({ activeOpacity: 1 })<{
  active: boolean;
}>`
  border-radius: 12px;
  width: ${(DEVICE_WIDTH - DEFAULT_SCREEN_PADDING * 2 - TAB_MARGIN * 3) / 2}px;
  align-items: center;
  justify-content: center;
  ${({ active }) => active && activeStyles};
`;
