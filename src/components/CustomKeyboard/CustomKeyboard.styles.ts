import styled from 'styled-components';

import { DEVICE_WIDTH } from '$global/device';

export const CustomKeyboardStyled = styled.View.attrs<{ error?: boolean }>(
  ({ error }) => error && { pointerEvents: 'none' },
)<{ error?: boolean }>`
  width: ${DEVICE_WIDTH}px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
