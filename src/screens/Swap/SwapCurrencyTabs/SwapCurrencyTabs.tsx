import { FormattedMessage } from 'react-intl';
import React, { FC } from 'react';
import styled from 'styled-components';

import messages from '../Swap.messages';

import { SwapCurrencyTab } from './SwapCurrencyTab';

import { Currency } from '$global/types';

export interface SwapCurrencyTabsProps {
  give: Currency;
  receive: Currency;
  onChangeTab: (index: number) => void;
  activeTabIndex: number;
}

export const SwapCurrencyTabs: FC<SwapCurrencyTabsProps> = ({
  give,
  receive,
  onChangeTab,
  activeTabIndex,
}) => {
  return (
    <SwapCurrencyTabsStyled>
      <SwapCurrencyTab
        currency={give}
        onPress={() => onChangeTab(0)}
        title={<FormattedMessage {...messages.give} />}
        active={activeTabIndex === 0}
      />
      <SwapCurrencyTab
        currency={receive}
        onPress={() => onChangeTab(1)}
        title={<FormattedMessage {...messages.receive} />}
        active={activeTabIndex === 1}
      />
    </SwapCurrencyTabsStyled>
  );
};

export const SwapCurrencyTabsStyled = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${({ theme }) => theme.colors.foregroundQuaternary};
  border-bottom-width: 0.5px;
  padding-horizontal: 16px;
  margin-horizontal: -16px;
`;
