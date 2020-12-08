import styled from 'styled-components';

import { Highlight } from '../Highlight/Highlight';

export const CaptionCellStyled = styled(Highlight)`
  padding: 16px 0;
  flex-direction: row;
  align-items: flex-start;
`;

export const CaptionCellContainerStyled = styled.View`
  margin-right: 16px;
`;

export const CaptionCellContentStyled = styled.View`
  flex: 1;
`;

export const CaptionCellIconContainerStyled = styled.View`
  position: absolute;
  align-self: center;
  right: 16px;
`;
