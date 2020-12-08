import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
//  TODO: add types
//  @ts-ignore
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

import { Icon } from '../Icon/Icon';
import { Loader } from '../Loader/Loader';

import { CircleIconProps } from './CircleIcon.interface';

export const CircleIconWrapper = styled.View<CircleIconProps>`
  background: ${({ fill, theme }) => fill || theme.colors.gray};
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: ${({ size = 40 }) => size / 2}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const IconStyled = styled(Icon)`
  height: 24px;
  width: 24px;
`;

export const LinearGradientStyled = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const LinearGradientAnimatedStyled = styled(AnimatedLinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const LoaderStyled = styled(Loader)``;

export const ImageStyled = styled.Image<{ size: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`;

export const SvgUriStyled = styled(SvgXml).attrs<{ size: number }>(({ size }) => ({
  width: size,
  height: size,
}))<{ size: number }>`
  margin: auto;
`;
