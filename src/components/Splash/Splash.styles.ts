import styled from 'styled-components';

import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';

export const SplashScreenWrapperStyled = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  flex: 1;
`;

export const SplashScreenErrorStyled = styled.View`
  margin: auto;
  align-items: center;
`;

export const SplashScreenTextStyled = styled(Typography)`
  margin: auto;
  margin-bottom: 8px;
`;

export const SplashScreenButtonStyled = styled(Button)`
  margin: auto;
  margin-bottom: 8px;
  padding: 10px;
`;

export const SplashScreenLoaderStyled = styled(Loader)`
  margin: auto;
`;
