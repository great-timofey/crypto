import styled from 'styled-components';

import { Icon, Typography } from '$components';
import { DEVICE_WIDTH } from '$global/device';

export const PincodeContainerStyled = styled.View`
  flex: 1;
  align-items: center;
`;

export const PincodeValidateHeaderStyled = styled(Typography)`
  margin-top: 32px;
`;

export const InputContainerStyled = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ButtonContainerStyled = styled.View`
  padding: 0 16px 8px;
  width: ${DEVICE_WIDTH}px;
  align-items: stretch;
`;

export const CustomKeyboardIconStyled = styled(Icon)`
  height: 24px;
  width: 24px;
`;
