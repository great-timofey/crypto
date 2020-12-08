import styled, { css } from 'styled-components';
import { TouchableOpacity } from 'react-native';

import { DEVICE_WIDTH } from '$global/device';
import { FONTS } from '$global/fonts';

/*
  badgeCharsLength = kinda hack, because we don't have width: max-content in react-native
  but for now this let us have correct styles for icon with badge content up to 1.000.000 (million)
*/
export const BadgeContainerStyled = styled(TouchableOpacity)<{
  badgeCharsLength: number;
}>`
  min-width: 24px;
  width: 24px;
  height: 24px;
  align-items: flex-end;
  ${({ badgeCharsLength }) =>
    badgeCharsLength > 3 &&
    css`
      width: 50px;
    `};
`;

export const IconButtonBadgeContainerStyled = styled.View`
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 14px;
  border-radius: 7px;
  padding: 0 3px;
  max-width: ${DEVICE_WIDTH}px;
  background: ${({ theme }) => theme.colors.error2};
  align-items: center;
  justify-content: center;
`;

export const IconButtonBadgeTextStyled = styled.Text`
  font-family: ${FONTS.Montserrat[500]};
  font-style: normal;
  font-size: 9px;
  line-height: 14px;

  color: ${({ theme }) => theme.colors.white};
`;
