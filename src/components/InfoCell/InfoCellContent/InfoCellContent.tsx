import React, { FC } from 'react';
import styled from 'styled-components';
import { TextStyle } from 'react-native';

import { Typography } from '../../Typography/Typography';

type InfoCellContentProps = {
  style?: TextStyle;
  bold?: boolean;
};

export const InfoCellContent: FC<InfoCellContentProps> = ({
  children,
  bold = false,
  style,
}) => (
  <InfoCellContentStyled type={bold ? 'HeadingsSB2' : 'HeadingsR4'} style={style}>
    {children}
  </InfoCellContentStyled>
);

export const InfoCellContentStyled = styled(Typography)``;
