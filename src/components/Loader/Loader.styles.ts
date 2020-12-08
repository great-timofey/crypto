import styled, { css } from 'styled-components';
import { Animated } from 'react-native';

const commonStyles = css`
  width: 24px;
  height: 24px;
`;

export const LoaderViewStyled = styled(Animated.View)`
  ${commonStyles};
`;

export const LoaderImageStyled = styled(Animated.Image)`
  border-radius: 12px;
  ${commonStyles};
`;
