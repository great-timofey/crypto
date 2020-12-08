import styled from 'styled-components';

import { Button, Icon, Typography } from '$components';
import { DEFAULT_SCREEN_PADDING } from '$global/constants';

export const CurrencySendSuccessStyled = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  padding: ${DEFAULT_SCREEN_PADDING}px;
`;

export const CurrencySendSuccessContentStyled = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SuccessIconStyled = styled(Icon)`
  margin-bottom: 16px;
`;

export const SuccessTextStyled = styled(Typography)``;

export const ButtonContainerStyled = styled.View`
  margin-top: auto;
  height: 128px;
`;

export const ButtonStyled = styled(Button)`
  margin-bottom: 8px;
`;
