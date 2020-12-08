import styled from 'styled-components';

import { Button, Input } from '$components';

export const FiatWithdrawRecipientContainerStyled = styled.ScrollView`
  flex: 1;
  padding-horizontal: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const FiatWithdrawRecipientButtonNextWrapperStyled = styled.View`
  width: 100%;
  padding: 16px;
`;

export const ScreenWrapperStyled = styled.View`
  flex: 1;
`;
export const InputStyled = styled(Input)`
  margin-top: 16px;
`;

export const KeyboardAvoidingViewStyled = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ActivityIndicatorStyled = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.foregroundPrimary,
}))`
  margin: auto;
`;

export const ButtonStyled = styled(Button)`
  margin-top: auto;
`;
