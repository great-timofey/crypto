import styled from 'styled-components';

export const CurrencyCardFooterStyled = styled.View<{ verticalized: boolean }>`
  flex-direction: ${({ verticalized }) => (verticalized ? 'column' : 'row')};
  justify-content: space-between;
`;

export const CurrencyCardFooterLeftSectionStyled = styled.View<{
  addMarginBottom: boolean;
}>`
  margin-right: auto;
  ${({ addMarginBottom }) => addMarginBottom && 'margin-bottom: 8px'};
`;

export const CurrencyCardFooterRightSectionStyled = styled.View`
  flex-direction: row;
  margin-left: auto;
  align-items: center;
`;
