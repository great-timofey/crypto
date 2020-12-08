import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import messages from '../HistoryItem.messages';
import { HistoryItemDate } from '../HistoryItemDate/HistoryItemDate';

import { HistoryItemRefillProps } from './Refill.interface';

import { currencySelector } from '$redux/selectors';
import { UnifiedNumber } from '$components';
import { InfoCell, InfoCellContent, InfoCellHeading } from '$components/InfoCell';

export const HistoryItemRefill: FC<{ item: HistoryItemRefillProps }> = ({ item }) => {
  const theme = useTheme();
  const currencyInfo = useSelector(currencySelector(item.currency));

  return (
    <>
      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.amount} />
        </InfoCellHeading>
        <InfoCellContent
          bold
          style={{
            color: theme.colors.success2,
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
          <FormattedMessage {...messages.from} />
        </InfoCellHeading>
        <InfoCellContent>{item.bankCode}</InfoCellContent>
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.to} />
        </InfoCellHeading>
        <InfoCellContent>
          <FormattedMessage
            {...messages.myCurrencyWallet}
            values={{
              currency: currencyInfo.name,
            }}
          />
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
