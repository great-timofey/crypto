import styled from 'styled-components';

import { Button, Typography, Icon, Requirements, Input } from '$components';

export const SignUpContainerStyled = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  flex: 1;
`;

export const KeyboardAvoidingViewStyledStyled = styled.KeyboardAvoidingView`
  flex: 1;
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
`;

export const AuthProgressHeaderStyled = styled.View`
  height: 40px;
  margin-bottom: 16px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const NextButtonStyled = styled(Button)`
  margin-bottom: 16px;
  width: 100%;
`;

export const AuthProgressStepSubtitleStyled = styled(Typography)`
  margin-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.foregroundTertiary};
`;

export const BackArrowIconButton = styled(Icon).attrs(({ theme }) => ({
  fill: theme.colors.primaryBlue,
}))``;

export const QuestionIconButton = styled(BackArrowIconButton)``;

export const RequirementsStyled = styled(Requirements)`
  margin-top: 16px;
  flex: 1;
`;

export const SpaceContainerStyled = styled.View`
  height: 40px;
  width: 40px;
`;

export const InputStyled = styled(Input)`
  flex: 2;
  justify-content: center;
`;

export const AuthProgressStepTitleStyled = styled(Typography)`
  text-align: center;
`;
