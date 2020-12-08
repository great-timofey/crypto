import styled from 'styled-components';

export const HistoryItemContainerStyled = styled.View`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const HistoryItemBodyStyled = styled.ScrollView`
  flex: 1;
`;
