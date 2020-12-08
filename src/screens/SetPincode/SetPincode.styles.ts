import styled from 'styled-components';

import { Icon, Typography } from '$components';

export const PincodeStepContainerStyled = styled.View`
  flex: 1;
`;

export const InputContainerStyled = styled.View`
  flex: 1;
  justify-content: center;
`;

export const StepHeaderStyled = styled(Typography)`
  text-align: center;
  padding-horizontal: 16px;
`;

export const AuthProgressHeaderStyled = styled.View`
  height: 40px;
  margin-bottom: 16px;
  flex-direction: row;
  padding-horizontal: 16px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const BackArrowIconButton = styled(Icon).attrs(({ theme }) => ({
  fill: theme.colors.primaryBlue,
}))``;
