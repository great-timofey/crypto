import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled, { css } from 'styled-components';

import { Typography } from '../../Typography/Typography';

import { addHitSlop } from '$global/utils';

const commonStyles = css`
  flex-direction: row;
  justify-content: space-between;
`;

export const CurrencyCardFooterSectionStyled = styled((props) => <View {...props} />)`
  ${commonStyles};
`;

export const CurrencyCardFooterSectionTouchableStyled = styled((props) => (
  <TouchableOpacity {...props} {...addHitSlop([50, 16, 16, 50])} />
))`
  ${commonStyles};
`;

export const CurrencyCardFooterSectionTitle = styled(Typography).attrs<{
  ellipsized: boolean;
}>(
  ({ ellipsized }) =>
    ellipsized && {
      textProps: {
        numberOfLines: 1,
        ellipsizeMode: 'middle',
      },
    },
)<{ ellipsized: boolean }>`
  margin-right: auto;
  ${({ ellipsized }) => ellipsized && `max-width: 95px`};
  color: ${({ theme }) => theme.colors.foregroundTertiary};
`;

export const CurrencyCardFooterSectionIconContainerStyled = styled.View`
  margin-left: 9px;
`;
