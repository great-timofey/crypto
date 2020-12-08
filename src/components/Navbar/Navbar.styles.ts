import styled from 'styled-components';

import { Typography } from '../Typography/Typography';

export const NavbarContainerStyled = styled.View`
  flex-direction: row;
  height: 48px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const NavbarLeftContentStyled = styled.View`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: flex-end;
  padding-left: 16px;
`;

export const NavbarRightContentStyled = styled.View`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: flex-start;
  padding-right: 16px;
`;

export const NavbarContentStyled = styled.View`
  max-width: 70%;
  margin: auto;
`;

export const NavbarTitleStyled = styled(Typography)`
  align-self: center;
`;
