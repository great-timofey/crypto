import { Animated } from 'react-native';
import styled from 'styled-components';

export const AuthProgressFooterContainerStyled = styled.View`
  margin-top: auto;
  width: 100%;
`;

export const AuthProgressStepContentStyled = styled(Animated.View)<{
  centeredVertically: boolean;
}>`
  flex: 1;
  width: 100%;
  justify-content: ${({ centeredVertically }) =>
    centeredVertically ? 'center' : 'flex-start'};
`;

export const AuthProgressStepStyled = styled.View`
  flex: 1;
`;

export const AuthProgressStepTitleContainerStyled = styled(Animated.View)``;
