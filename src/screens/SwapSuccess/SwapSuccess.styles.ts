import styled from 'styled-components';

import { Button, Icon, Typography } from '$components';

export const SwapSuccessContainerStyled = styled.View`
  padding-horizontal: 16px;
  flex: 1;
`;

export const SuccessTitleContainerStyled = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const DetailsButtonStyled = styled(Button)`
  margin-bottom: 16px;
`;

export const ToWalletButtonStyled = styled(Button)`
  margin-bottom: 8px;
`;

export const ResultSuccessTextStyled = styled(Typography)`
  max-width: 295px;
`;

export const ResultSuccessIconStyled = styled(Icon)`
  margin-bottom: 16px;
`;
