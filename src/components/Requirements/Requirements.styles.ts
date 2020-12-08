import styled from 'styled-components';

import { Typography } from '../Typography/Typography';
import { Icon } from '../Icon/Icon';

import { REQUIREMENTS_WIDTH } from './constants';

import { DEVICE_WIDTH } from '$global/device';
import { NarfexTheme } from '$global/theme';

export const RequirementsContainerStyled = styled.View`
  padding-left: ${DEVICE_WIDTH / 2 - REQUIREMENTS_WIDTH}px;
`;

function getRequirementItemColor(success: boolean, error: boolean, theme: NarfexTheme) {
  if (error) {
    return theme.colors.error2;
  }
  return success ? theme.colors.success2 : theme.colors.foregroundTertiary;
}

export const RequirementItemStyled = styled(Typography)<{
  success: boolean;
  error: boolean;
}>`
  font-size: 13px;
  line-height: 16px;
  color: ${({ success, error, theme }) => getRequirementItemColor(success, error, theme)};
  ${({ success }) => success && 'text-decoration-line: line-through'};
`;

export const RequirementItemContainerStyled = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RequirementSuccessIconStyled = styled(Icon).attrs(({ theme }) => ({
  fill: theme.colors.success,
}))`
  width: 16px;
  height: 16px;
  position: absolute;
  left: -20px;
`;
