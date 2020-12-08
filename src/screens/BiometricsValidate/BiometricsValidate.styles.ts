import styled from 'styled-components';

import { DEVICE_WIDTH } from '$global/device';
import { Icon } from '$components';

export const BiometricsContainerStyled = styled.View`
  flex: 1;
  align-items: center;
`;

export const IconContainerStyled = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ButtonContainerStyled = styled.View`
  padding: 0 16px 8px;
  width: ${DEVICE_WIDTH}px;
  align-items: stretch;
`;

export const BiometryIconStyled = styled(Icon)`
  height: 80px;
  width: 80px;
  margin-bottom: 32px;
`;
