import React, { FC } from 'react';
import styled from 'styled-components';
import { ViewStyle } from 'react-native';

type InfoCellProps = {
  style?: ViewStyle;
};

export const InfoCell: FC<InfoCellProps> = ({ children, style }) => (
  <InfoCellContainerStyled style={style}>{children}</InfoCellContainerStyled>
);

export const InfoCellContainerStyled = styled.View`
  padding: 12px 0;
`;
