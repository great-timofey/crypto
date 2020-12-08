import styled from 'styled-components';

import { Input, Tabs, Typography } from '$components';
import { WalletsState } from '$redux/wallets/interface';
import { TabsComponent } from '$components/Tabs/Tabs.interface';

export const CurrencySendEnterRecipientContainerStyled = styled.ScrollView``;

export const TabsStyled = styled(Tabs as TabsComponent<WalletsState['send']['type']>)`
  margin-bottom: 24px;
`;

export const TabContainerStyled = styled.View`
  width: 100%;
`;

export const CurrencySendEnterRecipientStyled = styled(Typography)`
  margin-bottom: 26px;
`;

export const CurrencySendInputStyled = styled(Input)`
  margin-bottom: 16px;
`;

export const CurrencySendStepTitleStyled = styled(Typography)`
  margin-bottom: 24px;
`;
