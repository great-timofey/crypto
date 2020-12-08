import styled from 'styled-components';

import { Typography } from '../Typography/Typography';

export const WalletBalanceContainerStyled = styled.View`
  position: relative;
  flex-direction: row;
  border-radius: 12px;
  height: 40px;
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  margin: 0;
  overflow: hidden;
`;

export const WalletBalanceFillStyled = styled.View`
  position: absolute;
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  top: 0;
  left: 0;
  bottom: 0;
  width: 40%;
`;

export const WalletBalanceTitleStyled = styled(Typography)`
  margin: auto;
  margin-left: 16px;
`;

export const WalletBalanceAmountStyled = styled(Typography)`
  margin: auto;
  margin-right: 16px;
`;
