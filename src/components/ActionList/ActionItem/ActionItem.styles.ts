import styled from 'styled-components';

import { Icon } from '../../Icon/Icon';
import { Typography } from '../../Typography/Typography';
import { Loader } from '../../Loader/Loader';
import { Highlight } from '../../Highlight/Highlight';

export const Wrapper = styled.View<{ disabled?: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  width: 50%;
  padding: 8px;
`;

export const Container = styled.View`
  width: 100%;
  height: 80px;
  border: 0.5px ${({ theme }) => theme.colors.backgroundQuaternary};
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;
export const HighlightStyled = styled(Highlight)`
  padding: 16px 16px 12px;
`;

export const LoaderStyled = styled(Loader).attrs(({ theme }) => ({
  fill: theme.colors.foregroundBlue,
}))`
  width: 24px;
  height: 24px;
`;

export const ActionIcon = styled(Icon).attrs(({ theme }) => ({
  fill: theme.colors.foregroundBlue,
}))`
  width: 24px;
  height: 24px;
`;

export const Text = styled(Typography)`
  margin-top: 12px;
`;
