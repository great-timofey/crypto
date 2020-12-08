import styled from 'styled-components';

import { ListItem, Typography } from '$components';

export const SettingsScreenWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const SettingsScreenScrollViewStyled = styled.ScrollView`
  flex: 1;
`;

export const SettingsScreenStyled = styled(Typography)`
  padding: 16px;
`;

export const SettingsScreenExitItemStyled = styled(ListItem)`
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const SettingsScreenExitTextStyled = styled.Text`
  color: ${({ theme }) => theme.colors.error2};
`;

export const TitleStyled = styled(Typography).attrs(() => ({ type: 'HeadingsSB6' }))`
  margin-top: 10px;
  padding-horizontal: 16px;
  padding-vertical: 10px;
`;
