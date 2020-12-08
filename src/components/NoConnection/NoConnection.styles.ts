import styled from 'styled-components';

import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';

export const ContainerStyled = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: 40px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const IconStyled = styled(Icon)`
  width: 120px;
  height: 120px;
`;

export const TitleStyled = styled(Typography)`
  text-align: center;
`;
