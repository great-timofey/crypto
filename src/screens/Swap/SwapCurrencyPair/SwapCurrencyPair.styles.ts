import styled from 'styled-components';

import { Coin, Highlight } from '$components';

export const SwapCurrencyPairContainerStyled = styled(Highlight)`
  padding-horizontal: 16px;
  height: 72px;
  flex-direction: row;
  align-items: center;
`;

export const PairContainerStyled = styled.View`
  flex-direction: row;
  width: 56px;
  flex-grow: 0;
  margin-right: 16px;
`;

export const PairItemStyled = styled(Coin)`
  width: 32px;
  height: 32px;
`;

export const PairNameContainerStyled = styled.View`
  margin-right: auto;
`;
