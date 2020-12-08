import styled from 'styled-components';

import { Button, Icon, Typography } from '$components';

export const SwapInsufficientFundsContainerStyled = styled.View`
  flex: 1;
  padding-horizontal: 16px;
`;

export const NavbarBackButtonStyled = styled(Button)`
  padding-right: 32px;
`;

export const NavbarCloseButtonStyled = styled(Button)`
  padding-left: 32px;
`;

export const ContentWrapperStyled = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ContentIconStyled = styled(Icon)`
  margin-bottom: 16px;
`;

export const ContentTextStyled = styled(Typography)`
  text-align: center;
  max-width: 295px;
`;
