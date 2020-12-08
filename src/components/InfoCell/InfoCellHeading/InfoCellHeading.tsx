import React, { FC } from 'react';
import styled from 'styled-components';

import { Typography } from '$components';

export const InfoCellHeading: FC = ({ children }) => (
  <InfoCellHeadingStyled type="HeadingsR6">{children}</InfoCellHeadingStyled>
);

export const InfoCellHeadingStyled = styled(Typography)`
  margin-bottom: 4px;
`;
