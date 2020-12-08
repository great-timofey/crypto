import React, { FC } from 'react';
import styled from 'styled-components';

import { Typography } from '../../Typography/Typography';

export const InfoCellFooter: FC = ({ children }) => (
  <InfoCellFooterStyled type="BodyText2R">{children}</InfoCellFooterStyled>
);

export const InfoCellFooterStyled = styled(Typography)`
  margin-top: 4px;
`;
