import styled from 'styled-components';

import { Button } from '../../Button/Button';

import { DEVICE_WIDTH } from '$global/device';

export const BottomSheetHeaderContainerStyled = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  min-height: 64px;
  width: ${DEVICE_WIDTH}px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  justify-content: center;
  align-items: center;
  padding: 12px 12px 12px 16px;
`;

export const BottomSheetHandlerStyled = styled.View`
  height: 4px;
  width: 40px;
  background-color: ${({ theme }) => theme.colors.backgroundQuaternary};
  border-radius: 2px;
`;

export const BottomSheetHeaderContentWrapperStyled = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const BottomSheetHeaderCloseButtonStyled = styled(Button)`
  background-color: ${({ theme }) => theme.colors.backgroundTertiary};
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;
