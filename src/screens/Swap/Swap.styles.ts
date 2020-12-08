import styled from 'styled-components';

import { DEFAULT_SCREEN_PADDING } from '$global/constants';
import { Button, CaptionCell, Typography } from '$components';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '$global/device';
import { FONTS } from '$global/fonts';

export const SwapContainerStyled = styled.View`
  height: ${DEVICE_HEIGHT}px;
`;

export const SwapHeaderContainerStyled = styled.View`
  padding: 8px 12px 8px ${DEFAULT_SCREEN_PADDING}px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const CloseButtonStyled = styled(Button)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundTertiary};
`;

export const AvailableSumStyled = styled(Typography)`
  color: ${({ theme }) => theme.colors.foregroundTertiary};
  margin-horizontal: ${DEFAULT_SCREEN_PADDING}px;
  margin-bottom: 10px;
`;

export const SwapContentContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${DEVICE_WIDTH}px;
  padding-horizontal: ${DEFAULT_SCREEN_PADDING}px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  min-height: 120px;
`;

export const SwapContentTextWrapperStyled = styled.View`
  margin-top: -12px;
  max-width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const EnterWholeAvailableSumButtonStyled = styled.TouchableOpacity`
  position: absolute;
  bottom: 12px;
`;

export const EnterWholeAvailableSumButtonTitleStyled = styled(Typography)`
  color: ${({ theme }) => theme.colors.foregroundBlue};
`;

export const ContentTextStyled = styled.Text`
  font-weight: normal;
  font-size: 32px;
  font-family: ${FONTS.Montserrat.normal};
  letter-spacing: ${32 * -0.02}px;
  color: ${({ theme }) => theme.colors.foregroundBlue};
`;

export const ToggleAmountTypeStyled = styled.TouchableOpacity`
  margin-left: 8px;
`;

export const WalletsBottomSheetTitleStyled = styled(Typography)`
  max-width: 85%;
  padding-vertical: 12px;
`;

export const WalletsBottomSheetItemStyled = styled(CaptionCell)`
  padding: 20px ${DEFAULT_SCREEN_PADDING}px;
  min-height: 80px;
`;

export const ToSwapRateButtonStyled = styled(Button)`
  margin-horizontal: ${DEFAULT_SCREEN_PADDING}px;
  margin-bottom: 8px;
`;
