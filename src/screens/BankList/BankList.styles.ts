import styled from 'styled-components';
import { Animated } from 'react-native';

export const ChoiceBankContainerStyled = styled(Animated.View)`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const ScreenWrapperStyled = styled.View`
  flex: 1;
`;

export const ActivityIndicatorStyled = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.foregroundPrimary,
}))`
  margin: auto;
`;

export const ScrollViewStyled = styled.ScrollView`
  flex: 1;
`;
