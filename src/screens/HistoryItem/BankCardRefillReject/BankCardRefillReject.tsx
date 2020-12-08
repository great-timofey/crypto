import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useTheme } from 'styled-components';

import messages from '../HistoryItem.messages';
import { HistoryItemDate } from '../HistoryItemDate/HistoryItemDate';

import { HistoryItemBankCardRefillRejectProps } from './BankCardRefillReject.interface';

import { UnifiedNumber } from '$components';
import { InfoCell, InfoCellContent, InfoCellHeading } from '$components/InfoCell';

export const HistoryItemBankCardRefillReject: FC<{
  item: HistoryItemBankCardRefillRejectProps;
}> = ({ item }) => {
  const theme = useTheme();

  return (
    <>
      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.amount} />
        </InfoCellHeading>
        <InfoCellContent
          bold
          style={{
            color: theme.colors.error2,
          }}
        >
          <UnifiedNumber plusSign value={item.amount} currency={item.currency} />
        </InfoCellContent>
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.fee} />
        </InfoCellHeading>
        <InfoCellContent>
          <UnifiedNumber value={item.fee} currency={item.currency} />
        </InfoCellContent>
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
