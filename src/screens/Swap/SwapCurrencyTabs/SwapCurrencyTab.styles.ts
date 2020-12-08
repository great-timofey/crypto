import styled from 'styled-components';

import { Highlight, Typography } from '$components';
import { DEFAULT_SCREEN_PADDING } from '$global/constants';

export const SwapCurrencyTabStyled = styled(Highlight)`
  padding: 12px ${DEFAULT_SCREEN_PADDING}px;
  flex-direction: row;
  width: 50%;
`;

export const SwapCurrencyNameContainerStyled = styled.View`
  max-width: 80%;
`;

export const SwapCurrencyTabActiveIndicatorStyled = styled.View`
  position: absolute;
  bottom: 0;
  right: 7px;
  height: 2px;
  left: 12px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  background-color: ${({ theme }) => theme.colors.primaryBlue};
`;

export const IconContaier = styled.View`
  margin-right: 12px;
`;

export const SwapCurrencyNameTitleStyled = styled(Typography)<{ active: boolean }>`
  margin-bottom: 4px;
  ${({ active, theme }) => !active && `color: ${theme.colors.foregroundTertiary}`};
`;

export const SwapCurrencyNameSubtitleStyled = styled(Typography)<{ active: boolean }>`
  max-width: 110px;
  ${({ active, theme }) => !active && `color: ${theme.colors.foregroundTertiary}`};
`;
