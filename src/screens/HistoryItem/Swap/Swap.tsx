import React, { FC } from 'react';
import { useTheme } from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from '../HistoryItem.messages';
import { HistoryItemDate } from '../HistoryItemDate/HistoryItemDate';

import { HistoryItemSwapProps } from './Swap.interface';

import { CurrencyPair, UnifiedNumber } from '$components';
import {
  InfoCell,
  InfoCellContent,
  InfoCellFooter,
  InfoCellHeading,
} from '$components/InfoCell';

export const HistoryItemSwap: FC<{ item: HistoryItemSwapProps }> = ({ item }) => {
  const theme = useTheme();
  return (
    <>
      <CurrencyPair from={item.primaryCurrency} to={item.secondaryCurrency} />
      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.received} />
        </InfoCellHeading>
        <InfoCellContent bold style={{ color: theme.colors.success2 }}>
          <UnifiedNumber
            plusSign
            value={item.secondaryAmount}
            currency={item.secondaryCurrency}
          />
        </InfoCellContent>
        <InfoCellFooter>
          <UnifiedNumber value={1} currency={item.secondaryCurrency} />{' '}
          <UnifiedNumber roughly value={1 / item.price} currency={item.primaryCurrency} />
        </InfoCellFooter>
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.given} />
        </InfoCellHeading>
        <InfoCellContent bold>
          <UnifiedNumber value={item.primaryAmount} currency={item.primaryCurrency} />
        </InfoCellContent>
        <InfoCellFooter>
          <UnifiedNumber value={1} currency={item.primaryCurrency} />{' '}
          <UnifiedNumber roughly value={item.price} currency={item.secondaryCurrency} />
        </InfoCellFooter>
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.date} />
        </InfoCellHeading>
        <InfoCellContent>
          <HistoryItemDate date={item.createdAt * 1000} />
        </InfoCellContent>
      </InfoCell>
    </>
  );
};
