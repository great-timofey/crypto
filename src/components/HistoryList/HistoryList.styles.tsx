import styled from 'styled-components';

import { Typography } from '../Typography/Typography';
import { Icon } from '../Icon/Icon';

import { HistoryListItem } from './HistoryList.interface';

import { isISE } from '$global/device';

export const HistoryListStyled = styled.SectionList<HistoryListItem>``;

export const HistoryDateGroupStyled = styled(Typography)<{ highlight: boolean }>`
  color: ${({ theme }) => theme.colors.foregroundSecondary};
  padding: 26px 0 10px 16px;
  background-color: ${({ theme, highlight }) =>
    highlight ? theme.colors.backgroundSecondary : theme.colors.backgroundPrimary};
`;

export const HistoryListFooterStyled = styled.View`
  height: 72px;
  align-items: center;
  justify-content: center;
`;

export const HistoryListLoaderWrapper = styled.View`
  flex: 1;
  min-height: ${isISE ? 100 : 204}px;
  align-items: center;
  justify-content: center;
`;

export const HistoryListTryAgainTitleStyled = styled(Typography)`
  color: ${({ theme }) => theme.colors.foregroundBlue};
`;

export const HistoryListEmptyContainerStyled = styled.View`
  flex: 1;
  padding: 24px 40px;
  align-items: center;
  justify-content: center;
`;

export const HistoryListEmptyTitleStyled = styled(Typography)`
  text-align: center;
  max-width: 295px;
  color: ${({ theme }) => theme.colors.foregroundSecondary};
`;

export const HistoryListEmptyIconStyled = styled(Icon)`
  margin-bottom: 16px;
`;
