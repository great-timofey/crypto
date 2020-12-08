import styled, { css } from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

import { Typography } from '$components';
import { selectNotchedProperties } from '$global/device';

export const Container = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  justify-content: center;
  align-items: center;
  ${selectNotchedProperties(
    css``,
    css`
      padding-bottom: 16px;
    `,
  )};
`;

export const LogoContainer = styled.TouchableOpacity`
  position: absolute;
  top: 50%;
  transform: translateY(-120px);
`;

export const Logo = styled.Image`
  width: 180px;
  height: 120px;
`;

export const AuthButtonContainer = styled.View`
  width: 100%;
  margin-top: auto;
  align-items: stretch;
`;

export const Caption = styled(Typography)`
  margin-top: 16px;
  padding: 0 10px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray};
`;

export const CaptionBold = styled(Text)`
  font-weight: bold;
`;
