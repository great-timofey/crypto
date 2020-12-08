import styled from 'styled-components';

import {
  Typography,
  WalletBalance as Wb,
  BadgedButton,
  ActionList,
  Loader,
} from '$components';

export const MainWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.darkBlue};
`;

export const LoaderStyled = styled(Loader).attrs(() => ({
  appearance: 'light',
}))`
  margin: auto;
`;

export const ActionListStyled = styled(ActionList)`
  margin: 8px;
`;

export const MainContainerStyled = styled.View`
  padding: 24px 16px;
`;

export const NotificationBadgeButtonStyled = styled(BadgedButton)`
  position: absolute;
  z-index: 1;
  right: 16px;
  top: 24px;
`;

export const MainHeader = styled(Typography)`
  color: ${({ theme }) => theme.colors.white};
`;

export const MainHeaderTest = styled(Typography)`
  color: ${({ theme }) => theme.colors.white};
`;

export const InBtc = styled(Typography)`
  color: ${({ theme }) => theme.colors.white};
`;

export const TotalBalance = styled.View`
  color: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 8px;
`;

export const BalancesWrapper = styled.View`
  margin-top: 24px;
`;

export const WalletBalance = styled(Wb)<{ noMarginBottom?: boolean }>`
  margin-bottom: ${({ noMarginBottom }) => (noMarginBottom ? 0 : 8)}px;
`;

export const TotalBalanceNumber = styled.View`
  color: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  align-items: flex-end;
`;

export const TotalBalanceInt = styled(Typography)`
  color: ${({ theme }) => theme.colors.white};
`;

export const TotalBalanceFractional = styled(Typography)`
  color: ${({ theme }) => theme.colors.white};
  line-height: 30px;
`;
