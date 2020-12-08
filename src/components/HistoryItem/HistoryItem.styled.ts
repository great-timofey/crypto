import styled from 'styled-components';

import { CaptionCell } from '../CaptionCell/CaptionCell';
import { Typography } from '../Typography/Typography';

import { NarfexThemeColor } from '$global/theme';

export const HistoryItemStyled = styled(CaptionCell)<{
  highlight?: boolean;
}>`
  padding: 16px;
  background-color: ${({ highlight, theme }) =>
    highlight ? theme.colors.backgroundSecondary : theme.colors.backgroundPrimary};
`;

export const HistoryItemActionStyled = styled(Typography)<{
  color?: NarfexThemeColor;
}>`
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.foregroundPrimary};
`;

export const HistoryItemInfoStyled = styled(Typography)`
  flex: 1;
  color: ${({ theme }) => theme.colors.foregroundPrimary};
  margin-bottom: 8px;
`;

export const HistoryItemTimeStyled = styled(Typography)``;
