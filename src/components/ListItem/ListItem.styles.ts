import styled from 'styled-components';

import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';

import { SWITCH_MARGIN, SWITCH_WIDTH } from './constants';

import { DEFAULT_SCREEN_PADDING } from '$global/constants';
import { DEVICE_WIDTH } from '$global/device';

export const ListItemWrapperStyled = styled.View`
  width: 100%;
  padding: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ListItemContentStyled = styled.View`
  margin-right: auto;
`;

export const ListItemContentHorizontalStyled = styled.View`
  flex: 1;
  margin-right: auto;
  flex-direction: row;
  align-items: center;
`;

export const ListItemThreeTitleStyled = styled(Typography)`
  max-width: ${DEVICE_WIDTH -
    DEFAULT_SCREEN_PADDING -
    SWITCH_MARGIN -
    SWITCH_WIDTH * 1.5}px;
`;

export const SuffixStyled = styled(Typography)`
  margin-left: auto;
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.foregroundTertiary};
`;

export const ListItemIconStyled = styled(Icon)``;
export const ListItemMenuIconStyled = styled(Icon)`
  margin: auto;
`;

export const ListItemMenuIconWrapperStyled = styled.View`
  width: 24px;
  height: 24px;
  margin-right: 19px;
`;

export const ListItemTextStyled = styled(Typography)`
  margin-bottom: 4px;
`;
