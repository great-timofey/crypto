import styled from 'styled-components';

import { Typography } from '$components';

export const AppearanceScreenStyled = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const AppearanceScreenScrollViewStyled = styled.ScrollView`
  flex: 1;
`;

export const AppearanceScreenTitleStyled = styled(Typography)`
  padding: 10px 16px;
  margin-top: 42px;
  color: ${({ theme }) => theme.colors.foregroundTertiary};
`;

export const AppearanceScreenDescStyled = styled(Typography)`
  padding: 16px;
  padding-top: 0;
`;
