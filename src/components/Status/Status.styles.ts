import styled from 'styled-components';

import { Typography } from '../Typography/Typography';

import { StatusProps } from './Status.interface';

import { StatusEnum } from '$global/types';

export const StatusStyled = styled(Typography)<StatusProps>`
  color: ${({ value, theme }) => {
    return (
      {
        [StatusEnum.done]: theme.colors.success2,
        [StatusEnum.failed]: theme.colors.error2,
        [StatusEnum.canceled]: theme.colors.error2,
      }[value] || theme.colors.foregroundPrimary
    );
  }};
`;
