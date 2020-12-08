import styled from 'styled-components';

import { DEFAULT_SCREEN_PADDING } from '$global/constants';
import { Button, Typography, Icon } from '$components';

export const PersonalEmailContainerStyled = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  flex: 1;
`;

export const KeyboardAvoidingViewStyledStyled = styled.KeyboardAvoidingView`
  flex: 1;
  padding-left: ${DEFAULT_SCREEN_PADDING}px;
  padding-right: ${DEFAULT_SCREEN_PADDING}px;
  padding-top: ${DEFAULT_SCREEN_PADDING}px;
`;

export const PersonalEmailHeaderStyled = styled.View`
  margin-bottom: ${DEFAULT_SCREEN_PADDING}px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const NextButtonStyled = styled(Button)`
  margin-bottom: ${DEFAULT_SCREEN_PADDING}px;
  width: 100%;
`;

export const BackArrowIconButton = styled(Icon).attrs(({ theme }) => ({
  fill: theme.colors.primaryBlue,
}))``;

export const PersonalEmailStepTitleStyled = styled(Typography)`
  text-align: center;
`;

export const PersonalEmailResendEmailButtonStyled = styled(Button)`
  text-align: center;
  margin-vertical: ${DEFAULT_SCREEN_PADDING}px;
  width: auto;
`;
