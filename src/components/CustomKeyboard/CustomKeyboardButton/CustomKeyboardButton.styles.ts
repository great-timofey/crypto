import styled from 'styled-components';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from '$global/device';

export const CustomKeyboardButtonStyled = styled.TouchableOpacity`
  width: ${Math.floor(DEVICE_WIDTH / 3)}px;
  align-items: center;
  justify-content: center;
  height: ${Math.round(DEVICE_HEIGHT * 0.085)}px;
`;
