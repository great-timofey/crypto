import React, { FC } from 'react';
import styled from 'styled-components';
import { ViewStyle } from 'react-native';

export type CurrencyCardProps = { style?: ViewStyle };

export const CurrencyCard: FC<CurrencyCardProps> = ({ children, style }) => {
  return <CurrencyCardStyled style={style}>{children}</CurrencyCardStyled>;
};

export const CurrencyCardStyled = styled.View`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 0.5px solid #c9ccd4;
  border-radius: 8px;
  overflow: hidden;
`;
