import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components';

import {
  CURRENCY_RECEIVE_BLOCKCHAIN_ICON_WIDTH,
  CURRENCY_RECEIVE_BOTTOMSHEET_WARNING_HEIGHT,
  QRCODE_CONTAINER_SIZE,
} from './constants';

import { Icon, Typography, Tabs, Banner, Button } from '$components';
import { DEFAULT_SCREEN_PADDING } from '$global/constants';
import { DEVICE_WIDTH } from '$global/device';

export const CurrencyReceiveContainerStyled = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const CurrencyReceiveContentWrapperStyled = styled.View`
  flex: 1;
  padding-horizontal: ${DEFAULT_SCREEN_PADDING}px;
`;

export const TabsStyled = styled(Tabs)`
  margin-top: 8px;
  margin-bottom: 18px;
`;

export const CurrencyReceiveBlockchainContainerStyled = styled.ScrollView`
  flex: 1;
`;

export const CurrencyReceiveBlockchainAddress = styled(Typography)`
  margin-bottom: 18px;
`;

export const QRContainerStyled = styled.View`
  background-color: white;
  align-items: center;
  align-self: center;
  justify-content: center;
  width: ${QRCODE_CONTAINER_SIZE}px;
  height: ${QRCODE_CONTAINER_SIZE}px;
  margin-bottom: ${DEFAULT_SCREEN_PADDING}px;
  border: 0.5px solid ${({ theme }) => theme.colors.backgroundQuaternary};
  border-radius: 4px;
`;

export const CurrencyReceiveCopyButtonTitleStyled = styled(Typography)<{
  alignLeft?: boolean;
}>`
  align-self: center;
  color: ${({ theme }) => theme.colors.darkBlue};
  ${({ alignLeft }) =>
    alignLeft &&
    css`
      max-width: ${DEVICE_WIDTH -
        DEFAULT_SCREEN_PADDING * 2 -
        CURRENCY_RECEIVE_BLOCKCHAIN_ICON_WIDTH}px;
    `}
`;

export const TipStyled = styled(Typography)``;

export const CurrencyReceiveLoginContainerStyled = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: 88px;
`;

export const CurrencyReceiveLoginInstructionTitleStyled = styled(Typography)`
  text-align: center;
  margin-bottom: 40px;
  max-width: ${DEVICE_WIDTH - 64}px;
`;

export const CurrencyReceiveCopyButtonStyled = styled(TouchableOpacity)<{
  centerContent?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: ${DEFAULT_SCREEN_PADDING}px;
  ${({ centerContent }) =>
    centerContent &&
    css`
      justify-content: center;
      margin-bottom: 0;
    `};
`;

export const CurrencyReceiveLoginCopyIconStyled = styled(Icon)<{ alignTop?: boolean }>`
  position: absolute;
  right: 0;
  ${({ alignTop }) =>
    alignTop &&
    css`
      top: 4px;
    `}
`;

export const BannerStyled = styled(Banner)`
  margin-top: auto;
  margin-bottom: 12px;
`;

export const BottomSheetHeaderStyled = styled(Typography)`
  align-self: flex-start;
  margin-bottom: ${DEFAULT_SCREEN_PADDING}px;
`;

export const BottomSheetContentWrapperStyled = styled.View`
  align-items: center;
`;

export const BottomSheetIconWrapperStyled = styled.View`
  justify-content: center;
  margin-bottom: ${DEFAULT_SCREEN_PADDING}px;
  height: ${CURRENCY_RECEIVE_BOTTOMSHEET_WARNING_HEIGHT / 3}px;
`;

export const BottomSheetButtonStyled = styled(Button)`
  margin-top: auto;
`;
