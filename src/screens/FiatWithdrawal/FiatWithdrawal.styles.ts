import styled from 'styled-components';

import { Button, Loader, Typography } from '$components';

export const FiatWithdrawContainerStyled = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const FiatWithdrawFeeStyled = styled(Typography)`
  margin-top: 28px;
`;

export const FiatWithdrawResultTitleStyled = styled(Typography)`
  margin-top: 4px;
`;

export const ScreenWrapperStyled = styled.View`
  flex: 1;
`;

export const KeyboardAvoidingViewStyled = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const LoaderStyled = styled(Loader).attrs(({ theme }) => ({
  appearance: theme.isCurrent('dark') ? 'light' : 'dark',
}))`
  margin: auto;
`;

export const ButtonStyled = styled(Button)`
  margin-top: auto;
`;
