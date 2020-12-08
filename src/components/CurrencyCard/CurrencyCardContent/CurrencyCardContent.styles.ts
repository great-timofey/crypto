import styled from 'styled-components';

import { Typography } from '../../Typography/Typography';

export const CurrencyCardContentStyled = styled(Typography)<{
  addMarginBottom?: boolean;
}>`
  ${({ addMarginBottom }) => addMarginBottom && `margin-bottom: 36px`};
`;
