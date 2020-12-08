import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components';

import { Button, Icon, Typography } from '$components';
import { DEFAULT_SCREEN_PADDING } from '$global/constants';

export const CurrencySendContainerStyled = styled.View`
  flex: 1;
`;

export const CurrencySendKeyboardContainerStyled = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const AuthProgressHeaderStyled = styled.View`
  height: 40px;
  margin-bottom: ${DEFAULT_SCREEN_PADDING}px;
  flex-direction: row;
  padding-horizontal: ${DEFAULT_SCREEN_PADDING}px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const BackArrowIconButton = styled(Icon).attrs(({ theme }) => ({
  fill: theme.colors.primaryBlue,
}))``;

export const SpaceContainerStyled = styled.View`
  height: 40px;
  width: 40px;
`;

export const GAStepHeadingStyled = styled(Typography)`
  padding-horizontal: ${DEFAULT_SCREEN_PADDING}px;
  text-align: center;
`;

export const NextButtonStyled = styled(Button)`
  margin-horizontal: ${DEFAULT_SCREEN_PADDING}px;
  margin-bottom: 8px;
`;
