import styled from 'styled-components';
import { WebView } from 'react-native-webview';

import { DEVICE_WIDTH, DEVICE_HEIGHT } from '$global/device';

export const CaptchaStyled = styled(WebView)`
  width: ${DEVICE_WIDTH}px;
  height: ${DEVICE_HEIGHT}px;
  overflow: hidden;
`;
