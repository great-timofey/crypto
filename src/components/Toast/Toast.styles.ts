import { Animated } from 'react-native';
import styled from 'styled-components';

import { Typography } from '../Typography/Typography';
import { Icon } from '../Icon/Icon';
import { Loader } from '../Loader/Loader';
import { LoaderProps } from '../Loader/Loader.interface';

import { ToastIconStyledProps } from './Toast.interface';

import {
  TOAST_BACKGROUND_OVERLAY_ZINDEX,
  TOAST_CONTAINER_ZINDEX,
} from '$components/Toast/constants';

export const ToastOverlayStyled = styled(Animated.View)`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: ${TOAST_BACKGROUND_OVERLAY_ZINDEX};
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

export const ToastContainerStyled = styled(Animated.View)`
  padding: 20px 20px 20px 52px;
  background-color: ${({ theme }) => theme.colors.foregroundPrimary};
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: ${TOAST_CONTAINER_ZINDEX};
  max-width: 100%;
`;

export const LoadingImageStyled = styled(Loader).attrs<LoaderProps>({ fillInvert: true })`
  position: absolute;
  left: 16px;
`;

export const ToastTitleStyled = styled(Typography)`
  color: ${({ theme }) => theme.colors.backgroundPrimary};
  flex-wrap: wrap;
`;

export const ToastIconStyled = styled(Icon).attrs<ToastIconStyledProps>(
  ({ iconFill, theme }) => iconFill && { fill: theme.colors[iconFill] },
)<ToastIconStyledProps>`
  position: absolute;
  left: 16px;
`;
