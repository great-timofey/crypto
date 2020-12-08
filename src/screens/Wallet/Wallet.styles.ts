import styled from 'styled-components';

import { WALLET_ACTION_BUTTONS_MARGIN } from './constants';

import { CurrencyCard } from '$components/CurrencyCard';
import { Button, Typography } from '$components';
import { DEFAULT_SCREEN_PADDING } from '$global/constants';
import { DEVICE_WIDTH } from '$global/device';

export const WalletContainerStyled = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const WalletContentStyled = styled.View`
  padding: ${DEFAULT_SCREEN_PADDING}px 0;
`;

export const WalletActionsContainerStyled = styled.View`
  padding: 8px ${DEFAULT_SCREEN_PADDING}px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const CurrencyCardStyled = styled(CurrencyCard)`
  margin: 0 ${DEFAULT_SCREEN_PADDING}px ${DEFAULT_SCREEN_PADDING}px;
`;

export const WalletActionButtonStyled = styled(Button)`
  width: ${(DEVICE_WIDTH - DEFAULT_SCREEN_PADDING * 2 - WALLET_ACTION_BUTTONS_MARGIN) /
    2}px;
`;

export const WalletHistoryContainerStyled = styled.View``;

export const HistoryTitleStyled = styled(Typography)`
  margin-horizontal: ${DEFAULT_SCREEN_PADDING}px;
  margin-bottom: -15px;
`;
