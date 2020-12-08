import { Animated } from 'react-native';
import styled from 'styled-components';

import { Button, Typography, Icon } from '$components';

export const PersonalLoginContainerStyled = styled(Animated.View)`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  flex: 1;
`;

export const KeyboardAvoidingViewStyledStyled = styled.KeyboardAvoidingView`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
`;

export const PersonalLoginHeaderStyled = styled.View`
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

export const BackArrowIconButton = styled(Icon).attrs(({ theme }) => ({
  fill: theme.colors.primaryBlue,
}))``;

export const SpaceContainerStyled = styled.View`
  height: 40px;
  width: 40px;
`;

export const PersonalLoginStepTitleStyled = styled(Typography)`
  text-align: center;
`;

export const PersonalLoginStepDescriptionStyled = styled(Typography)`
  text-align: center;
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.foregroundTertiary};
`;
