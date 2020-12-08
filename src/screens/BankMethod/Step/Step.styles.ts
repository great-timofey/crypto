import styled from 'styled-components';

import { Typography } from '$components';

export const StepWrapperStyled = styled.View`
  padding: 16px;
  flex-direction: row;
`;

export const StepCircleStyled = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1.5px ${({ theme }) => theme.colors.foregroundBlue};
  align-items: center;
  justify-content: center;
  margin-right: 24px;
`;

export const StepContentStyled = styled(Typography)`
  flex: 1;
`;

export const StepCircleTextStyled = styled(Typography)`
  color: ${({ theme }) => theme.colors.foregroundBlue};
  margin: 0;
`;
